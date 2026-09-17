# Coming Soon Maintenance Mode

[![WordPress Plugin](https://img.shields.io/badge/WordPress-5.0+-blue.svg)](https://wordpress.org/)
[![PHP Version](https://img.shields.io/badge/PHP-7.2+-purple.svg)](https://www.php.net/)
[![Version](https://img.shields.io/badge/version-1.3.0-green.svg)](https://github.com/FARAZFRANK/coming-soon-maintenance-mode)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Material UI](https://img.shields.io/badge/MUI-v5-007fff.svg)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-GPL--2.0--or--later-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

**Coming Soon Maintenance Mode** is a modern, lightweight, and responsive WordPress plugin designed to create elegant Coming Soon pages, Under Construction notices, and Maintenance Mode screens for your website.

The admin dashboard is built with **React 18, Vite, Material UI (MUI v5), and the WordPress REST API**, providing a fast, single-page application (SPA) experience with zero legacy jQuery/Bootstrap UI dependencies.

---

## 🌟 Free Edition Features

* **3 Website Availability Modes**:
  * **Disabled / Live Website**: Your website is accessible normally to all visitors.
  * **Coming Soon Mode (HTTP 200)**: Serves standard HTTP 200 for pre-launch teasers, announcements, and countdown timers while working on your new site.
  * **Maintenance Mode (HTTP 503)**: Returns HTTP 503 Service Unavailable with `Retry-After` header to safeguard search engine rankings during maintenance or updates.
* **Selective Page & Post Targeting**:
  * Apply Coming Soon / Maintenance mode site-wide or restrict it to specific Posts, Pages, Home, or Front Page.
  * Logged-in administrators always have full access to view and test the front-end.
* **5 Free Fully-Responsive Designer Templates**:
  * Includes professionally crafted templates: **Template 1 (Minimal Clean), Template 4 (Geometric Tech Blue), Template 8 (Abstract Vibrant Gradient), Template 11 (Elegant Luxury Gold), and Template 15 (Aurora Borealis Glow)**.
  * Interactive live preview modal with Desktop (100%), Tablet (768px), and Mobile (375px) device viewport switchers.
* **Mobile-First Responsive Polish**:
  * **Template 4**: Perfectly centered logo and social icons on all mobile devices.
  * **Template 8**: Generous content box padding, top spacing above logo, enlarged centered social icons, and bold, readable countdown numbers on mobile.
  * **Template 1**: Robust vertical and horizontal flex centering across all viewports.
* **Real-Time Universal Launch Countdown**:
  * Zero-flicker client-side countdown clock counting down to your target launch date and time.
  * Works smoothly across all templates with automated timezone support and past-date fallback protection.
  * Interactive glassmorphic DatePicker component with calendar month navigation.
* **Branding & Content Customization**:
  * **Logo Customizer**: Upload a custom graphic logo with height constraint and custom link, or display a stylized text logo.
  * **Custom Headlines & Typography**: Customize title text, font size, and text colors.
  * **Rich Description Content**: Full support for WordPress shortcodes, auto-embeds (YouTube, Vimeo, etc.), HTML, and rich formatting.
* **Flexible Background Styles**:
  * Default template background with particle animations.
  * **Custom Background Images**: Upload multiple background images with cover, contain, or tiled sizing.
  * **Solid Color Background**: Clean, minimalist solid color canvas with live color picker.
* **Social Media Channels**:
  * Connect your audience before launch with direct profile links for **Facebook, Twitter / X, and Instagram**.
* **Modern React 18 Admin Dashboard**:
  * Single Page Application (SPA) built with React 18, Material UI (MUI v5), and WordPress REST API.
  * Dark Mode and Light Mode support with smooth theme transitions.
* **Backup, Migration & Reset Tools**:
  * **Automated v1.2.0 Migration Engine**: Effortlessly upgrades existing v1.2.0 settings to v1.3.0 without configuration loss.
  * **Settings JSON Export & Import**: Export plugin configurations to JSON or import from another site (supports legacy v1.2.0 JSON files).
  * **Factory Reset**: One-click restore to fresh default settings.

---

## ⚡ Free vs Pro Comparison

| Feature | Free Edition | Pro Edition |
| :--- | :---: | :---: |
| **Website Modes (Live, Coming Soon, Maintenance)** | ✅ Included | ✅ Included |
| **Selective Page & Post Targeting** | ✅ Included | ✅ Included |
| **Responsive Designer Templates** | 5 Free Templates | 36+ All Templates |
| **Multi-Device Live Preview (Desktop/Tablet/Mobile)**| ✅ Included | ✅ Included |
| **Real-Time Countdown Timer** | ✅ Included | ✅ Included |
| **Auto-Launch on Countdown Expiry** | Pro Only | ✅ Included |
| **Email Lead Capture & Subscriber Forms** | Pro Only | ✅ Included |
| **Auto-Sync to Mailchimp, Brevo & MailerLite** | Pro Only | ✅ Included |
| **Custom SMTP Email Delivery (Gmail/SES/SendGrid)**| Pro Only | ✅ Included |
| **Admin New Lead Notifications** | Pro Only | ✅ Included |
| **Subscriber Welcome & Launch Announcement Emails**| Pro Only | ✅ Included |
| **CSV Subscriber Export & Lead Manager** | Pro Only | ✅ Included |
| **Extended Social Channels (Discord, Telegram, etc.)**| Pro Only | ✅ 12+ Channels |
| **Video Backgrounds (YouTube, Vimeo, MP4)** | Pro Only | ✅ Included |
| **Custom CSS Code Studio** | Pro Only | ✅ Included |

---

## 🛠️ Tech Stack

* **Frontend Dashboard**: React 18, Vite 5, Material UI (MUI v5), Emotion.
* **Backend Architecture**: WordPress REST API (`/wp-json/csmm/v1/`), PHP 7.2+, WordPress Options API.
* **Templating**: HTML5, CSS3, Flexbox/Grid, and Pure Vanilla JavaScript.
* **Assets**: Minified, zero-remote CDN dependencies for speed and privacy.

---

## 📦 Installation

### Method 1: WordPress Admin Dashboard
1. Go to **Plugins** > **Add New** > **Upload Plugin**.
2. Select the plugin ZIP file and click **Install Now**.
3. Click **Activate Plugin**.

### Method 2: Manual Upload via FTP/SFTP
1. Extract the plugin ZIP folder.
2. Upload the `coming-soon-maintenance-mode-free` directory to `/wp-content/plugins/`.
3. Activate the plugin via **Plugins** > **Installed Plugins** in WordPress.

---

## 🚀 Development & Build

```bash
# Navigate to the plugin directory
cd coming-soon-maintenance-mode-free

# Install JavaScript dependencies
npm install

# Start Vite development server (HMR)
npm run dev

# Compile production bundle
npm run build
```

---

## 📋 Changelog

### = 1.3.0 = (17 September 2026)
* **Modern React 18 Admin Dashboard**: Complete rewrite of the admin dashboard using React 18, Vite, Material UI (MUI v5), and WordPress REST API.
* **Light & Dark Theme Studio**: Seamless dark/light theme switching with instant localStorage persistence.
* **Automated v1.2.0 Settings Migration Engine**: Built backward compatibility and automated database migration from legacy v1.2.0 (`comisoma_*`) options to modern v1.3.0 (`csmm_*`) options during upgrade.
* **Legacy JSON Backup Support**: Direct parsing and automatic migration for v1.2.0 JSON configuration backup exports in the Settings Import tool.
* **5 Curated Free Templates**: Fully responsive templates (1, 4, 8, 11, 15) with live preview modal (desktop, tablet, mobile).
* **Mobile-First Responsive Layouts**:
  * **Template 4**: Fixed logo and social media icons centering on mobile viewports.
  * **Template 8**: Added content box padding, top spacing above logo, enlarged and centered social icons, and increased countdown timer font size on mobile screens.
  * **Template 1**: Perfected vertical and horizontal flex centering across all viewports.
* **Universal Countdown Engine**: Real-time launch countdown with safe auto-renew fallback for expired/past target dates and accurate client-side timezone calculation.
* **Dedicated Free vs Pro Tab**: Interactive comparison matrix showcasing Pro features, demos, and upgrade benefits.
* **Bug Fixes & UI Polishing**:
  * Removed duplicate rocket icon and fixed button hover contrast in light theme mode.
  * Fixed undefined variable warnings in `loader.php`.
  * Sanitized settings import/export routines.
* **Full WordPress.org Guideline Compliance**: 100% compliant with WordPress coding standards, capability checks, input sanitization, and output escaping.

---

## 📄 License

This plugin is licensed under the GNU General Public License v2.0 or later. See [LICENSE](LICENSE) for details.
