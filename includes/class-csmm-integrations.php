<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles Multi-Provider Newsletter Integrations (Mailchimp, Brevo, MailerLite, Webhooks),
 * Custom SMTP Delivery, and Automated Email Notifications.
 */
class CSMM_Integrations {

	/**
	 * Init hooks (e.g. SMTP configuration, mode transition).
	 */
	public static function init() {
		add_action( 'phpmailer_init', array( __CLASS__, 'setup_smtp' ) );
		add_action( 'update_option_csmm_settings', array( __CLASS__, 'on_mode_change' ), 10, 3 );
	}

	/**
	 * Triggered when plugin website_mode changes (e.g. from Coming Soon to Live).
	 */
	public static function on_mode_change( $old_value, $value, $option ) {
		$old_mode = isset( $old_value['website_mode'] ) ? intval( $old_value['website_mode'] ) : 3;
		$new_mode = isset( $value['website_mode'] ) ? intval( $value['website_mode'] ) : 3;

		if ( 3 !== $old_mode && 3 === $new_mode ) {
			if ( ! get_transient( 'csmm_launch_broadcast_sent' ) ) {
				set_transient( 'csmm_launch_broadcast_sent', '1', 300 );
				self::broadcast_site_launch_email();
			}
		}
	}

	/**
	 * Configure PHPMailer to send via custom SMTP if enabled.
	 *
	 * @param PHPMailer\PHPMailer\PHPMailer $phpmailer
	 */
	public static function setup_smtp( $phpmailer ) {
		$integrations = get_option( 'csmm_integrations', array() );

		if ( ! empty( $integrations['smtp_enabled'] ) && ! empty( $integrations['smtp_host'] ) ) {
			$phpmailer->isSMTP();
			$phpmailer->Host       = sanitize_text_field( $integrations['smtp_host'] );
			$phpmailer->SMTPAuth   = true;
			$phpmailer->Port       = ! empty( $integrations['smtp_port'] ) ? intval( $integrations['smtp_port'] ) : 587;
			$phpmailer->Username   = sanitize_text_field( $integrations['smtp_username'] );
			$phpmailer->Password   = isset( $integrations['smtp_password'] ) ? $integrations['smtp_password'] : '';
			$encryption            = ! empty( $integrations['smtp_encryption'] ) ? $integrations['smtp_encryption'] : 'tls';
			$phpmailer->SMTPSecure = ( 'none' !== $encryption ) ? $encryption : '';

			$from_email = ! empty( $integrations['smtp_from_email'] ) ? sanitize_email( $integrations['smtp_from_email'] ) : get_bloginfo( 'admin_email' );
			$from_name  = ! empty( $integrations['smtp_from_name'] ) ? sanitize_text_field( $integrations['smtp_from_name'] ) : get_bloginfo( 'name' );

			$phpmailer->From     = $from_email;
			$phpmailer->FromName = $from_name;
		}
	}

	/**
	 * Main pipeline: Triggered when a new subscriber enters email on frontend or API.
	 *
	 * @param string $email
	 * @param string $ip
	 * @param string $referer
	 */
	public static function process_new_subscriber( $email, $ip = '', $referer = '' ) {
		$integrations = get_option( 'csmm_integrations', array() );

		// 1. Mailchimp API v3 Sync
		if ( ! empty( $integrations['mailchimp_enabled'] ) && ! empty( $integrations['mailchimp_api_key'] ) && ! empty( $integrations['mailchimp_list_id'] ) ) {
			self::sync_to_mailchimp( $email, $integrations['mailchimp_api_key'], $integrations['mailchimp_list_id'] );
		}

		// 2. Brevo (Sendinblue) API v3 Sync
		if ( ! empty( $integrations['brevo_enabled'] ) && ! empty( $integrations['brevo_api_key'] ) ) {
			$list_id = ! empty( $integrations['brevo_list_id'] ) ? intval( $integrations['brevo_list_id'] ) : 0;
			self::sync_to_brevo( $email, $integrations['brevo_api_key'], $list_id );
		}

		// 3. MailerLite API v3 Sync
		if ( ! empty( $integrations['mailerlite_enabled'] ) && ! empty( $integrations['mailerlite_api_key'] ) ) {
			$group_id = ! empty( $integrations['mailerlite_group_id'] ) ? sanitize_text_field( $integrations['mailerlite_group_id'] ) : '';
			self::sync_to_mailerlite( $email, $integrations['mailerlite_api_key'], $group_id );
		}

		// 4. Custom Webhook Dispatch
		if ( ! empty( $integrations['webhook_enabled'] ) && ! empty( $integrations['webhook_url'] ) ) {
			self::dispatch_webhook(
				$integrations['webhook_url'],
				array(
					'event'         => 'subscriber.created',
					'email'         => $email,
					'ip_address'    => $ip,
					'referer'       => $referer,
					'timestamp'     => current_time( 'mysql' ),
					'site_name'     => get_bloginfo( 'name' ),
					'site_url'      => home_url( '/' ),
				)
			);
		}

		// 5. Admin Notification Email
		if ( ! empty( $integrations['admin_email_enabled'] ) ) {
			self::send_admin_notification( $email, $ip, $integrations );
		}

		// 6. Subscriber Welcome Email
		if ( ! empty( $integrations['welcome_email_enabled'] ) ) {
			self::send_welcome_email( $email, $integrations );
		}
	}

