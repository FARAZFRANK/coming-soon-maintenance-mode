import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import { api } from '../api';

export default function DocumentationTab({ settings, onSettingsUpdate, onNotify }) {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);

  const showToast = (message, severity) => {
    if (onNotify) onNotify(message, severity);
  };

  // 1. Export Settings to JSON file
  const handleExportSettings = () => {
    try {
      const safeSettings = { ...settings };
      // Strip Pro and disabled feature settings from Free export
      delete safeSettings.integrations;
      delete safeSettings.custom_css;
      delete safeSettings.susbcriber_form;
      delete safeSettings.form_headline_text;
      delete safeSettings.form_placeholder_text;
      delete safeSettings.form_btn_text;
      delete safeSettings.form_input_bg;
      delete safeSettings.form_input_color;
      delete safeSettings.form_btn_bg;
      delete safeSettings.form_btn_color;
      delete safeSettings.form_border_radius;
      delete safeSettings.video_url;
      delete safeSettings.bg_slideshow_images;
      delete safeSettings.bg_video_url;
      delete safeSettings.bg_pattern;
      delete safeSettings.bg_pattern_opacity;
      delete safeSettings.bg_pattern_color;
      delete safeSettings.bg_gradient_type;
      delete safeSettings.bg_gradient_color1;
      delete safeSettings.bg_gradient_color2;
      delete safeSettings.bg_gradient_angle;

      const exportData = {
        plugin: 'Coming Soon Maintenance Mode',
        version: api.getConfig().version || '1.3.0',
        site_url: api.getConfig().siteUrl || '',
        exported_at: new Date().toISOString(),
        settings: safeSettings,
      };

      const jsonStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `csmm-free-settings-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Free settings exported successfully to JSON backup.', 'success');
    } catch (e) {
      showToast('Failed to export settings: ' + e.message, 'error');
    }
  };

  // 2. Import Settings from JSON file
  const handleImportFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      showToast('Invalid file format. Please select a valid .json settings file.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON structure.');
        }

        const rawSettings = parsed.settings || parsed;
        if (!rawSettings || typeof rawSettings !== 'object') {
          throw new Error('No valid settings object found in JSON file.');
        }

        const settingsToImport = { ...rawSettings };
        // Strip Pro features on import to protect Free integrity
        delete settingsToImport.integrations;
        delete settingsToImport.custom_css;
        delete settingsToImport.video_url;
        delete settingsToImport.bg_slideshow_images;
        delete settingsToImport.bg_video_url;
        delete settingsToImport.bg_pattern;
        delete settingsToImport.bg_gradient_type;

        // Ensure template_id belongs to the 5 free templates (1, 4, 8, 11, 15)
        if (settingsToImport.template_id) {
          const freeTemplates = [1, 4, 8, 11, 15];
          if (!freeTemplates.includes(Number(settingsToImport.template_id))) {
            settingsToImport.template_id = 1;
          }
        }

        setIsImporting(true);
        await api.importSettings(settingsToImport);
        showToast('Settings imported successfully! Reloading studio...', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } catch (err) {
        showToast('Failed to import settings: ' + err.message, 'error');
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 3. Factory Reset Settings (Confirm Dialog Action)
  const handleConfirmReset = async () => {
    try {
      setIsResetting(true);
      await api.resetSettings();
      showToast('Factory reset complete. Restoring default settings...', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (e) {
      showToast('Failed to reset settings: ' + e.message, 'error');
      setIsResetting(false);
    }
  };
  const handleFactoryReset = handleConfirmReset;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Hidden input for Import JSON */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportFileChange}
        accept=".json,application/json"
        style={{ display: 'none' }}
      />

      {/* Hero Welcome Card */}
      <Card
        elevation={0}
        sx={{
          borderRadius: '10px !important',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          border: '1px solid #334155',
          p: { xs: 2.5, md: 3.5 },
        }}
      >
        <CardContent sx={{ p: '0 !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <AutoAwesomeRoundedIcon sx={{ color: '#38bdf8', fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  Coming Soon Maintenance Mode Studio
                </Typography>
                <Chip label="v1.3.0" color="primary" size="small" sx={{ fontWeight: 800, borderRadius: '6px' }} />
              </Box>
              <Typography variant="body1" sx={{ color: '#94a3b8', maxWidth: 780, lineHeight: 1.6 }}>
                Comprehensive user guide, implementation workflows, SEO configuration, and real-world use cases.
              </Typography>
            </Box>
            <Button
              variant="contained"
              component="a"
              href="https://wpfrank.com/"
              target="_blank"
              endIcon={<LaunchRoundedIcon sx={{ color: '#ffffff !important' }} />}
              sx={{
                borderRadius: '8px',
                fontWeight: 700,
                textTransform: 'none',
                backgroundColor: '#2563eb !important',
                color: '#ffffff !important',
                '&:hover': {
                  backgroundColor: '#1d4ed8 !important',
                },
                '&:focus, &:active, &:visited': {
                  color: '#ffffff !important',
                },
              }}
            >
              Visit WPFrank.com
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 1.1 Settings Backup, Migration & Factory Reset Card */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.5 }}>
            <BackupRoundedIcon sx={{ color: 'primary.main', fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.15rem' }}>
              Settings Backup, Import & Factory Reset
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Export all current configurations to a JSON backup file, restore settings to any WordPress site, or reset the plugin back to initial factory defaults.
          </Typography>

          <Grid container spacing={3}>
            {/* Left: Export & Import */}
            <Grid item xs={12} md={7}>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: '10px !important',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 2.5,
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                    📦 Export & Import Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Save a full snapshot of your website mode, active template, content, logo, timer date, SEO, and social media links.
                  </Typography>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FileDownloadRoundedIcon />}
                    onClick={handleExportSettings}
                    sx={{ fontWeight: 700, borderRadius: '8px', px: 2.5, py: 1 }}
                  >
                    Export Settings (JSON)
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={isImporting ? <CircularProgress size={16} /> : <FileUploadRoundedIcon />}
                    onClick={handleImportClick}
                    disabled={isImporting}
                    sx={{ fontWeight: 700, borderRadius: '8px', px: 2.5, py: 1 }}
                  >
                    {isImporting ? 'Importing...' : 'Import Settings (JSON)'}
                  </Button>
                </Stack>
              </Paper>
            </Grid>

            {/* Right: Factory Reset (Danger Zone) */}
            <Grid item xs={12} md={5}>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: '10px !important',
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.3)' : '#fee2e2'),
                  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.05)' : '#fef2f2'),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 2.5,
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <WarningAmberRoundedIcon sx={{ color: 'error.main', fontSize: 20 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'error.main' }}>
                      Factory Reset Plugin
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Restore all Coming Soon, content branding, countdown timer, and SEO settings back to original factory defaults.
                  </Typography>
                </Box>

                <Box>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<RestartAltRoundedIcon />}
                    onClick={() => setResetDialogOpen(true)}
                    sx={{
                      fontWeight: 700,
                      borderRadius: '8px',
                      px: 2.5,
                      py: 1,
                      borderColor: 'error.main',
                      '&:hover': {
                        backgroundColor: 'error.main',
                        color: '#ffffff',
                      },
                    }}
                  >
                    Reset to Default Settings
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Factory Reset Confirmation Dialog */}
      <Dialog
        open={resetDialogOpen}
        onClose={() => !isResetting && setResetDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px !important',
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.2rem', pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberRoundedIcon sx={{ color: 'error.main', fontSize: 26 }} />
          Confirm Factory Reset
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px !important' }}>
          <Alert severity="error" sx={{ borderRadius: '8px', fontWeight: 500 }}>
            <strong>Warning:</strong> This action will permanently erase all your custom headlines, countdown timer, background styling, logo configurations, social links, and SEO settings. All settings will be restored to fresh installation defaults.
          </Alert>

          <Alert severity="info" sx={{ borderRadius: '8px', fontWeight: 500 }}>
            <strong>💡 Recommended Backup:</strong> We strongly advise using the <strong>Export Settings</strong> button to download a backup file of your current configuration before resetting.
          </Alert>

          <Typography variant="body2" color="text.secondary">
            Are you sure you want to proceed with resetting all settings to factory defaults?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => setResetDialogOpen(false)}
            disabled={isResetting}
            sx={{ borderRadius: '8px', fontWeight: 600 }}
          >
            Cancel & Keep Settings
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmReset}
            disabled={isResetting}
            startIcon={isResetting ? <CircularProgress size={16} color="inherit" /> : <RestartAltRoundedIcon />}
            sx={{ borderRadius: '8px', fontWeight: 700 }}
          >
            {isResetting ? 'Resetting...' : 'Yes, Reset All Settings'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 2. Feature Highlights & Architecture */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.15rem' }}>
            🚀 Complete Feature Suite & Architecture
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Everything built into the plugin for high-performance pre-launch marketing and seamless site maintenance.
          </Typography>

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2.5, height: '100%', borderRadius: '10px !important', borderColor: '#e2e8f0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
                  <RocketLaunchRoundedIcon sx={{ color: '#2563eb' }} />
                  <Typography variant="subtitle1" fontWeight={700}>
                    React 18 Studio
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Single-Page Application (SPA) powered by React 18, Vite, Material UI v5, and native WordPress REST API with zero-reload lightning saves.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2.5, height: '100%', borderRadius: '10px !important', borderColor: '#e2e8f0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
                  <SearchRoundedIcon sx={{ color: '#059669' }} />
                  <Typography variant="subtitle1" fontWeight={700}>
                    Universal SEO Suite
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Auto HEAD injection for all 36 templates with Open Graph, Twitter Cards, Canonical links, Google Analytics, and smart HTTP 200/503 robots control.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2.5, height: '100%', borderRadius: '10px !important', borderColor: '#e2e8f0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
                  <MarkEmailReadRoundedIcon sx={{ color: '#7c3aed' }} />
                  <Typography variant="subtitle1" fontWeight={700}>
                    Multi-Channel Newsletters
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Direct API integrations for Mailchimp v3, Brevo, MailerLite, and Custom Webhooks (Zapier/Make) with live connection testing tools.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2.5, height: '100%', borderRadius: '10px !important', borderColor: '#e2e8f0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
                  <DnsRoundedIcon sx={{ color: '#d97706' }} />
                  <Typography variant="subtitle1" fontWeight={700}>
                    Custom SMTP Engine
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Built-in PHPMailer SMTP hook for Gmail, SendGrid, Amazon SES, and hosting mailers for 100% spam-free email delivery.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2.5, height: '100%', borderRadius: '10px !important', borderColor: '#e2e8f0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
                  <ShareRoundedIcon sx={{ color: '#0284c7' }} />
                  <Typography variant="subtitle1" fontWeight={700}>
                    Dynamic Social Channels
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Add unlimited custom social platforms (Discord, Telegram, GitHub, Threads, Spotify, etc.) with 1-click presets and custom FontAwesome icon pickers.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2.5, height: '100%', borderRadius: '10px !important', borderColor: '#e2e8f0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
                  <SecurityRoundedIcon sx={{ color: '#dc2626' }} />
                  <Typography variant="subtitle1" fontWeight={700}>
                    Secure Lead Database
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Dedicated MySQL table (wp_csmm_subscribers) with utf8mb4 index limits protection and sanitized CSV streaming against formula injection.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 2.1 Deep Dive: Newsletter APIs, Custom SMTP, Automated Email Templates, Branding & Live Preview */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.5 }}>
            <EmailRoundedIcon sx={{ color: 'primary.main', fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.15rem' }}>
              Core Communication Engine: What is it, Why is it Essential & How it Works
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Understand the complete lifecycle of pre-launch lead capture, why direct APIs and authenticated SMTP matter, and how to configure automated email templates for maximum launch impact.
          </Typography>

          <Stack spacing={1.5}>
            {/* 1. Why Email Marketing is Critical During Coming Soon */}
            <Accordion defaultExpanded elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <LightbulbRoundedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    1. Why Email & Lead Capture is Essential During Pre-Launch / Maintenance Mode
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                  <Box sx={{ p: 2, mb: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderRadius: '8px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                      The Pre-Launch Opportunity:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      When a website is under construction or maintenance, visitors cannot browse products, read articles, or hire your services. Without an email capture form, <strong>98% of those visitors will leave and never return</strong>. By collecting emails, you transform dead downtime into a powerful 24/7 lead generation funnel, building an engaged audience that eagerly awaits your launch day.
                    </Typography>
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                    The 6-Step Lead Communication Lifecycle:
                  </Typography>
                  <ol style={{ margin: 0, paddingLeft: '22px' }}>
                    <li><strong>Visitor Arrival:</strong> A prospective customer lands on your responsive Coming Soon page and is interested in your upcoming launch.</li>
                    <li><strong>Instant Local Capture:</strong> The visitor submits their email address. It is instantly saved into your secure, indexed WordPress database (<code>wp_csmm_subscribers</code>).</li>
                    <li><strong>Automated Cloud Sync:</strong> The plugin asynchronously transmits the subscriber into your connected Newsletter Service (Mailchimp, Brevo, MailerLite, or Zapier).</li>
                    <li><strong>Admin Alert:</strong> An automated email alert is immediately dispatched to your administrator inbox notifying you of the new lead.</li>
                    <li><strong>Instant Subscriber Welcome:</strong> The subscriber receives a personalized, branded HTML Welcome Email confirming their waitlist reservation.</li>
                    <li><strong>Grand Launch Broadcast:</strong> When your countdown timer finishes (or when you switch to Live Mode), the plugin automatically broadcasts the <strong>Site Live Announcement Email</strong> to all subscribers, driving an immediate flood of qualified launch-day traffic!</li>
                  </ol>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* 2. Newsletter APIs Integration */}
            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <SyncAltRoundedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    2. Newsletter APIs Integration (Direct Cloud CRM Sync)
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                          What is it & Why is it Needed?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Direct cloud API connections allow your WordPress site to communicate in real time with enterprise email marketing platforms (Mailchimp v3, Brevo API v3, MailerLite, and Zapier/Make Webhooks). This eliminates manual CSV exports/imports, prevents lost leads, and triggers your marketing drip funnels automatically.
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                          How it Works & How to Use:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          1. Open the <strong>Newsletter & Integrations</strong> tab.<br />
                          2. Toggle your preferred service to <strong>Active</strong>.<br />
                          3. Enter your API Key / Token and Audience/List ID.<br />
                          4. Click <strong>"Test Connection"</strong> to verify server authentication.<br />
                          5. Click <strong>Save Changes</strong>. All frontend submissions will now sync seamlessly!
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* 3. Custom SMTP Mail Delivery */}
            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <DnsRoundedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    3. Custom SMTP Mail Delivery (Eliminating Spam & Ensuring 100% Inbox Delivery)
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                  <Box sx={{ p: 2, mb: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderRadius: '8px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                      The Problem with Default WordPress Email (wp_mail):
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      By default, WordPress uses PHP's unauthenticated <code>mail()</code> function. Because hosting server IPs are often shared and lack DKIM/SPF signatures, major email providers like Gmail, Yahoo, and Outlook automatically flag these emails as <strong>Spam / Junk</strong> or reject them completely.
                    </Typography>
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                    Why Custom SMTP is Essential & How to Set It Up:
                  </Typography>
                  <ol style={{ margin: 0, paddingLeft: '22px' }}>
                    <li><strong>100% Inbox Guarantee:</strong> Authenticated SMTP routes emails through trusted mail servers (Gmail, SendGrid, Amazon SES, Mailgun, Brevo SMTP, or your Web Host SMTP) with proper TLS/SSL encryption and verified domain reputation.</li>
                    <li><strong>How to Configure:</strong> In <strong>Newsletter & Integrations -&gt; Custom SMTP Mail Delivery</strong>, toggle SMTP to <strong>Enabled</strong>.</li>
                    <li><strong>Fill in Server Details:</strong>
                      <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                        <li><strong>SMTP Host:</strong> e.g. <code>smtp.gmail.com</code> (Gmail) or <code>smtp.sendgrid.net</code> (SendGrid).</li>
                        <li><strong>Port & Encryption:</strong> Port <code>587</code> with <strong>TLS</strong> (recommended) or Port <code>465</code> with <strong>SSL</strong>.</li>
                        <li><strong>Username & Password:</strong> Your email address and SMTP password (for Gmail, generate a 16-character <em>App Password</em> in your Google Account security settings).</li>
                        <li><strong>From Name & Email:</strong> The display name and email address your recipients will see.</li>
                      </ul>
                    </li>
                    <li><strong>Instant Test Verification:</strong> Click <strong>"Send Test Mail"</strong> to dispatch a live diagnostic email to verify connectivity before going live!</li>
                  </ol>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* 4. Automated Email Templates */}
            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <SendRoundedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    4. Automated Email Templates (Admin Alert, Welcome Email & Site Live Broadcast)
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                  <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                    The plugin includes three pre-designed, responsive transactional email templates with dynamic token interpolation:
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={4}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                          🔔 1. Admin Lead Alert
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Trigger:</strong> Instantly when a visitor submits their email.<br />
                          <strong>Purpose:</strong> Alerts the site owner with subscriber details, submission timestamp, IP address, and referer.
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                          💌 2. Subscriber Welcome Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Trigger:</strong> Immediately sent to the newly subscribed visitor.<br />
                          <strong>Purpose:</strong> Confirms their waitlist reservation, establishes immediate trust, and highlights upcoming launch benefits.
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                          🚀 3. Site Live Announcement
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Trigger:</strong> When the countdown timer reaches zero (auto-broadcast) or manually triggered by Admin.<br />
                          <strong>Purpose:</strong> Broadcasts a launch celebration to <em>all captured subscribers</em> to drive maximum Day-1 traffic.
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box sx={{ p: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderRadius: '8px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                      Supported Dynamic Placeholders:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Use tags like <code>&#123;site_name&#125;</code>, <code>&#123;site_url&#125;</code>, <code>&#123;subscriber_email&#125;</code>, <code>&#123;launch_date&#125;</code>, <code>&#123;countdown_time&#125;</code>, <code>&#123;date&#125;</code>, and <code>&#123;ip_address&#125;</code> anywhere in your email subjects and message bodies. They will be automatically replaced with live data upon sending.
                    </Typography>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* 5. Email Branding & Visual Customization */}
            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <PaletteRoundedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    5. Email Branding, Styling & Visual Identity Studio
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                          🎨 Why Custom Email Branding Matters:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Plain-text or unstyled emails look suspicious and amateur. Coming Soon Pro features a visual email design system that applies clean card containers, modern typography, mobile-responsive layouts, and custom color accents to ensure all outgoing emails match your official brand identity.
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                          ⚙️ How to Customize Branding:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          1. In <strong>Newsletter & Integrations -&gt; Email Template Customization & Branding</strong>, choose your <strong>Header Background Color</strong> (e.g. brand blue or luxury dark).<br />
                          2. Set your <strong>Footer Background Color</strong> and <strong>Footer Text Color</strong>.<br />
                          3. Add a personalized <strong>Footer Copyright / Disclaimer Notice</strong>.<br />
                          4. Your logo and site name are automatically embedded into the header.
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* 6. Interactive Live Preview & Test Mailer */}
            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <VisibilityRoundedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    6. Interactive Live Preview & Instant Test Mailer (Desktop & Mobile Simulation)
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                          📱 Real-Time Desktop & Mobile Preview Modal:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Click the <strong>"Live Preview Template"</strong> button on any email card to open an interactive simulation modal. You can toggle between <strong>Desktop (600px)</strong> and <strong>Mobile (375px)</strong> viewports to inspect responsive font scaling, button padding, and layout rendering before your emails reach visitors.
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px', height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                          📬 Send Test Email Functionality:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Click <strong>"Send Test Email"</strong> on any email template card or inside the preview modal. Enter your email address to receive an actual formatted test email in your inbox. This allows you to verify that dynamic tags, colors, and links appear correctly across Gmail, Apple Mail, Outlook, and mobile email apps.
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </CardContent>
      </Card>

      {/* 3. Newsletter APIs & Free Limits Reference */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.15rem' }}>
            📬 Newsletter Service Providers & Free Tier Limits
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            You can connect any of the following free services to automatically capture and sync leads from your Coming Soon page.
          </Typography>

          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px' }}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9') }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary', borderColor: 'divider' }}>Provider</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary', borderColor: 'divider' }}>Free Account Limit</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary', borderColor: 'divider' }}>Required Credentials</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary', borderColor: 'divider' }}>Key Advantage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Mailchimp (v3)</TableCell>
                  <TableCell>
                    <Chip label="250 Contacts / 500 Emails/Mo" size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>API Key (e.g. key-us21), Audience/List ID</TableCell>
                  <TableCell>Industry standard audience tagging & drip campaigns.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Brevo (Sendinblue)</TableCell>
                  <TableCell>
                    <Chip label="300 Emails/Day (~9,000/Mo)" size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>API Key (v3), Optional List ID</TableCell>
                  <TableCell>Store up to 100,000 leads for free with 300 daily email quota.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>MailerLite</TableCell>
                  <TableCell>
                    <Chip label="250 Subscribers / 2,500 Emails/Mo" size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>Bearer API Token, Optional Group ID</TableCell>
                  <TableCell>Clean deliverability with advanced campaign builder.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Zapier / Make / Webhooks</TableCell>
                  <TableCell>
                    <Chip label="Unlimited Direct Push" size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>Webhook Endpoint URL</TableCell>
                  <TableCell>Connect to Google Sheets, Notion, HubSpot, or ActiveCampaign.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Custom SMTP Mailer</TableCell>
                  <TableCell>
                    <Chip label="Gmail (500/day) or Hosting SMTP" size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>Host, Port, TLS/SSL, Username, Password</TableCell>
                  <TableCell>Eliminates spam filtering for Admin & Welcome emails.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* 4. Step-by-Step API Key Retrieval Guide */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.15rem' }}>
            🔑 Step-by-Step Guide: How to Get Your Newsletter API Keys & Audience IDs
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Follow these simple step-by-step instructions to obtain API credentials from your preferred email marketing service and connect them to Coming Soon Pro.
          </Typography>

          <Stack spacing={1.5}>
            {/* 1. Mailchimp Guide */}
            <Accordion defaultExpanded elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    1. Mailchimp — Getting API Key & Audience / List ID
                  </Typography>
                  <Chip label="v3 API" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }} />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                  <Box sx={{ mb: 1.5, p: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderRadius: '8px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                      How to generate your Mailchimp API Key:
                    </Typography>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>Log in to your <strong><a href="https://admin.mailchimp.com/" target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>Mailchimp Dashboard</a></strong>.</li>
                      <li>Click on your <strong>Profile Avatar / Account Icon</strong> in the top-right corner and select <strong>Profile</strong>.</li>
                      <li>Click on the <strong>Extras</strong> dropdown menu at the top and select <strong>API keys</strong>.</li>
                      <li>Under the <em>"Your API Keys"</em> section, click the <strong>"Create A Key"</strong> button.</li>
                      <li>Give the key a descriptive name (e.g. <code>Coming Soon WordPress</code>) and click <strong>Generate Key</strong>.</li>
                      <li>Copy the generated API Key (format: <code>xxxxxxxxxxxxxxxxxxxx-us21</code>) and paste it into the plugin's <strong>Mailchimp API Key</strong> field.</li>
                    </ol>
                  </Box>

                  <Box sx={{ p: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderRadius: '8px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                      How to find your Audience / List ID:
                    </Typography>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>In the Mailchimp left sidebar menu, click <strong>Audience</strong> -&gt; <strong>All Contacts</strong>.</li>
                      <li>If you have multiple audiences, select the one you want to sync subscribers to.</li>
                      <li>Click the <strong>Settings</strong> dropdown button and choose <strong>Audience name and defaults</strong>.</li>
                      <li>Find the <strong>Audience ID</strong> (a string of random numbers/letters like <code>a1b2c3d4e5</code>) and copy it.</li>
                      <li>Paste this into the plugin's <strong>Audience / List ID</strong> field, then click <strong>"Test Mailchimp Connection"</strong>.</li>
                    </ol>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* 2. Brevo Guide */}
            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    2. Brevo (Sendinblue) — Getting API Key (v3) & List ID
                  </Typography>
                  <Chip label="v3 API" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }} />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                  <Box sx={{ mb: 1.5, p: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderRadius: '8px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                      How to generate your Brevo API Key:
                    </Typography>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>Log in to your <strong><a href="https://app.brevo.com/" target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontWeight: 600 }}>Brevo Account</a></strong>.</li>
                      <li>Click on your <strong>Account / Company Name</strong> in the top-right corner.</li>
                      <li>Select <strong>SMTP &amp; API</strong> from the dropdown menu.</li>
                      <li>Click on the <strong>API Keys</strong> tab, then click the <strong>"Generate a new API key"</strong> button.</li>
                      <li>Name your API Key (e.g. <code>Coming Soon Plugin</code>) and click <strong>Generate</strong>.</li>
                      <li>Copy the full key (starts with <code>xkeysib-...</code>) and paste it into the <strong>Brevo API Key (v3)</strong> field.</li>
                    </ol>
                  </Box>

                  <Box sx={{ p: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderRadius: '8px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                      How to find your List ID (Optional):
                    </Typography>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>In Brevo, go to <strong>Contacts</strong> -&gt; <strong>Lists</strong> in the left navigation.</li>
                      <li>Look at the list you want to save leads into. The numeric List ID is displayed directly on the list row (e.g. <code>#2</code>, <code>#5</code>).</li>
                      <li>Enter just the number (e.g. <code>2</code>) into the <strong>List ID</strong> field in Coming Soon Pro. (If left blank, leads go to your general contact list).</li>
                      <li>Click <strong>"Test Brevo Connection"</strong> to verify.</li>
                    </ol>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* 3. MailerLite Guide */}
            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    3. MailerLite — Getting API Token & Group ID
                  </Typography>
                  <Chip label="Bearer Token" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }} />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                  <Box sx={{ mb: 1.5, p: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderRadius: '8px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                      How to generate your MailerLite API Token:
                    </Typography>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>Log in to your <strong><a href="https://dashboard.mailerlite.com/" target="_blank" rel="noreferrer" style={{ color: '#16a34a', fontWeight: 600 }}>MailerLite Dashboard</a></strong>.</li>
                      <li>Click <strong>Integrations</strong> in the left sidebar menu.</li>
                      <li>Find <strong>MailerLite API</strong> and click the <strong>Use</strong> button.</li>
                      <li>Click <strong>"Generate new token"</strong>. Give it a name (e.g. <code>Coming Soon WP Site</code>).</li>
                      <li>Copy the generated API Token string (save it somewhere safe as MailerLite only shows it once!).</li>
                      <li>Paste the token into the plugin's <strong>MailerLite API Token</strong> field.</li>
                    </ol>
                  </Box>

                  <Box sx={{ p: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderRadius: '8px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                      How to find your Group ID (Optional):
                    </Typography>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>Go to <strong>Subscribers</strong> -&gt; <strong>Groups</strong> in MailerLite.</li>
                      <li>Click on the specific group name you want leads to be organized under.</li>
                      <li>Check your browser's URL address bar. The numeric ID at the end of the URL (e.g. <code>groups/123456789</code>) is your Group ID.</li>
                      <li>Paste this numeric Group ID into the plugin and click <strong>"Test MailerLite Connection"</strong>.</li>
                    </ol>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* 4. Zapier & Make Webhooks */}
            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    4. Webhooks — Connecting to Zapier, Make (Integromat), or Google Sheets
                  </Typography>
                  <Chip label="Webhook URL" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }} />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component="div" sx={{ lineHeight: 1.8 }}>
                  <Box sx={{ p: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderRadius: '8px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                      How to set up a real-time Webhook:
                    </Typography>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                      <li><strong>In Zapier:</strong> Create a Zap -&gt; Choose <strong>Webhooks by Zapier</strong> -&gt; Event: <strong>Catch Hook</strong> -&gt; Copy the <strong>Custom Webhook URL</strong>.</li>
                      <li><strong>In Make (Integromat):</strong> Create a Scenario -&gt; Add <strong>Custom Webhook</strong> module -&gt; Copy the webhook link.</li>
                      <li>Paste the URL into the <strong>Webhook Endpoint URL</strong> field in Coming Soon Pro.</li>
                      <li>Click <strong>"Send Test Webhook"</strong> to fire a sample JSON payload (contains email, timestamp, IP, user-agent, and source page) into your automation.</li>
                    </ol>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </CardContent>
      </Card>

      {/* 5. Real-World Use Cases & Step-by-Step Workflows */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.15rem' }}>
            💡 Real-World Use Cases & Step-by-Step Workflows
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Detailed guides for common scenarios to help you get the most out of Coming Soon Pro.
          </Typography>

          <Stack spacing={1.5}>
            <Accordion defaultExpanded elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  🎯 Use Case 1: Pre-Launch Viral Lead Capture & Automatic Site Launch
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Goal:</strong> Tease an upcoming brand launch, collect email subscribers, auto-sync them to Mailchimp/Brevo, and automatically unlock the live website when the countdown timer hits zero.
                </Typography>
                <Typography variant="body2" component="ol" sx={{ pl: 2.5, lineHeight: 1.8 }}>
                  <li>Navigate to <strong>Website Mode & Targeting</strong> tab and set status to <strong>Coming Soon Mode (HTTP 200)</strong>.</li>
                  <li>In <strong>Templates (36)</strong> tab, pick your favorite responsive template (e.g. Modern Countdown or Video Background).</li>
                  <li>In <strong>Content, Branding & SEO</strong>, enable the Countdown timer, set your target launch date & time, and customize your logo and headlines.</li>
                  <li>In <strong>Newsletter & Integrations</strong>, enable Mailchimp, Brevo, or MailerLite and enter your API keys. Click <strong>"Test Connection"</strong> to verify authentication.</li>
                  <li>Customize the <strong>Subscriber Welcome Email</strong> and <strong>Website Live Announcement Email</strong> using dynamic placeholders (e.g. <code>&#123;site_name&#125;</code> and <code>&#123;site_url&#125;</code>).</li>
                  <li>Use the <strong>"Live Preview Template"</strong> and <strong>"Send Test Email"</strong> buttons to verify how your emails look across desktop and mobile inboxes.</li>
                  <li>When the countdown finishes (or when you switch mode to Live), the plugin automatically switches to <strong>Website Live (Disabled)</strong> AND broadcasts the <strong>Site Live Announcement Email</strong> to all your subscribers!</li>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  🛠️ Use Case 2: Zero-Downtime Maintenance & Google SEO Rank Protection
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Goal:</strong> Perform theme updates, database upgrades, or store redesigns on an established website without hurting Google SEO rankings.
                </Typography>
                <Typography variant="body2" component="ol" sx={{ pl: 2.5, lineHeight: 1.8 }}>
                  <li>Navigate to <strong>Website Mode & Targeting</strong> and select <strong>Maintenance Mode (HTTP 503)</strong>.</li>
                  <li>The plugin automatically sends the proper HTTP status code <code>503 Service Unavailable</code> with a <code>Retry-After: 3600</code> header to search crawlers.</li>
                  <li>Google and Bing recognize that the site is temporarily undergoing maintenance and will <strong>not</strong> de-index or drop your keyword rankings.</li>
                  <li>Logged-in Administrators will automatically bypass the maintenance screen and view the real site normally.</li>
                  <li>If you only want maintenance mode on specific pages (e.g., checkout or shop), choose <strong>Selective Targeting (Posts/Pages)</strong> and pick only the pages under construction.</li>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  ⚡ Use Case 3: Automated CRM Workflows with Zapier / Make Webhooks
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Goal:</strong> Route incoming subscriber leads into Google Sheets, Notion CRM, Slack notifications, or HubSpot in real-time.
                </Typography>
                <Typography variant="body2" component="ol" sx={{ pl: 2.5, lineHeight: 1.8 }}>
                  <li>Create a "Catch Webhook" trigger in Zapier, Make.com, or Pabbly Connect and copy the generated Webhook URL.</li>
                  <li>Paste the URL into <strong>Newsletter & Integrations -&gt; Zapier / Make / Webhook Dispatcher</strong> and toggle it Active.</li>
                  <li>Click <strong>"Send Test Webhook Payload"</strong> to send a test JSON payload.</li>
                  <li>Whenever a visitor submits their email on the frontend, the plugin dispatches an HTTP POST payload with event, email, ip_address, timestamp, and site details.</li>
                  <li>Your Zapier / Make scenario receives the lead immediately and adds it to your CRM!</li>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  🌐 Use Case 4: Adding Custom Social Platforms (Discord, Telegram, Threads, GitHub)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Goal:</strong> Display custom community channels and modern social links on your coming soon template.
                </Typography>
                <Typography variant="body2" component="ol" sx={{ pl: 2.5, lineHeight: 1.8 }}>
                  <li>Go to the <strong>Social Channels</strong> tab.</li>
                  <li>Under <strong>"Dynamic Custom Social Channels"</strong>, click any of the <strong>1-Click Quick Add Presets</strong> (Discord, Telegram, GitHub, Threads, Twitch, Spotify, Medium, etc.) or click <strong>"Add Custom Channel"</strong>.</li>
                  <li>Enter your profile URL and adjust the FontAwesome icon class if desired (an icon preview displays inside the input field).</li>
                  <li>Click <strong>Save Changes</strong>. The custom social icons will automatically render in the social footer of all 36 templates.</li>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </CardContent>
      </Card>

      {/* 5. Dynamic Placeholders Cheat Sheet */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.15rem' }}>
            🏷️ Dynamic Email Template Placeholders
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Use these tags in Admin Lead Alerts or Subscriber Welcome Email bodies and subjects. They will be replaced automatically upon dispatch:
          </Typography>

          <Grid container spacing={2}>
            {[
              { tag: '{site_name}', desc: 'Website Title configured in WordPress settings' },
              { tag: '{site_url}', desc: 'Full homepage URL of your website' },
              { tag: '{subscriber_email}', desc: 'Email address of the visitor who subscribed' },
              { tag: '{launch_date}', desc: 'Formatted launch date (e.g. October 25, 2026)' },
              { tag: '{countdown_time}', desc: 'Target launch time (e.g. 10:00)' },
              { tag: '{date}', desc: 'Exact date & timestamp of subscription submission' },
              { tag: '{ip_address}', desc: 'Visitor IP address for security tracking' },
            ].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.tag}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px !important', height: '100%' }}>
                  <Chip label={item.tag} size="small" color="primary" sx={{ fontFamily: 'monospace', fontWeight: 700, mb: 1, borderRadius: '6px' }} />
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* 6. Frequently Asked Questions */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2 }}>
            <HelpOutlineRoundedIcon color="secondary" />
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.15rem' }}>
              Frequently Asked Questions (FAQ)
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Why are my emails going to the Spam folder or not sending?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Default WordPress wp_mail relies on the web host unauthenticated PHP mail, which is often flagged by Gmail and Outlook. To solve this, go to <strong>Newsletter & Integrations -&gt; Custom SMTP Mail Delivery</strong>, enable SMTP, and enter your Gmail, SendGrid, or hosting SMTP credentials.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  How do I preview a different template before activating it?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  In the <strong>Templates (36)</strong> tab, every template card has an <strong>Eye Icon (Preview)</strong> button. Clicking it opens a live interactive preview of that specific template in a new browser tab without affecting your live website.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  How are subscriber leads protected against security vulnerabilities?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Subscribers are stored in a dedicated indexed MySQL table (wp_csmm_subscribers) with email unique indexing constrained to 191 characters (preventing utf8mb4 index errors). CSV exports are protected with nonce verification, administrator capability checks, and formula injection sanitization (prefixing dangerous characters like =, +, -, @).
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
