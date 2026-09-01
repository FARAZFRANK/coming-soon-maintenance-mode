=== Coming Soon Maintenance Mode Pro ===
Contributors: farazfrank
Tags: coming soon, maintenance mode, under construction, launch countdown, newsletter, mailchimp, brevo, mailerlite, smtp, seo
Requires at least: 5.0
Tested up to: 6.7
Requires PHP: 7.2
Stable tag: 3.2.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Create high-converting, lightning-fast Coming Soon, Under Construction, and Maintenance Mode pages with React 18 Studio, Newsletter APIs, SMTP, and SEO Suite.

== Description ==

**Coming Soon Maintenance Mode Pro** is an enterprise-grade, lightning-fast WordPress plugin designed to create stunning Coming Soon pages, Under Construction notices, and Maintenance Mode screens with lead capture.

The admin dashboard is completely built with **React 18, Vite, Material UI (MUI v5), and WordPress REST API**, providing an ultra-smooth single-page application experience with zero legacy Bootstrap dependencies.

### 🌟 Key Highlights & Features:

* **3 Website Modes**:
  * **Disabled / Website Live**: Website is accessible to all visitors.
  * **Coming Soon Mode (HTTP 200)**: Show teaser, countdown timer, and lead capture for upcoming launches.
  * **Maintenance Mode (HTTP 503)**: Return proper `503 Service Unavailable` with `Retry-After` headers to protect SEO ranking during site upgrades.
* **Selective Targeting**: Apply maintenance mode site-wide or restrict it to specific Posts, Pages, Home, Frontpage, Categories, Tags, or Search.
* **36+ Pre-built Responsive Templates**: One-click activation with interactive desktop/tablet/mobile live preview modals.
* **Universal SEO Suite**: Auto injects Open Graph meta, Twitter Cards, Canonical links, Google Analytics tracking, and Schema.org structured data across all 36 templates.
* **Multi-Channel Newsletter APIs**:
  * **Mailchimp v3 API Sync** (250 Contacts / 500 Emails/Mo Free Tier)
  * **Brevo (Sendinblue) API v3 Sync** (300 Emails/Day & Up to 100k Contacts Free Tier)
  * **MailerLite API Sync** (250 Subscribers / 2,500 Emails/Mo Free Tier)
  * **Zapier / Make / Webhook Dispatcher** (Unlimited Direct Lead Push)
* **Automated Email Notifications & Custom SMTP**:
  * Admin Lead Alert Email
  * Subscriber Welcome Email
  * **Site Live Announcement Email**: Automatically broadcasted to all subscribers when the website goes live.
  * Full Header, Footer, Colors, and Background Canvas branding customizer.
  * Interactive Live Email Template Preview modal (Desktop & Smartphone viewports).
  * Built-in PHPMailer SMTP hook for Gmail, SendGrid, Amazon SES, or hosting mailers.
* **Dynamic Custom Social Channels**:
  * 1-Click quick presets for Discord, Telegram, GitHub, Threads, Twitch, Spotify, Medium, Slack, Patreon, Vimeo, and custom Website links.
  * FontAwesome icon picker with live preview.
* **Launch Countdown Timer & Auto-Launch**:
  * Real-time countdown timer.
  * Automatically unlocks live website when the countdown hits zero.
* **Secure Lead Management**:
  * Dedicated indexed MySQL table (`wp_csmm_subscribers`).
  * Search, pagination, deletion, and formula injection sanitized streaming CSV exports.
* **Custom CSS Code Studio**:
  * Formatted code editor with syntax color theme and Mac-style title bar.
* **Comprehensive Documentation Tab**:
  * Built-in guide with feature matrix, API free limits table, 4 step-by-step use cases, dynamic placeholders cheat sheet, and FAQ.

== Installation ==

