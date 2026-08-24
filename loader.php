<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Version & Setup
$csmm_current_version = get_option( 'csmm_current_version', '3.2.0' );

// Defaults
$csmm_settings      = get_option( 'csmm_settings', array() );
$csmm_templates     = get_option( 'csmm_templates', array() );
$csmm_content       = get_option( 'csmm_content', array() );
$csmm_social_media   = get_option( 'csmm_social_media', array() );
$csmm_seo           = get_option( 'csmm_seo', array() );

$csmm_website_mode   = isset( $csmm_settings['website_mode'] ) ? intval( $csmm_settings['website_mode'] ) : 3;
$csmm_template_id    = isset( $csmm_templates['template_id'] ) ? intval( $csmm_templates['template_id'] ) : 1;

// Allow live template preview override for admins
if ( isset( $_GET['template_preview'] ) && current_user_can( 'manage_options' ) ) {
	$preview_id = intval( $_GET['template_preview'] );
	if ( $preview_id >= 1 && $preview_id <= 36 ) {
		$csmm_template_id = $preview_id;
	}
}

// Logo Setup
$csmm_logo_id  = isset( $csmm_content['logo'] ) ? $csmm_content['logo'] : '1';
$csmm_logo_alt = 'coming-soon-logo';
$csmm_logo_url = array( CSMM_URL . 'templates/images/logo-w.png' );

if ( ! empty( $csmm_logo_id ) && is_numeric( $csmm_logo_id ) ) {
	$medium_src = wp_get_attachment_image_src( $csmm_logo_id, 'medium', false );
	if ( $medium_src ) {
		$csmm_logo_url = $medium_src;
	}
}

// Content defaults
$csmm_title           = isset( $csmm_content['title'] ) && '' !== $csmm_content['title'] ? $csmm_content['title'] : __( 'Coming Soon', 'coming-soon-maintenance-mode' );
$csmm_description     = isset( $csmm_content['description'] ) ? $csmm_content['description'] : __( 'Thank you for visiting our website! We are currently working on creating a new and exciting online experience for you. While we finish up the final touches, please sign up for our newsletter to receive exclusive updates and offers.', 'coming-soon-maintenance-mode' );
$csmm_countdown       = isset( $csmm_content['countdown'] ) ? $csmm_content['countdown'] : '1';
$csmm_countdown_title = isset( $csmm_content['countdown_title'] ) ? $csmm_content['countdown_title'] : __( 'Launching In...', 'coming-soon-maintenance-mode' );
$csmm_current_date    = date( 'Y-m-d' );
$csmm_countdown_date  = isset( $csmm_content['countdown_date'] ) ? $csmm_content['countdown_date'] : date( 'Y-m-d', strtotime( $csmm_current_date . ' +30 days' ) );
$csmm_countdown_time  = isset( $csmm_content['countdown_time'] ) ? $csmm_content['countdown_time'] : '10:00';
$csmm_susbcriber_form = isset( $csmm_content['susbcriber_form'] ) ? $csmm_content['susbcriber_form'] : '1';
$csmm_video_url       = isset( $csmm_content['video_url'] ) ? $csmm_content['video_url'] : 'https://player.vimeo.com/video/427528336?title=0&portrait=0&byline=0&autoplay=1&loop=1&muted=true';
$csmm_custom_css      = isset( $csmm_content['custom_css'] ) ? $csmm_content['custom_css'] : '';
$csmm_slide_ids       = isset( $csmm_content['slide_ids'] ) && is_array( $csmm_content['slide_ids'] ) ? $csmm_content['slide_ids'] : array();

// Launch timestamp string (e.g., 'October 25, 2026 10:00:00')
$csmm_launch_date = date( 'F d, Y', strtotime( $csmm_countdown_date ) );
$csmm_launch_time = date( 'H:i:s', strtotime( $csmm_countdown_time ) );
$csmm_launch_dt   = $csmm_launch_date . ' ' . $csmm_launch_time;

// Social Media Links
$csmm_sm_facebook  = isset( $csmm_social_media['csmm_sm_facebook'] ) ? $csmm_social_media['csmm_sm_facebook'] : '#';
$csmm_sm_twitter   = isset( $csmm_social_media['csmm_sm_twitter'] ) ? $csmm_social_media['csmm_sm_twitter'] : '#';
$csmm_sm_youtube   = isset( $csmm_social_media['csmm_sm_youtube'] ) ? $csmm_social_media['csmm_sm_youtube'] : '#';
$csmm_sm_instagram = isset( $csmm_social_media['csmm_sm_instagram'] ) ? $csmm_social_media['csmm_sm_instagram'] : '#';
$csmm_sm_linkedin  = isset( $csmm_social_media['csmm_sm_linkedin'] ) ? $csmm_social_media['csmm_sm_linkedin'] : '';
$csmm_sm_pinterest = isset( $csmm_social_media['csmm_sm_pinterest'] ) ? $csmm_social_media['csmm_sm_pinterest'] : '';
$csmm_sm_tumblr    = isset( $csmm_social_media['csmm_sm_tumblr'] ) ? $csmm_social_media['csmm_sm_tumblr'] : '';
$csmm_sm_snapchat  = isset( $csmm_social_media['csmm_sm_snapchat'] ) ? $csmm_social_media['csmm_sm_snapchat'] : '';
$csmm_sm_behance   = isset( $csmm_social_media['csmm_sm_behance'] ) ? $csmm_social_media['csmm_sm_behance'] : '';
$csmm_sm_dribbble  = isset( $csmm_social_media['csmm_sm_dribbble'] ) ? $csmm_social_media['csmm_sm_dribbble'] : '';
$csmm_sm_whatsapp  = isset( $csmm_social_media['csmm_sm_whatsapp'] ) ? $csmm_social_media['csmm_sm_whatsapp'] : '';
$csmm_sm_tiktok    = isset( $csmm_social_media['csmm_sm_tiktok'] ) ? $csmm_social_media['csmm_sm_tiktok'] : '';
$csmm_sm_qq        = isset( $csmm_social_media['csmm_sm_qq'] ) ? $csmm_social_media['csmm_sm_qq'] : '';

// Resolve template file safely
$template_file = CSMM_DIR . "templates/{$csmm_template_id}.php";
if ( ! file_exists( $template_file ) ) {
	$template_file = CSMM_DIR . 'templates/1.php';
}

// Render template with injected SEO & Social metadata
ob_start();
include $template_file;
$html = ob_get_clean();

ob_start();
CSMM_SEO::render_meta_tags( $csmm_content, $csmm_settings, $csmm_seo );
$seo_meta = ob_get_clean();

if ( preg_match( '/<head[^>]*>/i', $html ) ) {
	$html = preg_replace( '/(<head[^>]*>)/i', '$1' . "\n" . $seo_meta, $html, 1 );
}

echo $html;