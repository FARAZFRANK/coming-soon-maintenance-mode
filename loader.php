<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Version & Setup
$csmm_current_version = get_option( 'csmm_current_version', '3.2.1' );

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
$csmm_logo_type           = isset( $csmm_content['logo_type'] ) ? $csmm_content['logo_type'] : 'graphic';
$csmm_logo_enabled        = isset( $csmm_content['logo_enabled'] ) ? ( '1' === strval( $csmm_content['logo_enabled'] ) ) : ( 'disabled' !== $csmm_logo_type );
if ( ! $csmm_logo_enabled ) {
	$csmm_logo_type = 'disabled';
}
$csmm_logo_id             = ( ! $csmm_logo_enabled || 'disabled' === $csmm_logo_type ) ? '' : ( isset( $csmm_content['logo'] ) && '' !== $csmm_content['logo'] ? $csmm_content['logo'] : '1' );
$csmm_logo_text           = ( isset( $csmm_content['logo_text'] ) && '' !== $csmm_content['logo_text'] ) ? $csmm_content['logo_text'] : ( ( isset( $csmm_content['title'] ) && '' !== $csmm_content['title'] ) ? $csmm_content['title'] : get_bloginfo( 'name' ) );
$csmm_logo_link           = ( isset( $csmm_content['logo_link'] ) && '' !== $csmm_content['logo_link'] ) ? $csmm_content['logo_link'] : home_url( '/' );
$csmm_logo_height_enabled = ! empty( $csmm_content['logo_height_enabled'] );
$csmm_logo_height         = isset( $csmm_content['logo_height'] ) ? intval( $csmm_content['logo_height'] ) : 100;
$csmm_logo_alt            = 'coming-soon-logo';
$csmm_logo_url            = array( CSMM_URL . 'templates/images/logo-w.png' );

if ( ! empty( $csmm_logo_id ) && is_numeric( $csmm_logo_id ) ) {
	$medium_src = wp_get_attachment_image_src( $csmm_logo_id, 'full', false );
	if ( $medium_src ) {
		$csmm_logo_url = $medium_src;
	}
}

// Content defaults
$csmm_title_enabled       = isset( $csmm_content['title_enabled'] ) ? ( '1' === strval( $csmm_content['title_enabled'] ) ) : true;
$csmm_title_font_size_enabled = ! empty( $csmm_content['title_font_size_enabled'] );
$csmm_title_font_size         = isset( $csmm_content['title_font_size'] ) ? intval( $csmm_content['title_font_size'] ) : 0;
$csmm_description_enabled = isset( $csmm_content['description_enabled'] ) ? ( '1' === strval( $csmm_content['description_enabled'] ) ) : true;
$csmm_description_font_size_enabled = ! empty( $csmm_content['description_font_size_enabled'] );
$csmm_description_font_size         = isset( $csmm_content['description_font_size'] ) ? intval( $csmm_content['description_font_size'] ) : 0;

$csmm_title           = ( ! $csmm_title_enabled ) ? '' : ( isset( $csmm_content['title'] ) && '' !== $csmm_content['title'] ? $csmm_content['title'] : __( 'Coming Soon', 'coming-soon-maintenance-mode' ) );
$csmm_description     = ( ! $csmm_description_enabled ) ? '' : ( isset( $csmm_content['description'] ) ? $csmm_content['description'] : __( 'Thank you for visiting our website! We are currently working on creating a new and exciting online experience for you. While we finish up the final touches, please sign up for our newsletter to receive exclusive updates and offers.', 'coming-soon-maintenance-mode' ) );
$csmm_countdown       = isset( $csmm_content['countdown'] ) ? $csmm_content['countdown'] : '1';
$csmm_countdown_title = isset( $csmm_content['countdown_title'] ) ? $csmm_content['countdown_title'] : __( 'Launching In...', 'coming-soon-maintenance-mode' );
$csmm_current_date    = date( 'Y-m-d' );
$csmm_countdown_date  = isset( $csmm_content['countdown_date'] ) ? $csmm_content['countdown_date'] : date( 'Y-m-d', strtotime( $csmm_current_date . ' +30 days' ) );
$csmm_countdown_time  = isset( $csmm_content['countdown_time'] ) ? $csmm_content['countdown_time'] : '10:00';
$csmm_susbcriber_form = isset( $csmm_content['susbcriber_form'] ) ? $csmm_content['susbcriber_form'] : '1';
$csmm_video_url       = isset( $csmm_content['video_url'] ) ? $csmm_content['video_url'] : 'https://player.vimeo.com/video/427528336?title=0&portrait=0&byline=0&autoplay=1&loop=1&muted=true';
$csmm_custom_css      = isset( $csmm_content['custom_css'] ) ? $csmm_content['custom_css'] : '';
$csmm_slide_ids       = isset( $csmm_content['slide_ids'] ) && is_array( $csmm_content['slide_ids'] ) ? $csmm_content['slide_ids'] : array();

