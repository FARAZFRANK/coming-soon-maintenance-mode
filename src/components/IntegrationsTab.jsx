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
  Alert,
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
} from '@mui/material';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WebhookRoundedIcon from '@mui/icons-material/WebhookRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ForwardToInboxRoundedIcon from '@mui/icons-material/ForwardToInboxRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { api } from '../api';

export default function IntegrationsTab({ data, onChange, onNotify }) {
  const integrations = data.integrations || {
    mailchimp_enabled: false,
    mailchimp_api_key: '',
    mailchimp_list_id: '',
    webhook_enabled: false,
    webhook_url: '',
    admin_email_enabled: true,
    admin_email_recipient: '',
    admin_email_subject: 'New Subscriber Lead Captured on {site_name} 🎉',
    admin_email_body: "<h2>New Subscriber Lead!</h2>\n<p>A new visitor has subscribed to your Coming Soon newsletter:</p>\n<p><strong>Email:</strong> {subscriber_email}<br><strong>IP Address:</strong> {ip_address}<br><strong>Date:</strong> {date}</p>",
    welcome_email_enabled: true,
    welcome_email_subject: 'Thank you for subscribing to {site_name}! 🚀',
    welcome_email_body: "<h2>Welcome to {site_name}!</h2>\n<p>Hi there,</p>\n<p>Thank you for subscribing to our newsletter! We are currently working hard behind the scenes to launch our brand new website.</p>\n<p>You'll be the very first to know when we go live on <strong>{launch_date}</strong>!</p>\n<p>Best regards,<br>The {site_name} Team</p>",
  };

  const [emailSubTab, setEmailSubTab] = useState(0); // 0: Admin Alert, 1: Welcome Email
  const [testingMailchimp, setTestingMailchimp] = useState(false);
  const [mailchimpResult, setMailchimpResult] = useState(null);

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

  const openTestEmailModal = (type) => {
    setTestEmailType(type);
    setTestEmailRecipient(integrations.admin_email_recipient || '');
    setTestEmailDialogOpen(true);
  };

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
                <Typography variant="h6" fontWeight={700}>
                  Mailchimp API Integration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Automatically sync new subscribers to your Mailchimp Audience in real-time.
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
                helperText="Find in Mailchimp Profile -> Extras -> API Keys"
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
                helperText="Find in Audience Settings -> Audience name and defaults"
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

      {/* 2. Webhook Dispatcher Card */}
      <Card sx={{ borderRadius: '10px' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <WebhookRoundedIcon sx={{ color: '#7c3aed', fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Zapier / Make / Webhook Dispatcher
                </Typography>
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

      {/* 3. Email Notification Engine & Template Customizer */}
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
