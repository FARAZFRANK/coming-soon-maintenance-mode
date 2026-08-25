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
$csmm_logo_id             = isset( $csmm_content['logo'] ) ? $csmm_content['logo'] : '1';
$csmm_logo_text           = isset( $csmm_content['logo_text'] ) && '' !== $csmm_content['logo_text'] ? $csmm_content['logo_text'] : ( isset( $csmm_content['title'] ) ? $csmm_content['title'] : get_bloginfo('name') );
$csmm_logo_link           = isset( $csmm_content['logo_link'] ) ? $csmm_content['logo_link'] : '';
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

// Graphic Background Settings
$csmm_bg_type             = isset( $csmm_content['bg_type'] ) ? $csmm_content['bg_type'] : 'default';
$csmm_bg_custom_images    = isset( $csmm_content['bg_custom_images'] ) && is_array( $csmm_content['bg_custom_images'] ) ? $csmm_content['bg_custom_images'] : array();
$csmm_bg_mobile_enabled   = ! empty( $csmm_content['bg_mobile_enabled'] );
$csmm_bg_mobile_image_url = isset( $csmm_content['bg_mobile_image_url'] ) ? $csmm_content['bg_mobile_image_url'] : '';
$csmm_bg_video_source     = isset( $csmm_content['bg_video_source'] ) ? $csmm_content['bg_video_source'] : 'youtube';
$csmm_bg_video_url        = isset( $csmm_content['bg_video_url'] ) ? $csmm_content['bg_video_url'] : $csmm_video_url;
$csmm_bg_video_loop       = ! isset( $csmm_content['bg_video_loop'] ) || ! empty( $csmm_content['bg_video_loop'] );
$csmm_bg_video_poster_url = isset( $csmm_content['bg_video_poster_url'] ) ? $csmm_content['bg_video_poster_url'] : '';
$csmm_bg_pattern          = isset( $csmm_content['bg_pattern'] ) ? $csmm_content['bg_pattern'] : 'sakura';
$csmm_bg_solid_color      = isset( $csmm_content['bg_solid_color'] ) ? $csmm_content['bg_solid_color'] : '#e2e8f0';
$csmm_bg_gradient_type    = isset( $csmm_content['bg_gradient_type'] ) ? $csmm_content['bg_gradient_type'] : 'linear';
$csmm_bg_gradient_color1  = isset( $csmm_content['bg_gradient_color1'] ) ? $csmm_content['bg_gradient_color1'] : '#1e3a8a';
$csmm_bg_gradient_color2  = isset( $csmm_content['bg_gradient_color2'] ) ? $csmm_content['bg_gradient_color2'] : '#0f172a';
$csmm_bg_gradient_angle   = isset( $csmm_content['bg_gradient_angle'] ) ? intval( $csmm_content['bg_gradient_angle'] ) : 135;
$csmm_bg_overlay_type     = isset( $csmm_content['bg_overlay_type'] ) ? $csmm_content['bg_overlay_type'] : 'solid';
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
if ( 'disabled' === $csmm_logo_type ) {
	$html = preg_replace( '/<div class="home-logo">.*?<\/div>/is', '', $html );
} elseif ( 'text' === $csmm_logo_type ) {
	$logo_href = ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) );
	$text_logo_html = '<div class="home-logo csmm-text-logo"><a href="' . $logo_href . '" style="font-family: inherit; font-size: 2.2rem; font-weight: 800; color: #ffffff; text-decoration: none; display: inline-block; letter-spacing: -0.02em;">' . esc_html( $csmm_logo_text ) . '</a></div>';
	$html = preg_replace( '/<div class="home-logo">.*?<\/div>/is', $text_logo_html, $html, 1 );
} else {
	// Graphic logo: apply custom link if set
	if ( ! empty( $csmm_logo_link ) ) {
		$html = preg_replace( '/<div class="home-logo">\s*<a href="[^"]*">/i', '<div class="home-logo"><a href="' . esc_url( $csmm_logo_link ) . '">', $html, 1 );
	}
}

