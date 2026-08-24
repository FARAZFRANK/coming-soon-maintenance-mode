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
    <link rel="stylesheet" href="<?php echo esc_url(CSMM_URL . 'templates/css/16.css'); ?>">
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

    <style>
        #gameCanvas {
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #000044, #000000);
        }

        #gameOver {
            display: none;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: "Arcade", sans-serif;
            text-align: center;
            margin-top: 1rem;
            font-size: 5rem;
            line-height: 1.219;
            letter-spacing: 3px;
            mix-blend-mode: lighten;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #ffffff;
            text-transform: uppercase;
            color: transparent;
            -moz-background-clip: text;
            -webkit-background-clip: text;
            /* display: flex; */
            width: 100%;
        }
    </style>
    <!-- home
    ================================================== -->
    <section id="home" class="s-home page-hero target-section" data-parallax="scroll" data-image-src="images/hero-bg.jpg" data-natural-width="3000" data-natural-height="2000" data-position-y="center">
        <canvas id="gameCanvas"></canvas>
        <div id="gameOver">GAME OVER Press SPACE to restart</div>


        <div class="home-content">





            <?php if ($csmm_logo_id) { ?>
                <div class="home-logo">
                    <a href="<?php echo get_site_url(); ?>">
                        <img src="<?php echo esc_url($csmm_logo_url[0]);
                                    ?>" alt="<?php echo esc_attr($csmm_logo_alt);
                                                ?>">


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

                <h1><?php if ($csmm_title != "") {
                        echo esc_html($csmm_title);
                    } ?></h1>



            </div> <!-- end home-content__main -->

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



        //Game
        const canvas = document.getElementById('gameCanvas');
        const gameOverDiv = document.getElementById('gameOver');

        const ctx = canvas.getContext('2d');
        let gameActive = true;

        // Make canvas full screen and responsive
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Star background
        class Star {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.blinkSpeed = 0.05 + Math.random() * 0.05;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = 0;
                this.size = 0.5 + Math.random() * 2;
                this.opacity = Math.random();
                this.increasing = Math.random() < 0.5;
            }

            update() {
                this.y += 0.2;
                if (this.y > canvas.height) this.reset();

                if (this.increasing) {
                    this.opacity += this.blinkSpeed;
                    if (this.opacity >= 1) {
                        this.increasing = false;
                    }
                } else {
                    this.opacity -= this.blinkSpeed;
                    if (this.opacity <= 0) {
                        this.increasing = true;
                    }
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const stars = Array(200).fill().map(() => new Star());

        const alienColors = ['#FF4081', '#7C4DFF', '#00BCD4', '#76FF03', '#FFC107'];

        // Animated tank drawing function
        function drawTank(x, y, time) {
            ctx.save();
            ctx.translate(x, y);

            // Hover animation
            const hoverOffset = Math.sin(time / 500) * 3;
            ctx.translate(0, hoverOffset);

            // Tank body (enlarged 2x)
            ctx.fillStyle = '#4CAF50';
            ctx.beginPath();
            ctx.moveTo(0, 60);
            ctx.lineTo(80, 60);
            ctx.lineTo(70, 30);
            ctx.lineTo(10, 30);
            ctx.closePath();
            ctx.fill();

            // Tank turret with rotation
            ctx.fillStyle = '#2E7D32';
            ctx.translate(40, 30);
            ctx.rotate(Math.sin(time / 1000) * 0.1);
            ctx.beginPath();
            ctx.arc(0, 0, 20, 0, Math.PI * 2);
            ctx.fill();

            // Gun barrel with animation
            ctx.fillStyle = '#1B5E20';
            const recoil = Math.max(0, 5 - ((time - lastBulletTime) / 50));
            ctx.fillRect(-4, -30 + recoil, 8, 30);

            // Engine glow
            ctx.fillStyle = `rgba(255, 100, 0, ${0.5 + Math.sin(time / 200) * 0.5})`;
            ctx.beginPath();
            ctx.arc(-20, 45, 8, 0, Math.PI * 2);
            ctx.arc(20, 45, 8, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        // Animated alien drawing function
        function drawAlien(x, y, color, time) {
            ctx.save();
            ctx.translate(x, y);

            // Pulsing animation
            const scale = 1 + Math.sin(time / 500) * 0.1;
            ctx.scale(scale, scale);

            // Alien body (enlarged 2x)
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(30, 0);
            ctx.bezierCurveTo(10, 20, 10, 40, 30, 60);
            ctx.bezierCurveTo(50, 40, 50, 20, 30, 0);
            ctx.closePath();
            ctx.fill();

            // Glowing eyes
            const eyeGlow = Math.abs(Math.sin(time / 300));
            ctx.shadowBlur = 10 * eyeGlow;
            ctx.shadowColor = '#fff';
            ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + eyeGlow * 0.3})`;
            ctx.beginPath();
            ctx.arc(20, 24, 6, 0, Math.PI * 2);
            ctx.arc(40, 24, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.restore();
        }

        const player = {
            x: canvas.width / 2 - 40,
            y: canvas.height - 100,
            width: 80,
            height: 60,
            speed: 10
        };

        const bullets = [];
        const enemies = [];
        let score = 0;

        const keys = {
            left: false,
            right: false
        };

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') keys.left = true;
            if (e.key === 'ArrowRight') keys.right = true;
            if (e.key === ' ' && !gameActive) restartGame();
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') keys.left = false;
            if (e.key === 'ArrowRight') keys.right = false;
        });

        function createBullet() {
            if (gameActive) {
                bullets.push({
                    x: player.x + player.width / 2 - 4,
                    y: player.y,
                    width: 6,
                    height: 24,
                    speed: 12,
                    color: '#00ff00'
                });
            }
        }

        function createEnemy() {
            if (enemies.length < 5 && gameActive) {
                enemies.push({
                    x: Math.random() * (canvas.width - 30),
                    y: 0,
                    width: 30,
                    height: 30,
                    speed: 2,
                    color: alienColors[Math.floor(Math.random() * alienColors.length)]
                });
            }
        }

        let explosions = [];

        function createExplosion(x, y) {
            explosions.push({
                x: x,
                y: y,
                radius: 4,
                lifetime: 30
            });
        }

        function drawExplosion(exp) {
            const gradient = ctx.createRadialGradient(exp.x, exp.y, 0, exp.x, exp.y, exp.radius * (31 - exp.lifetime));
            gradient.addColorStop(0, `rgba(255, 200, 0, ${exp.lifetime / 30})`);
            gradient.addColorStop(0.5, `rgba(255, 100, 0, ${exp.lifetime / 60})`);
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(exp.x, exp.y, exp.radius * (31 - exp.lifetime), 0, Math.PI * 2);
            ctx.fill();
        }

        function checkPlayerCollision() {
            for (let enemy of enemies) {
                if (collision(player, enemy)) {
                    gameOver();
                    return true;
                }
            }
            return false;
        }

        function gameOver() {
            gameActive = false;
            gameOverDiv.style.display = 'block';
            createExplosion(player.x + player.width / 2, player.y + player.height / 2);
        }

        function restartGame() {
            gameActive = true;
            gameOverDiv.style.display = 'none';
            score = 0;
            enemies.length = 0;
            bullets.length = 0;
            explosions.length = 0;
            player.x = canvas.width / 2 - 40;
            player.y = canvas.height - 100;
        }

        function collision(rect1, rect2) {
            return rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y;
        }

        function update() {
            if (!gameActive) return;

            if (keys.left && player.x > 0) player.x -= player.speed;
            if (keys.right && player.x < canvas.width - player.width) player.x += player.speed;

            stars.forEach(star => star.update());

            for (let i = bullets.length - 1; i >= 0; i--) {
                bullets[i].y -= bullets[i].speed;
                if (bullets[i].y < 0) bullets.splice(i, 1);
            }

            for (let i = enemies.length - 1; i >= 0; i--) {
                enemies[i].y += enemies[i].speed;
                if (enemies[i].y > canvas.height) {
                    enemies.splice(i, 1);
                    continue;
                }

                for (let j = bullets.length - 1; j >= 0; j--) {
                    if (collision(bullets[j], enemies[i])) {
                        createExplosion(enemies[i].x + 30, enemies[i].y + 30);
                        enemies.splice(i, 1);
                        bullets.splice(j, 1);
                        score += 10;
                        break;
                    }
                }
            }

            checkPlayerCollision();

            explosions = explosions.filter(exp => {
                exp.lifetime -= 1;
                return exp.lifetime > 0;
            });
        }

        function draw(timestamp) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw stars
            stars.forEach(star => star.draw());

            if (gameActive) {
                drawTank(player.x, player.y, timestamp);
            }

            bullets.forEach(bullet => {
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#00ff00';
                ctx.fillStyle = bullet.color;
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                ctx.shadowBlur = 0;
            });

            enemies.forEach(enemy => {
                drawAlien(enemy.x, enemy.y, enemy.color, timestamp);
            });

            explosions.forEach(drawExplosion);

            ctx.shadowBlur = 10;
            ctx.shadowColor = '#fff';
            ctx.fillStyle = '#fff';
            ctx.font = ' 2rem "Arcade", sans-serif'; // Use "Arcade" font
            ctx.fillText(`SCORE: ${score}`, 20, 50);
            ctx.shadowBlur = 0;

        }

        let lastBulletTime = 0;
        let lastEnemyTime = 0;

        function gameLoop(timestamp) {
            if (timestamp - lastBulletTime > 500) {
                createBullet();
                lastBulletTime = timestamp;
            }

            if (timestamp - lastEnemyTime > 1500) {
                createEnemy();
                lastEnemyTime = timestamp;
            }

            update();
            draw(timestamp);
            requestAnimationFrame(gameLoop);
        }

        requestAnimationFrame(gameLoop);
    </script>
</body>

</html>