	/**
	 * Sync email to Mailchimp Audience via API v3.
	 */
	public static function sync_to_mailchimp( $email, $api_key, $list_id ) {
		$parts = explode( '-', $api_key );
		$dc    = isset( $parts[1] ) ? $parts[1] : 'us1';
		$url   = "https://{$dc}.api.mailchimp.com/3.0/lists/{$list_id}/members";

		$body = wp_json_encode(
			array(
				'email_address' => $email,
				'status'        => 'subscribed',
			)
		);

		$response = wp_remote_post(
			$url,
			array(
				'headers' => array(
					'Authorization' => 'Basic ' . base64_encode( 'user:' . $api_key ),
					'Content-Type'  => 'application/json',
				),
				'body'    => $body,
				'timeout' => 15,
			)
		);

		if ( is_wp_error( $response ) ) {
			return array(
				'success' => false,
				'message' => $response->get_error_message(),
			);
		}

		$code     = wp_remote_retrieve_response_code( $response );
		$res_body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 200 === $code || 201 === $code ) {
			return array(
				'success' => true,
				'message' => __( 'Subscribed successfully to Mailchimp.', 'coming-soon-maintenance-mode' ),
			);
		}

		if ( isset( $res_body['title'] ) && 'Member Exists' === $res_body['title'] ) {
			return array(
				'success' => true,
				'message' => __( 'Email already exists in Mailchimp audience.', 'coming-soon-maintenance-mode' ),
			);
		}