// Graphic Background Settings
$csmm_bg_type             = isset( $csmm_content['bg_type'] ) ? $csmm_content['bg_type'] : 'default';
$csmm_bg_custom_images    = isset( $csmm_content['bg_custom_images'] ) && is_array( $csmm_content['bg_custom_images'] ) ? $csmm_content['bg_custom_images'] : array();
$csmm_bg_image_size       = isset( $csmm_content['bg_image_size'] ) ? $csmm_content['bg_image_size'] : 'cover';
$csmm_bg_mobile_enabled   = ! empty( $csmm_content['bg_mobile_enabled'] );
$csmm_bg_mobile_image_url = isset( $csmm_content['bg_mobile_image_url'] ) ? $csmm_content['bg_mobile_image_url'] : '';
$csmm_bg_video_source     = isset( $csmm_content['bg_video_source'] ) ? $csmm_content['bg_video_source'] : 'youtube';
$csmm_bg_video_url        = ( isset( $csmm_content['bg_video_url'] ) && '' !== $csmm_content['bg_video_url'] ) ? $csmm_content['bg_video_url'] : ( isset( $csmm_content['video_url'] ) ? $csmm_content['video_url'] : '' );
$csmm_bg_video_loop       = ! isset( $csmm_content['bg_video_loop'] ) || ! empty( $csmm_content['bg_video_loop'] );
$csmm_bg_video_poster_url = isset( $csmm_content['bg_video_poster_url'] ) ? $csmm_content['bg_video_poster_url'] : '';
$csmm_bg_pattern          = isset( $csmm_content['bg_pattern'] ) ? $csmm_content['bg_pattern'] : 'sakura';
$csmm_bg_solid_color      = isset( $csmm_content['bg_solid_color'] ) ? $csmm_content['bg_solid_color'] : '#e2e8f0';
$csmm_bg_gradient_type    = isset( $csmm_content['bg_gradient_type'] ) ? $csmm_content['bg_gradient_type'] : 'linear';
$csmm_bg_gradient_color1  = isset( $csmm_content['bg_gradient_color1'] ) ? $csmm_content['bg_gradient_color1'] : '#1e3a8a';
$csmm_bg_gradient_color2  = isset( $csmm_content['bg_gradient_color2'] ) ? $csmm_content['bg_gradient_color2'] : '#0f172a';
$default_overlay          = in_array( $csmm_bg_type, array( 'custom', 'video', 'pattern' ), true ) ? 'none' : 'solid';
$csmm_bg_overlay_type     = ( isset( $csmm_content['bg_overlay_type'] ) && '' !== $csmm_content['bg_overlay_type'] ) ? $csmm_content['bg_overlay_type'] : $default_overlay;
$csmm_bg_overlay_color    = isset( $csmm_content['bg_overlay_color'] ) ? $csmm_content['bg_overlay_color'] : '#000000';
$csmm_bg_overlay_opacity  = isset( $csmm_content['bg_overlay_opacity'] ) ? floatval( $csmm_content['bg_overlay_opacity'] ) : 0.4;
$csmm_bg_blur             = isset( $csmm_content['bg_blur'] ) ? intval( $csmm_content['bg_blur'] ) : 0;

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

// Subscriber Form UI Settings
$csmm_form_placeholder   = isset( $csmm_content['form_placeholder_text'] ) && '' !== $csmm_content['form_placeholder_text'] ? $csmm_content['form_placeholder_text'] : __( 'Email Address', 'coming-soon-maintenance-mode' );
$csmm_form_btn_text      = isset( $csmm_content['form_btn_text'] ) && '' !== $csmm_content['form_btn_text'] ? $csmm_content['form_btn_text'] : __( 'Notify Me', 'coming-soon-maintenance-mode' );
$csmm_form_input_bg      = isset( $csmm_content['form_input_bg'] ) && '' !== $csmm_content['form_input_bg'] ? $csmm_content['form_input_bg'] : 'rgba(0, 0, 0, 0.35)';
$csmm_form_input_color   = isset( $csmm_content['form_input_color'] ) && '' !== $csmm_content['form_input_color'] ? $csmm_content['form_input_color'] : '#ffffff';
$csmm_form_btn_bg        = isset( $csmm_content['form_btn_bg'] ) && '' !== $csmm_content['form_btn_bg'] ? $csmm_content['form_btn_bg'] : '#e11d48';
$csmm_form_btn_color     = isset( $csmm_content['form_btn_color'] ) && '' !== $csmm_content['form_btn_color'] ? $csmm_content['form_btn_color'] : '#ffffff';
$csmm_form_border_radius = isset( $csmm_content['form_border_radius'] ) ? intval( $csmm_content['form_border_radius'] ) : 0;

