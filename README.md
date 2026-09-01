# Coming Soon Maintenance Mode Pro

[![WordPress Plugin](https://img.shields.io/badge/WordPress-5.0+-blue.svg)](https://wordpress.org/)
[![PHP Version](https://img.shields.io/badge/PHP-7.2+-purple.svg)](https://www.php.net/)
[![Version](https://img.shields.io/badge/version-3.2.4-green.svg)](https://github.com/FARAZFRANK/coming-soon-maintenance-mode-pro)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Material UI](https://img.shields.io/badge/MUI-v5-007fff.svg)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-GPL--2.0--or--later-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

**Coming Soon Maintenance Mode Pro** is an enterprise-grade, lightning-fast, and responsive WordPress plugin designed to create stunning Coming Soon pages, Under Construction notices, and Maintenance Mode screens with lead capture.

The admin dashboard is completely built with **React 18, Vite, Material UI (MUI), and WordPress REST API**, providing an ultra-smooth single-page application experience with zero legacy Bootstrap dependencies.

---

## 🚀 Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Backend** | **PHP (OOP Singleton)** | Clean modular classes, WordPress REST API (`/wp-json/csmm/v1/`), async handlers |
| **Database** | **MySQL / MariaDB Custom Table** | Dedicated `wp_csmm_subscribers` table with automated zero-loss migration from `wp_options` |
| **Frontend (Admin)** | **React 18, Vite, Material UI (MUI v5)** | Modern SPA, tabbed configuration, real-time live iframe previews, zero Bootstrap |
| **Build System** | **Vite** | Bundled directly to `admin/assets/dist/` |

---

## 🌟 Key Features

- **3 Website Modes**:
  - **Disabled / Live**: Website is accessible to all visitors.
  - **Coming Soon Mode (HTTP 200)**: Show teaser & countdown for new website projects.
  - **Maintenance Mode (HTTP 503)**: Protect your SEO rankings with HTTP 503 headers during site redesigns and updates.
- **Selective Targeting**: Apply maintenance mode site-wide or restrict it to specific Posts, Pages, Home, Frontpage, Categories, Tags, or Search.
- **36+ Pre-built Responsive Templates**: One-click activation with interactive desktop/tablet/mobile live preview modals.
- **Brand Identity & Media**:
  - Custom logo upload with native WordPress Media Library integration.
  - Background image slideshows and video background (Vimeo, YouTube, MP4).
- **Launch Countdown Timer**: Customizable launch target with automatic switch to Live mode once the countdown expires.
- **Subscribers Lead Management**:
  - High-performance lead capture stored in custom database tables.
  - Search, pagination, deletion, and 1-click secure authenticated CSV export stream.
- **13+ Social Media Integrations**: Facebook, Twitter/X, Instagram, YouTube, LinkedIn, Pinterest, WhatsApp, TikTok, Behance, Dribbble, Tumblr, Snapchat, and QQ.
- **Custom CSS Editor**: Add bespoke CSS styles on the fly.
- **Translation & i18n Ready**: Supports 15+ international languages.

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

## 🛠️ Development & Building Assets

To modify or compile the React admin application:

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
  * Admin Lead Alert Email customizer.
  * Subscriber Welcome Email customizer.
  * **Site Live Announcement Email**: Automatically broadcasted to all subscribers upon site launch, with 1-click manual broadcast.
  * Interactive Live Email Template Preview Modal with Desktop and Mobile viewports.
  * Template Header, Footer, Canvas Colors, and Typography styling customizer.
* **Dynamic Custom Social Channels**: Added platform creator with 12+ 1-click presets (Discord, Telegram, Threads, GitHub, Spotify, etc.) and FontAwesome icon selector.
* **Modern Centered Floating Studio Preloader**: Synchronized light glassmorphic floating loader in PHP and React SPA mounting phases.
* **Database & Security Layer**: Added dedicated indexed MySQL table `wp_csmm_subscribers` with utf8mb4 index protection and sanitized streaming CSV export.
* **Custom CSS Code Studio**: Added formatted multiline CSS editor with dark slate developer theme.
* **Comprehensive Documentation Tab**: Added complete feature matrix, API free tier limits table, real-world use cases, dynamic tags guide, and FAQ.

### = 3.1.0 = (28 Oct 2025)
* Added 20 new responsive templates (total 36 templates).

### = 3.0.4 = (4 Feb 2025)
* Favicon icon bug fixed.

### = 3.0.3 = (1 Jan 2025)
* Added 6 new templates.

### = 3.0.2 = (24 Jan 2024)
* Added translations for 15+ languages.
* Subscriber page warning fix.

---

## 📄 License

This plugin is free software, licensed under the [GNU General Public License v2 or later](https://www.gnu.org/licenses/gpl-2.0.html).

---

## 👨‍💻 Author

Developed by **[FARAZFRANK](https://profiles.wordpress.org/farazfrank/)**  
Website: [wpfrank.com](https://wpfrank.com/)
