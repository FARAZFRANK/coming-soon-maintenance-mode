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
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/25.css' ); ?>">
	<link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'admin/assets/fontawesome-free-6.2.1-web/css/all.min.css' ); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@300;400&display=swap" rel="stylesheet">
    <style><?php echo $csmm_custom_css; ?></style>
    <!-- script
    ================================================== -->
   <script src="https://cdn.tailwindcss.com"></script>
    <!-- favicons
    ================================================== -->
    <link rel="shortcut icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
	<link rel="icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
   
</head>

<body class="text-gray-200">

    <div class="background-image"></div>
    <div class="overlay"></div>

    <div class="main-content container mx-auto px-4 flex flex-col items-center justify-center min-h-screen relative z-10 py-12">

        <!-- Header -->
        <header class="text-center mb-8 md:mb-10">
            <!-- Logo -->
			<?php if($csmm_logo_id) { ?>
			<div class="mb-6 flex justify-center">
			  <a href="<?php echo ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) ); ?>">
				<img class="h-10 w-auto" src="<?php echo esc_url($csmm_logo_url[0]); ?>" alt="<?php echo esc_attr($csmm_logo_alt); ?>">
			  </a>
			</div>
			<?php } else { ?>
            <div class="mb-4">
                <svg class="h-16 w-16 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D4A762">
                    <path d="M16.2,12.8c-0.3-0.2-0.6-0.3-1-0.3c-0.8,0-1.5,0.3-2.1,0.8c-0.6,0.5-0.9,1.3-0.9,2.1c0,0.8,0.3,1.5,0.8,2.1 c0.5,0.6,1.2,0.9,2.1,0.9c0.8,0,1.5-0.3,2.1-0.8c0.6-0.5,0.9-1.3,0.9-2.1c0-0.5-0.1-1-0.4-1.4C17.3,13.6,16.8,13.1,16.2,12.8z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8 S16.4,20,12,20z M18,10h-4V4h-4v6H6l6,6L18,10z"/>
                </svg>
            </div>
			<?php } ?>
            <h1 class="title-font text-5xl md:text-7xl font-bold mb-2"><?php if($csmm_title != "") { echo esc_html( $csmm_title ); } ?></h1>
            <p class="text-lg md:text-xl font-light text-gray-300 tracking-wide mb-4"><?php esc_html_e( "Something delicious is coming your way.", 'coming-soon-maintenance-mode' ); ?></p>
            <!-- Brand Info -->
            <p class="max-w-2xl mx-auto text-base text-gray-400">
                <?php if($csmm_description != "") { echo esc_textarea( stripslashes( $csmm_description ) ); } ?>
            </p>
        </header>

        <!-- Countdown Timer -->
		<?php if($csmm_countdown == 1) { ?>
        <div id="countdown" class="grid grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-10 text-center w-full max-w-2xl">
            <div class="countdown-box p-4 md:p-6 rounded-lg">
                <div id="days" class="countdown-number text-4xl md:text-6xl font-bold">00</div>
                <div class="text-sm md:text-base font-light text-gray-400"><?php esc_html_e( "Days", 'coming-soon-maintenance-mode' ); ?></div>
            </div>
            <div class="countdown-box p-4 md:p-6 rounded-lg">
                <div id="hours" class="countdown-number text-4xl md:text-6xl font-bold">00</div>
                <div class="text-sm md:text-base font-light text-gray-400"><?php esc_html_e( "Hours", 'coming-soon-maintenance-mode' ); ?></div>
            </div>
            <div class="countdown-box p-4 md:p-6 rounded-lg">
                <div id="minutes" class="countdown-number text-4xl md:text-6xl font-bold">00</div>
                <div class="text-sm md:text-base font-light text-gray-400"><?php esc_html_e( "Minutes", 'coming-soon-maintenance-mode' ); ?></div>
            </div>
            <div class="countdown-box p-4 md:p-6 rounded-lg">
                <div id="seconds" class="countdown-number text-4xl md:text-6xl font-bold">00</div>
                <div class="text-sm md:text-base font-light text-gray-400"><?php esc_html_e( "Seconds", 'coming-soon-maintenance-mode' ); ?></div>
            </div>
        </div>
		<?php } ?>

            <?php if($csmm_susbcriber_form == 1) { ?>
        <!-- Subscription Form -->
        <div class="w-full max-w-lg text-center mb-8">
            <p class="mb-4 text-lg text-gray-200"><?php echo ! empty( $csmm_form_headline ) ? esc_html( $csmm_form_headline ) : esc_html__( "Be the first to get opening day reservations.", 'coming-soon-maintenance-mode' ); ?></p>
            <form id="subscribe-form" method="post" class="flex flex-col sm:flex-row gap-4">
                <input type="email" id="csmm-email" name="csmm-email" placeholder="Enter your email address" class="subscribe-input flex-grow p-4 rounded-lg focus:outline-none" required>
                <input type="hidden" id="csmm-email-nonce" name="csmm-email-nonce" value="<?php echo esc_attr( wp_create_nonce( 'csmm-email-nonce' ) ); ?>">
				<button type="submit" class="subscribe-btn font-bold py-4 px-8 rounded-lg"><?php esc_html_e( "Notify Me", 'coming-soon-maintenance-mode' ); ?></button>
            </form>
			
            <p id="success-message" class="mt-4 text-green-400 hidden"><?php esc_html_e( "Thank you! We'll be in touch soon.", 'coming-soon-maintenance-mode' ); ?></p>
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
									if ( class_exists( 'CSMM_Subscribers' ) ) { CSMM_Subscribers::add_subscriber( $csmm_new_subscriber ); }
									$csmm_flag = 1;
							}
						} else {
							update_option('cmss_subscriber_list', array($csmm_new_subscriber));
									if ( class_exists( 'CSMM_Subscribers' ) ) { CSMM_Subscribers::add_subscriber( $csmm_new_subscriber ); }
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
            <?php } ?>

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

    

</body>
</html>