// Resolve template file safely
$template_file = CSMM_DIR . "templates/{$csmm_template_id}.php";
if ( ! file_exists( $template_file ) ) {
	$template_file = CSMM_DIR . 'templates/1.php';
}

// Render template with injected SEO & Social metadata
ob_start();
include $template_file;
$html = ob_get_clean();

// Remove particle mesh DOM element and scripts if non-default background is active
if ( in_array( $csmm_bg_type, array( 'pattern', 'solid', 'gradient', 'custom', 'video' ), true ) ) {
	$html = preg_replace( '/<div[^>]*id=["\']particles-js["\'][^>]*>\s*<\/div>/is', '', $html );
	$html = preg_replace( '/<script[^>]*src=["\'][^"\']*(?:particles|polygons)[^"\']*["\'][^>]*><\/script>\s*/is', '', $html );
}

// 1. Inject Custom Social Media Channels into <ul class="home-social">
$custom_channels = isset( $csmm_social_media['custom_channels'] ) && is_array( $csmm_social_media['custom_channels'] ) ? $csmm_social_media['custom_channels'] : array();
$custom_social_html = '';
foreach ( $custom_channels as $ch ) {
	if ( ! empty( $ch['url'] ) ) {
		$icon  = ! empty( $ch['icon'] ) ? esc_attr( $ch['icon'] ) : 'fa-solid fa-globe';
		$title = ! empty( $ch['title'] ) ? esc_attr( $ch['title'] ) : '';
		$custom_social_html .= '<li><a href="' . esc_url( $ch['url'] ) . '" target="_blank" title="' . $title . '"><i class="' . $icon . '" aria-hidden="true"></i></a></li>' . "\n";
	}
}

if ( ! empty( $custom_social_html ) && preg_match( '/<\/ul>(\s*<!-- end home-social -->)?/i', $html ) ) {
	$html = preg_replace( '/(<\/ul>(\s*<!-- end home-social -->)?)/i', $custom_social_html . '$1', $html, 1 );
}

// 2. Process Logo across all templates (Text, Graphic with height/link, or Disabled)
if ( ! $csmm_logo_enabled || 'disabled' === $csmm_logo_type ) {
	$html = preg_replace( '/<div class="home-logo">.*?<\/div>/is', '', $html );
	$html = preg_replace( '/<div class="[^"]*mb-6[^"]*">\s*<a[^>]*>\s*<img[^>]*>\s*<\/a>\s*<\/div>/is', '', $html );
} elseif ( 'text' === $csmm_logo_type ) {
	$logo_href = ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) );
	$text_logo_html = '<div class="home-logo csmm-text-logo"><a href="' . $logo_href . '" style="font-family: inherit; font-size: 2.2rem; font-weight: 800; color: #ffffff; text-decoration: none; display: inline-block; letter-spacing: -0.02em;">' . esc_html( $csmm_logo_text ) . '</a></div>';
	if ( preg_match( '/<div class="home-logo">.*?<\/div>/is', $html ) ) {
		$html = preg_replace( '/<div class="home-logo">.*?<\/div>/is', $text_logo_html, $html, 1 );
	} elseif ( preg_match( '/<div class="[^"]*mb-6[^"]*">\s*<a[^>]*>\s*<img[^>]*>\s*<\/a>\s*<\/div>/is', $html ) ) {
		$html = preg_replace( '/<div class="[^"]*mb-6[^"]*">\s*<a[^>]*>\s*<img[^>]*>\s*<\/a>\s*<\/div>/is', $text_logo_html, $html, 1 );
	}
} else {
	// Graphic logo: apply custom link or default to home_url('/')
	$logo_href = ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) );
	if ( preg_match( '/<div class="home-logo">\s*<a href="[^"]*">/i', $html ) ) {
		$html = preg_replace( '/<div class="home-logo">\s*<a href="[^"]*">/i', '<div class="home-logo"><a href="' . $logo_href . '">', $html, 1 );
	}
}

// 3. Process Description & Title visibility
if ( ! $csmm_title_enabled ) {
	$html = preg_replace( '/<h1\b[^>]*>.*?<\/h1>/is', '', $html );
}

