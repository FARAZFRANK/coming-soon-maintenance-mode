import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tabs,
  Tab,
  Stack,
  Alert,
  MenuItem,
  Paper,
  IconButton,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WebhookRoundedIcon from '@mui/icons-material/WebhookRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ForwardToInboxRoundedIcon from '@mui/icons-material/ForwardToInboxRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import LaptopRoundedIcon from '@mui/icons-material/LaptopRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import { api } from '../api';

// Pixel-perfect Color Picker Field seamlessly aligned with standard MUI TextFields
function ColorPickerField({ label, value, defaultValue = '#ffffff', onChange, helperText }) {
  const hexVal = value || defaultValue;

  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      value={hexVal}
      onChange={(e) => onChange(e.target.value)}
      placeholder="#ffffff"
      helperText={helperText || ' '}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ mr: 0.75 }}>
            <Box
              component="label"
              sx={{
                width: 22,
                height: 22,
                borderRadius: '4px',
                backgroundColor: hexVal.startsWith('#') ? hexVal : defaultValue,
                border: '1px solid rgba(0,0,0,0.2)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.15s ease',
                '&:hover': {
                  transform: 'scale(1.15)',
                },
              }}
            >
              <input
                type="color"
                value={hexVal.startsWith('#') && hexVal.length === 7 ? hexVal : defaultValue}
                onChange={(e) => onChange(e.target.value)}
                style={{
                  position: 'absolute',
                  top: -10,
                  left: -10,
                  width: 50,
                  height: 50,
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
            </Box>
          </InputAdornment>
        ),
        sx: {
          fontFamily: 'Consolas, Monaco, monospace',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#0f172a',
        },
      }}
    />
  );
}

