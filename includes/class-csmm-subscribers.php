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

		$table = self::get_table_name();

		// Check if exists
		$exists = $wpdb->get_var(
			$wpdb->prepare( "SELECT id FROM $table WHERE email = %s", $email )
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

		// Also update legacy option for complete dual compatibility if needed
		$legacy = get_option( 'cmss_subscriber_list', array() );
		if ( is_array( $legacy ) && ! in_array( $email, $legacy, true ) ) {
			$legacy[] = $email;
			update_option( 'cmss_subscriber_list', $legacy );
		}

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
		$table  = self::get_table_name();
		$offset = ( max( 1, intval( $page ) ) - 1 ) * intval( $per_page );

		$where = 'WHERE 1=1';
		$params = array();

		if ( ! empty( $search ) ) {
			$where   .= ' AND email LIKE %s';
			$params[] = '%' . $wpdb->esc_like( sanitize_text_field( $search ) ) . '%';
		}

		$total_sql = "SELECT COUNT(*) FROM $table $where";
		$total     = ! empty( $params ) ? intval( $wpdb->get_var( $wpdb->prepare( $total_sql, $params ) ) ) : intval( $wpdb->get_var( $total_sql ) );

		$query_sql = "SELECT id, email, ip_address, created_at FROM $table $where ORDER BY id DESC LIMIT %d OFFSET %d";
		$query_params   = $params;
		$query_params[] = intval( $per_page );
		$query_params[] = intval( $offset );

		$items = $wpdb->get_results( $wpdb->prepare( $query_sql, $query_params ), ARRAY_A );

		return array(
			'items'        => $items ? $items : array(),
			'total'        => $total,
			'total_pages'  => ceil( $total / max( 1, intval( $per_page ) ) ),
			'current_page' => intval( $page ),
		);
	}

	/**
	 * Stream secure CSV export directly to browser.
	 */
	public static function export_csv() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Unauthorized access.', 'coming-soon-maintenance-mode' ), 403 );
		}

		global $wpdb;
		$table = self::get_table_name();

		$subscribers = $wpdb->get_results( "SELECT id, email, ip_address, created_at FROM $table ORDER BY id DESC", ARRAY_A );

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
				// Sanitize against CSV injection (=, +, -, @ prefix formulas)
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