if ( ! $csmm_description_enabled ) {
	$html = preg_replace( '/<div class="csmm-description-content">.*?<\/div>/is', '', $html );
	$html = preg_replace( '/<div id="postcard-message-container"[^>]*>.*?<\/div>/is', '', $html );
	$html = preg_replace( '/(<h1>.*?<\/h1>\s*)<p\b[^>]*>.*?<\/p>/is', '$1', $html );
} elseif ( ! empty( $csmm_description ) ) {
	$processed_desc = do_shortcode( wpautop( stripslashes( $csmm_description ) ) );
	// Replace the first <p>...</p> following <h1> or in text block
	$html = preg_replace( '/(<h1>.*?<\/h1>\s*)<p>.*?<\/p>/is', '$1<div class="csmm-description-content">' . $processed_desc . '</div>', $html, 1 );
}

// 4. Process Form Custom Placeholder & Button Text
if ( ! empty( $csmm_form_placeholder ) ) {
	$html = preg_replace( '/placeholder="[^"]*"/i', 'placeholder="' . esc_attr( $csmm_form_placeholder ) . '"', $html, 1 );
}
if ( ! empty( $csmm_form_btn_text ) ) {
	$html = preg_replace( '/value="(Notify Me|Subscribe|Sign Up|Join Now)"/i', 'value="' . esc_attr( $csmm_form_btn_text ) . '"', $html, 1 );
}

// 5. Construct Dynamic Background, Overlay & Form Styles
$dynamic_css = "\n<style id=\"csmm-dynamic-content-styles\">\n";

// Logo height constraint & visibility
if ( ! $csmm_logo_enabled || 'disabled' === $csmm_logo_type ) {
	$dynamic_css .= ".home-logo, .logo, .site-logo, .csmm-logo-wrap, .csmm-text-logo { display: none !important; }\n";
} elseif ( 'graphic' === $csmm_logo_type && $csmm_logo_height_enabled && $csmm_logo_height > 0 ) {
	$dynamic_css .= ".home-logo img { max-height: {$csmm_logo_height}px !important; height: auto !important; width: auto !important; }\n";
}

// Title toggle & font size override
if ( ! $csmm_title_enabled ) {
	$dynamic_css .= "h1, .home-content__text h1, .home-content h1, .title, .title-font, .reveal-text, .hero-title, .section-title, .main-title { display: none !important; }\n";
} elseif ( $csmm_title_font_size_enabled && $csmm_title_font_size > 0 ) {
	$dynamic_css .= "h1, .home-content__text h1, .home-content h1, .title, .title-font, .reveal-text, .hero-title, .section-title, .main-title { font-size: {$csmm_title_font_size}px !important; line-height: 1.2 !important; }\n";
}

// Description toggle & font size override
if ( ! $csmm_description_enabled ) {
	$dynamic_css .= ".csmm-description-content, .home-content__text p, .home-content p, #postcard-message-container, #postcard-message, .description, .hero-desc, .section-desc { display: none !important; }\n";
} elseif ( $csmm_description_font_size_enabled && $csmm_description_font_size > 0 ) {
	$dynamic_css .= ".csmm-description-content, .csmm-description-content *, .csmm-description-content p, .home-content__text p, .home-content p, #postcard-message-container, #postcard-message, .description, .hero-desc, .section-desc { font-size: {$csmm_description_font_size}px !important; line-height: 1.6 !important; }\n";
}

// Countdown & Subscriber Form toggles
if ( '0' === strval( $csmm_countdown ) ) {
	$dynamic_css .= ".home-content__counter, .home-content__clock { display: none !important; }\n";
}
if ( '0' === strval( $csmm_susbcriber_form ) ) {
	$dynamic_css .= ".home-content__subscribe, #mc-form { display: none !important; }\n";
}

