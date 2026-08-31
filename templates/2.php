<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title><?php echo esc_html($csmm_title); ?></title>
    <meta name="description" content="<?php echo esc_html($csmm_description); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Monoton&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- FontAwesome -->
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'admin/assets/fontawesome-free-6.2.1-web/css/all.min.css' ); ?>">
    
    <!-- Template CSS -->
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/2.css' ); ?>">
    <style><?php echo $csmm_custom_css; ?></style>
    
    <!-- Favicon -->
    <link rel="shortcut icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
	<link rel="icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
</head>
<body class="template-two-body relative flex items-center justify-center min-h-screen p-4 text-white overflow-x-hidden bg-cover bg-center bg-no-repeat" style="background-image: url('<?php echo esc_url( CSMM_URL . 'templates/images/temp-2.webp' ); ?>');">

    <!-- Dark cinematic vignette overlay -->
    <div class="template-two-overlay fixed inset-0 z-0 pointer-events-none" style="background: radial-gradient(circle at center, rgba(10, 6, 12, 0.45) 0%, rgba(10, 6, 12, 0.85) 100%);"></div>

    <main class="template-two-content relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-10 py-10 px-4">
        
		<!-- Logo -->
		<?php if($csmm_logo_id) { ?>
		<div class="template-two-logo flex justify-center">
		  <a href="<?php echo ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) ); ?>">
			<img class="h-12 md:h-14 w-auto drop-shadow-lg" src="<?php echo esc_url($csmm_logo_url[0]); ?>" alt="<?php echo esc_attr($csmm_logo_alt); ?>">
		  </a>
		</div>
		<?php } ?>
		
        <!-- Title with Monoton Font -->
        <h1 class="template-two-title title-font">
            <?php if($csmm_title != "") { echo esc_html( $csmm_title ); } ?>
        </h1>
        
        <!-- Description / Subtitle -->
        <p class="template-two-desc desc-text">
            <?php if($csmm_description != "") { echo esc_textarea( stripslashes( $csmm_description ) ); } ?>
        </p>

        <!-- Countdown Timer -->
		<?php if($csmm_countdown == 1) { ?>
        <div class="template-two-countdown w-full max-w-md mx-auto">
            <?php if($csmm_countdown_title != "") { ?>
            <p class="countdown-title text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold mb-3"><?php echo esc_html( $csmm_countdown_title ); ?></p>
            <?php } ?>
            <div id="countdown" class="grid grid-cols-4 gap-4 text-center">
                <div class="flex flex-col items-center">
                    <div id="days" class="countdown-num text-3xl sm:text-4xl md:text-5xl font-light">00</div>
                    <div class="countdown-lbl text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1"><?php esc_html_e( "D", 'coming-soon-maintenance-mode' ); ?></div>
                </div>
                <div class="flex flex-col items-center">
                    <div id="hours" class="countdown-num text-3xl sm:text-4xl md:text-5xl font-light">00</div>
                    <div class="countdown-lbl text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1"><?php esc_html_e( "H", 'coming-soon-maintenance-mode' ); ?></div>
                </div>
                <div class="flex flex-col items-center">
                    <div id="minutes" class="countdown-num text-3xl sm:text-4xl md:text-5xl font-light">00</div>
                    <div class="countdown-lbl text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1"><?php esc_html_e( "M", 'coming-soon-maintenance-mode' ); ?></div>
                </div>
                <div class="flex flex-col items-center">
                    <div id="seconds" class="countdown-num text-3xl sm:text-4xl md:text-5xl font-light">00</div>
                    <div class="countdown-lbl text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1"><?php esc_html_e( "S", 'coming-soon-maintenance-mode' ); ?></div>
                </div>
            </div>
        </div>
		<?php } ?>

        <!-- Subscription Form -->
		<?php if($csmm_susbcriber_form == 1) { ?>
        <div class="template-two-form w-full max-w-md mx-auto">
            <form id="subscribe-form" method="post" class="flex flex-col sm:flex-row items-center justify-center w-full rounded overflow-hidden shadow-2xl">
                <input type="email" id="csmm-email" name="csmm-email" placeholder="<?php esc_attr_e( 'Email Address', 'coming-soon-maintenance-mode' ); ?>" class="subscribe-input w-full sm:flex-grow h-12 px-4 text-sm focus:outline-none" required>
                <input type="hidden" id="csmm-email-nonce" name="csmm-email-nonce" value="<?php echo esc_attr( wp_create_nonce( 'csmm-email-nonce' ) ); ?>">
				<button type="submit" class="subscribe-btn w-full sm:w-auto h-12 px-6 text-xs font-bold uppercase tracking-wider whitespace-nowrap"><?php esc_html_e( "Notify Me", 'coming-soon-maintenance-mode' ); ?></button>
            </form>
			<?php
			$csmm_flag = 0;
			if ($_SERVER["REQUEST_METHOD"] == "POST") {
				if ( sanitize_text_field( wp_unslash( isset( $_POST['csmm-email-nonce'] ) ) ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['csmm-email-nonce'] ) ), 'csmm-email-nonce' ) ) {
				   $csmm_new_subscriber = sanitize_text_field($_POST['csmm-email']);
					if(filter_var($csmm_new_subscriber, FILTER_VALIDATE_EMAIL) !== false){
						$cmss_subscriber_list = array();
						$cmss_subscriber_list = get_option('cmss_subscriber_list');
						
						if(is_array($cmss_subscriber_list) && count($cmss_subscriber_list)) {
							if(!in_array($csmm_new_subscriber, $cmss_subscriber_list)) {
								array_push($cmss_subscriber_list, $csmm_new_subscriber);
								update_option('cmss_subscriber_list', $cmss_subscriber_list);
								$csmm_flag = 1;
							}
						} else {
							update_option('cmss_subscriber_list', array($csmm_new_subscriber));
							$csmm_flag = 1;
						}
					}
				}
				if ( sanitize_text_field( wp_unslash( isset( $_POST['nonce'] ) ) ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'csmm-save' ) ) {
					update_option('csmm_settings', array('website_mode' => 3));
					wp_die();
				}
			}
			if($csmm_flag == 1 ) {
				echo '<p class="text-sm mt-3 text-green-400">' . esc_html__( 'Subscribed successfully!', 'coming-soon-maintenance-mode' ) . '</p>';
			}
			?>
        </div>
		<?php } ?>

        <!-- Social Media Icons (Centered underneath) -->
        <ul class="home-social flex flex-row items-center justify-center gap-5 mt-2">
            <?php if(empty($csmm_sm_facebook) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_facebook); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-facebook-f"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_twitter) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_twitter); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-twitter" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_youtube) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_youtube); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_instagram) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_instagram); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_linkedin) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_linkedin); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_pinterest) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_pinterest); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-pinterest" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_tumblr) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_tumblr); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-tumblr" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_snapchat) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_snapchat); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-snapchat" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_behance) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_behance); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-behance" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_dribbble) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_dribbble); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-dribbble" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_whatsapp) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_whatsapp); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_tiktok) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_tiktok); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a></li>
            <?php } ?>
            <?php if(empty($csmm_sm_qq) == false) { ?>
            <li><a href="<?php echo esc_url($csmm_sm_qq); ?>" target="_blank" class="text-gray-400 hover:text-white transition-colors text-lg"><i class="fa-brands fa-qq" aria-hidden="true"></i></a></li>
            <?php } ?>
        </ul>

    </main>

    <!-- Java Script -->
    <?php 
    $csmm_include_url = includes_url();
    $csmm_last = $csmm_include_url[strlen( $csmm_include_url )-1];
    if ( $csmm_last != '/' ) {
        $csmm_include_url = $csmm_include_url . '/';
    }
    ?>
    <script src="<?php echo esc_url($csmm_include_url); ?>js/jquery/jquery.js"></script>
    <script>
    jQuery( document ).ready(function() {
        <?php if($csmm_countdown == 1) { ?>
        const targetDate = new Date("<?php echo esc_js($csmm_launch_dt); ?>").getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const difference = targetDate - now;
            
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                
                jQuery('#days').text(String(days).padStart(2, '0'));
                jQuery('#hours').text(String(hours).padStart(2, '0'));
                jQuery('#minutes').text(String(minutes).padStart(2, '0'));
                jQuery('#seconds').text(String(seconds).padStart(2, '0'));
            } else {
                jQuery('#days').text('00');
                jQuery('#hours').text('00');
                jQuery('#minutes').text('00');
                jQuery('#seconds').text('00');
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
        <?php } ?>
    });
    </script>
</body>
</html>