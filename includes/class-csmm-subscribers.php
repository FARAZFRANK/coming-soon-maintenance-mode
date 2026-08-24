<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles Subscriber data storage, queries, deletion, and CSV export.
 */
class CSMM_Subscribers {

	/**
	 * Get table name.
	 */
	public static function get_table_name() {
		global $wpdb;
		return $wpdb->prefix . 'csmm_subscribers';
	}

	/**
	 * Ensure table exists in database.
	 */
	public static function ensure_table_exists() {
		global $wpdb;
		static $checked = false;
		if ( $checked ) {
			return;
		}

		$table           = self::get_table_name();
		$charset_collate = $wpdb->get_charset_collate();

		$wpdb->query(
			"CREATE TABLE IF NOT EXISTS `{$table}` (
				`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
				`email` VARCHAR(191) NOT NULL,
				`ip_address` VARCHAR(45) NOT NULL DEFAULT '',
				`referer` VARCHAR(255) NOT NULL DEFAULT '',
				`created_at` DATETIME NOT NULL,
				PRIMARY KEY (`id`),
				UNIQUE KEY `email` (`email`)
			) {$charset_collate};"
		);

		// Migrate legacy data if table was just created
		if ( ! get_option( 'csmm_legacy_migrated' ) ) {
			CSMM_Activator::migrate_legacy_data();
		}

		$checked = true;
	}

	/**
	 * Add a new subscriber.
	 *
	 * @param string $email Email address.
	 * @param string $ip IP address.
	 * @param string $referer Referer URL.
	 * @return int|false ID on success, false on failure or duplicate.
	 */
	public static function add_subscriber( $email, $ip = '', $referer = '' ) {
		global $wpdb;

		$email = sanitize_email( strtolower( trim( $email ) ) );
		if ( ! is_email( $email ) ) {
			return false;
		}

		self::ensure_table_exists();

		$table = self::get_table_name();

		// Check if exists
		$exists = $wpdb->get_var(
			$wpdb->prepare( "SELECT id FROM `{$table}` WHERE email = %s", $email )
		);

		if ( $exists ) {
			return intval( $exists );
		}

		$result = $wpdb->insert(
			$table,
			array(
				'email'      => $email,
				'ip_address' => sanitize_text_field( $ip ? $ip : self::get_client_ip() ),
				'referer'    => esc_url_raw( $referer ),
				'created_at' => current_time( 'mysql' ),
			),
			array( '%s', '%s', '%s', '%s' )
		);

		// Also update legacy option for dual compatibility
		$legacy = get_option( 'cmss_subscriber_list', array() );
		if ( is_array( $legacy ) && ! in_array( $email, $legacy, true ) ) {
			$legacy[] = $email;
			update_option( 'cmss_subscriber_list', $legacy );
		}

		// Trigger Integrations Pipeline (Mailchimp, Webhooks, Welcome Email, Admin Alert)
		CSMM_Integrations::process_new_subscriber( $email, $ip, $referer );

		return $result ? $wpdb->insert_id : false;
	}

	/**
	 * Delete subscriber by ID.
	 *
	 * @param int $id Subscriber ID.
	 * @return bool
	 */
	public static function delete_subscriber( $id ) {
		global $wpdb;

		self::ensure_table_exists();

		$table  = self::get_table_name();
		$result = $wpdb->delete( $table, array( 'id' => intval( $id ) ), array( '%d' ) );
		return false !== $result;
	}

	/**
	 * Get paginated list of subscribers.
	 *
	 * @param int $page Page number.
	 * @param int $per_page Per page items.
	 * @param string $search Search query.
	 * @return array
	 */
	public static function get_subscribers( $page = 1, $per_page = 20, $search = '' ) {
		global $wpdb;

		self::ensure_table_exists();

		$table    = self::get_table_name();
		$page     = max( 1, intval( $page ) );
		$per_page = max( 1, min( 100, intval( $per_page ) ) );
		$offset   = ( $page - 1 ) * $per_page;

		$where  = '';
		$params = array();

		if ( ! empty( $search ) ) {
			$where    = 'WHERE email LIKE %s';
			$params[] = '%' . $wpdb->esc_like( sanitize_text_field( $search ) ) . '%';
		}

		// Count total
		if ( ! empty( $params ) ) {
			$total = intval( $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM `{$table}` {$where}", $params ) ) );
		} else {
			$total = intval( $wpdb->get_var( "SELECT COUNT(*) FROM `{$table}`" ) );
		}

		// Items query
		$query_params   = $params;
		$query_params[] = $per_page;
		$query_params[] = $offset;

		$query = "SELECT id, email, ip_address, created_at FROM `{$table}` {$where} ORDER BY id DESC LIMIT %d OFFSET %d";
		$items = $wpdb->get_results( $wpdb->prepare( $query, $query_params ), ARRAY_A );

		if ( ! is_array( $items ) ) {
			$items = array();
		}

		return array(
			'items'        => $items,
			'total'        => $total,
			'total_pages'  => intval( ceil( $total / $per_page ) ),
			'current_page' => $page,
		);
	}

	/**
	 * Stream secure CSV export directly to browser.
	 */
	public static function export_csv() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Unauthorized access.', 'coming-soon-maintenance-mode' ), 403 );
		}

		self::ensure_table_exists();

		global $wpdb;
		$table = self::get_table_name();

		$subscribers = $wpdb->get_results( "SELECT id, email, ip_address, created_at FROM `{$table}` ORDER BY id DESC", ARRAY_A );

		$filename = 'csmm-subscribers-' . gmdate( 'Y-m-d-His' ) . '.csv';

		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=' . $filename );
		header( 'Pragma: no-cache' );
		header( 'Expires: 0' );

		$output = fopen( 'php://output', 'w' );
		fputcsv( $output, array( '#', 'Email Address', 'IP Address', 'Subscribed At' ) );

		if ( ! empty( $subscribers ) ) {
			$counter = 1;
			foreach ( $subscribers as $row ) {
				$clean_email = $row['email'];
				if ( preg_match( '/^[\=\+\-\@]/', $clean_email ) ) {
					$clean_email = "'" . $clean_email;
				}

				fputcsv(
					$output,
					array(
						$counter++,
						$clean_email,
						$row['ip_address'],
						$row['created_at'],
					)
				);
			}
		}

		fclose( $output );
		exit;
	}

	/**
	 * Helper to get client IP safely.
	 */
	public static function get_client_ip() {
		$ip = '';
		if ( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['HTTP_CLIENT_IP'] ) );
		} elseif ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED_FOR'] ) );
			$ip = explode( ',', $ip )[0];
		} elseif ( ! empty( $_SERVER['REMOTE_ADDR'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) );
		}
		return filter_var( $ip, FILTER_VALIDATE_IP ) ? $ip : '127.0.0.1';
	}
}