export default function IntegrationsTab({ data, onChange, onNotify }) {
  const integrations = data.integrations || {
    mailchimp_enabled: false,
    mailchimp_api_key: '',
    mailchimp_list_id: '',
    brevo_enabled: false,
    brevo_api_key: '',
    brevo_list_id: '',
    mailerlite_enabled: false,
    mailerlite_api_key: '',
    mailerlite_group_id: '',
    webhook_enabled: false,
    webhook_url: '',
    smtp_enabled: false,
    smtp_host: '',
    smtp_port: '587',
    smtp_encryption: 'tls',
    smtp_username: '',
    smtp_password: '',
    smtp_from_email: '',
    smtp_from_name: '',
    admin_email_enabled: true,
    admin_email_recipient: '',
    admin_email_subject: 'New Subscriber Lead Captured on {site_name} 🎉',
    admin_email_body: "<h2>New Subscriber Lead!</h2>\n<p>A new visitor has subscribed to your Coming Soon newsletter:</p>\n<p><strong>Email:</strong> {subscriber_email}<br><strong>IP Address:</strong> {ip_address}<br><strong>Date:</strong> {date}</p>",
    welcome_email_enabled: true,
    welcome_email_subject: 'Thank you for subscribing to {site_name}! 🚀',
    welcome_email_body: "<h2>Welcome to {site_name}!</h2>\n<p>Hi there,</p>\n<p>Thank you for subscribing to our newsletter! We are currently working hard behind the scenes to launch our brand new website.</p>\n<p>You'll be the very first to know when we go live on <strong>{launch_date}</strong>!</p>\n<p>Best regards,<br>The {site_name} Team</p>",
    launch_email_enabled: true,
    launch_email_subject: 'We are officially LIVE! 🚀 Welcome to {site_name}',
    launch_email_body: "<h2>We Are Officially Live! 🎉</h2>\n<p>Hi there,</p>\n<p>The wait is finally over! We have officially launched our brand new website, and you are the first to know.</p>\n<p>Discover our latest features, products, and exclusive offers right now.</p>\n<p style=\"text-align: center; margin: 30px 0;\"><a href=\"{site_url}\" style=\"background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; display: inline-block;\">Start Exploring Now 🚀</a></p>\n<p>Thank you for being part of our early journey!</p>\n<p>Best regards,<br>The {site_name} Team</p>",
    email_header_title: '{site_name}',
    email_header_bg: '#2563eb',
    email_header_color: '#ffffff',
    email_bg_color: '#f8fafc',
    email_card_bg: '#ffffff',
    email_text_color: '#1e293b',
    email_footer_text: '© {year} {site_name}. All rights reserved.',
    email_footer_bg: '#f1f5f9',
    email_footer_color: '#64748b',
  };

  const [emailSubTab, setEmailSubTab] = useState(0); // 0: Admin Alert, 1: Welcome Email, 2: Site Live Email, 3: Template Styling & Branding

  // Testing states
  const [testingMailchimp, setTestingMailchimp] = useState(false);
  const [mailchimpResult, setMailchimpResult] = useState(null);

  const [testingBrevo, setTestingBrevo] = useState(false);
  const [brevoResult, setBrevoResult] = useState(null);

  const [testingMailerLite, setTestingMailerLite] = useState(false);
  const [mailerLiteResult, setMailerLiteResult] = useState(null);

  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookResult, setWebhookResult] = useState(null);

  // Test Email Dialog State
  const [testEmailDialogOpen, setTestEmailDialogOpen] = useState(false);
  const [testEmailRecipient, setTestEmailRecipient] = useState('');
  const [testEmailType, setTestEmailType] = useState('welcome');
  const [sendingTestEmail, setSendingTestEmail] = useState(false);

  // Broadcast Launch Dialog State
  const [broadcastDialogOpen, setBroadcastDialogOpen] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);

  // Live Email Preview Modal State
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewType, setPreviewType] = useState('welcome'); // 'admin', 'welcome', 'launch'
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' or 'mobile'

  const updateIntegration = (field, val) => {
    onChange('integrations', {
      ...integrations,
      [field]: val,
    });
  };

  // Test Mailchimp
  const handleTestMailchimp = async () => {
    if (!integrations.mailchimp_api_key || !integrations.mailchimp_list_id) {
      if (onNotify) onNotify('Please enter both Mailchimp API Key and Audience/List ID', 'warning');
      return;
    }
    setTestingMailchimp(true);
    setMailchimpResult(null);
    try {
      const res = await api.testMailchimp(integrations.mailchimp_api_key, integrations.mailchimp_list_id);
      setMailchimpResult({ success: true, message: res.message });
      if (onNotify) onNotify(res.message, 'success');
    } catch (err) {
      setMailchimpResult({ success: false, message: err.message });
      if (onNotify) onNotify('Mailchimp test failed: ' + err.message, 'error');
    } finally {
      setTestingMailchimp(false);
    }
  };

  // Test Brevo
  const handleTestBrevo = async () => {
    if (!integrations.brevo_api_key) {
      if (onNotify) onNotify('Please enter your Brevo API Key', 'warning');
      return;
    }
    setTestingBrevo(true);
    setBrevoResult(null);
    try {
      const res = await api.testBrevo(integrations.brevo_api_key, integrations.brevo_list_id);
      setBrevoResult({ success: true, message: res.message });
      if (onNotify) onNotify(res.message, 'success');
    } catch (err) {
      setBrevoResult({ success: false, message: err.message });
      if (onNotify) onNotify('Brevo test failed: ' + err.message, 'error');
    } finally {
      setTestingBrevo(false);
    }
  };

  // Test MailerLite
  const handleTestMailerLite = async () => {
    if (!integrations.mailerlite_api_key) {
      if (onNotify) onNotify('Please enter your MailerLite API Key', 'warning');
      return;
    }
    setTestingMailerLite(true);
    setMailerLiteResult(null);
    try {
      const res = await api.testMailerLite(integrations.mailerlite_api_key, integrations.mailerlite_group_id);
      setMailerLiteResult({ success: true, message: res.message });
      if (onNotify) onNotify(res.message, 'success');
    } catch (err) {
      setMailerLiteResult({ success: false, message: err.message });
      if (onNotify) onNotify('MailerLite test failed: ' + err.message, 'error');
    } finally {
      setTestingMailerLite(false);
    }
  };

  // Test Webhook
  const handleTestWebhook = async () => {
    if (!integrations.webhook_url) {
      if (onNotify) onNotify('Please enter a Webhook URL', 'warning');
      return;
    }
    setTestingWebhook(true);
    setWebhookResult(null);
    try {
      const res = await api.testWebhook(integrations.webhook_url);
      setWebhookResult({ success: true, message: res.message });
      if (onNotify) onNotify('Webhook pinged successfully! ' + res.message, 'success');
    } catch (err) {
      setWebhookResult({ success: false, message: err.message });
      if (onNotify) onNotify('Webhook failed: ' + err.message, 'error');
    } finally {
      setTestingWebhook(false);
    }
  };

  // Open Test Email Modal
  const openTestEmailModal = (type) => {
    setTestEmailType(type);
    setTestEmailRecipient(integrations.admin_email_recipient || integrations.smtp_from_email || '');
    setTestEmailDialogOpen(true);
  };

  // Send Test Email
  const handleSendTestEmail = async () => {
    if (!testEmailRecipient) {
      if (onNotify) onNotify('Please enter recipient email', 'warning');
      return;
    }
    setSendingTestEmail(true);
    try {
      let subject = integrations.welcome_email_subject;
      let body = integrations.welcome_email_body;

      if (testEmailType === 'admin') {
        subject = integrations.admin_email_subject;
        body = integrations.admin_email_body;
      } else if (testEmailType === 'launch') {
        subject = integrations.launch_email_subject;
        body = integrations.launch_email_body;
      }

      const res = await api.sendTestEmail(testEmailType, testEmailRecipient, subject, body);
      if (onNotify) onNotify(res.message || 'Test email dispatched successfully!', 'success');
      setTestEmailDialogOpen(false);
    } catch (err) {
      if (onNotify) onNotify('Failed to send test email: ' + err.message, 'error');
    } finally {
      setSendingTestEmail(false);
    }
  };

  // Broadcast Launch Announcement to All Subscribers
  const handleBroadcastLaunchEmail = async () => {
    setBroadcasting(true);
    try {
      const res = await api.broadcastLaunchEmail();
      if (onNotify) onNotify(res.message || 'Site Live announcement broadcast complete!', res.success ? 'success' : 'error');
      setBroadcastDialogOpen(false);
    } catch (err) {
      if (onNotify) onNotify('Broadcast failed: ' + err.message, 'error');
    } finally {
      setBroadcasting(false);
    }
  };

  const placeholders = [
    { tag: '{site_name}', label: 'Site Name' },
    { tag: '{site_url}', label: 'Site URL' },
    { tag: '{subscriber_email}', label: 'Subscriber Email' },
    { tag: '{launch_date}', label: 'Launch Date' },
    { tag: '{countdown_time}', label: 'Launch Time' },
    { tag: '{date}', label: 'Subscription Date' },
    { tag: '{ip_address}', label: 'IP Address' },
  ];

  const insertPlaceholder = (tag, field) => {
    const currentVal = integrations[field] || '';
    updateIntegration(field, currentVal + ' ' + tag);
  };

  // Render Simulated HTML for Live Preview
  const generatePreviewHtml = (type) => {
    const siteTitle = data.title || 'My Brand';
    const siteUrl = data.site_url || 'https://example.com';
    const currentYear = new Date().getFullYear();
    const launchDate = data.countdown_date ? new Date(data.countdown_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'November 30, 2026';

    const headerTitle = (integrations.email_header_title || '{site_name}')
      .replace(/{site_name}/g, siteTitle);

    const headerBg = integrations.email_header_bg || '#2563eb';
    const headerColor = integrations.email_header_color || '#ffffff';
    const bgColor = integrations.email_bg_color || '#f8fafc';
    const cardBg = integrations.email_card_bg || '#ffffff';
    const textColor = integrations.email_text_color || '#1e293b';
    const footerBg = integrations.email_footer_bg || '#f1f5f9';
    const footerColor = integrations.email_footer_color || '#64748b';

    let bodyTemplate = integrations.welcome_email_body;
    if (type === 'admin') {
      bodyTemplate = integrations.admin_email_body;
    } else if (type === 'launch') {
      bodyTemplate = integrations.launch_email_body;
    }

    if (!bodyTemplate) {
      if (type === 'admin') {
        bodyTemplate = "<h2>New Subscriber Lead!</h2>\n<p>A new visitor has subscribed to your Coming Soon newsletter:</p>\n<p><strong>Email:</strong> {subscriber_email}<br><strong>IP Address:</strong> {ip_address}<br><strong>Date:</strong> {date}</p>";
      } else if (type === 'launch') {
        bodyTemplate = "<h2>We Are Officially Live! 🎉</h2>\n<p>Hi there,</p>\n<p>The wait is finally over! We have officially launched our brand new website, and you are the first to know.</p>\n<p>Discover our latest features, products, and exclusive offers right now.</p>\n<p style=\"text-align: center; margin: 30px 0;\"><a href=\"{site_url}\" style=\"background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; display: inline-block;\">Start Exploring Now 🚀</a></p>\n<p>Thank you for being part of our early journey!</p>\n<p>Best regards,<br>The {site_name} Team</p>";
      } else {
        bodyTemplate = "<h2>Welcome to {site_name}!</h2>\n<p>Hi there,</p>\n<p>Thank you for subscribing to our newsletter! We are currently working hard behind the scenes to launch our brand new website.</p>\n<p>You'll be the very first to know when we go live on <strong>{launch_date}</strong>!</p>\n<p>Best regards,<br>The {site_name} Team</p>";
      }
    }

    const replacedBody = bodyTemplate
      .replace(/{site_name}/g, siteTitle)
      .replace(/{site_url}/g, siteUrl)
      .replace(/{subscriber_email}/g, 'sarah.johnson@example.com')
      .replace(/{launch_date}/g, launchDate)
      .replace(/{countdown_time}/g, data.countdown_time || '10:00')
      .replace(/{date}/g, new Date().toLocaleString())
      .replace(/{ip_address}/g, '192.168.1.105')
      .replace(/\n/g, '<br>');

    const defaultFooter = `© ${currentYear} ${siteTitle}. All rights reserved.`;
    const footerText = (integrations.email_footer_text || defaultFooter)
      .replace(/{site_name}/g, siteTitle)
      .replace(/{site_url}/g, siteUrl)
      .replace(/{year}/g, currentYear);

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: ${bgColor}; margin: 0; padding: 24px; color: ${textColor}; }
.card { max-width: 560px; margin: 0 auto; background: ${cardBg}; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
.header { background: ${headerBg}; color: ${headerColor}; padding: 24px; text-align: center; }
.header h1 { margin: 0; font-size: 20px; font-weight: 700; color: ${headerColor}; }
.body { padding: 28px 24px; line-height: 1.65; font-size: 15px; color: ${textColor}; }
.body h2 { margin-top: 0; color: ${textColor}; }
.footer { background: ${footerBg}; padding: 16px 24px; text-align: center; font-size: 12px; color: ${footerColor}; border-top: 1px solid #e2e8f0; }
.footer a { color: ${headerBg}; text-decoration: none; font-weight: 500; }
</style>
</head>
<body>
<div class="card">
<div class="header">
<h1>${headerTitle}</h1>
</div>
<div class="body">${replacedBody}</div>
<div class="footer">
<p style="margin: 0; color: ${footerColor};">${footerText}</p>
</div>
</div>
</body>
</html>`;
  };

  const getPreviewTypeForActiveTab = () => {
    if (emailSubTab === 0) return 'admin';
    if (emailSubTab === 2) return 'launch';
    return 'welcome';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      {/* 1. Mailchimp Integration Card */}
      <Card sx={{ borderRadius: '10px' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MarkEmailReadRoundedIcon sx={{ color: '#2563eb', fontSize: 28 }} />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Typography variant="h6" fontWeight={700}>
                    Mailchimp API v3
                  </Typography>
                  <Chip
                    label="Free Tier: 500 Contacts / 1,000 Emails/Mo"
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 700, fontSize: '0.72rem', height: 22, borderRadius: '6px' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Automatically sync new subscribers into your Mailchimp Audience.
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(integrations.mailchimp_enabled)}
                  onChange={(e) => updateIntegration('mailchimp_enabled', e.target.checked)}
                  color="primary"
                />
              }
              label={integrations.mailchimp_enabled ? 'Active' : 'Disabled'}
              sx={{ m: 0 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                label="Mailchimp API Key"
                placeholder="e.g. abcd1234efgh5678ijkl-us21"
                value={integrations.mailchimp_api_key || ''}
                onChange={(e) => updateIntegration('mailchimp_api_key', e.target.value)}
                disabled={!integrations.mailchimp_enabled}
                helperText="Found in Mailchimp: Profile -> Extras -> API Keys"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Audience / List ID"
                placeholder="e.g. a1b2c3d4e5"
                value={integrations.mailchimp_list_id || ''}
                onChange={(e) => updateIntegration('mailchimp_list_id', e.target.value)}
                disabled={!integrations.mailchimp_enabled}
                helperText="Found in Audience Settings -> Audience name and defaults"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  onClick={handleTestMailchimp}
                  disabled={!integrations.mailchimp_enabled || testingMailchimp}
                  startIcon={testingMailchimp ? <CircularProgress size={18} /> : <CheckCircleRoundedIcon />}
                  sx={{ borderRadius: '8px' }}
                >
                  {testingMailchimp ? 'Testing Connection...' : 'Test Mailchimp Connection'}
                </Button>
                {mailchimpResult && (
                  <Chip
                    icon={mailchimpResult.success ? <CheckCircleRoundedIcon /> : <ErrorOutlineRoundedIcon />}
                    label={mailchimpResult.message}
                    color={mailchimpResult.success ? 'success' : 'error'}
                    variant="outlined"
                    sx={{ borderRadius: '8px', fontWeight: 600 }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 2. Brevo (Sendinblue) Integration Card */}
      <Card sx={{ borderRadius: '10px' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <ContactMailRoundedIcon sx={{ color: '#0284c7', fontSize: 28 }} />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Typography variant="h6" fontWeight={700}>
                    Brevo (Sendinblue) API v3
                  </Typography>
                  <Chip
                    label="Free Tier: 300 Emails/Day (9,000/Mo) & Unlimited Contacts"
                    size="small"
                    color="info"
                    variant="outlined"
                    sx={{ fontWeight: 700, fontSize: '0.72rem', height: 22, borderRadius: '6px' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Real-time subscriber capture and contact list synchronization via Brevo API v3.
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(integrations.brevo_enabled)}
                  onChange={(e) => updateIntegration('brevo_enabled', e.target.checked)}
                  color="primary"
                />
              }
              label={integrations.brevo_enabled ? 'Active' : 'Disabled'}
              sx={{ m: 0 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Brevo API Key (v3)"
                placeholder="xkeysib-..."
                value={integrations.brevo_api_key || ''}
                onChange={(e) => updateIntegration('brevo_api_key', e.target.value)}
                disabled={!integrations.brevo_enabled}
                helperText="Found in Brevo: SMTP & API -> API Keys"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="List ID (Optional)"
                placeholder="e.g. 2"
                value={integrations.brevo_list_id || ''}
                onChange={(e) => updateIntegration('brevo_list_id', e.target.value)}
                disabled={!integrations.brevo_enabled}
                helperText="Leave empty to add to general contacts"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  onClick={handleTestBrevo}
                  disabled={!integrations.brevo_enabled || testingBrevo}
                  startIcon={testingBrevo ? <CircularProgress size={18} /> : <CheckCircleRoundedIcon />}
                  sx={{ borderRadius: '8px' }}
                >
                  {testingBrevo ? 'Testing Connection...' : 'Test Brevo Connection'}
                </Button>
                {brevoResult && (
                  <Chip
                    icon={brevoResult.success ? <CheckCircleRoundedIcon /> : <ErrorOutlineRoundedIcon />}
                    label={brevoResult.message}
                    color={brevoResult.success ? 'success' : 'error'}
                    variant="outlined"
                    sx={{ borderRadius: '8px', fontWeight: 600 }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 3. MailerLite Integration Card */}
      <Card sx={{ borderRadius: '10px' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MailOutlineRoundedIcon sx={{ color: '#16a34a', fontSize: 28 }} />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Typography variant="h6" fontWeight={700}>
                    MailerLite API
                  </Typography>
                  <Chip
                    label="Free Tier: 1,000 Subscribers / 12,000 Emails/Mo"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ fontWeight: 700, fontSize: '0.72rem', height: 22, borderRadius: '6px' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Automatically sync coming soon subscribers into MailerLite subscriber groups.
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(integrations.mailerlite_enabled)}
                  onChange={(e) => updateIntegration('mailerlite_enabled', e.target.checked)}
                  color="success"
                />
              }
              label={integrations.mailerlite_enabled ? 'Active' : 'Disabled'}
              sx={{ m: 0 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="MailerLite API Token"
                placeholder="Bearer token..."
                value={integrations.mailerlite_api_key || ''}
                onChange={(e) => updateIntegration('mailerlite_api_key', e.target.value)}
                disabled={!integrations.mailerlite_enabled}
                helperText="Found in MailerLite: Integrations -> API"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Group ID (Optional)"
                placeholder="e.g. 123456789"
                value={integrations.mailerlite_group_id || ''}
                onChange={(e) => updateIntegration('mailerlite_group_id', e.target.value)}
                disabled={!integrations.mailerlite_enabled}
                helperText="Leave empty to add to all subscribers"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleTestMailerLite}
                  disabled={!integrations.mailerlite_enabled || testingMailerLite}
                  startIcon={testingMailerLite ? <CircularProgress size={18} /> : <CheckCircleRoundedIcon />}
                  sx={{ borderRadius: '8px' }}
                >
                  {testingMailerLite ? 'Testing Connection...' : 'Test MailerLite Connection'}
                </Button>
                {mailerLiteResult && (
                  <Chip
                    icon={mailerLiteResult.success ? <CheckCircleRoundedIcon /> : <ErrorOutlineRoundedIcon />}
                    label={mailerLiteResult.message}
                    color={mailerLiteResult.success ? 'success' : 'error'}
                    variant="outlined"
                    sx={{ borderRadius: '8px', fontWeight: 600 }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 4. Webhook Dispatcher Card */}
      <Card sx={{ borderRadius: '10px' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <WebhookRoundedIcon sx={{ color: '#7c3aed', fontSize: 28 }} />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Typography variant="h6" fontWeight={700}>
                    Zapier / Make / Webhook Dispatcher
                  </Typography>
                  <Chip
                    label="Free / Unlimited Direct Push"
                    size="small"
                    color="secondary"
                    variant="outlined"
                    sx={{ fontWeight: 700, fontSize: '0.72rem', height: 22, borderRadius: '6px' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Trigger an automated HTTP POST webhook with subscriber data to Zapier, Make, Pabbly, or custom CRM.
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(integrations.webhook_enabled)}
                  onChange={(e) => updateIntegration('webhook_enabled', e.target.checked)}
                  color="secondary"
                />
              }
              label={integrations.webhook_enabled ? 'Active' : 'Disabled'}
              sx={{ m: 0 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Webhook Endpoint URL"
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={integrations.webhook_url || ''}
                onChange={(e) => updateIntegration('webhook_url', e.target.value)}
                disabled={!integrations.webhook_enabled}
                helperText="Payload sends JSON: { event: 'subscriber.created', email, ip_address, timestamp, site_name, site_url }"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleTestWebhook}
                  disabled={!integrations.webhook_enabled || testingWebhook}
                  startIcon={testingWebhook ? <CircularProgress size={18} /> : <SendRoundedIcon />}
                  sx={{ borderRadius: '8px' }}
                >
                  {testingWebhook ? 'Sending Ping...' : 'Send Test Webhook Payload'}
                </Button>
                {webhookResult && (
                  <Chip
                    icon={webhookResult.success ? <CheckCircleRoundedIcon /> : <ErrorOutlineRoundedIcon />}
                    label={webhookResult.message}
                    color={webhookResult.success ? 'success' : 'error'}
                    variant="outlined"
                    sx={{ borderRadius: '8px', fontWeight: 600 }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 5. Custom SMTP Server Configuration */}
      <Card sx={{ borderRadius: '10px' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <DnsRoundedIcon sx={{ color: '#d97706', fontSize: 28 }} />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Typography variant="h6" fontWeight={700}>
                    Custom SMTP Mail Delivery
                  </Typography>
                  <Chip
                    label="Free: Gmail (500/day), SendGrid (100/day) or Hosting SMTP"
                    size="small"
                    color="warning"
                    variant="outlined"
                    sx={{ fontWeight: 700, fontSize: '0.72rem', height: 22, borderRadius: '6px' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Route all notifications through a reliable external SMTP server (Gmail, SendGrid, Amazon SES, or cPanel).
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(integrations.smtp_enabled)}
                  onChange={(e) => updateIntegration('smtp_enabled', e.target.checked)}
                  color="warning"
                />
              }
              label={integrations.smtp_enabled ? 'Active' : 'Disabled'}
              sx={{ m: 0 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SMTP Host"
                placeholder="e.g. smtp.gmail.com or smtp.sendgrid.net"
                value={integrations.smtp_host || ''}
                onChange={(e) => updateIntegration('smtp_host', e.target.value)}
                disabled={!integrations.smtp_enabled}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Port"
                placeholder="587 / 465"
                value={integrations.smtp_port || '587'}
                onChange={(e) => updateIntegration('smtp_port', e.target.value)}
                disabled={!integrations.smtp_enabled}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Encryption"
                value={integrations.smtp_encryption || 'tls'}
                onChange={(e) => updateIntegration('smtp_encryption', e.target.value)}
                disabled={!integrations.smtp_enabled}
              >
                <MenuItem value="tls">TLS (Port 587)</MenuItem>
                <MenuItem value="ssl">SSL (Port 465)</MenuItem>
                <MenuItem value="none">None (Port 25)</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SMTP Username"
                placeholder="username@gmail.com"
                value={integrations.smtp_username || ''}
                onChange={(e) => updateIntegration('smtp_username', e.target.value)}
                disabled={!integrations.smtp_enabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="password"
                label="SMTP Password / App Password"
                placeholder="••••••••••••"
                value={integrations.smtp_password || ''}
                onChange={(e) => updateIntegration('smtp_password', e.target.value)}
                disabled={!integrations.smtp_enabled}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Sender From Email"
                placeholder="noreply@yourdomain.com"
                value={integrations.smtp_from_email || ''}
                onChange={(e) => updateIntegration('smtp_from_email', e.target.value)}
                disabled={!integrations.smtp_enabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Sender From Name"
                placeholder="e.g. My Awesome Brand"
                value={integrations.smtp_from_name || ''}
                onChange={(e) => updateIntegration('smtp_from_name', e.target.value)}
                disabled={!integrations.smtp_enabled}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 6. Email Notification Engine & Full Template Customizer with Live Preview */}
      <Card sx={{ borderRadius: '10px' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailRoundedIcon sx={{ color: '#059669', fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Automated Email Templates, Branding & Live Preview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure dynamic lead alerts, welcome emails, site launch announcements, custom header/footer branding, colors, and live test previews.
                </Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<VisibilityRoundedIcon />}
              onClick={() => {
                setPreviewType(getPreviewTypeForActiveTab());
                setPreviewModalOpen(true);
              }}
              sx={{ borderRadius: '8px', fontWeight: 700 }}
            >
              Live Preview Template
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Tabs
            value={emailSubTab}
            onChange={(e, val) => setEmailSubTab(val)}
            sx={{
              mb: 3,
              borderBottom: '1px solid #e2e8f0',
              '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', minHeight: 44 },
            }}
          >
            <Tab icon={<ForwardToInboxRoundedIcon sx={{ mr: 1 }} />} iconPosition="start" label="Admin Lead Alert" />
            <Tab icon={<EmailRoundedIcon sx={{ mr: 1 }} />} iconPosition="start" label="Subscriber Welcome Email" />
            <Tab icon={<RocketLaunchRoundedIcon sx={{ mr: 1, color: '#2563eb' }} />} iconPosition="start" label="Site Live Announcement Email" />
            <Tab icon={<PaletteRoundedIcon sx={{ mr: 1 }} />} iconPosition="start" label="Template Header, Footer & Colors" />
          </Tabs>

          {/* TAB 0: Admin Alert */}
          {emailSubTab === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Admin Notification Email
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(integrations.admin_email_enabled)}
                      onChange={(e) => updateIntegration('admin_email_enabled', e.target.checked)}
                      color="success"
                    />
                  }
                  label={integrations.admin_email_enabled ? 'Enabled' : 'Disabled'}
                />
              </Box>

              <Grid container spacing={2.5}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Admin Recipient Email"
                    placeholder="admin@example.com"
                    value={integrations.admin_email_recipient || ''}
                    onChange={(e) => updateIntegration('admin_email_recipient', e.target.value)}
                    disabled={!integrations.admin_email_enabled}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Subject"
                    value={integrations.admin_email_subject || ''}
                    onChange={(e) => updateIntegration('admin_email_subject', e.target.value)}
                    disabled={!integrations.admin_email_enabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                      Available Dynamic Tags (Click to insert):
                    </Typography>
                    {placeholders.map((p) => (
                      <Chip
                        key={p.tag}
                        label={p.tag}
                        size="small"
                        clickable
                        onClick={() => insertPlaceholder(p.tag, 'admin_email_body')}
                        sx={{ borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'monospace' }}
                      />
                    ))}
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Email HTML Body"
                    value={integrations.admin_email_body || ''}
                    onChange={(e) => updateIntegration('admin_email_body', e.target.value)}
                    disabled={!integrations.admin_email_enabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<SendRoundedIcon />}
                    onClick={() => openTestEmailModal('admin')}
                    disabled={!integrations.admin_email_enabled}
                    sx={{ borderRadius: '8px' }}
                  >
                    Send Test Admin Email
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* TAB 1: Subscriber Welcome Email */}
          {emailSubTab === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Subscriber Welcome Email
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(integrations.welcome_email_enabled)}
                      onChange={(e) => updateIntegration('welcome_email_enabled', e.target.checked)}
                      color="success"
                    />
                  }
                  label={integrations.welcome_email_enabled ? 'Enabled' : 'Disabled'}
                />
              </Box>

              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Subject"
                    value={integrations.welcome_email_subject || ''}
                    onChange={(e) => updateIntegration('welcome_email_subject', e.target.value)}
                    disabled={!integrations.welcome_email_enabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                      Available Dynamic Tags (Click to insert):
                    </Typography>
                    {placeholders.map((p) => (
                      <Chip
                        key={p.tag}
                        label={p.tag}
                        size="small"
                        clickable
                        onClick={() => insertPlaceholder(p.tag, 'welcome_email_body')}
                        sx={{ borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'monospace' }}
                      />
                    ))}
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Email HTML Body"
                    value={integrations.welcome_email_body || ''}
                    onChange={(e) => updateIntegration('welcome_email_body', e.target.value)}
                    disabled={!integrations.welcome_email_enabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<SendRoundedIcon />}
                    onClick={() => openTestEmailModal('welcome')}
                    disabled={!integrations.welcome_email_enabled}
                    sx={{ borderRadius: '8px' }}
                  >
                    Send Test Welcome Email
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* TAB 2: Site Live Announcement Email */}
          {emailSubTab === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Website Live Announcement Email
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Automatically sent to all subscribers when Coming Soon mode is disabled (or broadcast manually).
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(integrations.launch_email_enabled)}
                      onChange={(e) => updateIntegration('launch_email_enabled', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={integrations.launch_email_enabled ? 'Enabled' : 'Disabled'}
                />
              </Box>

              <Alert severity="info" sx={{ borderRadius: '8px' }}>
                When your website goes Live (either automatically when countdown hits zero, or when you switch Website Mode to "Disabled / Website Live"), this notification invites all your subscribers to start browsing your live site!
              </Alert>

              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Subject"
                    value={integrations.launch_email_subject || ''}
                    onChange={(e) => updateIntegration('launch_email_subject', e.target.value)}
                    disabled={!integrations.launch_email_enabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                      Available Dynamic Tags (Click to insert):
                    </Typography>
                    {placeholders.map((p) => (
                      <Chip
                        key={p.tag}
                        label={p.tag}
                        size="small"
                        clickable
                        onClick={() => insertPlaceholder(p.tag, 'launch_email_body')}
                        sx={{ borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'monospace' }}
                      />
                    ))}
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    label="Email HTML Body"
                    value={integrations.launch_email_body || ''}
                    onChange={(e) => updateIntegration('launch_email_body', e.target.value)}
                    disabled={!integrations.launch_email_enabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<SendRoundedIcon />}
                      onClick={() => openTestEmailModal('launch')}
                      disabled={!integrations.launch_email_enabled}
                      sx={{ borderRadius: '8px' }}
                    >
                      Send Test Launch Email
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<CampaignRoundedIcon />}
                      onClick={() => setBroadcastDialogOpen(true)}
                      disabled={!integrations.launch_email_enabled}
                      sx={{ borderRadius: '8px', fontWeight: 700 }}
                    >
                      Broadcast to All Subscribers Now
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* TAB 3: Template Header, Footer & Colors Customizer */}
          {emailSubTab === 3 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Alert severity="info" sx={{ borderRadius: '8px' }}>
                Customize the colors, header branding, and footer copyright to perfectly match your website's look & feel.
              </Alert>

              <Grid container spacing={2.5}>
                {/* Header Branding */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Header Section Branding
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email Header Title / Brand Name"
                    placeholder="{site_name}"
                    value={integrations.email_header_title || ''}
                    onChange={(e) => updateIntegration('email_header_title', e.target.value)}
                    helperText="Supports {site_name} tag or custom text"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <ColorPickerField
                    label="Header Background"
                    value={integrations.email_header_bg}
                    defaultValue="#2563eb"
                    onChange={(val) => updateIntegration('email_header_bg', val)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <ColorPickerField
                    label="Header Text Color"
                    value={integrations.email_header_color}
                    defaultValue="#ffffff"
                    onChange={(val) => updateIntegration('email_header_color', val)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Body Canvas & Card Colors */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Email Body & Canvas Styling
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ColorPickerField
                    label="Outer Background Color"
                    value={integrations.email_bg_color}
                    defaultValue="#f8fafc"
                    onChange={(val) => updateIntegration('email_bg_color', val)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ColorPickerField
                    label="Card Background Color"
                    value={integrations.email_card_bg}
                    defaultValue="#ffffff"
                    onChange={(val) => updateIntegration('email_card_bg', val)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ColorPickerField
                    label="Main Text Color"
                    value={integrations.email_text_color}
                    defaultValue="#1e293b"
                    onChange={(val) => updateIntegration('email_text_color', val)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Footer Section */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Footer Section Styling
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Footer Copyright Text"
                    placeholder="© {year} {site_name}. All rights reserved."
                    value={integrations.email_footer_text || ''}
                    onChange={(e) => updateIntegration('email_footer_text', e.target.value)}
                    helperText="Supports {site_name}, {year}, {site_url}"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <ColorPickerField
                    label="Footer Background"
                    value={integrations.email_footer_bg}
                    defaultValue="#f1f5f9"
                    onChange={(val) => updateIntegration('email_footer_bg', val)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <ColorPickerField
                    label="Footer Text Color"
                    value={integrations.email_footer_color}
                    defaultValue="#64748b"
                    onChange={(val) => updateIntegration('email_footer_color', val)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VisibilityRoundedIcon />}
                    onClick={() => {
                      setPreviewType('launch');
                      setPreviewModalOpen(true);
                    }}
                    sx={{ borderRadius: '8px', fontWeight: 700 }}
                  >
                    Open Live Template Preview
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* 7. LIVE EMAIL TEMPLATE PREVIEW MODAL */}
      <Dialog
        open={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '14px',
            overflow: 'hidden',
            backgroundColor: '#f8fafc',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            py: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <VisibilityRoundedIcon sx={{ color: '#2563eb' }} />
            <Typography variant="h6" fontWeight={700}>
              Live Email Template Preview
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tabs
              value={previewType}
              onChange={(e, val) => setPreviewType(val)}
              size="small"
              sx={{ minHeight: 34, '& .MuiTab-root': { minHeight: 34, py: 0.5, px: 1.5, fontSize: '0.82rem', textTransform: 'none', fontWeight: 700 } }}
            >
              <Tab value="welcome" label="Welcome Email" />
              <Tab value="launch" label="Site Live Email" />
              <Tab value="admin" label="Admin Alert" />
            </Tabs>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            <Tooltip title="Desktop View">
              <IconButton
                size="small"
                color={previewDevice === 'desktop' ? 'primary' : 'default'}
                onClick={() => setPreviewDevice('desktop')}
              >
                <LaptopRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mobile View">
              <IconButton
                size="small"
                color={previewDevice === 'mobile' ? 'primary' : 'default'}
                onClick={() => setPreviewDevice('mobile')}
              >
                <PhoneIphoneRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <IconButton size="small" onClick={() => setPreviewModalOpen(false)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3, display: 'flex', justifyContent: 'center', backgroundColor: '#f1f5f9' }}>
          <Box
            sx={{
              width: previewDevice === 'mobile' ? 380 : '100%',
              maxWidth: 600,
              transition: 'all 0.3s ease',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            }}
          >
            <iframe
              title="Live Email Preview"
              srcDoc={generatePreviewHtml(previewType)}
              style={{
                width: '100%',
                height: 520,
                border: 'none',
                display: 'block',
                backgroundColor: integrations.email_bg_color || '#f8fafc',
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            Simulating live dynamic tags for: <strong>{previewType === 'launch' ? 'Site Live Announcement' : previewType === 'welcome' ? 'Subscriber Welcome Email' : 'Admin Lead Alert'}</strong>.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              color="success"
              startIcon={<SendRoundedIcon />}
              onClick={() => {
                setPreviewModalOpen(false);
                openTestEmailModal(previewType);
              }}
              sx={{ borderRadius: '8px', fontWeight: 600 }}
            >
              Send Live Test
            </Button>
            <Button onClick={() => setPreviewModalOpen(false)} sx={{ borderRadius: '8px' }}>
              Close Preview
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* 8. SEND TEST EMAIL DIALOG */}
      <Dialog
        open={testEmailDialogOpen}
        onClose={() => setTestEmailDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '10px' } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {testEmailType === 'admin' ? 'Send Test Admin Alert Email' : testEmailType === 'launch' ? 'Send Test Site Live Announcement Email' : 'Send Test Welcome Email'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter a destination email address. A test email with all customized colors, header/footer styling, and placeholder tags will be dispatched immediately.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Send Test Email To"
            placeholder="your-email@example.com"
            value={testEmailRecipient}
            onChange={(e) => setTestEmailRecipient(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setTestEmailDialogOpen(false)} sx={{ borderRadius: '8px' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendTestEmail}
            disabled={sendingTestEmail || !testEmailRecipient}
            startIcon={sendingTestEmail ? <CircularProgress size={18} color="inherit" /> : <SendRoundedIcon />}
            sx={{ borderRadius: '8px' }}
          >
            {sendingTestEmail ? 'Sending...' : 'Send Test Now'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 9. BROADCAST LAUNCH ANNOUNCEMENT CONFIRMATION DIALOG */}
      <Dialog
        open={broadcastDialogOpen}
        onClose={() => setBroadcastDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '12px' } }}
      >
        <DialogTitle sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CampaignRoundedIcon sx={{ color: '#7c3aed' }} />
          Broadcast Site Live Announcement
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="warning" sx={{ mb: 2, borderRadius: '8px' }}>
            This action will immediately send the "Website Live" announcement email to <strong>ALL registered subscribers</strong> in your database.
          </Alert>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to broadcast this email now? Make sure your email template content and subject are saved and finalized before broadcasting.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setBroadcastDialogOpen(false)} sx={{ borderRadius: '8px' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBroadcastLaunchEmail}
            disabled={broadcasting}
            startIcon={broadcasting ? <CircularProgress size={18} color="inherit" /> : <RocketLaunchRoundedIcon />}
            sx={{ borderRadius: '8px', fontWeight: 700 }}
          >
            {broadcasting ? 'Broadcasting...' : 'Yes, Send Broadcast Now 🚀'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
