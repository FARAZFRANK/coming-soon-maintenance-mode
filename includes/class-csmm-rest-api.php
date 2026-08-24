<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * WordPress REST API Controller for CSMM.
 */
class CSMM_REST_API {

	const NAMESPACE = 'csmm/v1';

	/**
	 * Register REST routes.
	 */
	public function register_routes() {
		// GET & POST Settings
		register_rest_route(
			self::NAMESPACE,
			'/settings',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_settings' ),
					'permission_callback' => array( $this, 'admin_permissions_check' ),
				),
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'save_settings' ),
					'permission_callback' => array( $this, 'admin_permissions_check' ),
				),
			)
		);

		// Subscribers List & Pagination
		register_rest_route(
			self::NAMESPACE,
			'/subscribers',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_subscribers' ),
				'permission_callback' => array( $this, 'admin_permissions_check' ),
			)
		);

		// Delete Subscriber
		register_rest_route(
			self::NAMESPACE,
			'/subscribers/(?P<id>\d+)',
			array(
				'methods'             => WP_REST_Server::DELETABLE,
				'callback'            => array( $this, 'delete_subscriber' ),
				'permission_callback' => array( $this, 'admin_permissions_check' ),
			)
		);

		// Public Subscribe endpoint (for frontend forms)
		register_rest_route(
			self::NAMESPACE,
			'/subscribe',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'public_subscribe' ),
				'permission_callback' => '__return_true',
			)
		);

		// Templates List
		register_rest_route(
			self::NAMESPACE,
			'/templates',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_templates' ),
				'permission_callback' => array( $this, 'admin_permissions_check' ),
			)
		);

		// Posts and Pages list for selective targeting
		register_rest_route(
			self::NAMESPACE,
			'/target-items',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_target_items' ),
				'permission_callback' => array( $this, 'admin_permissions_check' ),
			)
		);
	}

	/**
	 * Permission check for admin management.
	 */
	public function admin_permissions_check() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Get full settings data.
	 */
	public function get_settings() {
		$settings     = get_option( 'csmm_settings', array() );
		$templates    = get_option( 'csmm_templates', array() );
		$content      = get_option( 'csmm_content', array() );
		$social_media = get_option( 'csmm_social_media', array() );

		// Defaults
		$website_mode = isset( $settings['website_mode'] ) ? intval( $settings['website_mode'] ) : 3;
		$template_id  = isset( $templates['template_id'] ) ? intval( $templates['template_id'] ) : 1;

		$logo_id  = isset( $content['logo'] ) ? $content['logo'] : '1';
		$logo_url = '';
		if ( ! empty( $logo_id ) && is_numeric( $logo_id ) ) {
			$img_src = wp_get_attachment_image_src( $logo_id, 'medium', false );
			if ( $img_src ) {
				$logo_url = $img_src[0];
			}
		}

		if ( empty( $logo_url ) ) {
			$logo_url = CSMM_URL . 'templates/images/logo-w.png';
		}

		// Parse slides
		$slides_data = array();
		if ( ! empty( $content['slide_ids'] ) ) {
			$slide_ids = $content['slide_ids'];
			if ( is_string( $slide_ids ) ) {
				parse_str( urldecode_deep( $slide_ids ), $parsed );
				$slide_ids = isset( $parsed['csmm-slide-id'] ) ? $parsed['csmm-slide-id'] : array();
			}
			if ( is_array( $slide_ids ) ) {
				foreach ( $slide_ids as $sid ) {
					$sid = intval( $sid );
					if ( $sid > 0 ) {
						$src = wp_get_attachment_image_src( $sid, 'medium', true );
						if ( $src ) {
							$slides_data[] = array(
								'id'  => $sid,
								'url' => $src[0],
							);
						}
					}
				}
			}
		}

		$current_date   = date( 'Y-m-d' );
		$countdown_date = isset( $content['countdown_date'] ) ? $content['countdown_date'] : date( 'Y-m-d', strtotime( $current_date . ' +30 days' ) );

		$response = array(
			'website_mode'         => $website_mode,
			'selected_posts'       => isset( $settings['selected_posts'] ) && is_array( $settings['selected_posts'] ) ? array_map( 'intval', $settings['selected_posts'] ) : array(),
			'selected_pages'       => isset( $settings['selected_pages'] ) && is_array( $settings['selected_pages'] ) ? array_map( 'intval', $settings['selected_pages'] ) : array(),
			'selected_other_pages' => isset( $settings['selected_other_pages'] ) && is_array( $settings['selected_other_pages'] ) ? $settings['selected_other_pages'] : array(),
			'template_id'          => $template_id,
			'logo'                 => $logo_id,
			'logo_url'             => $logo_url,
			'title'                => isset( $content['title'] ) ? $content['title'] : 'Coming Soon',
			'description'          => isset( $content['description'] ) ? $content['description'] : '',
			'countdown'            => isset( $content['countdown'] ) ? strval( $content['countdown'] ) : '1',
			'countdown_title'      => isset( $content['countdown_title'] ) ? $content['countdown_title'] : 'Launching In...',
			'countdown_date'       => $countdown_date,
			'countdown_time'       => isset( $content['countdown_time'] ) ? $content['countdown_time'] : '10:00',
			'susbcriber_form'      => isset( $content['susbcriber_form'] ) ? strval( $content['susbcriber_form'] ) : '1',
			'video_url'            => isset( $content['video_url'] ) ? $content['video_url'] : '',
			'custom_css'           => isset( $content['custom_css'] ) ? $content['custom_css'] : '',
			'slides'               => $slides_data,
			'social_media'         => array(
				'facebook'  => isset( $social_media['csmm_sm_facebook'] ) ? $social_media['csmm_sm_facebook'] : '#',
				'twitter'   => isset( $social_media['csmm_sm_twitter'] ) ? $social_media['csmm_sm_twitter'] : '#',
				'youtube'   => isset( $social_media['csmm_sm_youtube'] ) ? $social_media['csmm_sm_youtube'] : '#',
				'instagram' => isset( $social_media['csmm_sm_instagram'] ) ? $social_media['csmm_sm_instagram'] : '#',
				'linkedin'  => isset( $social_media['csmm_sm_linkedin'] ) ? $social_media['csmm_sm_linkedin'] : '',
				'pinterest' => isset( $social_media['csmm_sm_pinterest'] ) ? $social_media['csmm_sm_pinterest'] : '',
				'tumblr'    => isset( $social_media['csmm_sm_tumblr'] ) ? $social_media['csmm_sm_tumblr'] : '',
				'snapchat'  => isset( $social_media['csmm_sm_snapchat'] ) ? $social_media['csmm_sm_snapchat'] : '',
				'behance'   => isset( $social_media['csmm_sm_behance'] ) ? $social_media['csmm_sm_behance'] : '',
				'dribbble'  => isset( $social_media['csmm_sm_dribbble'] ) ? $social_media['csmm_sm_dribbble'] : '',
				'whatsapp'  => isset( $social_media['csmm_sm_whatsapp'] ) ? $social_media['csmm_sm_whatsapp'] : '',
				'tiktok'    => isset( $social_media['csmm_sm_tiktok'] ) ? $social_media['csmm_sm_tiktok'] : '',
				'qq'        => isset( $social_media['csmm_sm_qq'] ) ? $social_media['csmm_sm_qq'] : '',
			),
			'preview_url'          => add_query_arg( 'csmm', 'true', home_url( '/' ) ),
			'site_url'             => home_url(),
		);

		return rest_ensure_response( $response );
	}

	/**
	 * Save settings handler.
	 *
	 * @param WP_REST_Request $request
	 */
	public function save_settings( $request ) {
		$params = $request->get_json_params();
		if ( empty( $params ) ) {
			$params = $request->get_params();
		}

		// 1. Settings (Website mode & targeting)
		if ( isset( $params['website_mode'] ) ) {
			$website_mode         = intval( $params['website_mode'] );
			$selected_posts       = isset( $params['selected_posts'] ) && is_array( $params['selected_posts'] ) ? array_map( 'intval', $params['selected_posts'] ) : array();
			$selected_pages       = isset( $params['selected_pages'] ) && is_array( $params['selected_pages'] ) ? array_map( 'intval', $params['selected_pages'] ) : array();
			$selected_other_pages = isset( $params['selected_other_pages'] ) && is_array( $params['selected_other_pages'] ) ? array_map( 'sanitize_text_field', $params['selected_other_pages'] ) : array();

			$settings_array = array(
				'website_mode'         => $website_mode,
				'selected_posts'       => $selected_posts,
				'selected_pages'       => $selected_pages,
				'selected_other_pages' => $selected_other_pages,
			);
			update_option( 'csmm_settings', $settings_array );
		}

		// 2. Template
		if ( isset( $params['template_id'] ) ) {
			$template_id = max( 1, min( 36, intval( $params['template_id'] ) ) );
			update_option( 'csmm_templates', array( 'template_id' => $template_id ) );
		}

		// 3. Content
		$content_array = get_option( 'csmm_content', array() );
		if ( isset( $params['title'] ) ) {
			$content_array['title'] = sanitize_text_field( $params['title'] );
		}
		if ( isset( $params['description'] ) ) {
			$content_array['description'] = sanitize_textarea_field( $params['description'] );
		}
		if ( isset( $params['logo'] ) ) {
			$content_array['logo'] = sanitize_text_field( $params['logo'] );
		}
		if ( isset( $params['countdown'] ) ) {
			$content_array['countdown'] = sanitize_text_field( $params['countdown'] );
		}
		if ( isset( $params['countdown_title'] ) ) {
			$content_array['countdown_title'] = sanitize_text_field( $params['countdown_title'] );
		}
		if ( isset( $params['countdown_date'] ) ) {
			$content_array['countdown_date'] = sanitize_text_field( $params['countdown_date'] );
		}
		if ( isset( $params['countdown_time'] ) ) {
			$content_array['countdown_time'] = sanitize_text_field( $params['countdown_time'] );
		}
		if ( isset( $params['susbcriber_form'] ) ) {
			$content_array['susbcriber_form'] = sanitize_text_field( $params['susbcriber_form'] );
		}
		if ( isset( $params['video_url'] ) ) {
			$content_array['video_url'] = esc_url_raw( $params['video_url'] );
		}
		if ( isset( $params['custom_css'] ) ) {
			$content_array['custom_css'] = wp_strip_all_tags( $params['custom_css'] );
		}
		if ( isset( $params['slide_ids'] ) ) {
			$slide_ids = is_array( $params['slide_ids'] ) ? array_map( 'intval', $params['slide_ids'] ) : array();
			$content_array['slide_ids'] = $slide_ids;
		}
		update_option( 'csmm_content', $content_array );

		// 4. Social Media
		if ( isset( $params['social_media'] ) && is_array( $params['social_media'] ) ) {
			$sm = $params['social_media'];
			$social_array = array(
				'csmm_sm_facebook'  => isset( $sm['facebook'] ) ? esc_url_raw( $sm['facebook'] ) : '',
				'csmm_sm_twitter'   => isset( $sm['twitter'] ) ? esc_url_raw( $sm['twitter'] ) : '',
				'csmm_sm_youtube'   => isset( $sm['youtube'] ) ? esc_url_raw( $sm['youtube'] ) : '',
				'csmm_sm_instagram' => isset( $sm['instagram'] ) ? esc_url_raw( $sm['instagram'] ) : '',
				'csmm_sm_linkedin'  => isset( $sm['linkedin'] ) ? esc_url_raw( $sm['linkedin'] ) : '',
				'csmm_sm_pinterest' => isset( $sm['pinterest'] ) ? esc_url_raw( $sm['pinterest'] ) : '',
				'csmm_sm_tumblr'    => isset( $sm['tumblr'] ) ? esc_url_raw( $sm['tumblr'] ) : '',
				'csmm_sm_snapchat'  => isset( $sm['snapchat'] ) ? esc_url_raw( $sm['snapchat'] ) : '',
				'csmm_sm_behance'   => isset( $sm['behance'] ) ? esc_url_raw( $sm['behance'] ) : '',
				'csmm_sm_dribbble'  => isset( $sm['dribbble'] ) ? esc_url_raw( $sm['dribbble'] ) : '',
				'csmm_sm_whatsapp'  => isset( $sm['whatsapp'] ) ? sanitize_text_field( $sm['whatsapp'] ) : '',
				'csmm_sm_tiktok'    => isset( $sm['tiktok'] ) ? esc_url_raw( $sm['tiktok'] ) : '',
				'csmm_sm_qq'        => isset( $sm['qq'] ) ? sanitize_text_field( $sm['qq'] ) : '',
			);
			update_option( 'csmm_social_media', $social_array );
		}

		return rest_ensure_response(
			array(
				'success' => true,
				'message' => __( 'Settings updated successfully!', 'coming-soon-maintenance-mode' ),
			)
		);
	}

	/**
	 * Get paginated subscribers.
	 *
	 * @param WP_REST_Request $request
	 */
	public function get_subscribers( $request ) {
		$page     = max( 1, intval( $request->get_param( 'page' ) ) );
		$per_page = max( 5, min( 100, intval( $request->get_param( 'per_page' ) ? $request->get_param( 'per_page' ) : 15 ) ) );
		$search   = sanitize_text_field( $request->get_param( 'search' ) );

		$data = CSMM_Subscribers::get_subscribers( $page, $per_page, $search );
		return rest_ensure_response( $data );
	}

	/**
	 * Delete subscriber.
	 *
	 * @param WP_REST_Request $request
	 */
	public function delete_subscriber( $request ) {
		$id      = intval( $request->get_param( 'id' ) );
		$deleted = CSMM_Subscribers::delete_subscriber( $id );

		if ( $deleted ) {
			return rest_ensure_response( array( 'success' => true, 'message' => __( 'Subscriber deleted.', 'coming-soon-maintenance-mode' ) ) );
		}
		return new WP_Error( 'delete_failed', __( 'Could not delete subscriber.', 'coming-soon-maintenance-mode' ), array( 'status' => 400 ) );
	}

	/**
	 * Public subscription endpoint.
	 *
	 * @param WP_REST_Request $request
	 */
	public function public_subscribe( $request ) {
		$email   = sanitize_email( $request->get_param( 'email' ) );
		$referer = sanitize_text_field( $request->get_header( 'referer' ) );

		if ( ! is_email( $email ) ) {
			return new WP_Error( 'invalid_email', __( 'Please provide a valid email address.', 'coming-soon-maintenance-mode' ), array( 'status' => 400 ) );
		}

		$subscriber_id = CSMM_Subscribers::add_subscriber( $email, '', $referer );
		if ( $subscriber_id ) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __( 'Thank you for subscribing! We will notify you when we launch.', 'coming-soon-maintenance-mode' ),
				)
			);
		}

		return new WP_Error( 'subscribe_error', __( 'Unable to process subscription.', 'coming-soon-maintenance-mode' ), array( 'status' => 500 ) );
	}

	/**
	 * Get list of 36 templates with metadata.
	 */
	public function get_templates() {
		$image_map = array(
			1  => '1.webp',
			2  => '2.webp',
			3  => '3.webp',
			4  => '4.webp',
			5  => '5.webp',
			6  => '6.webp',
			7  => '7.webp',
			8  => '8.webp',
			9  => '9.webp',
			10 => '10.webp',
			11 => '11.webp',
			12 => '12.webp',
			13 => '13.webp',
			14 => '14.webp',
			15 => '15.webp',
			16 => '16.webp',
			17 => '17-academy.webp',
			18 => '18-beauty.webp',
			19 => '19-Celebrate.webp',
			20 => '20-construction.webp',
			21 => '21-construction2.webp',
			22 => '22-education.webp',
			23 => '23-event.webp',
			24 => '24-fashion.webp',
			25 => '25-food.webp',
			26 => '26-future.webp',
			27 => '27-gaming.webp',
			28 => '28-green.webp',
			29 => '29-gym.webp',
			30 => '30-health.webp',
			31 => '31-kids.webp',
			32 => '32-podcast.webp',
			33 => '33-portfolio.webp',
			34 => '34-realestate.webp',
			35 => '35-shopping.webp',
			36 => '36-travel.webp',
		);

		$templates = array();
		for ( $i = 1; $i <= 36; $i++ ) {
			$img_file      = isset( $image_map[ $i ] ) ? $image_map[ $i ] : "$i.webp";
			$preview_thumb = CSMM_URL . "admin/assets/img/$img_file";

			$templates[] = array(
				'id'          => $i,
				'name'        => sprintf( __( 'Template #%02d', 'coming-soon-maintenance-mode' ), $i ),
				'thumbnail'   => $preview_thumb,
				'preview_url' => add_query_arg( array( 'csmm' => 'true', 'template_preview' => $i ), home_url( '/' ) ),
			);
		}
		return rest_ensure_response( $templates );
	}

	/**
	 * Get list of posts and pages for targeting selector.
	 */
	public function get_target_items() {
		$posts = get_posts(
			array(
				'numberposts' => 100,
				'post_status' => 'publish',
				'post_type'   => 'post',
			)
		);
		$pages = get_pages(
			array(
				'number'      => 100,
				'post_status' => 'publish',
			)
		);

		$post_items = array();
		foreach ( $posts as $p ) {
			$post_items[] = array(
				'id'    => $p->ID,
				'title' => $p->post_title ? $p->post_title : '#' . $p->ID,
			);
		}

		$page_items = array();
		foreach ( $pages as $p ) {
			$page_items[] = array(
				'id'    => $p->ID,
				'title' => $p->post_title ? $p->post_title : '#' . $p->ID,
			);
		}

		return rest_ensure_response(
			array(
				'posts' => $post_items,
				'pages' => $page_items,
			)
		);
	}
}