// Subscriber Form Input & Button Styling
$dynamic_css .= ".home-content__subscribe, #mc-form, .subscribe-form, .home-content__form { max-width: 540px !important; width: 100% !important; height: 54px !important; min-height: 54px !important; max-height: 54px !important; margin-left: auto !important; margin-right: auto !important; position: relative !important; }\n";
$dynamic_css .= ".home-content__subscribe input[type=\"email\"], #mc-form input[type=\"email\"], input#csmm-email { background: {$csmm_form_input_bg} !important; background-color: {$csmm_form_input_bg} !important; color: {$csmm_form_input_color} !important; border-top-left-radius: {$csmm_form_border_radius}px !important; border-bottom-left-radius: {$csmm_form_border_radius}px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border: none !important; padding-right: 200px !important; padding-left: 20px !important; box-sizing: border-box !important; width: 100% !important; height: 54px !important; min-height: 54px !important; max-height: 54px !important; line-height: 54px !important; margin: 0 !important; margin-bottom: 0 !important; }\n";
$dynamic_css .= ".home-content__subscribe input[type=\"email\"]::placeholder, #mc-form input[type=\"email\"]::placeholder, input#csmm-email::placeholder { color: {$csmm_form_input_color} !important; opacity: 0.85 !important; }\n";
$dynamic_css .= ".home-content__subscribe input[type=\"submit\"], #mc-form input[type=\"submit\"], .home-content__subscribe button, #mc-form button, input[name=\"subscribe\"] { background: {$csmm_form_btn_bg} !important; background-color: {$csmm_form_btn_bg} !important; color: {$csmm_form_btn_color} !important; border-top-right-radius: {$csmm_form_border_radius}px !important; border-bottom-right-radius: {$csmm_form_border_radius}px !important; border-top-left-radius: 0px !important; border-bottom-left-radius: 0px !important; border-color: {$csmm_form_btn_bg} !important; border: none !important; height: 54px !important; min-height: 54px !important; max-height: 54px !important; line-height: 54px !important; padding: 0 28px !important; top: 0 !important; right: 0 !important; margin: 0 !important; position: absolute !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; box-sizing: border-box !important; }\n";
$dynamic_css .= ".home-content__subscribe label.subscribe-message, #mc-form label.subscribe-message, #mc-form label { position: absolute !important; top: 62px !important; left: 0 !important; right: 0 !important; margin-top: 0 !important; margin-bottom: 0 !important; }\n";

// Graphic Background Types - Complete replacement of template background when non-default
if ( in_array( $csmm_bg_type, array( 'pattern', 'solid', 'gradient', 'custom', 'video' ), true ) ) {
	$dynamic_css .= ".s-home::before, .s-home::after, .s-home--static::before, .s-home--particles::before, .s-home .overlay, .s-home .gradient-overlay, .home-overlay, .grid-overlay, .s-home .grid-overlay { display: none !important; opacity: 0 !important; background-image: none !important; background: none !important; }\n";
	$dynamic_css .= "#particles-js, .home-particles, .particles-js-canvas-el, #particles-js canvas { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }\n";
}

$video_bg_html = '';

