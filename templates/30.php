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
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/30.css' ); ?>">
	<link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'admin/assets/fontawesome-free-6.2.1-web/css/all.min.css' ); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Nunito+Sans:wght@300;400;600&display=swap" rel="stylesheet">
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
	<div class="background-pattern"></div>
	
	<main class="min-h-screen flex items-center justify-center p-4">
        <div class="main-content w-full max-w-3xl text-center rounded-lg p-8 md:p-12">
            
			<!-- Logo -->
			<?php if($csmm_logo_id) { ?>
			<div class="mb-6 flex justify-center">
			  <a href="<?php echo ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) ); ?>">
				<img class="h-10 w-auto" src="<?php echo esc_url($csmm_logo_url[0]); ?>" alt="<?php echo esc_attr($csmm_logo_alt); ?>">
			  </a>
			</div>
			<?php } else { ?>
            <div class="mb-4">
                <svg class="h-12 w-12 md:h-16 md:w-16 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#38A169" stroke-width="2"/>
                    <path d="M12 6V12L16 14" stroke="#2C5282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
			<?php } ?>

            <!-- Headline -->
            <h1 class="title-font text-4xl md:text-5xl mb-2">
                <?php if($csmm_title != "") { echo esc_html( $csmm_title ); } ?>
            </h1>
            <p class="text-lg md:text-xl font-light text-gray-600"><?php esc_html_e( "A new standard of compassionate care is coming to our community.", 'coming-soon-maintenance-mode' ); ?></p>
            
            <div class="divider"></div>

            <p class="healthcare-desc text-gray-600 max-w-xl mx-auto leading-relaxed" style="margin-top: 1rem !important; margin-bottom: 3rem !important; line-height: 1.8 !important;">
                <?php if($csmm_description != "") { echo esc_textarea( stripslashes( $csmm_description ) ); } ?>
            </p>

            <!-- Countdown Timer -->
			<?php if($csmm_countdown == 1) { ?>
            <div id="countdown" class="grid grid-cols-4 gap-4 w-full max-w-lg mx-auto" style="margin-top: 1.5rem !important; margin-bottom: 2.75rem !important;">
                <div>
                    <div id="days" class="countdown-number text-3xl md:text-5xl">00</div>
                    <div class="countdown-label mt-2"><?php esc_html_e( "Days", 'coming-soon-maintenance-mode' ); ?></div>
                </div>
                <div>
                    <div id="hours" class="countdown-number text-3xl md:text-5xl">00</div>
                    <div class="countdown-label mt-2"><?php esc_html_e( "Hours", 'coming-soon-maintenance-mode' ); ?></div>
                </div>
                <div>
                    <div id="minutes" class="countdown-number text-3xl md:text-5xl">00</div>
                    <div class="countdown-label mt-2"><?php esc_html_e( "Mins", 'coming-soon-maintenance-mode' ); ?></div>
                </div>
                <div>
                    <div id="seconds" class="countdown-number text-3xl md:text-5xl">00</div>
                    <div class="countdown-label mt-2"><?php esc_html_e( "Secs", 'coming-soon-maintenance-mode' ); ?></div>
                </div>
            </div>
			<?php } ?>

            <!-- Subscription Form -->
            <div class="w-full max-w-lg mx-auto text-center mb-10">
                <p class="mb-3 font-semibold text-gray-700"><?php echo ! empty( $csmm_form_headline ) ? esc_html( $csmm_form_headline ) : esc_html__( "Receive updates and opening day information.", 'coming-soon-maintenance-mode' ); ?></p>
                <form id="subscribe-form" method="post" class="flex flex-col sm:flex-row gap-3">
                    <input type="email" id="csmm-email" name="csmm-email" placeholder="Enter your email address" class="subscribe-input flex-grow p-3 rounded-md focus:outline-none text-center" required>
                    <input type="hidden" id="csmm-email-nonce" name="csmm-email-nonce" value="<?php echo esc_attr( wp_create_nonce( 'csmm-email-nonce' ) ); ?>">
					<button type="submit" class="subscribe-btn py-3 px-6 rounded-md"><?php esc_html_e( "Keep Me Informed", 'coming-soon-maintenance-mode' ); ?></button>
                </form>
                <p id="success-message" class="mt-3 text-sm text-green-700 hidden"><?php esc_html_e( "Thank you. We will keep you updated.", 'coming-soon-maintenance-mode' ); ?></p>
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
            
            <!-- Social Media Icons -->
            <div class="flex justify-center space-x-6">
				<ul class="home-social">
					<?php if(empty($csmm_sm_facebook) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_facebook); ?>" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_twitter) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_twitter); ?>" target="_blank"><i class="fa-brands fa-twitter" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_youtube) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_youtube); ?>" target="_blank"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_instagram) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_instagram); ?>" target="_blank"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_linkedin) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_linkedin); ?>" target="_blank"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_pinterest) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_pinterest); ?>" target="_blank"><i class="fa-brands fa-pinterest" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_tumblr) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_tumblr); ?>" target="_blank"><i class="fa-brands fa-tumblr" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_snapchat) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_snapchat); ?>" target="_blank"><i class="fa-brands fa-snapchat" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_behance) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_behance); ?>" target="_blank"><i class="fa-brands fa-behance" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_dribbble) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_dribbble); ?>" target="_blank"><i class="fa-brands fa-dribbble" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_whatsapp) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_whatsapp); ?>" target="_blank"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_tiktok) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_tiktok); ?>" target="_blank"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a></li>
					<?php } ?>
					<?php if(empty($csmm_sm_qq) == false) { ?>
					<li><a href="<?php echo esc_url($csmm_sm_qq); ?>" target="_blank"><i class="fa-brands fa-qq" aria-hidden="true"></i></a></li>
					<?php } ?>
				</ul> <!-- end home-social -->
			</div>
        </div>
    </main>

	<!-- Java Script
    ================================================== -->
    <?php
    // Javascript
    $csmm_include_url = includes_url();
    $csmm_last = $csmm_include_url[strlen($csmm_include_url) - 1];
    if ($csmm_last != '/') {
        $csmm_include_url = $csmm_include_url . '/';
    }
    ?>
    <script src="<?php echo esc_url($csmm_include_url); ?>js/jquery/jquery.min.js"></script>
    <script src="<?php echo esc_url(CSMM_URL.'templates/js/plugins.js'); ?>"></script>

    

</body>
</html>
