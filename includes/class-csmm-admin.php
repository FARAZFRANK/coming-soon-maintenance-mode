<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Admin Manager for Coming Soon Maintenance Mode Pro.
 */
class CSMM_Admin {

	/**
	 * Init admin hooks.
	 */
	public function init() {
		add_action( 'admin_menu', array( $this, 'register_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		add_action( 'admin_post_csmm_export_subscribers', array( 'CSMM_Subscribers', 'export_csv' ) );
	}

	/**
	 * Register admin menu.
	 */
	public function register_menu() {
		add_menu_page(
			__( 'Coming Soon Pro', 'coming-soon-maintenance-mode' ),
			__( 'Coming Soon Pro', 'coming-soon-maintenance-mode' ),
			'manage_options',
			'wpfrank-csmm',
			array( $this, 'render_admin_app' ),
			'dashicons-clock',
			30
		);
	}

	/**
	 * Enqueue modern React 18 + MUI assets.
	 *
	 * @param string $hook_suffix
	 */
	public function enqueue_assets( $hook_suffix ) {
		// Only enqueue on our plugin pages
		if ( strpos( $hook_suffix, 'wpfrank-csmm' ) === false ) {
			return;
		}

		// WordPress media library uploader support
		wp_enqueue_media();

		$dist_path = CSMM_DIR . 'admin/assets/dist/';
		$dist_url  = CSMM_URL . 'admin/assets/dist/';

		// Check manifest or built files
		$js_file  = $dist_path . 'index.js';
		$css_file = $dist_path . 'index.css';

		if ( file_exists( $css_file ) ) {
			wp_enqueue_style(
				'csmm-react-app-css',
				$dist_url . 'index.css',
				array(),
				CSMM_VERSION
			);
		}

		if ( file_exists( $js_file ) ) {
			wp_enqueue_script(
				'csmm-react-app-js',
				$dist_url . 'index.js',
				array( 'wp-element' ),
				CSMM_VERSION,
				true
			);

			// Pass context & REST configuration to React
			wp_localize_script(
				'csmm-react-app-js',
				'csmmData',
				array(
					'restUrl'     => esc_url_raw( rest_url( 'csmm/v1/' ) ),
					'nonce'       => wp_create_nonce( 'wp_rest' ),
					'exportUrl'   => esc_url( admin_url( 'admin-post.php?action=csmm_export_subscribers' ) ),
					'siteUrl'     => home_url(),
					'previewUrl'  => add_query_arg( 'csmm', 'true', home_url( '/' ) ),
					'pluginUrl'   => CSMM_URL,
					'version'     => CSMM_VERSION,
					'user'        => array(
						'name'       => wp_get_current_user()->display_name,
						'can_manage' => current_user_can( 'manage_options' ),
					),
				)
			);
		}
	}

	/**
	 * Render React root container.
	 */
	public function render_admin_app() {
		?>
		<div id="csmm-react-root" style="margin-left: -20px; padding: 0;">
			<div style="padding: 40px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
				<div class="spinner is-active" style="float: none; margin: 0 auto 16px;"></div>
				<h3 style="color: #1e293b; font-weight: 600;"><?php esc_html_e( 'Loading Coming Soon Maintenance Mode Pro Dashboard...', 'coming-soon-maintenance-mode' ); ?></h3>
			</div>
		</div>
		<?php
	}
}
