<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <title><?php echo esc_html($csmm_title); ?></title>
    <meta name="description" content="<?php echo esc_html($csmm_description); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSS
    ================================================== -->
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/base.css' ); ?>">
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/2.css' ); ?>">
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'admin/assets/fontawesome-free-6.2.1-web/css/all.min.css' ); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Monoton&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style><?php echo $csmm_custom_css; ?></style>
    <!-- favicons
    ================================================== -->
    <link rel="shortcut icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
	<link rel="icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
</head>
<body class="template-two-body">
    <!-- home
    ================================================== -->
    <main class="s-home s-home--static template-two">
        <div class="home-content">
            <div class="home-container">
				
				<?php if($csmm_logo_id) { ?>
                <div class="home-logo">
                    <a href="<?php echo ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) ); ?>">
                        <img src="<?php echo esc_url( $csmm_logo_url[0] ); ?>" alt="<?php echo esc_attr( $csmm_logo_alt ); ?>">
                    </a>
                </div>
                <?php } ?>

                <div class="home-content__text">
                    <h1 class="title-font"><?php if($csmm_title != "") { echo esc_html( $csmm_title ); } ?></h1>
                    <p class="desc-text"><?php if($csmm_description != "") { echo esc_textarea( stripslashes( $csmm_description ) ); } ?></p>
					
					<?php if($csmm_countdown == 1) { ?>
					<div class="home-content__counter">
						<?php if($csmm_countdown_title != "") { ?>
						<h3 class="countdown-title"><?php echo esc_html( $csmm_countdown_title ); ?></h3>
						<?php } ?>
						<div id="countdown" class="home-content__clock">
							<div class="time days">
								<span class="num">00</span>
								<span class="label"><?php esc_html_e( "D", 'coming-soon-maintenance-mode' ); ?></span>
							</div>
							<div class="time hours">
								<span class="num">00</span>
								<span class="label"><?php esc_html_e( "H", 'coming-soon-maintenance-mode' ); ?></span>
							</div>
							<div class="time minutes">
								<span class="num">00</span>
								<span class="label"><?php esc_html_e( "M", 'coming-soon-maintenance-mode' ); ?></span>
							</div>
							<div class="time seconds">
								<span class="num">00</span>
								<span class="label"><?php esc_html_e( "S", 'coming-soon-maintenance-mode' ); ?></span>
							</div>
						</div>  <!-- end home-content__clock -->
					</div>  <!-- end home-content__counter -->
					<?php } ?>
					
					<?php if($csmm_susbcriber_form == 1) { ?>
                    <div class="home-content__subscribe">
                        <form id="subscribe-form" method="post" class="subscribe-form">
                            <input type="email" id="csmm-email" name="csmm-email" class="email" placeholder="<?php esc_attr_e( 'Email Address', 'coming-soon-maintenance-mode' ); ?>" required="">
                            <input type="hidden" id="csmm-email-nonce" name="csmm-email-nonce" value="<?php echo esc_attr( wp_create_nonce( 'csmm-email-nonce' ) ); ?>">
                            <input type="submit" name="subscribe" value="<?php esc_attr_e( 'Notify Me', 'coming-soon-maintenance-mode' ); ?>">
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
							echo '<p class="text-sm mt-3" style="color: #4ade80;">' . esc_html__( 'Subscribed successfully!', 'coming-soon-maintenance-mode' ) . '</p>';
						}
						?>
                    </div>
                    <?php } ?>
					
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
					
                </div><!-- end home-content__text -->
				
            </div><!-- end home-container -->

        </div> <!-- end home-content -->

    </main> <!-- end s-home -->

    <!-- Java Script
    ================================================== -->
    <?php 
    $csmm_include_url = includes_url();
    $csmm_last = $csmm_include_url[strlen( $csmm_include_url )-1];
    if ( $csmm_last != '/' ) {
        $csmm_include_url = $csmm_include_url . '/';
    }
    ?>
    <script src="<?php echo esc_url($csmm_include_url); ?>js/jquery/jquery.js"></script>
    <script src="<?php echo esc_js(CSMM_URL.'templates/js/plugins.js'); ?>"></script>
    <script>
    jQuery( document ).ready(function() {
        <?php if($csmm_countdown == 1) { ?>
        var CsmmFinalCountdown = function() {
            var finalDate = new Date("<?php echo esc_js($csmm_launch_dt); ?>").getTime();
            jQuery('.home-content__clock').countdown(finalDate)
            .on('update.countdown', function(event) {
                var str = '<div class="time days"><span class="num">' + event.strftime('%D') + '</span><span class="label"><?php esc_html_e( "D", 'coming-soon-maintenance-mode' ); ?></span></div>' +
                          '<div class="time hours"><span class="num">' + event.strftime('%H') + '</span><span class="label"><?php esc_html_e( "H", 'coming-soon-maintenance-mode' ); ?></span></div>' +
                          '<div class="time minutes"><span class="num">' + event.strftime('%M') + '</span><span class="label"><?php esc_html_e( "M", 'coming-soon-maintenance-mode' ); ?></span></div>' +
                          '<div class="time seconds"><span class="num">' + event.strftime('%S') + '</span><span class="label"><?php esc_html_e( "S", 'coming-soon-maintenance-mode' ); ?></span></div>';
                jQuery(this).html(str);
            });
        };
        CsmmFinalCountdown();
        <?php } ?>
    });
    </script>
</body>
</html>