1. Upload the plugin folder `coming-soon-maintenance-mode-pro` to your `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Navigate to **Coming Soon Pro** in the admin sidebar to customize your page, template, newsletter APIs, and SEO settings.

== Frequently Asked Questions ==

= Does Maintenance Mode hurt my Google SEO rankings? =
No! Coming Soon Maintenance Mode Pro automatically sends a proper `HTTP 503 Service Unavailable` header along with `Retry-After: 3600`. Search engine crawlers understand the downtime is temporary and maintain your existing keyword rankings.

= Can logged-in administrators browse the live website? =
Yes! Logged-in administrators bypass the maintenance screen and can view and edit the live site normally.

= How do I prevent notification emails from going to the Spam folder? =
Go to **Newsletter & Integrations** -> **Custom SMTP Mail Delivery**, enable SMTP, and configure your Gmail, SendGrid, or hosting SMTP server.

== Changelog ==

= 3.2.4 = 01 September 2026
* **Communication Engine In-Depth Documentation Guide**: Added comprehensive educational guide in Documentation Tab covering the end-to-end lifecycle of pre-launch lead capture, why direct Newsletter APIs & authenticated SMTP are critical, and step-by-step email branding and live preview workflows.
* **Refined Professional Docs Styling**: Upgraded all Documentation accordions, badges, and alerts with unified typography and a sleek theme palette.
* **Frontend Lead Capture Double-Submit Prevention**: Added submission lock state that disables inputs and changes button text to "Subscribing..." to prevent duplicate form hits.
* **Subscribers Table Multi-Select & Bulk Deletion Fix**: Resolved event bubbling conflict between table rows and checkboxes, enabling smooth multi-row selection and live bulk subscriber deletions.
* **Admin Dynamic Asset Cache-Busting**: Added dynamic `filemtime` versioning to React admin JS & CSS enqueues, ensuring instant bundle updates without manual browser cache clearing.
* **Template 2 Typography & Countdown Spacing Polish**: Optimized description margins and launch timer spacing in Template 2 layout.
* **Template 36 & Side-by-Side Flex Form Layout**: Scoped input padding rules so subscriber placeholder text is never clipped on side-by-side split templates.
* **MP4 Background Video Looping & Poster Support**: Assigned missing loop and poster options in loader and REST API, with fallback loop event handlers across all browsers.
* **Template 14 Background Video Update**: Updated default video URL to high-definition deep space starlight MP4 on wpfrank.com with playsinline attributes.

= 3.2.3 = 31 August 2026
* **Custom SMTP Direct Test Mailer**: Added instant Send Test Mail functionality and connection diagnostics in the Custom SMTP Mail Delivery card to verify server credentials on the fly.
* **Form Headline Text Setting**: Added customizable `Form Headline Text` under Email Lead Capture settings with dynamic support across templates 17–36.
* **Newsletter API Setup Guide & 2026 Plan Limits**: Added comprehensive step-by-step API key retrieval tutorials and verified official free tier limits in Documentation and Integrations tabs.
* **Subscribers Multi-Select & Bulk Deletion Fix**: Resolved event double-firing issue on table rows and header checkbox for smooth bulk subscriber selection and deletion.
* **Modal Dialog Input & Placeholder Alignment**: Fixed WordPress core admin CSS bleed into MUI Dialog portals, ensuring pixel-perfect input placeholder, label, and fieldset rendering in both Dark and Light modes.

= 3.2.2 = 30 August 2026
* **Plugin Settings Backup, Export & JSON Import**: Added complete JSON configuration file download and restore upload support with schema verification, enabling seamless migration across staging and production sites.
* **Factory Reset System**: Added complete plugin factory reset option in Documentation Tab with high-visibility warning alert modal and backup recommendation.
* **Title & Description Override Suite (All 36 Templates)**: Renamed controls to `Override Title` and `Override Description`, adding custom Font Size sliders and Text Color swatches + hex inputs with reset buttons across all template layouts.
* **Launch Countdown Timer Override**: Added `Override Countdown` setting with dedicated Digits & Labels font size sliders and color pickers mapped to all countdown variations.
* **Sticky Dashboard Header**: Implemented sticky first card with responsive WordPress admin bar alignment (`top: 32px` / `top: 46px`), enhanced elevation shadow, and backdrop blur.
* **Graphic Background & Solid Color Enhancements**: Updated Solid Color default to `#1d1b1b` with overlay `none`, and added dedicated Reset buttons for Solid Color, Gradient, Pattern, and Overlay settings.
* **Synchronized Subscriber Form Live Preview**: Aligned dashboard Live Form Preview with the exact frontend search/subscribe bar appearance, fixing real-time input background color rendering overrides.
* **Preloader & Performance Optimization**: Eliminated duplicate loaders and white screen flash by pre-hydrating workspace state in `wp_localize_script`; resolved horizontal scrollbars via `overflow-x: clip`.

