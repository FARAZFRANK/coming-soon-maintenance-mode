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
    <link rel="stylesheet" href="<?php echo esc_url(CSMM_URL . 'templates/css/base.css'); ?>">
    <link rel="stylesheet" href="<?php echo esc_url(CSMM_URL . 'templates/css/vendor.css'); ?>">
    <link rel="stylesheet" href="<?php echo esc_url(CSMM_URL . 'templates/css/main.css'); ?>">
    <link rel="stylesheet" href="<?php echo esc_url(CSMM_URL . 'templates/css/13.css'); ?>">
    <link rel="stylesheet" href="<?php echo esc_url(CSMM_URL . 'admin/assets/fontawesome-free-6.2.1-web/css/all.min.css'); ?>">
    <style>
        <?php echo $csmm_custom_css; ?>
    </style>
    <!-- script
    ================================================== -->
    <script src="<?php echo esc_url(CSMM_URL . 'templates/js/modernizr.js'); ?>"></script>
    <script src="<?php echo esc_url(CSMM_URL . 'templates/js/pace.min.js'); ?>"></script>
    <!-- favicons
    ================================================== -->
    <link rel="shortcut icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
	<link rel="icon" href="<?php echo get_site_icon_url(); ?>" type="image/x-icon">
</head>

<body>

    <!-- home
    ================================================== -->
    <section id="home" class="s-home page-hero target-section" data-parallax="scroll" data-image-src="images/hero-bg.jpg" data-natural-width="3000" data-natural-height="2000" data-position-y="center">


        <div class="home-content">


            <div class="video-background">
                <video id="main-video" preload="auto" autoplay="autoplay" loop="loop" muted="muted" src="https://videos.pexels.com/video-files/7670836/7670836-uhd_2560_1440_30fps.mp4">

                </video>
            </div>


            <?php if ($csmm_logo_id) { ?>
                <div class="home-logo">
                    <a href="<?php echo ! empty( $csmm_logo_link ) ? esc_url( $csmm_logo_link ) : esc_url( home_url( '/' ) ); ?>">
                        <img src="<?php echo esc_url($csmm_logo_url[0]); ?>" alt="<?php echo esc_attr($csmm_logo_alt); ?>">
                    </a>
                    <ul class="home-social">
                        <?php if (empty($csmm_sm_facebook) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_facebook); ?>" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_twitter) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_twitter); ?>" target="_blank"><i class="fa-brands fa-twitter" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_youtube) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_youtube); ?>" target="_blank"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_instagram) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_instagram); ?>" target="_blank"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_linkedin) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_linkedin); ?>" target="_blank"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_pinterest) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_pinterest); ?>" target="_blank"><i class="fa-brands fa-pinterest" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_tumblr) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_tumblr); ?>" target="_blank"><i class="fa-brands fa-tumblr" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_snapchat) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_snapchat); ?>" target="_blank"><i class="fa-brands fa-snapchat" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_behance) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_behance); ?>" target="_blank"><i class="fa-brands fa-behance" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_dribbble) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_dribbble); ?>" target="_blank"><i class="fa-brands fa-dribbble" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_whatsapp) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_whatsapp); ?>" target="_blank"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_tiktok) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_tiktok); ?>" target="_blank"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a></li>
                        <?php } ?>
                        <?php if (empty($csmm_sm_qq) == false) { ?>
                            <li><a href="<?php echo esc_url($csmm_sm_qq); ?>" target="_blank"><i class="fa-brands fa-qq" aria-hidden="true"></i></a></li>
                        <?php } ?>
                    </ul> <!-- end home-social -->
                </div>
            <?php } ?>

            <div class="row home-content__main">


                <?php if ($csmm_countdown == 1) { ?>
                    <div class="home-content__counter">
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
                        </div> <!-- end home-content__clock -->
                    </div> <!-- end home-content__counter -->
                <?php } ?>

                <h1 class="csm-ticker"><?php if ($csmm_title != "") {
                        echo esc_html($csmm_title);
                    } ?></h1>
                <p><?php if ($csmm_description != "") {
                        echo esc_textarea(stripslashes($csmm_description));
                    } ?></p>

                <?php if ($csmm_susbcriber_form == 1) { ?>
                    <div class="home-content__subscribe">
                        <form id="mc-form" method="post" class="group">
                            <input type="email" id="csmm-email" name="csmm-email" class="email" placeholder="<?php esc_attr_e('Email Address', 'coming-soon-maintenance-mode'); ?>" required="">
                            <input type="hidden" id="csmm-email-nonce" name="csmm-email-nonce" value="<?php echo esc_attr(wp_create_nonce('csmm-email-nonce')); ?>">
                            <input type="submit" name="subscribe" value="<?php esc_attr_e('Notify Me', 'coming-soon-maintenance-mode'); ?>">
                            <label for="mc-email" class="subscribe-message">
                                <?php
                                $csmm_flag = 0;
                                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                                    //print_r($_POST);
                                    // add new email subscriber start
                                    if (sanitize_text_field(wp_unslash(isset($_POST['csmm-email-nonce']))) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['csmm-email-nonce'])), 'csmm-email-nonce')) {
                                        $csmm_new_subscriber = sanitize_text_field($_POST['csmm-email']);
                                        if (filter_var($csmm_new_subscriber, FILTER_VALIDATE_EMAIL) !== false) {
                                            //get saved subscriber list
                                            $cmss_subscriber_list = array();
                                            $cmss_subscriber_list = get_option('cmss_subscriber_list');

                                            // if add new subscriber else  // add first subscriber to the list
                                            if (is_array($cmss_subscriber_list) && count($cmss_subscriber_list)) {
                                                //check email is already exist
                                                if (!in_array($csmm_new_subscriber, $cmss_subscriber_list)) {
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
                                    if (sanitize_text_field(wp_unslash(isset($_POST['nonce']))) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'csmm-save')) {
                                        update_option('csmm_settings', array('website_mode' => 3));
                                        wp_die(); // this is required to terminate immediately and return a proper response
                                    }
                                    // on countdown end live the site end
                                }
                                if ($csmm_flag == 1) echo esc_html_e('subscribed', 'coming-soon-maintenance-mode');
                                ?>
                            </label>
                        </form>
                    </div>
                <?php } ?>

            <div class="home-content__scroll">
            </div>

        </div> <!-- end home-content -->



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
    </div>-->

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
    <script src="<?php echo esc_url($csmm_include_url); ?>js/jquery/jquery.js"></script>
    <script src="<?php echo esc_js(CSMM_URL . 'templates/js/plugins.js'); ?>"></script>
    <script>
        jQuery(document).ready(function() {
            // Add the User Agent to the <html>
            // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
            var doc = document.documentElement;
            doc.setAttribute('data-useragent', navigator.userAgent);
            // svg fallback
            if (!Modernizr.svg) {
                jQuery(".home-logo img").attr("src", "images/logo.png");
            }

            <?php if ($csmm_countdown == 1) { ?>
                /* final countdown
                 * ------------------------------------------------------ */
                var CsmmFinalCountdown = function() {
                    var finalDate = new Date("<?php echo esc_js($csmm_launch_dt); ?>").getTime(); // date format: March 25, 2024 15:37:25
                    // updating countdown time start
                    jQuery('.home-content__clock').countdown(finalDate)
                        .on('update.countdown', function(event) {
                            var str = '<div class=\"time days\">' +
                                '%D <span>D</span>' +
                                '</div></div>' +
                                '<div class=\"time hours\">' +
                                '%H <span>H</span></div>' +
                                '<div class=\"time minutes\">' +
                                '%M <span>M</span></div>' +
                                '<div class=\"time seconds\">' +
                                '%S <span>S</span>';
                            jQuery(this)
                                .html(event.strftime(str));
                        });
                    // updating countdown time end

                    // when countdown time finish start
                    jQuery('.home-content__clock').countdown(finalDate)
                        .on('finish.countdown', function(event) {
                            jQuery.ajax({
                                type: 'POST',
                                url: '<?php echo get_site_url(); ?>',
                                data: {
                                    'action': 'csmm_save', //this is the name of the AJAX method called in WordPress
                                    'tab': 'setings',
                                    'website_mode': 3,
                                    'nonce': "<?php echo esc_js(wp_create_nonce('csmm-save')); ?>",
                                },
                                success: function(result) {
                                    // hide loading start
                                    jQuery(".home-content__counter").fadeOut("slow");
                                    jQuery(function() {
                                        // it will wait for 1 sec. and then will fire
                                        setTimeout(function() {
                                            location.reload();
                                            //window.location.href = "<?php echo get_site_url(); ?>";
                                        }, 1000);
                                    });
                                    // hide loading end
                                },
                                error: function() {
                                    //alert("error");
                                }
                            });
                        });
                    // when countdown time finish end
                };
            <?php } ?>

                /* initialize
                 * ----------------------------------------------- */
                (function ssInit() {
                    <?php if ($csmm_countdown == 1) { ?>
                        CsmmFinalCountdown();
                    <?php } ?>
                })();
        });
    </script>
</body>

</html>