if ( 'solid' === $csmm_bg_type ) {
	$dynamic_css .= "body, .s-home, main.s-home, #particles-js, .home-particles, #bg, .bg-image, .bg-container { background: {$csmm_bg_solid_color} !important; background-image: none !important; }\n";
} elseif ( 'gradient' === $csmm_bg_type ) {
	if ( 'radial' === $csmm_bg_gradient_type ) {
		$grad = "radial-gradient(circle, {$csmm_bg_gradient_color1} 0%, {$csmm_bg_gradient_color2} 100%)";
	} else {
		$grad = "linear-gradient({$csmm_bg_gradient_angle}deg, {$csmm_bg_gradient_color1} 0%, {$csmm_bg_gradient_color2} 100%)";
	}
	$dynamic_css .= "body, .s-home, main.s-home, #particles-js, .home-particles, #bg, .bg-image, .bg-container { background: {$grad} !important; background-image: {$grad} !important; }\n";
} elseif ( 'pattern' === $csmm_bg_type ) {
	$pattern_css_map = array(
		'dots'      => "background-color: #0b1120 !important; background-image: radial-gradient(rgba(59, 130, 246, 0.5) 2px, transparent 2px) !important; background-size: 24px 24px !important;",
		'hexagons'  => "background-color: #0b1120 !important; background-image: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.35) 15%, transparent 16%), radial-gradient(circle at 0 0, rgba(99, 102, 241, 0.35) 15%, transparent 16%), radial-gradient(circle at 100% 0, rgba(99, 102, 241, 0.35) 15%, transparent 16%), radial-gradient(circle at 0 100%, rgba(99, 102, 241, 0.35) 15%, transparent 16%), radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.35) 15%, transparent 16%) !important; background-size: 40px 40px !important;",
		'waves'     => "background-color: #081226 !important; background-image: radial-gradient(ellipse at 50% 50%, rgba(14, 165, 233, 0.35) 0%, transparent 60%), repeating-radial-gradient(circle at 0 0, transparent 0, #081226 20px, transparent 21px, rgba(14, 165, 233, 0.25) 22px, transparent 23px) !important; background-size: 100% 100%, 60px 60px !important;",
		'triangles' => "background-color: #090e1a !important; background-image: linear-gradient(30deg, #131d33 12%, transparent 12.5%, transparent 87%, #131d33 87.5%, #131d33), linear-gradient(150deg, #131d33 12%, transparent 12.5%, transparent 87%, #131d33 87.5%, #131d33), linear-gradient(30deg, #131d33 12%, transparent 12.5%, transparent 87%, #131d33 87.5%, #131d33), linear-gradient(150deg, #131d33 12%, transparent 12.5%, transparent 87%, #131d33 87.5%, #131d33), linear-gradient(60deg, rgba(30, 58, 138, 0.35) 25%, transparent 25.5%, transparent 75%, rgba(30, 58, 138, 0.35) 75%, rgba(30, 58, 138, 0.35)), linear-gradient(60deg, rgba(30, 58, 138, 0.35) 25%, transparent 25.5%, transparent 75%, rgba(30, 58, 138, 0.35) 75%, rgba(30, 58, 138, 0.35)) !important; background-size: 80px 140px !important; background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px !important;",
		'carbon'    => "background-color: #0f1117 !important; background-image: linear-gradient(27deg, #151821 5px, transparent 5px), linear-gradient(207deg, #151821 5px, transparent 5px), linear-gradient(27deg, #1e2230 5px, transparent 5px), linear-gradient(207deg, #1e2230 5px, transparent 5px), linear-gradient(90deg, #181c27 10px, transparent 10px), linear-gradient(#1b1e2b 25%, #141722 25%, #141722 50%, transparent 50%, transparent 75%, #232838 75%, #232838) !important; background-size: 20px 20px !important;",
		'lines'     => "background-color: #0b1120 !important; background-image: repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.2) 2px, transparent 2px, transparent 16px) !important;",
		'diagonal'  => "background-color: #0b1120 !important; background-image: repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.2) 2px, transparent 2px, transparent 16px) !important;",
		'stars'     => "background-color: #030712 !important; background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.9), rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 120px, rgba(147,197,253,0.9), rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 230px 190px, #ffffff, rgba(0,0,0,0)) !important; background-size: 250px 250px !important;",
		'sakura'    => "background-color: #1a0b18 !important; background-image: radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.4) 10%, transparent 20%), radial-gradient(circle at 20% 20%, rgba(251, 113, 133, 0.35) 15%, transparent 25%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.35) 15%, transparent 25%), radial-gradient(circle at 70% 30%, rgba(244, 114, 182, 0.3) 12%, transparent 24%) !important; background-size: 100px 100px !important;",
	);
	$pat_rule = isset( $pattern_css_map[ $csmm_bg_pattern ] ) ? $pattern_css_map[ $csmm_bg_pattern ] : $pattern_css_map['waves'];
	$dynamic_css .= "body, .s-home, main.s-home, #particles-js, .home-particles, #bg, .bg-image, .bg-container { {$pat_rule} }\n";
} elseif ( 'custom' === $csmm_bg_type ) {
	$custom_img_url = '';
	if ( ! empty( $csmm_bg_custom_images ) && ! empty( $csmm_bg_custom_images[0]['url'] ) ) {
		$custom_img_url = $csmm_bg_custom_images[0]['url'];
	} elseif ( ! empty( $csmm_content['slides'] ) && ! empty( $csmm_content['slides'][0]['url'] ) ) {
		$custom_img_url = $csmm_content['slides'][0]['url'];
	}
	if ( ! empty( $custom_img_url ) ) {
		$custom_bg_url = esc_url( $custom_img_url );
		$bg_size_val = 'cover';
		if ( 'contain' === $csmm_bg_image_size ) {
			$bg_size_val = 'contain';
		} elseif ( 'auto' === $csmm_bg_image_size ) {
			$bg_size_val = 'auto';
		} elseif ( 'fill' === $csmm_bg_image_size || 'stretch' === $csmm_bg_image_size ) {
			$bg_size_val = '100% 100%';
		}
		$dynamic_css .= "body, .s-home, main.s-home, #particles-js, .home-particles, #bg, .bg-image { background-image: url('{$custom_bg_url}') !important; background-size: {$bg_size_val} !important; background-position: center center !important; background-repeat: no-repeat !important; }\n";
	}
} elseif ( 'video' === $csmm_bg_type ) {
	$dynamic_css .= "body, .s-home, main.s-home, .s-home--static, .s-home--particles, .template-one, #particles-js, .home-particles, #bg, .bg-image, .bg-container { background: transparent !important; background-color: transparent !important; background-image: none !important; }\n";
	$dynamic_css .= ".home-content, .s-home .row, .home-content__main { position: relative !important; z-index: 2 !important; }\n";
	$dynamic_css .= ".csmm-video-bg { position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; z-index: 0 !important; pointer-events: none !important; overflow: hidden !important; background-color: #000000 !important; }\n";
	$dynamic_css .= ".csmm-video-bg iframe, .csmm-video-bg video { position: absolute !important; top: 50% !important; left: 50% !important; width: 100vw !important; height: 56.25vw !important; min-height: 100vh !important; min-width: 177.77vh !important; transform: translate(-50%, -50%) !important; pointer-events: none !important; border: 0 !important; }\n";

	if ( ! empty( $csmm_bg_video_poster_url ) ) {
		$poster_url = esc_url( $csmm_bg_video_poster_url );
		$dynamic_css .= ".csmm-video-bg { background-image: url('{$poster_url}') !important; background-size: cover !important; background-position: center center !important; }\n";
	}
	if ( ! empty( $csmm_bg_video_url ) ) {
		$v_url = $csmm_bg_video_url;
		if ( 'youtube' === $csmm_bg_video_source || strpos( $v_url, 'youtube.com' ) !== false || strpos( $v_url, 'youtu.be' ) !== false ) {
			preg_match( '/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i', $v_url, $yt_matches );
			$yt_id = ! empty( $yt_matches[1] ) ? $yt_matches[1] : '';
			if ( $yt_id ) {
				$loop_param = $csmm_bg_video_loop ? '&loop=1&playlist=' . $yt_id : '&loop=0';
				$embed_src = 'https://www.youtube.com/embed/' . $yt_id . '?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1&enablejsapi=1' . $loop_param;
				$video_bg_html = '<div class="csmm-video-bg"><iframe src="' . esc_url( $embed_src ) . '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>';
			}
		} elseif ( 'vimeo' === $csmm_bg_video_source || strpos( $v_url, 'vimeo.com' ) !== false ) {
			preg_match( '/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)([0-9]+)/i', $v_url, $vm_matches );
			$vm_id = ! empty( $vm_matches[1] ) ? $vm_matches[1] : '';
			if ( $vm_id ) {
				$loop_param = $csmm_bg_video_loop ? '1' : '0';
				$embed_src = 'https://player.vimeo.com/video/' . $vm_id . '?autoplay=1&loop=' . $loop_param . '&muted=1&background=1&autopause=0';
				$video_bg_html = '<div class="csmm-video-bg"><iframe src="' . esc_url( $embed_src ) . '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>';
			}
		} else {
			$loop_attr = $csmm_bg_video_loop ? 'loop' : '';
			$video_bg_html = '<div class="csmm-video-bg"><video src="' . esc_url( $v_url ) . '" autoplay muted ' . $loop_attr . ' playsinline style="width: 100%; height: 100%; object-fit: cover;"></video></div>';
		}
	}
}

