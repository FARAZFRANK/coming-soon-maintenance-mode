# Coming Soon Maintenance Mode

A Coming Soon and Maintenance Mode plugin to manage your site's availability with responsive templates and SEO-friendly features.

- **Requires at least:** 5.0
- **Tested up to:** 6.9
- **Stable tag:** 1.1.8
- **Requires PHP:** 5.6
- **License:** GPLv2 or later
- **License URI:** https://www.gnu.org/licenses/gpl-2.0.html

## Description

The Coming Soon and Maintenance Mode plugin enables WordPress users to set up a temporary landing page or a maintenance screen while working on their site. This tool helps site administrators manage visitor access during website construction, updates, or downtime.

Detailed configuration options are available to customize the look and feel of your coming soon page without writing code. The plugin is designed to be responsive, ensuring that your temporary page looks functional on various devices, including desktops, tablets, and mobile phones.

Search engine optimization is a key consideration for this plugin. It allows search engines to crawl your coming soon page, which can help maintain your site's presence even when the main content is not yet visible. 

### Key Features

*   **Coming Soon Mode:** Activate a coming soon page to inform visitors about your upcoming site launch.
*   **Multiple templates:** Comes with 35+ prebuilt templates ready to shine.
*   **Maintenance Mode:** Display a maintenance message when performing updates or fixing issues.
*   **Responsive Design:** Templates are built to adapt to different screen sizes.
*   **Customization:** Adjust background images, colors, and text to align with your content.
*   **SEO Friendly:** Designed to work well with search engine indexing requirements.
*   **Bootstrap 5 Interface:** Uses a modern interface for backend settings.
*   **Countdown Timer:** Optionally display a timer to indicate when the site will be live.
*   **Auto Launch:** Schedule your site to go live automatically.

### What You Get in the Free Version

*   **One Click Setup:** Get started quickly without complicated configuration steps.
*   **Super Fast and Handy:** Lightweight plugin that won't slow down your site.
*   **Minimal Design:** Clean, distraction-free templates that focus on your message.
*   **Free Responsive Templates:** Choose from professionally designed templates that work on all devices.
*   **Customization Settings:** Personalize colors, backgrounds, and content to match your brand.
*   **Website Auto Launch:** Set a date and time for your site to go live automatically.

### Upgrade to Pro for More Power

The Pro version includes everything in the free version, plus:

*   **35+ Premium Templates:** Access a wide variety of professionally designed templates.
*   **Video Support:** Add background videos to make your page more engaging.
*   **Pre Built Templates:** Ready-to-use designs that require minimal setup.
*   **Advanced Plugin Settings:** Fine-tune every aspect of your coming soon page.
*   **Social Media Profiling:** Connect your social accounts to build your audience before launch.
*   **Custom CSS:** Add your own styles for complete design control.

## Third-Party Libraries

This plugin utilizes several third-party libraries to provide its features. In accordance with WordPress.org guidelines, the source code for these libraries is documented below:

*   **Bootstrap** (v5.2.3 and v3.3.7): https://github.com/twbs/bootstrap - License: MIT
*   **Font Awesome Free** (v6.2.1): https://github.com/FortAwesome/Font-Awesome - License: CC BY 4.0, SIL OFL 1.1, MIT
*   **Particles.js** (v2.0.0): https://github.com/VincentGarreau/particles.js - License: MIT
*   **Slick Carousel** (v1.6.0): https://github.com/kenwheeler/slick - License: MIT
*   **jQuery Countdown** (v2.2.0): https://github.com/hilios/jQuery.countdown - License: MIT
*   **jQuery Placeholder** (v2.1.2): https://github.com/mathiasbynens/jquery-placeholder - License: MIT

## Installation

