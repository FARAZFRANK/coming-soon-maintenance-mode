<!DOCTYPE html>
<html class="no-js" lang="en">
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
	<link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/base.css' ); ?>">
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/vendor.css' ); ?>">
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/main.css' ); ?>">
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/lity.css' ); ?>">
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'templates/css/3.css' ); ?>">
    <link rel="stylesheet" href="<?php echo esc_url( CSMM_URL.'admin/assets/fontawesome-free-6.2.1-web/css/all.min.css' ); ?>">
	<style><?php echo $csmm_custom_css; ?></style>
    <!-- script
    ================================================== -->
    <script src="<?php echo esc_url( CSMM_URL.'templates/js/modernizr.js' ); ?>"></script>
    <script src="<?php echo esc_url( CSMM_URL.'templates/js/pace.min.js' ); ?>"></script>
    <!-- favicons
    ================================================== -->
    <link rel="shortcut icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
	<link rel="icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
</head>
<body>
    <!-- home
    ================================================== -->
    <section id="home" class="s-home page-hero target-section" data-parallax="scroll" data-natural-width="3000" data-natural-height="2000" data-position-y="center">
        <div class="grid-overlay">
            <div></div>
        </div>
        <div class="home-content">

            <div class="row home-content__main">
				<?php if($csmm_logo_id) { ?>
                <div class="home-logo">
                    <a class="logo-dark" href="<?php echo ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) ); ?>">
                        <img src="<?php echo esc_url( $csmm_logo_url[0] ); ?>" alt="<?php echo esc_attr( $csmm_logo_alt ); ?>">
                    </a>
                </div>
                <?php } ?>

                <h1><?php if($csmm_title != "") { echo esc_html( $csmm_title ); } ?></h1>
                <p><?php if($csmm_description != "") { echo esc_textarea( stripslashes( $csmm_description ) ); } ?></p>
         
                <div class="home-content__video">
                    <a class="video-link" href="<?php if($csmm_video_url != "") { echo esc_url( $csmm_video_url ); } ?>" data-lity>
                        <span class="video-icon"></span>
                        <span class="video-text">Watch Video</span>
                    </a>
                </div>

				<?php if($csmm_countdown == 1) { ?>
                <div class="home-content__counter">
                    <h3><?php if($csmm_countdown_title != "") { echo esc_html( $csmm_countdown_title ); } ?></h3>
                    <div class="home-content__clock">
                        <div class="time days">
                            325
                            <span>D</span>
                        </div>
                        <div class="time hours">
                            09
                            <span>H</span>
                        </div>
                        <div class="time minutes">
                            54
                            <span>M</span>
                        </div>
                        <div class="time seconds">
                            30
                            <span>S</span>
                        </div>
                    </div>  <!-- end home-content__clock -->
                </div>  <!-- end home-content__counter -->
                <?php } ?>
            </div> <!-- end home-content__main -->
        </div> <!-- end home-content -->

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

	</section>

    <!-- preloader
    ================================================== 
    <div id="preloader">
        <div id="loader">
            <div class="line-scale-pulse-out">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div> -->

    <!-- Java Script
    ================================================== -->
    <?php 
    // Javascript
    $csmm_include_url = includes_url();
    $csmm_last = $csmm_include_url[strlen( $csmm_include_url )-1];
    if ( $csmm_last != '/' ) {
        $csmm_include_url = $csmm_include_url . '/';
    }
    ?>
	<script src="<?php echo esc_url($csmm_include_url); ?>js/jquery/jquery.min.js"></script>
    <script src="<?php echo esc_url(CSMM_URL.'templates/js/plugins.js'); ?>"></script>
    <script src="<?php echo esc_url(CSMM_URL.'templates/js/lity.js'); ?>"></script>
    <script>
    jQuery( document ).ready(function() {
        // Add the User Agent to the <html>
        // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
        var doc = document.documentElement;
        doc.setAttribute('data-useragent', navigator.userAgent);
        // svg fallback
                if (!Modernizr.svg) {
            jQuery(".home-logo img").attr("src", "images/logo.png");
        }
    });
    </script>
</body>
</html>
