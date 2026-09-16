# Coming Soon Maintenance Mode Pro

[![WordPress Plugin](https://img.shields.io/badge/WordPress-5.0+-blue.svg)](https://wordpress.org/)
[![PHP Version](https://img.shields.io/badge/PHP-7.2+-purple.svg)](https://www.php.net/)
[![Version](https://img.shields.io/badge/version-1.3.0-green.svg)](https://github.com/FARAZFRANK/coming-soon-maintenance-mode)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Material UI](https://img.shields.io/badge/MUI-v5-007fff.svg)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-GPL--2.0--or--later-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

**Coming Soon Maintenance Mode** is an enterprise-grade, lightning-fast, and responsive WordPress plugin designed to create stunning Coming Soon pages, Under Construction notices, and Maintenance Mode screens with lead capture.

The admin dashboard is completely built with **React 18, Vite, Material UI (MUI v5), and WordPress REST API**, providing an ultra-smooth single-page application experience with zero legacy Bootstrap dependencies.

---

## 🌟 Key Features

* **3 Website Modes**:
  * **Disabled / Live Website**: Website is accessible to all visitors normally.
  * **Coming Soon Mode (HTTP 200)**: Serves standard HTTP 200 for pre-launch teasers, countdown timers, and email lead capture.
  * **Maintenance Mode (HTTP 503)**: Returns HTTP 503 with `Retry-After` headers to safeguard SEO keyword rankings during site maintenance.
* **Selective Targeting**: Apply maintenance mode site-wide or restrict it to specific Posts, Pages, Home, Frontpage, Categories, Tags, or Search.
* **36+ Pre-built Responsive Templates**: 1-click activation with interactive desktop/tablet/mobile live preview modals.
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
  * Global visibility toggle switch (Enable/Disable across all templates).
  * 1-Click quick presets for Discord, Telegram, GitHub, Threads, Twitch, Spotify, Medium, Slack, Patreon, Vimeo, and custom Website links.
  * FontAwesome icon picker with live preview.
* **Launch Countdown Timer**:
  * Real-time zero-flicker launch countdown timer.
  * Auto-Launch feature to automatically unlock live website on expiration available in Pro version.
* **Secure Lead Management**:
  * Dedicated indexed MySQL table (`wp_csmm_subscribers`).
  * Search, pagination, deletion, and formula injection sanitized streaming CSV exports.
* **Custom CSS Code Studio**:
  * Formatted code editor with syntax color theme and Mac-style title bar.
* **Comprehensive Documentation Tab**:
  * Built-in guide with feature matrix, API free limits table, 4 step-by-step use cases, dynamic placeholders cheat sheet, and FAQ.

---

## 🛠️ Tech Stack

* **Frontend Dashboard**: React 18, Vite, Material UI (MUI v5), Emotion.
* **Backend Architecture**: WordPress REST API (`/wp-json/csmm/v1/`), PHP 7.2+, PHPMailer SMTP.
* **Database**: Dedicated indexed MySQL table (`wp_csmm_subscribers`).
* **Templating**: 36 customizable responsive templates with HTML5, CSS3, Flexbox/Grid, and JavaScript.

---

## 📦 Installation

### Method 1: Upload via WordPress Dashboard
1. Download the ZIP file of this repository or release.
2. Go to **Plugins** > **Add New** > **Upload Plugin**.
3. Choose the ZIP file and click **Install Now**.
4. Click **Activate Plugin**.

### Method 2: Manual Upload
1. Extract the plugin folder `coming-soon-maintenance-mode-pro`.
2. Upload the folder to your WordPress `/wp-content/plugins/` directory.
3. Activate the plugin in **Plugins** > **Installed Plugins**.

---

## 🚀 Development & Build

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Compile production bundle
npm run build
```

---

## 📋 Changelog

### = 1.3.0 = (16 September 2026)
* **Modern React 18 Admin Studio**: Upgraded backend architecture to React 18, Vite, Material UI (MUI v5), and WordPress REST API Single Page Application (SPA).
* **Automated v1.2.0 Settings Migration Engine**: Built seamless backward compatibility and automated database migration from legacy v1.2.0 (`comisoma_*`) options to modern v1.3.0 (`csmm_*`) options during upgrade without losing user settings.
* **Legacy JSON Backup Support**: Added direct parsing and automatic migration for v1.2.0 JSON configuration backup exports in the Settings Import tool.
* **Dedicated "Free vs Pro" Comparison Tab**: Integrated full feature comparison matrix with live upgrade callouts and Pro feature showcases.
* **Free Edition Feature Streamlining**:
  * Curated 5 fully responsive free templates (Templates 1, 4, 8, 11, and 15) with live preview modal.
  * Streamlined Graphic Background settings to focus on Default Media, Custom Background Images, and Solid Color.
  * Standardized Social Media profiles on Facebook, Twitter / X, and Instagram.
  * Settings Backup, JSON Export, JSON Import, and Factory Reset tailored specifically for the Free version.
* **Bug Fixes & Hardening**:
  * Fixed undefined variable warnings in `loader.php` for social icon customization and countdown label color.
  * Client-side accurate timezone countdown calculation directly in visitor's local timezone.
  * Fixed infinite refresh loop on countdown completion with single-reload session guard.
  * Fixed `handleImportClick` and `handleConfirmReset` handlers in Documentation tools.
* **Full WordPress.org Guideline Compliance**: Zero remote script dependencies, robust capability checks, and comprehensive input sanitization and output escaping.

### = 3.2.5 = (02 September 2026)
* **Social Media Global Visibility Toggle Switch**: Added dedicated Enable/Disable toggle card in the Social Media tab to easily hide or show social icons site-wide with a single click across all 36 templates.
* **Universal Email Lead Capture ON/OFF Engine**: Enhanced Email Lead Capture toggle with comprehensive DOM regex stripping and dynamic CSS suppression across all 36 templates.
* **Automatic Multi-Channel Newsletter API Lead Sync**: Connected direct form submissions across all 36 frontend templates to automatically sync new subscribers to all enabled Newsletter APIs (Mailchimp v3, Brevo API v3, MailerLite API, and Webhooks) plus trigger Welcome Emails and Admin Alerts.
* **Template 10 Default Media & Content Display Overhaul**: Fixed default background slideshow loading from `temp-10-slides/` when Graphic Background is set to Default Media; updated two-column responsive layout, clean solid white typography, and countdown timer.
* **Template 13 Live Preview & Frontend UI Parity**: Restored Template 13 original aesthetic matching reference design with fullscreen 3D particle background video coverage, top-left logo and top-right social icons header, inline countdown clock, and bold outline stroke title typography.
* **Template 17 Content Box Spacing & Subscriber Form Polish**: Perfected vertical content centering, spacing between hero elements, and subscriber form input/button sizing.
* **Template 19 Double Background & Spacing Fix**: Resolved duplicate background overlay behind the content card and removed unwanted bottom blank spacing when custom image backgrounds are set.
* **Zero-Flicker Countdown Engine**: Enhanced launch countdown timer with immediate client-side and server-side synchronized timestamp rendering to prevent layout jump or flash on initial page load.
* **PHP Syntax & Template Integrity**: Conducted complete repository PHP syntax lint validation with zero syntax errors.

### = 3.2.4 = (01 September 2026)
* **Communication Engine In-Depth Documentation Guide**: Added comprehensive educational guide in Documentation Tab covering the end-to-end lifecycle of pre-launch lead capture, why direct Newsletter APIs & authenticated SMTP are critical, and step-by-step email branding and live preview workflows.
* **Refined Professional Docs Styling**: Upgraded all Documentation accordions, badges, and alerts with unified typography and a sleek theme palette.
* **Frontend Lead Capture Double-Submit Prevention**: Added submission lock state that disables inputs and changes button text to "Subscribing..." to prevent duplicate form hits.
* **Subscribers Table Multi-Select & Bulk Deletion Fix**: Resolved event bubbling conflict between table rows and checkboxes, enabling smooth multi-row selection and live bulk subscriber deletions.
* **Admin Dynamic Asset Cache-Busting**: Added dynamic `filemtime` versioning to React admin JS & CSS enqueues, ensuring instant bundle updates without manual browser cache clearing.
* **Template 2 Typography & Countdown Spacing Polish**: Optimized description margins and launch timer spacing in Template 2 layout.
* **Template 36 & Side-by-Side Flex Form Layout**: Scoped input padding rules so subscriber placeholder text is never clipped on side-by-side split templates.
* **MP4 Background Video Looping & Poster Support**: Assigned missing loop and poster options in loader and REST API, with fallback loop event handlers across all browsers.
* **Template 14 Background Video Update**: Updated default video URL to high-definition deep space starlight MP4 on wpfrank.com with playsinline attributes.

### = 3.2.3 = (31 August 2026)
* **Custom SMTP Direct Test Mailer**: Added instant Send Test Mail functionality and connection diagnostics in the Custom SMTP Mail Delivery card to verify server credentials on the fly.
* **Form Headline Text Setting**: Added customizable `Form Headline Text` under Email Lead Capture settings with dynamic support across templates 17–36.
* **Newsletter API Setup Guide & 2026 Plan Limits**: Added comprehensive step-by-step API key retrieval tutorials and verified official free tier limits in Documentation and Integrations tabs.
* **Subscribers Multi-Select & Bulk Deletion Fix**: Resolved event double-firing issue on table rows and header checkbox for smooth bulk subscriber selection and deletion.
* **Modal Dialog Input & Placeholder Alignment**: Fixed WordPress core admin CSS bleed into MUI Dialog portals, ensuring pixel-perfect input placeholder, label, and fieldset rendering in both Dark and Light modes.

### = 3.2.2 = (30 August 2026)
* **Plugin Settings Backup, Export & JSON Import**: Added complete JSON configuration file download and restore upload support with schema verification, enabling seamless migration across staging and production sites.
* **Factory Reset System**: Added complete plugin factory reset option in Documentation Tab with high-visibility warning alert modal and backup recommendation.
* **Title & Description Override Suite (All 36 Templates)**: Renamed controls to `Override Title` and `Override Description`, adding custom Font Size sliders and Text Color swatches + hex inputs with reset buttons across all template layouts.
* **Launch Countdown Timer Override**: Added `Override Countdown` setting with dedicated Digits & Labels font size sliders and color pickers mapped to all countdown variations.
* **Sticky Dashboard Header**: Implemented sticky first card with responsive WordPress admin bar alignment (`top: 32px` / `top: 46px`), enhanced elevation shadow, and backdrop blur.
* **Graphic Background & Solid Color Enhancements**: Updated Solid Color default to `#1d1b1b` with overlay `none`, and added dedicated Reset buttons for Solid Color, Gradient, Pattern, and Overlay settings.
* **Synchronized Subscriber Form Live Preview**: Aligned dashboard Live Form Preview with the exact frontend search/subscribe bar appearance, fixing real-time input background color rendering overrides.
* **Preloader & Performance Optimization**: Eliminated duplicate loaders and white screen flash by pre-hydrating workspace state in `wp_localize_script`; resolved horizontal scrollbars via `overflow-x: clip`.

### = 3.2.1 = (25 August 2026)
* **WordPress Media Library Integration**: Fixed script dependencies (`media-editor`, `media-views`) and isolated Vite output bundle with IIFE format to prevent global scope variable conflicts (`window.wp`), enabling smooth native media upload and selection modal for Brand Logo and Custom Background images.
* **Universal Content & Branding Engine**: Added full multi-template compatibility in `loader.php` ensuring all 36 templates respect Logo (Text, Graphic with height slider and custom link, or Disabled), WYSIWYG rich HTML description and shortcodes support, custom Google Fonts, and custom CSS.
* **Graphic Background Suite**: Added solid background colors, 2-color linear and radial gradients, 7 geometric background patterns (Dots, Hexagons, Waves, Carbon, Diagonal, Sakura, Stars), custom images, mobile background override (< 768px), and real-time backdrop blur filter.
* **Newsletter Form & Button Customizer**: Added complete UI appearance customization for frontend lead capture forms: custom input placeholder, button label, input background color, input text/placeholder color, button background color, button text color, and border-radius slider (0px - 30px) with live real-time form preview in the dashboard.
* **AJAX Lead Capture & Floating Toast**: Added universal asynchronous zero-page-reload form submission with a sleek bottom-corner floating success/error toast notification across all templates.
* **Subscribers Multi-Select & Bulk Delete**: Added multi-row select-all checkboxes, selected count badge toolbar, and secure bulk delete REST API endpoint.
* **Seamless Dark Mode Preloader**: Fixed dark mode reload flash by immediately synchronizing PHP preloader styles with localStorage theme preference.
* **Sticky Studio Header & Compact Sliders**: Implemented sticky top header card with responsive WordPress admin bar alignment (`top: 32px` / `top: 46px`), glassmorphic backdrop blur, and compact slider range controls (`maxWidth: 360px`).
* **UI & Theme Polish**: Refined light mode background to neutral `#ececec` palette.

### = 3.2.0 = (24 August 2026)
* **React 18 Admin Dashboard**: Complete overhaul with Vite, Material UI (MUI v5), and WordPress REST API (`/wp-json/csmm/v1/`).
* **Zero Legacy Dependencies**: Completely removed legacy Bootstrap, jQuery UI tabs, and inline script dependencies from Admin.
* **Universal SEO Suite**: Added Open Graph, Twitter Cards, Canonical links, Google Analytics, and Schema.org JSON-LD structured data to all 36 templates.
* **Multi-Channel Newsletters**: Direct API sync for Mailchimp v3, Brevo (Sendinblue), MailerLite, and Custom Webhooks (Zapier/Make) with live connection testing tools.
* **Custom SMTP Engine**: Integrated PHPMailer SMTP hook for Gmail, SendGrid, Amazon SES, and hosting mailers.
* **Automated Email Notifications & Live Preview**:
  - Admin Lead Alert Email customizer.
  - Subscriber Welcome Email customizer.
  - Site Live Announcement Email with automatic broadcast on site launch.
  - Interactive Live Email Template Preview Modal with Desktop and Mobile viewports.
  - Template Header, Footer, Canvas Colors, and Typography styling customizer.
* **Dynamic Custom Social Channels**: Added platform creator with 12+ 1-click presets (Discord, Telegram, Threads, GitHub, Spotify, etc.) and FontAwesome icon selector.
* **Modern Centered Floating Studio Preloader**: Synchronized light glassmorphic floating loader in PHP and React SPA mounting phases.
* **Database & Security Layer**: Added dedicated indexed MySQL table `wp_csmm_subscribers` with `utf8mb4` index protection and sanitized streaming CSV export.
* **Custom CSS Code Studio**: Added formatted multiline CSS editor with dark slate developer theme.
* **Comprehensive Documentation Tab**: Added complete feature matrix, API free tier limits table, real-world use cases, dynamic tags guide, and FAQ.

---

## 📄 License

GPLv2 or later. See [LICENSE](LICENSE) for more details.