1.  Upload the plugin files to the `/wp-content/plugins/` directory, or install the plugin through the WordPress plugins screen.
2.  Activate the plugin through the 'Plugins' screen in WordPress.
3.  Use the plugin settings panel to configure your Coming Soon or Maintenance Mode page.
4.  For detailed visual instructions, refer to the [Plugin Documentation](https://www.youtube.com/channel/UCqbxQzbTEE2p3o33fKB5NIQ/).

## Frequently Asked Questions

**How do I activate the Coming Soon or Maintenance Mode?**  
After installing the plugin, go to your WordPress dashboard and navigate to the plugin settings. You'll find an option to enable either Coming Soon or Maintenance Mode. Simply select your preferred mode and save the settings.

**Will logged-in users see the coming soon page?**  
No, by default, logged-in administrators and users with appropriate permissions can view the live site while visitors see the coming soon page. This allows you to work on your site while it's in maintenance mode.

**Can I customize the coming soon page design?**  
Yes, the plugin offers extensive customization options. You can change backgrounds, colors, fonts, add your logo, customize text, and choose from multiple responsive templates to match your brand.

**How do I schedule my site to go live automatically?**  
The plugin includes an auto-launch feature. In the settings, you can set a specific date and time for your site to automatically switch from coming soon mode to live mode without manual intervention.

**Does this plugin affect SEO?**  
The plugin is designed to be SEO-friendly. It properly handles HTTP status codes and allows search engines to understand that your site is temporarily unavailable, helping maintain your search engine presence.

**Can I collect email addresses from visitors?**  
Yes, But only in Pro version many templates include built-in email subscription forms. You can collect visitor emails to build your audience before your official launch.

**Will the plugin work with my theme?**  
Yes, the plugin works independently of your WordPress theme. It displays a standalone coming soon page that doesn't rely on your theme's design.

**Can I preview the coming soon page before activating it?**  
Yes, you can preview your coming soon page while logged in as an administrator before making it live to visitors.

**How do I add social media links?**  
The plugin includes social media options in the settings panel. You can add links to your Facebook, Twitter, Instagram, and other social profiles in Pro.

**Is the plugin compatible with caching plugins?**  
Yes, the plugin is designed to work with popular caching plugins. However, you may need to clear your cache after activating or deactivating the coming soon mode.

**Can I use custom CSS?**  
Yes, the Pro version includes a custom CSS option that allows you to add your own styles for complete design control.

**What's the difference between Coming Soon and Maintenance Mode?**  
Coming Soon mode is typically used for new websites that haven't launched yet, while Maintenance Mode is used for existing sites that are temporarily offline for updates or repairs.

**Can I use it on commercial websites?**  
Yes, this plugin is released under the GPL license, allowing usage on any website, including commercial projects.

**How do I switch back to a live site?**  
Go to the plugin settings and change the status to "Live" or "Disabled" to deactivate the coming soon or maintenance page and make your site publicly accessible.

**Does it work with multisite installations?**  
Yes, the plugin is compatible with WordPress multisite installations and can be activated on individual sites within your network.

**Can I add a countdown timer?**  
Yes, the plugin includes countdown timer functionality. You can set a launch date and the timer will automatically count down to that moment.

## Changelog

### 1.1.8
*   Update: Overhauled responsive layouts, fixed vertical centering bugs, and perfected mobile spacing and font scaling for Templates 3, 4, and 5 (June 17, 2026).

### 1.1.7
*   Update: Added default countdown date to current date + 1 month on plugin activation.

### 1.1.6
*   SEO: Added proper HTTP status codes (200 OK for Coming Soon mode and 503 Service Unavailable with Retry-After for Maintenance mode) to comply with SEO best practices (June 17, 2026).

### 1.1.5
*   Requirement: Renamed all generic function, class, constant, and variable prefixes to 'comisoma' for WP.org guideline compliance.
*   Update: Implemented database option migration to preserve user settings during prefix rename.
*   Update: Fixed case consistency for plugin constants and renamed internal JS functions.
*   Update: Adjusted admin menu position to a lower priority (position 81) to comply with WordPress.org guidelines.
*   Compliance: Documented third-party library sources in readme.txt for human-readable code compliance.
*   Update: Replaced background videos with statically served images (`temp-11-fg.webp`, `temp-15-fg.webp`) for Template 11 and Template 15 as per the latest requirements.
*   Update: Removed redundant `templates/videos/` directory to further optimize plugin weight.
*   Update: Pruned unused third-party libraries (Lity, Pace, Modernizr, Bootstrap) and CSS to reduce plugin file size.
*   Compliance: Removed restricted Pro functionality code (Custom CSS logic) from the free version.
*   Update: Minimalist layout refinements for Templates 11 and 15.

### 1.1.4
*   Security: Updated Modernizr library to 3.13.1 to resolve outdated footprint vulnerabilities.
*   Update: Refactored inline scripts and styles from all templates to use WordPress core `wp_enqueue_*` functions for better performance and compliance.

### 1.1.3
*   Security: Fixed broken nonce verification in AJAX save handler
*   Security: Removed unauthenticated AJAX endpoint (wp_ajax_nopriv_csmm_save)
*   Security: Used require_once for core file includes (plugin-install.php, theme-install.php) per WP.org guidelines
*   Fixed: Removed auto-activation of plugins after install — install and activate are now separate user actions
*   Fixed: Added proper capability checks to all AJAX handlers for plugin/theme install, update, and activate
*   Update: Removed duplicate inline JavaScript in favour of properly enqueued external script

*(For older changelog entries, please refer to the WordPress.org repository.)*
