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
import { api } from '../api';

export default function DocumentationTab({ settings, onSettingsUpdate, onNotify }) {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);

  // 1. Export Settings to JSON file
  const handleExportSettings = () => {
    try {
      const exportData = {
        plugin: 'Coming Soon Maintenance Mode Pro',
        version: api.getConfig().version || '3.2.1',
        site_url: api.getConfig().siteUrl || '',
        exported_at: new Date().toISOString(),
        settings: settings || {},
      };

      const jsonStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `csmm-settings-backup-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (onNotify) {
        onNotify('Settings backup exported successfully!', 'success');
      }
    } catch (err) {
      if (onNotify) {
        onNotify('Export failed: ' + err.message, 'error');
      }
    }
  };

  // 2. Trigger File Picker for Import
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // 3. Process Imported JSON File
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        setIsImporting(true);
        const parsed = JSON.parse(event.target.result);
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON file structure');
        }

        const res = await api.importSettings(parsed);
        if (res.success) {
          if (onSettingsUpdate && res.data) {
            onSettingsUpdate(res.data);
          }
          if (onNotify) {
            onNotify('Settings imported and applied successfully!', 'success');
          }
        } else {
          throw new Error(res.message || 'Failed to import settings');
        }
      } catch (err) {
        if (onNotify) {
          onNotify('Import failed: ' + err.message, 'error');
        }
      } finally {
        setIsImporting(false);
      }
    };
    reader.readAsText(file);
  };

  // 4. Factory Reset All Settings
  const handleConfirmReset = async () => {
    try {
      setIsResetting(true);
      const res = await api.resetSettings();
      if (res.success) {
        if (onSettingsUpdate && res.data) {
          onSettingsUpdate(res.data);
        }
        setResetDialogOpen(false);
        if (onNotify) {
          onNotify('All settings have been successfully reset to factory defaults!', 'success');
        }
      } else {
        throw new Error(res.message || 'Failed to reset settings');
      }
    } catch (err) {
      if (onNotify) {
        onNotify('Reset error: ' + err.message, 'error');
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      {/* Hidden input for Import JSON */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,application/json"
        style={{ display: 'none' }}
      />

      {/* 1. Header Hero Card */}
      <Card elevation={0} sx={{ borderRadius: '12px !important', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#ffffff' }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <AutoAwesomeRoundedIcon sx={{ color: '#38bdf8', fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  Coming Soon Maintenance Mode Pro Studio
                </Typography>
                <Chip label="v3.2.1" color="primary" size="small" sx={{ fontWeight: 800, borderRadius: '6px' }} />
              </Box>
              <Typography variant="body1" sx={{ color: '#94a3b8', maxWidth: 780, lineHeight: 1.6 }}>
                Comprehensive user guide, implementation workflows, newsletter integrations, SEO configuration, and real-world use cases.
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
                color: '#ffffff !important',
                backgroundColor: '#2563eb !important',
                textDecoration: 'none !important',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
                '&:hover': {
                  backgroundColor: '#1d4ed8 !important',
                  color: '#ffffff !important',
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
                    Save a full snapshot of your website mode, active template, content, logo, timer dates, form designs, custom CSS, SEO, and social links.
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
                    Restore all Coming Soon, content branding, styling, and integration settings back to original factory defaults.
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
            <strong>Warning:</strong> This action will permanently erase all your custom headlines, backgrounds, logo configurations, custom CSS styles, subscriber form designs, and third-party integrations. All settings will be restored to fresh installation defaults.
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
                    <Chip label="250 Contacts / 500 Emails/Mo (250/Day)" size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>API Key (e.g. key-us21), Audience/List ID</TableCell>
                  <TableCell>Industry standard audience tagging & drip campaigns.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Brevo (Sendinblue)</TableCell>
                  <TableCell>
                    <Chip label="300 Emails/Day (~9,000/Mo) & Up to 100k Contacts" size="small" color="info" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>API Key (v3), Optional List ID</TableCell>
                  <TableCell>Store up to 100,000 leads for free with 300 daily email quota.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>MailerLite</TableCell>
                  <TableCell>
                    <Chip label="250 Subscribers / 2,500 Emails/Mo" size="small" color="success" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>Bearer API Token, Optional Group ID</TableCell>
                  <TableCell>Clean deliverability with advanced campaign builder.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Zapier / Make / Webhooks</TableCell>
                  <TableCell>
                    <Chip label="Unlimited Direct Push" size="small" color="secondary" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>Webhook Endpoint URL</TableCell>
                  <TableCell>Connect to Google Sheets, Notion, HubSpot, or ActiveCampaign.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Custom SMTP Mailer</TableCell>
                  <TableCell>
                    <Chip label="Gmail (500/day) or Hosting SMTP" size="small" color="warning" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>Host, Port, TLS/SSL, Username, Password</TableCell>
                  <TableCell>Eliminates spam filtering for Admin & Welcome emails.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* 4. Real-World Use Cases & Step-by-Step Workflows */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.15rem' }}>
            💡 Real-World Use Cases & Step-by-Step Workflows
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Detailed guides for common scenarios to help you get the most out of Coming Soon Pro.
          </Typography>

          <Stack spacing={2}>
            <Accordion defaultExpanded elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2563eb' }}>
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

            <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#d97706' }}>
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

            <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#7c3aed' }}>
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

            <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0284c7' }}>
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
            <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Why are my emails going to the Spam folder or not sending?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Default WordPress wp_mail relies on the web host unauthenticated PHP mail, which is often flagged by Gmail and Outlook. To solve this, go to <strong>Newsletter & Integrations -&gt; Custom SMTP Mail Delivery</strong>, enable SMTP, and enter your Gmail, SendGrid, or hosting SMTP credentials.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  How do I preview a different template before activating it?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  In the <strong>Templates (36)</strong> tab, every template card has an <strong>Eye Icon (Preview)</strong> button. Clicking it opens a live interactive preview of that specific template in a new browser tab without affecting your live website.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
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

      {/* 7. Version Changelog */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1.15rem' }}>
            Version History & Changelog
          </Typography>

          <Stack spacing={2.5}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip label="v3.2.1" color="primary" size="small" sx={{ fontWeight: 800, borderRadius: '6px' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Complete SEO Suite, Newsletter APIs, Dynamic Social Channels & Modern Centered Studio
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2.5, m: 0, lineHeight: 1.8 }}>
                <li><strong>Universal SEO Suite:</strong> Added Open Graph, Twitter Cards, Canonical links, Google Analytics, and Schema.org JSON-LD structured data to all 36 templates.</li>
                <li><strong>Newsletter Integrations:</strong> Added Mailchimp v3 API sync, Brevo (Sendinblue) API v3 sync, MailerLite API sync, and Custom Webhook (Zapier/Make) dispatcher with live test connections.</li>
                <li><strong>Automated Email Templates & Live Preview:</strong> Admin Alert, Subscriber Welcome Email, and <strong>Site Live Announcement Email</strong> with automatic launch broadcast, custom header/footer colors branding, dynamic tag placeholders, and live desktop/mobile preview modal.</li>
                <li><strong>Custom SMTP Mailer:</strong> Integrated PHPMailer SMTP hook for reliable inbox delivery via Gmail, SendGrid, or hosting SMTP.</li>
                <li><strong>Dynamic Custom Social Channels:</strong> Added custom platform creator with 12+ 1-click presets and FontAwesome icon selector.</li>
                <li><strong>Modern Centered Studio Preloader:</strong> Synchronized PHP pre-mount and React loaders into a sleek, light glassmorphic centered floating card.</li>
                <li><strong>Database & Security Layer:</strong> Dedicated indexed MySQL table <code>wp_csmm_subscribers</code> with sanitized streaming CSV export and ErrorBoundary protection.</li>
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip label="v3.1.0" size="small" sx={{ fontWeight: 700, borderRadius: '6px' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  20 New Templates Addition
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2.5, m: 0 }}>
                <li>Added 20 brand new responsive templates (expanding collection to 36 templates).</li>
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
