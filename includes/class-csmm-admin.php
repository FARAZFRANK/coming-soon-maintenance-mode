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
		<div id="csmm-react-root" style="margin-left: -20px; margin-right: -20px; padding: 0; min-height: 100vh; background: transparent;">
			<div style="display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 60px); padding: 20px;">
				<div style="background: #ffffff; padding: 36px 44px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.06); text-align: center; max-width: 420px; width: 90%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
					<div style="width: 56px; height: 56px; margin: 0 auto 20px; border-radius: 14px; background: linear-gradient(135deg, #2563eb, #1d4ed8); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="10"></circle>
							<polyline points="12 6 12 12 16 14"></polyline>
						</svg>
					</div>
					<h3 style="margin: 0 0 8px 0; color: #0f172a; font-size: 1.15rem; font-weight: 700; letter-spacing: -0.01em;">
						<?php esc_html_e( 'Coming Soon Pro Studio', 'coming-soon-maintenance-mode' ); ?>
					</h3>
					<p style="margin: 0 0 24px 0; color: #64748b; font-size: 0.875rem;">
						<?php esc_html_e( 'Loading workspace settings & templates...', 'coming-soon-maintenance-mode' ); ?>
					</p>
					<div style="width: 32px; height: 32px; margin: 0 auto; border: 3px solid #e2e8f0; border-top-color: #2563eb; border-radius: 50%; animation: csmm-spin 0.8s linear infinite;"></div>
				</div>
			</div>
		</div>
		<style>
			@keyframes csmm-spin {
				to { transform: rotate(360deg); }
			}
		</style>
		<?php
	}
}
