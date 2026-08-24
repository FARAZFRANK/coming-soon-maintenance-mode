import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  Button,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  Badge,
} from '@mui/material';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';

import { api } from './api';
import GeneralSettingsTab from './components/GeneralSettingsTab';
import TemplatesTab from './components/TemplatesTab';
import ContentBrandingTab from './components/ContentBrandingTab';
import SocialMediaTab from './components/SocialMediaTab';
import IntegrationsTab from './components/IntegrationsTab';
import SubscribersTab from './components/SubscribersTab';
import DocumentationTab from './components/DocumentationTab';

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [settings, setSettings] = useState(null);
  const [originalSettings, setOriginalSettings] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [targetItems, setTargetItems] = useState({ posts: [], pages: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Handle hash navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes('subscribers')) {
        setTabIndex(5);
      } else if (hash.includes('integrations') || hash.includes('newsletter')) {
        setTabIndex(4);
      } else if (hash.includes('templates')) {
        setTabIndex(1);
      } else if (hash.includes('content')) {
        setTabIndex(2);
      } else if (hash.includes('social')) {
        setTabIndex(3);
      } else if (hash.includes('docs')) {
        setTabIndex(6);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Fetch initial data
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [settingsData, templatesData, targetItemsData] = await Promise.all([
          api.getSettings(),
          api.getTemplates(),
          api.getTargetItems(),
        ]);
        setSettings(settingsData);
        setOriginalSettings(JSON.stringify(settingsData));
        setTemplates(templatesData || []);
        setTargetItems(targetItemsData || { posts: [], pages: [] });
      } catch (err) {
        showNotification('Error loading settings: ' + err.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  // Track unsaved changes
  useEffect(() => {
    if (settings && originalSettings) {
      const isDifferent = JSON.stringify(settings) !== originalSettings;
      setHasChanges(isDifferent);
    }
  }, [settings, originalSettings]);

  const handleFieldChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.saveSettings(settings);
      setOriginalSettings(JSON.stringify(settings));
      setHasChanges(false);
      showNotification(res.message || 'Settings saved successfully!', 'success');
    } catch (err) {
      showNotification('Failed to save settings: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 2,
        }}
      >
        <CircularProgress size={44} thickness={4} color="primary" />
        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          Loading Coming Soon Pro Studio...
        </Typography>
      </Box>
    );
  }

  const modeBadge = {
    1: { label: 'Coming Soon Mode Active', color: 'primary' },
    2: { label: 'Maintenance Mode Active', color: 'warning' },
    3: { label: 'Website Live (Disabled)', color: 'success' },
  }[settings?.website_mode || 3];

  return (
    <Box sx={{ pb: 6, pt: 2, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Top Header Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 2.5 },
            mb: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            borderRadius: '10px !important',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
              }}
            >
              <AccessTimeFilledRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                  Coming Soon Maintenance Mode Pro
                </Typography>
                <Chip
                  label={`v${api.getConfig().version || '3.2.0'}`}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    height: 22,
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    borderRadius: '6px',
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                <Chip
                  label={modeBadge.label}
                  color={modeBadge.color}
                  size="small"
                  sx={{ fontWeight: 700, fontSize: '0.75rem', height: 22, borderRadius: '6px' }}
                />
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                  by FARAZFRANK
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<VisibilityRoundedIcon />}
              component="a"
              href={settings?.preview_url || '#'}
              target="_blank"
              sx={{ borderColor: '#cbd5e1', fontWeight: 600, borderRadius: '8px' }}
            >
              Live Preview
            </Button>

            <Badge color="warning" variant="dot" invisible={!hasChanges}>
              <Button
                variant="contained"
                color="primary"
                startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <SaveRoundedIcon />}
                onClick={handleSave}
                disabled={saving}
                sx={{ px: 3, fontWeight: 700, borderRadius: '8px' }}
              >
                {saving ? 'Saving Changes...' : 'Save Changes'}
              </Button>
            </Badge>
          </Box>
        </Paper>

        {/* Tab Navigation */}
        <Paper
          elevation={0}
          sx={{
            mb: 2.5,
            borderRadius: '10px !important',
            border: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={(_, newTab) => setTabIndex(newTab)}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{ px: 1.5 }}
          >
            <Tab icon={<TuneRoundedIcon sx={{ fontSize: 19 }} />} iconPosition="start" label="Website Mode & Targeting" />
            <Tab icon={<DashboardCustomizeRoundedIcon sx={{ fontSize: 19 }} />} iconPosition="start" label="Templates (36)" />
            <Tab icon={<PaletteRoundedIcon sx={{ fontSize: 19 }} />} iconPosition="start" label="Content, Branding & SEO" />
            <Tab icon={<ShareRoundedIcon sx={{ fontSize: 19 }} />} iconPosition="start" label="Social Channels" />
            <Tab icon={<MarkEmailReadRoundedIcon sx={{ fontSize: 19 }} />} iconPosition="start" label="Newsletter & Integrations" />
            <Tab icon={<PeopleAltRoundedIcon sx={{ fontSize: 19 }} />} iconPosition="start" label="Subscribers Leads" />
            <Tab icon={<MenuBookRoundedIcon sx={{ fontSize: 19 }} />} iconPosition="start" label="Documentation" />
          </Tabs>
        </Paper>

        {/* Tab Content Panels */}
        <Box sx={{ mt: 1 }}>
          {tabIndex === 0 && (
            <GeneralSettingsTab
              settings={settings}
              onChange={handleFieldChange}
              targetItems={targetItems}
            />
          )}

          {tabIndex === 1 && (
            <TemplatesTab
              settings={settings}
              onChange={handleFieldChange}
              templates={templates}
              previewUrlBase={settings?.preview_url}
            />
          )}

          {tabIndex === 2 && (
            <ContentBrandingTab
              settings={settings}
              onChange={handleFieldChange}
            />
          )}

          {tabIndex === 3 && (
            <SocialMediaTab
              settings={settings}
              onChange={handleFieldChange}
            />
          )}

          {tabIndex === 4 && (
            <IntegrationsTab
              data={settings}
              onChange={handleFieldChange}
              onNotify={showNotification}
            />
          )}

          {tabIndex === 5 && (
            <SubscribersTab
              onNotify={showNotification}
            />
          )}

          {tabIndex === 6 && (
            <DocumentationTab />
          )}
        </Box>
      </Container>

      {/* Notification Toast */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%', borderRadius: '8px', fontWeight: 600 }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
