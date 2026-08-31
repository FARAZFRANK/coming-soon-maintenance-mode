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
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/21.css' ); ?>">
	<link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'admin/assets/fontawesome-free-6.2.1-web/css/all.min.css' ); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	 <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Bebas+Neue&display=swap" rel="stylesheet">
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
    <div class="blueprint-bg"></div>
    
    <!-- Decorative SVG elements -->
    <svg class="blueprint-element element1" width="199" height="204" viewBox="0 0 199 204" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M198.5 102C198.5 157.737 154.026 203 99.5 203C44.9741 203 0.5 157.737 0.5 102C0.5 46.2631 44.9741 1 99.5 1C154.026 1 198.5 46.2631 198.5 102Z" stroke-opacity="0.5" stroke-width="2"/>
        <path d="M165.5 102C165.5 138.632 135.921 169 99.5 169C63.0786 169 33.5 138.632 33.5 102C33.5 65.3675 63.0786 35 99.5 35C135.921 35 165.5 65.3675 165.5 102Z" stroke-opacity="0.5" stroke-width="2"/>
        <line x1="99" y1="1" x2="99" y2="203" stroke-opacity="0.5" stroke-width="2"/>
        <line x1="1" y1="102" x2="198" y2="102" stroke-opacity="0.5" stroke-width="2"/>
    </svg>
    <svg class="blueprint-element element2" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="198" height="198" stroke-opacity="0.5" stroke-width="2"/>
        <rect x="35" y="35" width="130" height="130" stroke-opacity="0.5" stroke-width="2"/>
        <line x1="1" y1="1" x2="199" y2="199" stroke-opacity="0.5" stroke-width="2"/>
        <line x1="199" y1="1" x2="1" y2="199" stroke-opacity="0.5" stroke-width="2"/>
    </svg>

    <main class="min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div class="main-content w-full max-w-4xl p-8 sm:p-12 text-center rounded-lg">
            
            <!--  Logo -->
			<?php if($csmm_logo_id) { ?>
			<div class="template-logo mb-6 flex justify-center">
			  <a href="<?php echo ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) ); ?>">
				<img class="h-10 w-auto" src="<?php echo esc_url($csmm_logo_url[0]); ?>" alt="<?php echo esc_attr($csmm_logo_alt); ?>">
			  </a>
			</div>
			<?php } ?>
            
            <hr class="hr-line mx-auto my-6">

            <!-- Headline -->
            <h1 class="title-font text-4xl md:text-6xl text-white my-6">
				<span class="highlight"><?php if($csmm_title != "") { echo esc_html( $csmm_title ); } ?></span>
            </h1>
            <p class="blueprint-desc text-gray-400 max-w-2xl mx-auto leading-relaxed" style="margin-bottom: 3rem !important;">
				<?php if($csmm_description != "") { echo esc_textarea( stripslashes( $csmm_description ) ); } ?>
            </p>

            <!-- Countdown Timer -->
				<?php if($csmm_countdown == 1) { ?>
                <div id="countdown" class="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-lg mx-auto text-left" style="margin-top: 1.5rem !important; margin-bottom: 2.5rem !important;">
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
            <div class="w-full max-w-lg mx-auto text-center mb-6">
                <p class="form-label mb-3 font-semibold text-gray-200"><?php echo ! empty( $csmm_form_headline ) ? esc_html( $csmm_form_headline ) : esc_html__( "Get the project blueprints first.", 'coming-soon-maintenance-mode' ); ?></p>
                <form id="subscribe-form" method="post" class="flex flex-row items-center justify-center gap-3 w-full">
                    <input type="email" id="csmm-email" name="csmm-email" placeholder="<?php esc_attr_e( 'Enter your email for updates', 'coming-soon-maintenance-mode' ); ?>" class="subscribe-input flex-grow px-4 rounded-sm focus:outline-none text-left h-[48px]" required>
                    <input type="hidden" id="csmm-email-nonce" name="csmm-email-nonce" value="<?php echo esc_attr( wp_create_nonce( 'csmm-email-nonce' ) ); ?>">
					<button type="submit" class="subscribe-btn px-6 rounded-sm whitespace-nowrap font-bold h-[48px] inline-flex items-center justify-center"><?php esc_html_e( "Join The Project", 'coming-soon-maintenance-mode' ); ?></button>
                </form>
				
                <p id="success-message" class="mt-3 text-green-400 hidden"><?php esc_html_e( "Confirmed. You're on the crew list.", 'coming-soon-maintenance-mode' ); ?></p>
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
    </main>

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