= 3.2.1 = 25 August 2026
* **WordPress Media Library Integration**: Fixed script dependencies (`media-editor`, `media-views`) and isolated Vite output bundle with IIFE format to prevent global scope variable conflicts (`window.wp`), enabling smooth native media upload and selection modal for Brand Logo and Custom Background images.
* **Universal Content & Branding Engine**: Added full multi-template compatibility in `loader.php` ensuring all 36 templates respect Logo (Text, Graphic with height slider and custom link, or Disabled), WYSIWYG rich HTML description and shortcodes support, custom Google Fonts, and custom CSS.
* **Graphic Background Suite**: Added solid background colors, 2-color linear and radial gradients, 7 geometric background patterns (Dots, Hexagons, Waves, Carbon, Diagonal, Sakura, Stars), custom images, mobile background override (< 768px), and real-time backdrop blur filter.
* **Newsletter Form & Button Customizer**: Added complete UI appearance customization for frontend lead capture forms: custom input placeholder, button label, input background color, input text/placeholder color, button background color, button text color, and border-radius slider (0px - 30px) with live real-time form preview in the dashboard.
* **AJAX Lead Capture & Floating Toast**: Added universal asynchronous zero-page-reload form submission with a sleek bottom-corner floating success/error toast notification across all templates.
* **Subscribers Multi-Select & Bulk Delete**: Added multi-row select-all checkboxes, selected count badge toolbar, and secure bulk delete REST API endpoint.
* **Seamless Dark Mode Preloader**: Fixed dark mode reload flash by immediately synchronizing PHP preloader styles with localStorage theme preference.
* **Sticky Studio Header & Compact Sliders**: Implemented sticky top header card with responsive WordPress admin bar alignment (`top: 32px` / `top: 46px`), glassmorphic backdrop blur, and compact slider range controls (`maxWidth: 360px`).
* **UI & Theme Polish**: Refined light mode background to neutral `#ececec` palette.

= 3.2.0 = 24 August 2026
* **React 18 Admin Dashboard**: Complete overhaul with Vite, Material UI (MUI v5), and WordPress REST API (`/wp-json/csmm/v1/`).
* **Legacy Cleanup**: Completely removed legacy Bootstrap, jQuery UI tabs, and inline script dependencies from Admin.
* **Universal SEO Suite**: Added Open Graph, Twitter Cards, Canonical links, Google Analytics, and Schema.org JSON-LD structured data to all 36 templates.
* **Multi-Channel Newsletters**: Direct API sync for Mailchimp v3, Brevo (Sendinblue), MailerLite, and Custom Webhooks (Zapier/Make) with live connection testing tools.
* **Custom SMTP Engine**: Integrated PHPMailer SMTP hook for Gmail, SendGrid, Amazon SES, and hosting mailers.
* **Automated Email Templates & Live Preview**:
  * Admin Lead Alert Email customizer.
  * Subscriber Welcome Email customizer.
  * **Site Live Announcement Email**: Automatically broadcasted to all subscribers upon site launch, with 1-click manual broadcast.
  * Interactive Live Email Template Preview Modal with Desktop and Mobile viewports.
  * Template Header, Footer, Canvas Colors, and Typography styling customizer.
* **Dynamic Custom Social Channels**: Added platform creator with 12+ 1-click presets (Discord, Telegram, Threads, GitHub, Spotify, etc.) and FontAwesome icon selector.
* **Modern Centered Floating Studio Preloader**: Redesigned PHP pre-mount and React loaders into a synchronized light glassmorphic floating card.
* **Database & Security Layer**: Added dedicated indexed MySQL table `wp_csmm_subscribers` with utf8mb4 index protection and sanitized streaming CSV export.
* **Custom CSS Code Studio**: Added formatted multiline CSS editor with dark slate developer theme.
* **Comprehensive Documentation Tab**: Added complete feature matrix, API free tier limits table, real-world use cases, dynamic tags guide, and FAQ.

= 3.1.0 = 28 October 2025
* Added 20 new responsive templates (expanding collection to 36 templates).

= 3.0.4 = 4 February 2025
* Fixed favicon icon rendering bug.

= 3.0.3 = 1 January 2025
* Added 6 new pre-built templates.

= 3.0.2 = 24 January 2024
* Added translations for 15+ international languages.
* Fixed subscriber page warning notice.

= 3.0.1 = 23 May 2023
* Fixed social media icon mobile display.
* Improved template mobile responsiveness.

= 3.0.0 = 10 January 2023
* Introduced 3 Website Modes (Live, Coming Soon HTTP 200, Maintenance HTTP 503).
* Initial 10 pre-built responsive templates.
* Lead capture and subscriber management.
