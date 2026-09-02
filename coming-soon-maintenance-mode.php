<?php
/**
 * Plugin Name:       Coming Soon Maintenance Mode Pro
 * Plugin URI:        https://wpfrank.com/
 * Description:       A modern, responsive, and robust plugin to create stunning Coming Soon and Maintenance Mode landing pages with lead capture.
 * Version:           3.2.5
 * Requires at least: 5.0
 * Requires PHP:      7.2
 * Author:            Faraz Frank
 * Author URI:        https://profiles.wordpress.org/farazfrank/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       coming-soon-maintenance-mode
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'CSMM_VERSION', '3.2.5' );
define( 'CSMM_FILE', __FILE__ );
define( 'CSMM_DIR', plugin_dir_path( __FILE__ ) );
define( 'CSMM_URL', plugin_dir_url( __FILE__ ) );

/**
 * Main Plugin Class (Singleton).
 */
final class Coming_Soon_Maintenance_Mode_Pro {

	/**
	 * Instance of this class.
	 *
	 * @var Coming_Soon_Maintenance_Mode_Pro|null
	 */
	private static $instance = null;

	/**
	 * Get main instance.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	private function __construct() {
		$this->load_dependencies();
		$this->init_hooks();
	}

	/**
	 * Load required classes.
	 */
	private function load_dependencies() {
		require_once CSMM_DIR . 'includes/class-csmm-activator.php';
		require_once CSMM_DIR . 'includes/class-csmm-subscribers.php';
		require_once CSMM_DIR . 'includes/class-csmm-integrations.php';
		require_once CSMM_DIR . 'includes/class-csmm-seo.php';
		require_once CSMM_DIR . 'includes/class-csmm-rest-api.php';
		require_once CSMM_DIR . 'includes/class-csmm-frontend.php';
		require_once CSMM_DIR . 'includes/class-csmm-admin.php';
		require_once CSMM_DIR . 'includes/class-csmm-i18n.php';
	}

	/**
	 * Register core hooks.
	 */
	private function init_hooks() {
		// Activation / Deactivation hooks
		register_activation_hook( CSMM_FILE, array( 'CSMM_Activator', 'activate' ) );

		// i18n
		$i18n = new CSMM_i18n();
		add_action( 'plugins_loaded', array( $i18n, 'load_plugin_textdomain' ) );

		// Auto check migration on upgrade
		add_action( 'plugins_loaded', array( $this, 'check_version_upgrade' ) );

		// Integrations & SMTP Setup
		CSMM_Integrations::init();

		// REST API
		$rest_api = new CSMM_REST_API();
		add_action( 'rest_api_init', array( $rest_api, 'register_routes' ) );

		// Admin
		if ( is_admin() ) {
			$admin = new CSMM_Admin();
			$admin->init();
		}

		// Frontend
		$frontend = new CSMM_Frontend();
		$frontend->init();
	}

	/**
	 * Automated database update and migration on version bump.
	 */
	public function check_version_upgrade() {
		$installed_version = get_option( 'csmm_current_version' );
		if ( $installed_version !== CSMM_VERSION ) {
			CSMM_Activator::activate();
		}
	}
}

// Bootstrap Plugin
function csmm_init() {
	return Coming_Soon_Maintenance_Mode_Pro::get_instance();
}
csmm_init();