// Mobile Background Override
if ( $csmm_bg_mobile_enabled && ! empty( $csmm_bg_mobile_image_url ) ) {
	$mob_url = esc_url( $csmm_bg_mobile_image_url );
	$dynamic_css .= "@media (max-width: 768px) { body, .s-home, main.s-home, #particles-js, .home-particles, #bg, .bg-image { background-image: url('{$mob_url}') !important; background-size: cover !important; background-position: center center !important; } }\n";
}

// Background Blur
if ( $csmm_bg_blur > 0 && 'default' !== $csmm_bg_type ) {
	$dynamic_css .= ".home-content { backdrop-filter: blur({$csmm_bg_blur}px); -webkit-backdrop-filter: blur({$csmm_bg_blur}px); }\n";
}

// Custom CSS user block
if ( ! empty( $csmm_custom_css ) ) {
	$dynamic_css .= $csmm_custom_css . "\n";
}

$dynamic_css .= "</style>\n";

// Dynamic Overlay HTML if enabled
$overlay_html = '';
if ( 'default' !== $csmm_bg_type && 'none' !== $csmm_bg_overlay_type && $csmm_bg_overlay_opacity > 0 ) {
	$overlay_html = '<div class="csmm-dynamic-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: ' . esc_attr( $csmm_bg_overlay_color ) . '; opacity: ' . floatval( $csmm_bg_overlay_opacity ) . '; pointer-events: none; z-index: 1;"></div>' . "\n";
}

// Combine video background and overlay
if ( ! empty( $video_bg_html ) ) {
	$overlay_html = $video_bg_html . $overlay_html;
}

// 6. Floating Toast Notification & AJAX Subscriber Script
$subscribe_api_url = esc_url_raw( rest_url( 'csmm/v1/subscribe' ) );
$toast_and_ajax_html = '
<!-- CSMM Floating Toast Notification -->
<div id="csmm-floating-toast" style="position: fixed; bottom: 28px; right: 28px; z-index: 999999; display: flex; align-items: center; gap: 14px; background: #0f172a; color: #ffffff; padding: 14px 22px; border-radius: 12px; box-shadow: 0 12px 36px rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.15); font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; opacity: 0; transform: translateY(24px) scale(0.95); transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; max-width: 90vw;">
  <div id="csmm-toast-icon" style="width: 26px; height: 26px; border-radius: 50%; background: #10b981; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 800; flex-shrink: 0;">✓</div>
  <div id="csmm-toast-msg" style="line-height: 1.4;">' . esc_html__( 'Thank you! You have been successfully subscribed.', 'coming-soon-maintenance-mode' ) . '</div>
