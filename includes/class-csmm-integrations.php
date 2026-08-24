<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles Newsletter Integrations (Mailchimp v3, Webhooks) and Email Notifications.
 */
class CSMM_Integrations {

	/**
	 * Main pipeline: Triggered when a new subscriber enters email on frontend or API.
	 *
	 * @param string $email
	 * @param string $ip
	 * @param string $referer
	 */
	public static function process_new_subscriber( $email, $ip = '', $referer = '' ) {
		$integrations = get_option( 'csmm_integrations', array() );

		// 1. Mailchimp API Sync
		if ( ! empty( $integrations['mailchimp_enabled'] ) && ! empty( $integrations['mailchimp_api_key'] ) && ! empty( $integrations['mailchimp_list_id'] ) ) {
			self::sync_to_mailchimp( $email, $integrations['mailchimp_api_key'], $integrations['mailchimp_list_id'] );
		}

		// 2. Custom Webhook Dispatch
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

		// 3. Admin Notification Email
		if ( ! empty( $integrations['admin_email_enabled'] ) ) {
			self::send_admin_notification( $email, $ip, $integrations );
		}

		// 4. Subscriber Welcome Email
		if ( ! empty( $integrations['welcome_email_enabled'] ) ) {
			self::send_welcome_email( $email, $integrations );
		}
	}

	/**
	 * Sync email to Mailchimp Audience via API v3.
	 *
	 * @param string $email
	 * @param string $api_key
	 * @param string $list_id
	 * @return array
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

		$code = wp_remote_retrieve_response_code( $response );
		$res_body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( 200 === $code || 201 === $code ) {
			return array(
				'success' => true,
				'message' => __( 'Subscribed successfully to Mailchimp.', 'coming-soon-maintenance-mode' ),
			);
		}

		// Check if already subscribed (status 400 with title 'Member Exists')
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
	 *
	 * @param string $api_key
	 * @param string $list_id
	 * @return array
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
	 * Dispatch JSON Payload to Custom Webhook.
	 *
	 * @param string $url
	 * @param array $payload
	 * @return array
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
	 *
	 * @param string $subscriber_email
	 * @param string $ip
	 * @param array $integrations
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
	 *
	 * @param string $subscriber_email
	 * @param array $integrations
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
	 * Send test email for admin preview.
	 *
	 * @param string $type ('admin_alert' or 'welcome')
	 * @param string $recipient
	 * @param string $subject
	 * @param string $body
	 * @return array
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
	 *
	 * @param string $text
	 * @param array $extra_data
	 * @return string
	 */
	public static function parse_email_placeholders( $text, $extra_data = array() ) {
		$site_name = get_bloginfo( 'name' );
		$site_url  = home_url( '/' );

		$content = get_option( 'csmm_content', array() );
		$launch_date = ! empty( $content['countdown_date'] ) ? date( 'F d, Y', strtotime( $content['countdown_date'] ) ) : 'Soon';
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
	 *
	 * @param string $to
	 * @param string $subject
	 * @param string $body_html
	 * @return bool
	 */
	private static function send_html_mail( $to, $subject, $body_html ) {
		$headers = array(
			'Content-Type: text/html; charset=UTF-8',
			'From: ' . get_bloginfo( 'name' ) . ' <' . get_bloginfo( 'admin_email' ) . '>',
		);

		$site_title = esc_html( get_bloginfo( 'name' ) );
		$site_url   = esc_url( home_url( '/' ) );
		$year       = gmdate( 'Y' );

		$full_html = '<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
.card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; }
.header { background: #2563eb; color: #ffffff; padding: 24px; text-align: center; }
.header h1 { margin: 0; font-size: 20px; font-weight: 700; }
.body { padding: 30px 24px; line-height: 1.6; font-size: 15px; }
.footer { background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
.footer a { color: #2563eb; text-decoration: none; }
</style>
</head>
<body>
<div class="card">
<div class="header">
<h1>' . $site_title . '</h1>
</div>
<div class="body">' . $body_html . '</div>
<div class="footer">
<p>&copy; ' . $year . ' <a href="' . $site_url . '">' . $site_title . '</a>. All rights reserved.</p>
</div>
</div>
</body>
</html>';

		return wp_mail( $to, $subject, $full_html, $headers );
	}
}
