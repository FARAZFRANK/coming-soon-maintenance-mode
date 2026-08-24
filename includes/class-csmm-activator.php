<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Fired during plugin activation & database migration.
 */
class CSMM_Activator {

	/**
	 * Run activation logic.
	 */
	public static function activate() {
		self::update_version();
		self::create_tables();
		self::migrate_legacy_data();
		self::set_default_options();
	}

	/**
	 * Update version in options.
	 */
	public static function update_version() {
		update_option( 'csmm_current_version', CSMM_VERSION );
	}

	/**
	 * Create custom database tables.
	 */
	public static function create_tables() {
		global $wpdb;

		$table_name      = $wpdb->prefix . 'csmm_subscribers';
		$charset_collate = $wpdb->get_charset_collate();

		$suppress = $wpdb->suppress_errors( true );

		$sql = "CREATE TABLE IF NOT EXISTS `{$table_name}` (
			`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
			`email` VARCHAR(191) NOT NULL,
			`ip_address` VARCHAR(45) NOT NULL DEFAULT '',
			`referer` VARCHAR(255) NOT NULL DEFAULT '',
			`created_at` DATETIME NOT NULL,
			PRIMARY KEY (`id`),
			UNIQUE KEY `email` (`email`)
		) {$charset_collate};";

		$wpdb->query( $sql );

		$wpdb->suppress_errors( $suppress );
	}

	/**
	 * Seamlessly migrate legacy subscriber emails from wp_options to custom table.
	 */
	public static function migrate_legacy_data() {
		global $wpdb;

		$table_name = $wpdb->prefix . 'csmm_subscribers';

		// Check if legacy options exist
		$legacy_subscribers = get_option( 'cmss_subscriber_list' );

		if ( is_array( $legacy_subscribers ) && ! empty( $legacy_subscribers ) ) {
			// Flatten if nested
			$flat_emails = array();
			foreach ( $legacy_subscribers as $entry ) {
				if ( is_array( $entry ) && isset( $entry[0] ) ) {
					$email = sanitize_email( $entry[0] );
				} elseif ( is_string( $entry ) ) {
					$email = sanitize_email( $entry );
				} else {
					continue;
				}

				if ( is_email( $email ) ) {
					$flat_emails[] = strtolower( trim( $email ) );
				}
			}

			$flat_emails = array_unique( array_filter( $flat_emails ) );

			if ( ! empty( $flat_emails ) ) {
				$suppress = $wpdb->suppress_errors( true );
				foreach ( $flat_emails as $email ) {
					$wpdb->query(
						$wpdb->prepare(
							"INSERT IGNORE INTO `{$table_name}` (`email`, `ip_address`, `referer`, `created_at`) VALUES (%s, %s, %s, %s)",
							$email,
							'127.0.0.1',
							'legacy_migration',
							current_time( 'mysql' )
						)
					);
				}
				$wpdb->suppress_errors( $suppress );
			}

			update_option( 'csmm_legacy_migrated', true );
		}
	}

	/**
	 * Set default options on initial activation if not present.
	 */
	public static function set_default_options() {
		if ( false === get_option( 'csmm_settings' ) ) {
			update_option(
				'csmm_settings',
				array(
					'website_mode'         => 3, // 1 = Coming Soon, 2 = Maintenance, 3 = Live / Disabled
					'selected_posts'       => array(),
					'selected_pages'       => array(),
					'selected_other_pages' => array(),
				)
			);
		}

		if ( false === get_option( 'csmm_templates' ) ) {
			update_option(
				'csmm_templates',
				array(
					'template_id' => 1,
				)
			);
		}

		if ( false === get_option( 'csmm_content' ) ) {
			$current_date = date( 'Y-m-d' );
			$countdown_date = date( 'Y-m-d', strtotime( $current_date . ' +30 days' ) );

			update_option(
				'csmm_content',
				array(
					'logo'            => '1',
					'title'           => 'Coming Soon',
					'description'     => 'Thank you for visiting our website! We are currently working on creating a new and exciting online experience for you. While we finish up the final touches, please sign up for our newsletter to receive exclusive updates and offers.',
					'countdown'       => '1',
					'countdown_title' => 'Launching In...',
					'countdown_date'  => $countdown_date,
					'countdown_time'  => '10:00',
					'susbcriber_form' => '1',
					'video_url'       => 'https://player.vimeo.com/video/427528336?title=0&portrait=0&byline=0&autoplay=1&loop=1&muted=true',
					'slide_ids'       => array(),
					'custom_css'      => '',
				)
			);
		}

		if ( false === get_option( 'csmm_social_media' ) ) {
			update_option(
				'csmm_social_media',
				array(
					'csmm_sm_facebook'  => '#',
					'csmm_sm_twitter'   => '#',
					'csmm_sm_youtube'   => '#',
					'csmm_sm_instagram' => '#',
					'csmm_sm_linkedin'  => '',
					'csmm_sm_pinterest' => '',
					'csmm_sm_tumblr'    => '',
					'csmm_sm_snapchat'  => '',
					'csmm_sm_behance'   => '',
					'csmm_sm_dribbble'  => '',
					'csmm_sm_whatsapp'  => '',
					'csmm_sm_tiktok'    => '',
					'csmm_sm_qq'        => '',
				)
			);
		}
	}
}
