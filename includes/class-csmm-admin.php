<?php
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Admin Manager for Coming Soon Maintenance Mode Pro.
 */
class CSMM_Admin
{

	/**
	 * Init admin hooks.
	 */
	public function init()
	{
		add_action('admin_menu', array($this, 'register_menu'));
		add_action('admin_print_scripts', array($this, 'print_admin_early_scripts'), 1);
		add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
		add_action('admin_post_csmm_export_subscribers', array('CSMM_Subscribers', 'export_csv'));
	}

	/**
	 * Print early scripts in head for scroll restoration and safe fallbacks.
	 */
	public function print_admin_early_scripts()
	{
		$screen = get_current_screen();
		if (!$screen || strpos($screen->id, 'wpfrank-csmm') === false) {
			return;
		}
		?>
		<script>
		window.wp = window.wp || {};
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		</script>
		<?php
	}

	/**
	 * Register admin menu.
	 */
	public function register_menu()
	{
		add_menu_page(
			__('Coming Soon Pro', 'coming-soon-maintenance-mode'),
			__('Coming Soon Pro', 'coming-soon-maintenance-mode'),
			'manage_options',
			'wpfrank-csmm',
			array($this, 'render_admin_app'),
			'dashicons-clock',
			30
		);
	}

	public function enqueue_assets($hook_suffix = '')
	{
		$page = isset($_GET['page']) ? sanitize_text_field(wp_unslash($_GET['page'])) : '';
		// Enqueue on our plugin page
		if ($page !== 'wpfrank-csmm' && (empty($hook_suffix) || strpos($hook_suffix, 'wpfrank-csmm') === false)) {
			return;
		}

		// WordPress media library uploader support
		wp_enqueue_media();

		$dist_path = CSMM_DIR . 'admin/assets/dist/';
		$dist_url = CSMM_URL . 'admin/assets/dist/';

		// Check manifest or built files
		$js_file = $dist_path . 'index.js';
		$css_file = $dist_path . 'index.css';

		if (file_exists($css_file)) {
			wp_enqueue_style(
				'csmm-react-app-css',
				$dist_url . 'index.css',
				array(),
				CSMM_VERSION
			);
		}

		// Enqueue WordPress core utility scripts
		wp_enqueue_script('wp-hooks');
		wp_enqueue_script('wp-util');

		if (file_exists($js_file)) {
			wp_enqueue_script(
				'csmm-react-app-js',
				$dist_url . 'index.js',
				array('jquery', 'wp-hooks', 'wp-util', 'media-editor', 'media-views'),
				CSMM_VERSION,
				true
			);

			// Pass context & REST configuration to React
			wp_localize_script(
				'csmm-react-app-js',
				'csmmData',
				array(
					'restUrl' => esc_url_raw(rest_url('csmm/v1/')),
					'nonce' => wp_create_nonce('wp_rest'),
					'exportUrl' => esc_url(admin_url('admin-post.php?action=csmm_export_subscribers')),
					'siteUrl' => home_url('/'),
					'siteTitle' => get_bloginfo('name'),
					'previewUrl' => add_query_arg('csmm', 'true', home_url('/')),
					'pluginUrl' => CSMM_URL,
					'version' => CSMM_VERSION,
					'user' => array(
						'name' => wp_get_current_user()->display_name,
						'can_manage' => current_user_can('manage_options'),
					),
				)
			);
		}
	}

	/**
	 * Render React root container.
	 */
	public function render_admin_app()
	{
		?>
		<div id="csmm-react-root"
			style="margin-left: -20px; margin-right: -20px; padding: 0; min-height: 100vh; background: transparent;">
		</div>
		<?php
	}
}