		$msg = isset( $res_body['detail'] ) ? $res_body['detail'] : __( 'Mailchimp API Error.', 'coming-soon-maintenance-mode' );
		return array(
			'success' => false,
			'message' => $msg,
		);
	}

	/**
	 * Test Mailchimp Connection.
	 */
	public static function test_mailchimp( $api_key, $list_id ) {
		$parts = explode( '-', $api_key );
		if ( empty( $parts[1] ) ) {
			return array(
				'success' => false,
				'message' => __( 'Invalid Mailchimp API Key format (missing datacenter suffix e.g. -us21).', 'coming-soon-maintenance-mode' ),
			);
		}

		$dc  = $parts[1];
		$url = "https://{$dc}.api.mailchimp.com/3.0/lists/{$list_id}";

		$response = wp_remote_get(
			$url,
			array(
				'headers' => array(
					'Authorization' => 'Basic ' . base64_encode( 'user:' . $api_key ),
				),
				'timeout' => 15,
			)
		);

		if ( is_wp_error( $response ) ) {
			return array(
				'success' => false,
				'message' => $response->get_error_message(),
			);
		}

		$code = wp_remote_retrieve_response_code( $response );
		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 200 === $code ) {
			$name = isset( $body['name'] ) ? $body['name'] : 'Audience';
			return array(
				'success' => true,
				'message' => sprintf( __( 'Connected successfully to audience: "%s" (%d members)', 'coming-soon-maintenance-mode' ), $name, isset( $body['stats']['member_count'] ) ? $body['stats']['member_count'] : 0 ),
			);
		}

		$detail = isset( $body['detail'] ) ? $body['detail'] : __( 'Could not authenticate with Mailchimp.', 'coming-soon-maintenance-mode' );
		return array(
			'success' => false,
			'message' => $detail,
		);
	}

	/**
	 * Sync email to Brevo (Sendinblue) API v3.
	 */
	public static function sync_to_brevo( $email, $api_key, $list_id = 0 ) {
		$url = 'https://api.brevo.com/v3/contacts';

		$payload = array(
			'email'         => $email,
			'updateEnabled' => true,
		);

		if ( $list_id > 0 ) {
			$payload['listIds'] = array( $list_id );
		}

		$response = wp_remote_post(
			$url,
			array(
				'headers' => array(
					'api-key'      => $api_key,
					'Content-Type' => 'application/json',
					'Accept'       => 'application/json',
				),
				'body'    => wp_json_encode( $payload ),
				'timeout' => 15,
			)
		);

		if ( is_wp_error( $response ) ) {
			return array(
				'success' => false,
				'message' => $response->get_error_message(),
			);
		}

		$code     = wp_remote_retrieve_response_code( $response );
		$res_body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 201 === $code || 204 === $code || 200 === $code ) {
			return array(
				'success' => true,
				'message' => __( 'Subscribed successfully to Brevo.', 'coming-soon-maintenance-mode' ),
			);
		}

		$msg = isset( $res_body['message'] ) ? $res_body['message'] : __( 'Brevo API Error.', 'coming-soon-maintenance-mode' );
		return array(
			'success' => false,
			'message' => $msg,
		);
	}

	/**
	 * Test Brevo (Sendinblue) Connection.
	 */
	public static function test_brevo( $api_key, $list_id = 0 ) {
		$url = 'https://api.brevo.com/v3/account';

		$response = wp_remote_get(
			$url,
			array(
				'headers' => array(
					'api-key' => $api_key,
					'Accept'  => 'application/json',
				),
				'timeout' => 15,
			)
		);

		if ( is_wp_error( $response ) ) {
			return array(
				'success' => false,
				'message' => $response->get_error_message(),
			);
		}

		$code = wp_remote_retrieve_response_code( $response );
		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 200 === $code ) {
			$email = isset( $body['email'] ) ? $body['email'] : 'Account';
			$plan  = isset( $body['plan'][0]['type'] ) ? ucfirst( $body['plan'][0]['type'] ) : 'Free';
			return array(
				'success' => true,
				'message' => sprintf( __( 'Authenticated with Brevo (%s - %s Plan)', 'coming-soon-maintenance-mode' ), $email, $plan ),
			);
		}

		$msg = isset( $body['message'] ) ? $body['message'] : __( 'Invalid Brevo API Key.', 'coming-soon-maintenance-mode' );
		return array(
			'success' => false,
			'message' => $msg,
		);
	}

	/**
	 * Sync email to MailerLite API v3.
	 */
	public static function sync_to_mailerlite( $email, $api_key, $group_id = '' ) {
		$url = 'https://connect.mailerlite.com/api/subscribers';

		$payload = array(
			'email'  => $email,
			'status' => 'active',
		);

		if ( ! empty( $group_id ) ) {
			$payload['groups'] = array( $group_id );
		}

		$response = wp_remote_post(
			$url,
			array(
				'headers' => array(
					'Authorization' => 'Bearer ' . $api_key,
					'Content-Type'  => 'application/json',
					'Accept'        => 'application/json',
				),
				'body'    => wp_json_encode( $payload ),
				'timeout' => 15,
			)
		);

		if ( is_wp_error( $response ) ) {
			return array(
				'success' => false,
				'message' => $response->get_error_message(),
			);
		}

		$code     = wp_remote_retrieve_response_code( $response );
		$res_body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 200 === $code || 201 === $code ) {
			return array(
				'success' => true,
				'message' => __( 'Subscribed successfully to MailerLite.', 'coming-soon-maintenance-mode' ),
			);
		}

		$msg = isset( $res_body['message'] ) ? $res_body['message'] : __( 'MailerLite API Error.', 'coming-soon-maintenance-mode' );
		return array(
			'success' => false,
			'message' => $msg,
		);
	}

	/**
	 * Test MailerLite Connection.
	 */
	public static function test_mailerlite( $api_key, $group_id = '' ) {
		$url = 'https://connect.mailerlite.com/api/subscribers?limit=1';

		$response = wp_remote_get(
			$url,
			array(
				'headers' => array(
					'Authorization' => 'Bearer ' . $api_key,
					'Accept'        => 'application/json',
				),
				'timeout' => 15,
			)
		);

		if ( is_wp_error( $response ) ) {
			return array(
				'success' => false,
				'message' => $response->get_error_message(),
			);
		}

		$code = wp_remote_retrieve_response_code( $response );
		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 200 === $code ) {
			$total = isset( $body['total'] ) ? intval( $body['total'] ) : 0;
			return array(
				'success' => true,
				'message' => sprintf( __( 'Authenticated with MailerLite (Total Subscribers: %d)', 'coming-soon-maintenance-mode' ), $total ),
			);
		}

		$msg = isset( $body['message'] ) ? $body['message'] : __( 'Invalid MailerLite API Key.', 'coming-soon-maintenance-mode' );
		return array(
			'success' => false,
			'message' => $msg,
		);
	}

	/**
	 * Dispatch JSON Payload to Custom Webhook.
	 */
	public static function dispatch_webhook( $url, $payload ) {
		$response = wp_remote_post(
			esc_url_raw( $url ),
			array(
				'headers'     => array( 'Content-Type' => 'application/json' ),
				'body'        => wp_json_encode( $payload ),
				'timeout'     => 10,
				'data_format' => 'body',
			)
		);

		if ( is_wp_error( $response ) ) {
			return array(
				'success' => false,
				'message' => $response->get_error_message(),
			);
		}

		$code = wp_remote_retrieve_response_code( $response );
		return array(
			'success' => $code >= 200 && $code < 300,
			'message' => sprintf( __( 'Webhook response HTTP %d', 'coming-soon-maintenance-mode' ), $code ),
		);
	}

	/**
	 * Send notification email to admin.
	 */
	public static function send_admin_notification( $subscriber_email, $ip = '', $integrations = array() ) {
		$admin_email = ! empty( $integrations['admin_email_recipient'] ) ? $integrations['admin_email_recipient'] : get_bloginfo( 'admin_email' );

		$subject_template = ! empty( $integrations['admin_email_subject'] )
			? $integrations['admin_email_subject']
			: __( 'New Subscriber Lead Captured on {site_name} 🎉', 'coming-soon-maintenance-mode' );

		$body_template = ! empty( $integrations['admin_email_body'] )
			? $integrations['admin_email_body']
			: "<h2>New Subscriber Lead!</h2>\n<p>A new visitor has subscribed to your Coming Soon newsletter:</p>\n<p><strong>Email:</strong> {subscriber_email}<br><strong>IP Address:</strong> {ip_address}<br><strong>Date:</strong> {date}</p>";

		$data = array(
			'subscriber_email' => $subscriber_email,
			'ip_address'       => $ip ? $ip : '127.0.0.1',
			'date'             => current_time( 'mysql' ),
		);

		$subject = self::parse_email_placeholders( $subject_template, $data );
		$body    = self::parse_email_placeholders( $body_template, $data );

		self::send_html_mail( $admin_email, $subject, $body );
	}

	/**
	 * Send welcome email to subscriber.
	 */
	public static function send_welcome_email( $subscriber_email, $integrations = array() ) {
		$subject_template = ! empty( $integrations['welcome_email_subject'] )
			? $integrations['welcome_email_subject']
			: __( 'Thank you for subscribing to {site_name}! 🚀', 'coming-soon-maintenance-mode' );

		$body_template = ! empty( $integrations['welcome_email_body'] )
			? $integrations['welcome_email_body']
			: "<h2>Welcome to {site_name}!</h2>\n<p>Hi there,</p>\n<p>Thank you for subscribing to our newsletter! We are currently working hard behind the scenes to launch our brand new website.</p>\n<p>You'll be the very first to know when we go live on <strong>{launch_date}</strong>!</p>\n<p>Best regards,<br>The {site_name} Team</p>";

		$data = array(
			'subscriber_email' => $subscriber_email,
		);

		$subject = self::parse_email_placeholders( $subject_template, $data );
		$body    = self::parse_email_placeholders( $body_template, $data );

		self::send_html_mail( $subscriber_email, $subject, $body );
	}

	/**
	 * Send site live announcement notification to a single subscriber.
	 */
	public static function send_launch_notification( $subscriber_email, $integrations = array() ) {
		$subject_template = ! empty( $integrations['launch_email_subject'] )
			? $integrations['launch_email_subject']
			: __( 'We are officially LIVE! 🚀 Welcome to {site_name}', 'coming-soon-maintenance-mode' );

		$body_template = ! empty( $integrations['launch_email_body'] )
			? $integrations['launch_email_body']
			: "<h2>We Are Officially Live! 🎉</h2>\n<p>Hi there,</p>\n<p>The wait is finally over! We have officially launched our brand new website, and you are the first to know.</p>\n<p>Discover our latest features, products, and exclusive offers right now.</p>\n<p style=\"text-align: center; margin: 30px 0;\"><a href=\"{site_url}\" style=\"background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; display: inline-block;\">Start Exploring Now 🚀</a></p>\n<p>Thank you for being part of our early journey!</p>\n<p>Best regards,<br>The {site_name} Team</p>";

		$data = array(
			'subscriber_email' => $subscriber_email,
		);

		$subject = self::parse_email_placeholders( $subject_template, $data );
		$body    = self::parse_email_placeholders( $body_template, $data );

		return self::send_html_mail( $subscriber_email, $subject, $body );
	}

	/**
	 * Broadcast site live announcement email to ALL registered subscribers.
	 *
	 * @return array Status and number of dispatched emails.
	 */
	public static function broadcast_site_launch_email() {
		$integrations = get_option( 'csmm_integrations', array() );

		if ( empty( $integrations['launch_email_enabled'] ) ) {
			return array(
				'success' => false,
				'message' => __( 'Site Live Announcement Email is currently disabled in settings.', 'coming-soon-maintenance-mode' ),
				'count'   => 0,
			);
		}

		$emails = CSMM_Subscribers::get_all_subscriber_emails();
		if ( empty( $emails ) ) {
			return array(
				'success' => true,
				'message' => __( 'No subscribers found to notify.', 'coming-soon-maintenance-mode' ),
				'count'   => 0,
			);
		}

		$sent_count = 0;
		foreach ( $emails as $email ) {
			if ( is_email( $email ) ) {
				$sent = self::send_launch_notification( $email, $integrations );
				if ( $sent ) {
					$sent_count++;
				}
			}
		}

		return array(
			'success' => true,
			'message' => sprintf( __( 'Site Live announcement successfully sent to %d subscribers!', 'coming-soon-maintenance-mode' ), $sent_count ),
			'count'   => $sent_count,
		);
	}

	/**
	 * Send test email for admin preview.
	 */
	public static function send_test_email( $type, $recipient, $subject, $body ) {
		$recipient = sanitize_email( $recipient );
		if ( ! is_email( $recipient ) ) {
			return array(
				'success' => false,
				'message' => __( 'Please provide a valid recipient email address.', 'coming-soon-maintenance-mode' ),
			);
		}

		$data = array(
			'subscriber_email' => $recipient,
			'ip_address'       => '127.0.0.1',
			'date'             => current_time( 'mysql' ),
		);

		$parsed_subject = '[TEST] ' . self::parse_email_placeholders( $subject, $data );
		$parsed_body    = self::parse_email_placeholders( $body, $data );

		$sent = self::send_html_mail( $recipient, $parsed_subject, $parsed_body );

		if ( $sent ) {
			return array(
				'success' => true,
				'message' => sprintf( __( 'Test email sent successfully to %s.', 'coming-soon-maintenance-mode' ), $recipient ),
			);
		}

		return array(
			'success' => false,
			'message' => __( 'wp_mail() could not send the email. Please check your WordPress SMTP or mail server configuration.', 'coming-soon-maintenance-mode' ),
		);
	}

	/**
	 * Replace dynamic placeholders in email subject and HTML body.
	 */
	public static function parse_email_placeholders( $text, $extra_data = array() ) {
		$site_name = get_bloginfo( 'name' );
		$site_url  = home_url( '/' );

		$content        = get_option( 'csmm_content', array() );
		$launch_date    = ! empty( $content['countdown_date'] ) ? date( 'F d, Y', strtotime( $content['countdown_date'] ) ) : 'Soon';
		$countdown_time = ! empty( $content['countdown_time'] ) ? $content['countdown_time'] : '10:00';

		$replacements = array(
			'{site_name}'        => $site_name,
			'{site_url}'         => $site_url,
			'{subscriber_email}' => isset( $extra_data['subscriber_email'] ) ? $extra_data['subscriber_email'] : 'subscriber@example.com',
			'{ip_address}'       => isset( $extra_data['ip_address'] ) ? $extra_data['ip_address'] : '127.0.0.1',
			'{date}'             => isset( $extra_data['date'] ) ? $extra_data['date'] : current_time( 'mysql' ),
			'{launch_date}'      => $launch_date,
			'{countdown_time}'   => $countdown_time,
		);

		return str_replace( array_keys( $replacements ), array_values( $replacements ), $text );
	}

	/**
	 * Helper to send styled HTML email via WordPress wp_mail.
	 */
	private static function send_html_mail( $to, $subject, $body_html ) {
		$integrations = get_option( 'csmm_integrations', array() );
		$from_email   = ! empty( $integrations['smtp_from_email'] ) ? sanitize_email( $integrations['smtp_from_email'] ) : get_bloginfo( 'admin_email' );
		$from_name    = ! empty( $integrations['smtp_from_name'] ) ? sanitize_text_field( $integrations['smtp_from_name'] ) : get_bloginfo( 'name' );

		$headers = array(
			'Content-Type: text/html; charset=UTF-8',
			'From: ' . $from_name . ' <' . $from_email . '>',
		);

		$site_title = esc_html( get_bloginfo( 'name' ) );
		$site_url   = esc_url( home_url( '/' ) );
		$year       = gmdate( 'Y' );

		// Custom Template Colors & Styling
		$header_title = ! empty( $integrations['email_header_title'] ) ? self::parse_email_placeholders( $integrations['email_header_title'] ) : $site_title;
		$header_bg    = ! empty( $integrations['email_header_bg'] ) ? sanitize_hex_color( $integrations['email_header_bg'] ) : '#2563eb';
		$header_color = ! empty( $integrations['email_header_color'] ) ? sanitize_hex_color( $integrations['email_header_color'] ) : '#ffffff';
		$bg_color     = ! empty( $integrations['email_bg_color'] ) ? sanitize_hex_color( $integrations['email_bg_color'] ) : '#f8fafc';
		$card_bg      = ! empty( $integrations['email_card_bg'] ) ? sanitize_hex_color( $integrations['email_card_bg'] ) : '#ffffff';
		$text_color   = ! empty( $integrations['email_text_color'] ) ? sanitize_hex_color( $integrations['email_text_color'] ) : '#1e293b';
		$footer_bg    = ! empty( $integrations['email_footer_bg'] ) ? sanitize_hex_color( $integrations['email_footer_bg'] ) : '#f1f5f9';
		$footer_color = ! empty( $integrations['email_footer_color'] ) ? sanitize_hex_color( $integrations['email_footer_color'] ) : '#64748b';

		$default_footer = '&copy; ' . $year . ' <a href="' . $site_url . '" style="color: ' . $header_bg . '; text-decoration: none;">' . $site_title . '</a>. All rights reserved.';
		$footer_text    = ! empty( $integrations['email_footer_text'] ) ? self::parse_email_placeholders( $integrations['email_footer_text'] ) : $default_footer;

		$full_html = '<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: ' . $bg_color . '; margin: 0; padding: 24px; color: ' . $text_color . '; }
.card { max-width: 580px; margin: 0 auto; background: ' . $card_bg . '; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
.header { background: ' . $header_bg . '; color: ' . $header_color . '; padding: 24px; text-align: center; }
.header h1 { margin: 0; font-size: 20px; font-weight: 700; color: ' . $header_color . '; }
.body { padding: 30px 24px; line-height: 1.65; font-size: 15px; color: ' . $text_color . '; }
.footer { background: ' . $footer_bg . '; padding: 16px 24px; text-align: center; font-size: 12px; color: ' . $footer_color . '; border-top: 1px solid #e2e8f0; }
.footer a { color: ' . $header_bg . '; text-decoration: none; font-weight: 500; }
</style>
</head>
<body>
<div class="card">
<div class="header">
<h1>' . esc_html( $header_title ) . '</h1>
</div>
<div class="body">' . $body_html . '</div>
<div class="footer">
<p style="margin: 0; color: ' . $footer_color . ';">' . $footer_text . '</p>
</div>
</div>
</body>
</html>';

		return wp_mail( $to, $subject, $full_html, $headers );
	}
}