</div>

<script id="csmm-ajax-subscribe-script">
(function() {
  function showCsmmToast(msg, isError) {
    var toast = document.getElementById("csmm-floating-toast");
    var toastMsg = document.getElementById("csmm-toast-msg");
    var toastIcon = document.getElementById("csmm-toast-icon");
    if (!toast || !toastMsg) return;
    
    toastMsg.textContent = msg || (isError ? "Subscription failed. Please try again." : "Thank you! You have been successfully subscribed.");
    if (isError) {
      toastIcon.style.background = "#ef4444";
      toastIcon.textContent = "✕";
    } else {
      toastIcon.style.background = "#10b981";
      toastIcon.textContent = "✓";
    }
    
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0) scale(1)";
    toast.style.pointerEvents = "auto";
    
    if (window._csmmToastTimer) clearTimeout(window._csmmToastTimer);
    window._csmmToastTimer = setTimeout(function() {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(24px) scale(0.95)";
      toast.style.pointerEvents = "none";
    }, 5000);
  }

  function initCsmmAjaxForms() {
    var forms = document.querySelectorAll("#mc-form, form.group, .home-content__subscribe form, form.subscribe-form");
    if (!forms.length) {
      forms = document.querySelectorAll("form");
    }

    forms.forEach(function(form) {
      if (form.getAttribute("data-csmm-bound")) return;
      form.setAttribute("data-csmm-bound", "true");

      var emailInput = form.querySelector("input[type=\'email\'], input#csmm-email, input[name=\'csmm-email\']");
      if (!emailInput) return;

      form.addEventListener("submit", function(e) {
        e.preventDefault();
        e.stopPropagation();

        var emailVal = (emailInput.value || "").trim();
        if (!emailVal || !emailVal.includes("@")) {
          showCsmmToast("Please enter a valid email address.", true);
          return false;
        }

        var submitBtn = form.querySelector("input[type=\'submit\'], button[type=\'submit\'], input[name=\'subscribe\']");
        var origBtnText = submitBtn ? (submitBtn.value || submitBtn.textContent) : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          if (submitBtn.tagName === "INPUT") submitBtn.value = "Subscribing...";
          else submitBtn.textContent = "Subscribing...";
        }

        fetch("' . $subscribe_api_url . '", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: emailVal,
            referer: window.location.href
          })
        })
        .then(function(res) {
          return res.json().then(function(data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function(result) {
          if (result.ok && result.data && result.data.success) {
            showCsmmToast(result.data.message || "Thank you! You have been successfully subscribed.", false);
            emailInput.value = "";
          } else {
            var err = (result.data && result.data.message) ? result.data.message : "You are already subscribed or could not subscribe.";
            showCsmmToast(err, true);
          }
        })
        .catch(function(err) {
          showCsmmToast("Subscription request failed. Please check your connection.", true);
        })
        .finally(function() {
          if (submitBtn) {
            submitBtn.disabled = false;
            if (submitBtn.tagName === "INPUT") submitBtn.value = origBtnText;
            else submitBtn.textContent = origBtnText;
          }
        });

        return false;
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCsmmAjaxForms);
  } else {
    initCsmmAjaxForms();
  }
})();
</script>
';

// 7. Inject Dynamic CSS, Overlay, Toast and SEO Meta into output HTML
if ( preg_match( '/<\/head>/i', $html ) ) {
	$html = preg_replace( '/<\/head>/i', $dynamic_css . '</head>', $html, 1 );
}
if ( ! empty( $overlay_html ) && preg_match( '/<body[^>]*>/i', $html ) ) {
	$html = preg_replace( '/(<body[^>]*>)/i', '$1' . "\n" . $overlay_html, $html, 1 );
}
if ( preg_match( '/<\/body>/i', $html ) ) {
	$html = preg_replace( '/<\/body>/i', $toast_and_ajax_html . '</body>', $html, 1 );
} else {
	$html .= $toast_and_ajax_html;
}

// 8. Inject SEO & Social meta tags into <head>
ob_start();
CSMM_SEO::render_meta_tags( $csmm_content, $csmm_settings, $csmm_seo );
$seo_meta = ob_get_clean();

if ( preg_match( '/<head[^>]*>/i', $html ) ) {
	$html = preg_replace( '/(<head[^>]*>)/i', '$1' . "\n" . $seo_meta, $html, 1 );
}

echo $html;