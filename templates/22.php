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
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/22.css' ); ?>">
	<link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'admin/assets/fontawesome-free-6.2.1-web/css/all.min.css' ); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <style><?php echo $csmm_custom_css; ?></style>
    <!-- script
    ================================================== -->
   <script src="https://cdn.tailwindcss.com"></script>
    <!-- favicons
    ================================================== -->
    <link rel="shortcut icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
	<link rel="icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
   
</head>
<body class="text-gray-800">

    <div class="background-shapes">
        <div class="shape shape1"></div>
        <div class="shape shape2"></div>
        <div class="shape shape3"></div>
        <div class="shape shape4"></div>
        <div class="shape shape5"></div>
    </div>

    <div class="main-content container mx-auto px-4 flex flex-col items-center justify-center min-h-screen relative z-10 py-12">

        <!-- Header -->
        <header class="text-center mb-8 md:mb-12">
            <!-- Logo -->
            <?php if($csmm_logo_id) { ?>
			<div class="mb-6 flex justify-center">
			  <a href="<?php echo ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) ); ?>">
				<img class="h-10 w-auto" src="<?php echo esc_url($csmm_logo_url[0]); ?>" alt="<?php echo esc_attr($csmm_logo_alt); ?>">
			  </a>
			</div>
			<?php } else { ?>
			<div class="mb-4">
                <svg class="h-16 w-16 md:h-20 md:w-20 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#007AFF" stroke-width="1.5"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M9 9.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5S9 10.329 9 9.5z" fill="#007AFF"/>
                    <path d="M13.5 9.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5z" fill="#007AFF"/>
                </svg>
            </div>
			<?php } ?>
            <h1 class="title-font text-4xl md:text-6xl font-bold"><span class="highlight"><?php if($csmm_title != "") { echo esc_html( $csmm_title ); } ?></span></h1>
            <p class="text-lg md:text-xl font-light text-gray-600 mt-4 max-w-3xl mx-auto"><?php if($csmm_description != "") { echo esc_textarea( stripslashes( $csmm_description ) ); } ?></p>
        </header>

        <!-- Countdown Timer -->
		<?php if($csmm_countdown == 1) { ?>
        <div id="countdown" class="grid grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16 text-center w-full max-w-2xl">
            <div class="countdown-box p-4 rounded-lg">
                <div id="days" class="countdown-number text-4xl md:text-6xl font-bold">00</div>
                <div class="countdown-label text-sm md:text-base"><?php esc_html_e( "Days", 'coming-soon-maintenance-mode' ); ?></div>
            </div>
            <div class="countdown-box p-4 rounded-lg">
                <div id="hours" class="countdown-number text-4xl md:text-6xl font-bold">00</div>
                <div class="countdown-label text-sm md:text-base"><?php esc_html_e( "Hours", 'coming-soon-maintenance-mode' ); ?></div>
            </div>
            <div class="countdown-box p-4 rounded-lg">
                <div id="minutes" class="countdown-number text-4xl md:text-6xl font-bold">00</div>
                <div class="countdown-label text-sm md:text-base"><?php esc_html_e( "Minutes", 'coming-soon-maintenance-mode' ); ?></div>
            </div>
            <div class="countdown-box p-4 rounded-lg">
                <div id="seconds" class="countdown-number text-4xl md:text-6xl font-bold">00</div>
                <div class="countdown-label text-sm md:text-base"><?php esc_html_e( "Seconds", 'coming-soon-maintenance-mode' ); ?></div>
            </div>
        </div>
		<?php } ?>

        <!-- Features Section -->
        <div class="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-16">
            <div class="feature-box">
                <div class="feature-icon">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h3 class="title-font font-semibold text-lg mb-2"><?php esc_html_e( "Expert-Led Courses", 'coming-soon-maintenance-mode' ); ?></h3>
                <p class="text-gray-600 text-sm"><?php esc_html_e( "Learn from industry professionals and certified experts.", 'coming-soon-maintenance-mode' ); ?></p>
            </div>
            <div class="feature-box">
                <div class="feature-icon">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                </div>
                <h3 class="title-font font-semibold text-lg mb-2"><?php esc_html_e( "Interactive Learning", 'coming-soon-maintenance-mode' ); ?></h3>
                <p class="text-gray-600 text-sm"><?php esc_html_e( "Engage with quizzes, projects, and hands-on activities.", 'coming-soon-maintenance-mode' ); ?></p>
            </div>
            <div class="feature-box">
                <div class="feature-icon">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h3 class="title-font font-semibold text-lg mb-2"><?php esc_html_e( "Community Support", 'coming-soon-maintenance-mode' ); ?></h3>
                <p class="text-gray-600 text-sm"><?php esc_html_e( "Connect with peers and mentors in our vibrant community.", 'coming-soon-maintenance-mode' ); ?></p>
            </div>
        </div>

        <!-- Subscription Form -->
        <div class="w-full max-w-lg text-center">
            <p class="mb-4 text-lg text-gray-700 font-semibold"><?php esc_html_e( "Get notified when we launch!", 'coming-soon-maintenance-mode' ); ?></p>
            <form id="subscribe-form" method="post" class="flex flex-col sm:flex-row gap-3">
                <input type="email" id="csmm-email" name="csmm-email" placeholder="<?php esc_attr_e( 'Enter your email address', 'coming-soon-maintenance-mode' ); ?>" class="subscribe-input flex-grow p-3 rounded-md focus:outline-none" required>
                <input type="hidden" id="csmm-email-nonce" name="csmm-email-nonce" value="<?php echo esc_attr( wp_create_nonce( 'csmm-email-nonce' ) ); ?>">
				<button type="submit" class="subscribe-btn py-3 px-6 rounded-md"><?php esc_html_e( "Notify Me", 'coming-soon-maintenance-mode' ); ?></button>
            </form>
            <p id="success-message" class="mt-4 text-green-600 hidden"><?php esc_html_e( "Awesome! We'll email you on launch day.", 'coming-soon-maintenance-mode' ); ?></p>
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
		<div class="flex justify-center space-x-4">
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

    <script>
          // --- Countdown Timer Logic ---
        <?php if($csmm_countdown == 1) { ?>
		// 1. (Optional) Pass these from PHP via wp_localize_script for cleaner code:
		const ajaxUrl    = location.href;
		const ajaxAction = "csmm_save";
		const ajaxNonce  = "<?php echo esc_js( wp_create_nonce('csmm-save') ); ?>";
		
		const cd = document.getElementById('countdown');
		
		// 2. Your countdown function
		const countdown = () => {
		  const launchDate = new Date('<?php echo esc_js($csmm_launch_dt); ?>').getTime();
		  const now        = Date.now();
		  const distance   = launchDate - now;

		  // FINISHED
		  if (distance < 0) {
			clearInterval(interval);
			// 3. Send your AJAX “finish” ping back to WP
			fetch(ajaxUrl, {
			  method: 'POST',
			  credentials: 'same-origin',
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			  body: new URLSearchParams({
				action:       ajaxAction,
				'tab': 'setings',
				'website_mode': 3,
				nonce:        ajaxNonce
			  })
			})
			.then(res => {
			  if (!res.ok) throw new Error(res.statusText);
			  return res.text();
			})
			.then(() => {
			  // 4. Fadeout & reload after 1s
			  cd.style.transition = 'opacity 0.5s ease';
			  cd.style.opacity    = '0';
			  setTimeout(() => location.reload(), 1000);
			})
			.catch(err => console.error('Countdown finish AJAX error:', err));

			return;
		  }

		  // TICK — update values
		  const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
		  const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		  const minutes = Math.floor((distance % (1000 * 60 * 60))      / (1000 * 60));
		  const seconds = Math.floor((distance % (1000 * 60))           / 1000);

		  document.getElementById('days').innerText    = String(days).padStart(2, '0');
		  document.getElementById('hours').innerText   = String(hours).padStart(2, '0');
		  document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
		  document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
		};

		// 5. Kick it off every second
		const interval = setInterval(countdown, 1000);

		<?php } ?>
    </script>

</body>
</html>
