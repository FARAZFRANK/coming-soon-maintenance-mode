<html lang="en">
<head>
    <!--- basic page needs
    ================================================== -->
    <meta charset="utf-8">
    <title><?php echo esc_html($csmm_title); ?></title>
    <meta name="description" content="<?php echo esc_html($csmm_description); ?>">
    <meta name="author" content="">
    <!-- mobile specific metas
    ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSS
    ================================================== -->
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/20.css' ); ?>">
	<link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'admin/assets/fontawesome-free-6.2.1-web/css/all.min.css' ); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet">
    <style><?php echo $csmm_custom_css; ?></style>
    <!-- script
    ================================================== -->
   <script src="https://cdn.tailwindcss.com"></script>
    <!-- favicons
    ================================================== -->
    <link rel="shortcut icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
	<link rel="icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
</head>
<body>

    <main class="split-layout">
        <!-- Left Side: Image -->
        <div class="image-side"></div>

        <!-- Right Side: Content -->
        <div class="content-side">
            <div class="w-full max-w-md mx-auto">
               
				<!--  Logo -->
				<?php if($csmm_logo_id) { ?>
				<div class=" mb-6">
					<a href="<?php echo ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) ); ?>">
						<img class="h-10 w-auto" src="<?php echo esc_url( $csmm_logo_url[0] ); ?>" alt="<?php echo esc_attr( $csmm_logo_alt ); ?>">
					</a>
				</div>
				<?php } ?>

                <!-- Headline -->
                <h1 class="title-font text-4xl md:text-5xl font-bold leading-tight mb-4">
                    <span class="highlight"><?php if($csmm_title != "") { echo esc_html( $csmm_title ); } ?></span>
                </h1>
                <p class="construction-desc text-gray-400 max-w-xl leading-relaxed" style="margin-bottom: 3rem !important;">
                    <?php if($csmm_description != "") { echo esc_textarea( stripslashes( $csmm_description ) ); } ?>
                </p>

                <!-- Countdown Timer -->
				<?php if($csmm_countdown == 1) { ?>
                <div id="countdown" class="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center w-full" style="margin-top: 1.5rem !important; margin-bottom: 2.5rem !important;">
                    <div class="countdown-box">
                        <div id="days" class="countdown-number text-4xl md:text-5xl">00</div>
                        <div class="countdown-label"><?php esc_html_e( "Days", 'coming-soon-maintenance-mode' ); ?></div>
                    </div>
                    <div class="countdown-box">
                        <div id="hours" class="countdown-number text-4xl md:text-5xl">00</div>
                        <div class="countdown-label"><?php esc_html_e( "Hours", 'coming-soon-maintenance-mode' ); ?></div>
                    </div>
                    <div class="countdown-box">
                        <div id="minutes" class="countdown-number text-4xl md:text-5xl">00</div>
                        <div class="countdown-label"><?php esc_html_e( "Minutes", 'coming-soon-maintenance-mode' ); ?></div>
                    </div>
                    <div class="countdown-box">
                        <div id="seconds" class="countdown-number text-4xl md:text-5xl">00</div>
                        <div class="countdown-label"><?php esc_html_e( "Seconds", 'coming-soon-maintenance-mode' ); ?></div>
                    </div>
                </div>
				<?php } ?>

                <!-- Subscription Form -->
                <div class="w-full text-left mb-10">
                    <p class="mb-3 text-gray-300 font-semibold"><?php echo ! empty( $csmm_form_headline ) ? esc_html( $csmm_form_headline ) : esc_html__( "Get project updates and launch news.", 'coming-soon-maintenance-mode' ); ?></p>
                    <form id="subscribe-form" method="post" class="flex flex-row items-center gap-3 w-full max-w-lg">
						<input type="email" id="csmm-email" name="csmm-email" placeholder="<?php esc_attr_e( 'Your email address', 'coming-soon-maintenance-mode' ); ?>" class="subscribe-input flex-grow px-4 rounded-lg focus:outline-none text-left h-[48px]" required>
                        <input type="hidden" id="csmm-email-nonce" name="csmm-email-nonce" value="<?php echo esc_attr( wp_create_nonce( 'csmm-email-nonce' ) ); ?>">
						<button type="submit" class="subscribe-btn px-6 rounded-lg whitespace-nowrap uppercase font-bold tracking-wide text-xs md:text-sm h-[48px] inline-flex items-center justify-center"><?php esc_html_e( "KEEP ME POSTED", 'coming-soon-maintenance-mode' ); ?></button>
                    </form>
                    <p id="success-message" class="mt-3 text-green-400 hidden"><?php esc_html_e( "Thanks! You're on our list.", 'coming-soon-maintenance-mode' ); ?></p>
					<?php
					$csmm_flag = 0;
					if ($_SERVER["REQUEST_METHOD"] == "POST") {
						// add new email subscriber start
						if ( sanitize_text_field( wp_unslash( isset( $_POST['csmm-email-nonce'] ) ) ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['csmm-email-nonce'] ) ), 'csmm-email-nonce' ) ) {
						   $csmm_new_subscriber = sanitize_text_field($_POST['csmm-email']);
							if(filter_var($csmm_new_subscriber, FILTER_VALIDATE_EMAIL) !== false){
								//get saved subscriber list
								$cmss_subscriber_list = array();
								$cmss_subscriber_list = get_option('cmss_subscriber_list');
								
								// if add new subscriber else  // add first subscriber to the list
								if(is_array($cmss_subscriber_list) && count($cmss_subscriber_list)) {
									//check email is already exist
									if(!in_array($csmm_new_subscriber, $cmss_subscriber_list)) {
										// append new email subscriber
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
						// add new email subscriber end
						
						// on countdown end live the site start
						if ( sanitize_text_field( wp_unslash( isset( $_POST['nonce'] ) ) ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'csmm-save' ) ) {
							update_option('csmm_settings', array('website_mode' => 3));
							wp_die(); // this is required to terminate immediately and return a proper response
						}
						// on countdown end live the site end
					}
					?>
				</div>
                
                <!-- Social Media & Footer -->
                <div class="border-t border-gray-700 pt-6 flex justify-between items-center">
                        						
					<ul class="home-social flex">
						<?php if(empty($csmm_sm_facebook) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_facebook); ?>" target="_blank"><i class="social-icon fa-brands fa-facebook-f"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_twitter) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_twitter); ?>" target="_blank"><i class="social-icon fa-brands fa-twitter" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_youtube) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_youtube); ?>" target="_blank"><i class="social-icon fa-brands fa-youtube" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_instagram) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_instagram); ?>" target="_blank"><i class="social-icon fa-brands fa-instagram" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_linkedin) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_linkedin); ?>" target="_blank"><i class="social-icon fa-brands fa-linkedin-in" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_pinterest) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_pinterest); ?>" target="_blank"><i class="social-icon fa-brands fa-pinterest" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_tumblr) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_tumblr); ?>" target="_blank"><i class="social-icon fa-brands fa-tumblr" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_snapchat) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_snapchat); ?>" target="_blank"><i class="social-icon fa-brands fa-snapchat" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_behance) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_behance); ?>" target="_blank"><i class="social-icon fa-brands fa-behance" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_dribbble) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_dribbble); ?>" target="_blank"><i class="social-icon fa-brands fa-dribbble" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_whatsapp) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_whatsapp); ?>" target="_blank"><i class="social-icon fa-brands fa-whatsapp" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_tiktok) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_tiktok); ?>" target="_blank"><i class="social-icon fa-brands fa-tiktok" aria-hidden="true"></i></a></li>
						<?php } ?>
						<?php if(empty($csmm_sm_qq) == false) { ?>
						<li><a href="<?php echo esc_url($csmm_sm_qq); ?>" target="_blank"><i class="social-icon fa-brands fa-qq" aria-hidden="true"></i></a></li>
						<?php } ?>
					</ul> <!-- end home-social -->

                </div>
				
            </div>
        </div>
    </main>

    

</body>
</html>
