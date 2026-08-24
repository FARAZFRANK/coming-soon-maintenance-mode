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
} from '@mui/material';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WebhookRoundedIcon from '@mui/icons-material/WebhookRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ForwardToInboxRoundedIcon from '@mui/icons-material/ForwardToInboxRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { api } from '../api';

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
  };

  const [emailSubTab, setEmailSubTab] = useState(0); // 0: Admin Alert, 1: Welcome Email

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
      const subject = testEmailType === 'admin' ? integrations.admin_email_subject : integrations.welcome_email_subject;
      const body = testEmailType === 'admin' ? integrations.admin_email_body : integrations.welcome_email_body;

      const res = await api.sendTestEmail(testEmailType, testEmailRecipient, subject, body);
      if (onNotify) onNotify(res.message || 'Test email dispatched successfully!', 'success');
      setTestEmailDialogOpen(false);
    } catch (err) {
      if (onNotify) onNotify('Failed to send test email: ' + err.message, 'error');
    } finally {
      setSendingTestEmail(false);
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
                SelectProps={{ native: true }}
              >
                <option value="tls">TLS (Port 587)</option>
                <option value="ssl">SSL (Port 465)</option>
                <option value="none">None (Port 25)</option>
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

      {/* 6. Email Notification Engine & Template Customizer */}
      <Card sx={{ borderRadius: '10px' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <EmailRoundedIcon sx={{ color: '#059669', fontSize: 28 }} />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Automated Email Templates & Delivery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure instant admin lead alerts and subscriber welcome emails with dynamic tags.
              </Typography>
            </Box>
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
        </CardContent>
      </Card>

      {/* SEND TEST EMAIL DIALOG */}
      <Dialog
        open={testEmailDialogOpen}
        onClose={() => setTestEmailDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '10px' } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {testEmailType === 'admin' ? 'Send Test Admin Alert Email' : 'Send Test Welcome Email'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter a destination email address. A test email with all placeholder tags parsed will be dispatched immediately using your site's mail configuration.
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
    </Box>
  );
}