// 3. Process Description for Rich HTML, Shortcodes, and WordPress Embeds
if ( ! empty( $csmm_description ) ) {
	$processed_desc = do_shortcode( wpautop( stripslashes( $csmm_description ) ) );
	// Replace the first <p>...</p> following <h1> with processed description
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

// Logo height constraint
if ( 'graphic' === $csmm_logo_type && $csmm_logo_height_enabled && $csmm_logo_height > 0 ) {
	$dynamic_css .= ".home-logo img { max-height: {$csmm_logo_height}px !important; height: auto !important; width: auto !important; }\n";
}

// Countdown & Subscriber Form toggles
if ( '0' === strval( $csmm_countdown ) ) {
	$dynamic_css .= ".home-content__counter, .home-content__clock { display: none !important; }\n";
}
if ( '0' === strval( $csmm_susbcriber_form ) ) {
	$dynamic_css .= ".home-content__subscribe, #mc-form { display: none !important; }\n";
}

// Subscriber Form Input & Button Styling
$dynamic_css .= ".home-content__subscribe input[type=\"email\"], #mc-form input[type=\"email\"], input#csmm-email { background: {$csmm_form_input_bg} !important; background-color: {$csmm_form_input_bg} !important; color: {$csmm_form_input_color} !important; border-radius: {$csmm_form_border_radius}px !important; }\n";
$dynamic_css .= ".home-content__subscribe input[type=\"email\"]::placeholder, #mc-form input[type=\"email\"]::placeholder, input#csmm-email::placeholder { color: {$csmm_form_input_color} !important; opacity: 0.8 !important; }\n";
$dynamic_css .= ".home-content__subscribe input[type=\"submit\"], #mc-form input[type=\"submit\"], .home-content__subscribe button, #mc-form button, input[name=\"subscribe\"] { background: {$csmm_form_btn_bg} !important; background-color: {$csmm_form_btn_bg} !important; color: {$csmm_form_btn_color} !important; border-radius: {$csmm_form_border_radius}px !important; border-color: {$csmm_form_btn_bg} !important; }\n";

// Graphic Background Types
if ( 'solid' === $csmm_bg_type ) {
	$dynamic_css .= "body, .s-home, main.s-home, #particles-js, .home-particles { background: {$csmm_bg_solid_color} !important; background-image: none !important; }\n";
} elseif ( 'gradient' === $csmm_bg_type ) {
	if ( 'radial' === $csmm_bg_gradient_type ) {
		$grad = "radial-gradient(circle, {$csmm_bg_gradient_color1} 0%, {$csmm_bg_gradient_color2} 100%)";
	} else {
		$grad = "linear-gradient({$csmm_bg_gradient_angle}deg, {$csmm_bg_gradient_color1} 0%, {$csmm_bg_gradient_color2} 100%)";
	}
	$dynamic_css .= "body, .s-home, main.s-home, #particles-js, .home-particles { background: {$grad} !important; background-image: {$grad} !important; }\n";
} elseif ( 'pattern' === $csmm_bg_type ) {
	$pattern_css_map = array(
		'dots'      => "background-color: #0f172a !important; background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px) !important; background-size: 24px 24px !important;",
		'hexagons'  => "background-color: #0f172a !important; background-image: radial-gradient(circle at 100% 150%, #1e293b 24%, #0f172a 25%, #0f172a 28%, #1e293b 29%, #1e293b 36%, #0f172a 36%, #0f172a 40%, transparent 40%, transparent) !important; background-size: 30px 30px !important;",
		'waves'     => "background: linear-gradient(135deg, #0f172a 25%, transparent 25%) -50px 0, linear-gradient(225deg, #0f172a 25%, transparent 25%) -50px 0, linear-gradient(315deg, #0f172a 25%, transparent 25%), linear-gradient(45deg, #0f172a 25%, transparent 25%) !important; background-size: 100px 100px !important; background-color: #1e293b !important;",
		'carbon'    => "background: linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px, linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px, linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px, linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px, linear-gradient(90deg, #1b1b1b 10px, transparent 10px), linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424) !important; background-size: 20px 20px !important; background-color: #131313 !important;",
		'diagonal'  => "background: repeating-linear-gradient(45deg, #0f172a, #0f172a 10px, #1e293b 10px, #1e293b 20px) !important;",
		'stars'     => "background-color: #050814 !important; background-image: radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px), radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px) !important; background-size: 550px 550px, 350px 350px, 250px 250px !important;",
		'sakura'    => "background-color: #0f172a !important; background-image: radial-gradient(ellipse at center, rgba(13,59,76,0.3) 0%, rgba(13,59,76,0.8) 100%) !important;",
	);
	$pat_rule = isset( $pattern_css_map[ $csmm_bg_pattern ] ) ? $pattern_css_map[ $csmm_bg_pattern ] : $pattern_css_map['sakura'];
	$dynamic_css .= "body, .s-home, main.s-home, #particles-js, .home-particles { {$pat_rule} }\n";
} elseif ( 'custom' === $csmm_bg_type && ! empty( $csmm_bg_custom_images ) && ! empty( $csmm_bg_custom_images[0]['url'] ) ) {
	$custom_bg_url = esc_url( $csmm_bg_custom_images[0]['url'] );
	$dynamic_css .= "body, .s-home, main.s-home, #particles-js, .home-particles { background-image: url('{$custom_bg_url}') !important; background-size: cover !important; background-position: center center !important; }\n";
}

// Mobile Background Override
if ( $csmm_bg_mobile_enabled && ! empty( $csmm_bg_mobile_image_url ) ) {
	$mob_url = esc_url( $csmm_bg_mobile_image_url );
	$dynamic_css .= "@media (max-width: 768px) { body, .s-home, main.s-home, #particles-js, .home-particles { background-image: url('{$mob_url}') !important; background-size: cover !important; background-position: center center !important; } }\n";
}

// Background Blur
if ( $csmm_bg_blur > 0 ) {
	$dynamic_css .= ".home-content { backdrop-filter: blur({$csmm_bg_blur}px); -webkit-backdrop-filter: blur({$csmm_bg_blur}px); }\n";
}

// Custom CSS user block
if ( ! empty( $csmm_custom_css ) ) {
	$dynamic_css .= $csmm_custom_css . "\n";
}

$dynamic_css .= "</style>\n";

// Dynamic Overlay HTML if enabled
$overlay_html = '';
if ( 'none' !== $csmm_bg_overlay_type && $csmm_bg_overlay_opacity > 0 ) {
	$overlay_html = '<div class="csmm-dynamic-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: ' . esc_attr( $csmm_bg_overlay_color ) . '; opacity: ' . floatval( $csmm_bg_overlay_opacity ) . '; pointer-events: none; z-index: 1;"></div>' . "\n";
}

// 5. Inject Dynamic CSS & Overlay into output HTML
if ( preg_match( '/<\/head>/i', $html ) ) {
	$html = preg_replace( '/<\/head>/i', $dynamic_css . '</head>', $html, 1 );
}
if ( ! empty( $overlay_html ) && preg_match( '/<body[^>]*>/i', $html ) ) {
	$html = preg_replace( '/(<body[^>]*>)/i', '$1' . "\n" . $overlay_html, $html, 1 );
}

// 6. Inject SEO & Social meta tags into <head>
ob_start();
CSMM_SEO::render_meta_tags( $csmm_content, $csmm_settings, $csmm_seo );
$seo_meta = ob_get_clean();

if ( preg_match( '/<head[^>]*>/i', $html ) ) {
	$html = preg_replace( '/(<head[^>]*>)/i', '$1' . "\n" . $seo_meta, $html, 1 );
}

echo $html;