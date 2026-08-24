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
  IconButton,
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
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';

import { api } from './api';
import GeneralSettingsTab from './components/GeneralSettingsTab';
import TemplatesTab from './components/TemplatesTab';
import ContentBrandingTab from './components/ContentBrandingTab';
import SocialMediaTab from './components/SocialMediaTab';
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
        setTabIndex(4);
      } else if (hash.includes('templates')) {
        setTabIndex(1);
      } else if (hash.includes('content')) {
        setTabIndex(2);
      } else if (hash.includes('social')) {
        setTabIndex(3);
      } else if (hash.includes('docs')) {
        setTabIndex(5);
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
    if (!settings) return;
    setSaving(true);
    try {
      const response = await api.saveSettings(settings);
      setOriginalSettings(JSON.stringify(settings));
      setHasChanges(false);
      showNotification(response.message || 'Settings saved successfully!', 'success');
    } catch (err) {
      showNotification('Failed to save settings: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 12 }}>
        <CircularProgress size={48} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 600, color: '#334155' }}>
          Loading Coming Soon Maintenance Mode Pro...
        </Typography>
      </Box>
    );
  }

  const getModeBadge = () => {
    const mode = settings ? settings.website_mode : 3;
    if (mode === 1) return <Chip label="Coming Soon Active" color="primary" size="small" sx={{ fontWeight: 700 }} />;
    if (mode === 2) return <Chip label="Maintenance Mode Active" color="warning" size="small" sx={{ fontWeight: 700 }} />;
    return <Chip label="Website Live (Disabled)" color="success" size="small" sx={{ fontWeight: 700 }} />;
  };

  return (
    <Box sx={{ pb: 8, pt: 2, backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Top Header Bar */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 2.5 },
            mb: 3,
            borderRadius: 3,
            border: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
          }}
        >
          {/* Title & Badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              }}
            >
              <AccessTimeFilledRoundedIcon sx={{ fontSize: 26 }} />
            </Box>
            <div>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  Coming Soon Maintenance Mode Pro
                </Typography>
                <Chip label="v3.2.0" size="small" sx={{ fontWeight: 700, backgroundColor: '#e2e8f0', color: '#334155' }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                {getModeBadge()}
                <Typography variant="caption" color="text.secondary">
                  by FARAZFRANK
                </Typography>
              </Box>
            </div>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: { xs: '100%', md: 'auto' }, justifyContent: { xs: 'flex-end', md: 'auto' } }}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<VisibilityRoundedIcon />}
              component="a"
              href={settings?.preview_url || '#'}
              target="_blank"
              sx={{ borderColor: '#cbd5e1', fontWeight: 600 }}
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
                sx={{ px: 3, fontWeight: 700 }}
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
            mb: 3,
            borderRadius: 3,
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
            sx={{ px: 2 }}
          >
            <Tab icon={<TuneRoundedIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Website Mode & Targeting" />
            <Tab icon={<DashboardCustomizeRoundedIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Templates (36)" />
            <Tab icon={<PaletteRoundedIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Content & Branding" />
            <Tab icon={<ShareRoundedIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Social Channels" />
            <Tab icon={<PeopleAltRoundedIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Subscribers Leads" />
            <Tab icon={<MenuBookRoundedIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Documentation" />
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
            <SubscribersTab
              onNotify={showNotification}
            />
          )}

          {tabIndex === 5 && (
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
          sx={{ width: '100%', borderRadius: 2, fontWeight: 600 }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
