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
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/19.css' ); ?>">
	<link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'admin/assets/fontawesome-free-6.2.1-web/css/all.min.css' ); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@400;700&display=swap" rel="stylesheet">
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
    <canvas id="confetti-canvas"></canvas>

    <main class="main-card w-full max-w-2xl text-center rounded-2xl p-8 sm:p-12 m-4">
        
		<!--  Logo -->
		<?php if($csmm_logo_id) { ?>
		<div class="home-logo mb-4">
			<a href="<?php echo ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) ); ?>">
				<img class="mx-auto h-10 w-auto" src="<?php echo esc_url( $csmm_logo_url[0] ); ?>" alt="<?php echo esc_attr( $csmm_logo_alt ); ?>">
			</a>
		</div>
		<?php } ?>
		
        <p class="subtitle text-sm mb-2"><?php esc_html_e( 'Get Ready To', 'coming-soon-maintenance-mode' ); ?></p>
        <h1 class="title-font text-5xl md:text-7xl text-white my-4">
            <?php if($csmm_title != "") { echo esc_html( $csmm_title ); } ?>
        </h1>
        <p class="party-desc text-gray-200 max-w-md mx-auto leading-relaxed" style="margin-bottom: 3rem !important;">
            <?php if($csmm_description != "") { echo esc_textarea( stripslashes( $csmm_description ) ); } ?>
        </p>

        <!-- Countdown Timer -->
		<?php if($csmm_countdown == 1) { ?>
        <div id="countdown" class="grid grid-cols-4 gap-4 w-full max-w-md mx-auto" style="margin-top: 1.5rem !important; margin-bottom: 2.5rem !important;">
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
                <div class="countdown-label"><?php esc_html_e( "Mins", 'coming-soon-maintenance-mode' ); ?></div>
            </div>
            <div class="countdown-box">
                <div id="seconds" class="countdown-number text-4xl md:text-5xl">00</div>
                <div class="countdown-label"><?php esc_html_e( "Secs", 'coming-soon-maintenance-mode' ); ?></div>
            </div>
        </div>
		<?php } ?>
		
        <!-- Subscription Form -->
        <div class="w-full max-w-md mx-auto text-center mb-6">
            <p class="mb-3 font-bold text-lg"><?php echo ! empty( $csmm_form_headline ) ? esc_html( $csmm_form_headline ) : esc_html__( "Don't miss the party!", 'coming-soon-maintenance-mode' ); ?></p>
            <form id="subscribe-form" method="post" class="flex flex-row items-center justify-center gap-3 w-full">
                <input type="email" id="csmm-email" name="csmm-email" placeholder="<?php esc_attr_e( 'Enter your email', 'coming-soon-maintenance-mode' ); ?>" class="subscribe-input flex-grow px-5 rounded-full focus:outline-none text-left h-[48px]" required>
                <input type="hidden" id="csmm-email-nonce" name="csmm-email-nonce" value="<?php echo esc_attr( wp_create_nonce( 'csmm-email-nonce' ) ); ?>">
				<button type="submit" class="subscribe-btn px-8 rounded-full whitespace-nowrap uppercase tracking-wider font-bold text-xs md:text-sm h-[48px] inline-flex items-center justify-center"><?php esc_html_e( 'Get on the list', 'coming-soon-maintenance-mode' ); ?></button>
            </form>
            <p id="success-message" class="mt-3 text-sm text-green-300 hidden"><?php esc_html_e( "Awesome! Your invite is confirmed.", 'coming-soon-maintenance-mode' ); ?></p>
        </div>
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
		
		<div class="flex justify-center space-x-4 mt-6">
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
		
    </main>

    <script>
        // --- Confetti Canvas Logic ---
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let confettiPieces = [];

        const colors = ['#FFD700', '#F06292', '#4FC3F7', '#AED581', '#BA68C8'];
        const numConfetti = 150;

        class Confetti {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.size = Math.random() * 10 + 5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speed = Math.random() * 3 + 1;
                this.rotation = Math.random() * 360;
                this.spin = Math.random() < 0.5 ? -1 : 1;
            }

            update() {
                this.y += this.speed;
                this.rotation += this.spin * 2;
                if (this.y > canvas.height) {
                    this.y = -20;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }

        function initConfetti() {
            for (let i = 0; i < numConfetti; i++) {
                confettiPieces.push(new Confetti());
            }
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiPieces.forEach(piece => {
                piece.update();
                piece.draw();
            });
            requestAnimationFrame(animateConfetti);
        }
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        initConfetti();
        animateConfetti();

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
			  // 4. Fade‑out & reload after 1s
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
