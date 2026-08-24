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
  IconButton,
  Tooltip,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import { api } from './api';
import { getTheme } from './theme';
import GeneralSettingsTab from './components/GeneralSettingsTab';
import TemplatesTab from './components/TemplatesTab';
import ContentBrandingTab from './components/ContentBrandingTab';
import SocialMediaTab from './components/SocialMediaTab';
import IntegrationsTab from './components/IntegrationsTab';
import SubscribersTab from './components/SubscribersTab';
import DocumentationTab from './components/DocumentationTab';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CSMM Studio Render Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper elevation={0} sx={{ p: 4, my: 2, borderRadius: '10px !important', border: '1px solid #fee2e2', backgroundColor: '#fff5f5' }}>
          <Alert severity="error" sx={{ borderRadius: '8px' }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Something went wrong in this section.
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, fontFamily: 'monospace' }}>
              {this.state.error && this.state.error.toString()}
            </Typography>
          </Alert>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.setState({ hasError: false, error: null })}
            sx={{ mt: 2, borderRadius: '8px' }}
          >
            Retry Tab
          </Button>
        </Paper>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [settings, setSettings] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [targetItems, setTargetItems] = useState({ pages: [], posts: [], roles: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Persistent Light / Dark Mode State
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('csmm_theme_mode') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('csmm_theme_mode', themeMode);
    const root = document.getElementById('csmm-react-root');
    if (root) {
      if (themeMode === 'dark') {
        root.classList.add('csmm-dark');
      } else {
        root.classList.remove('csmm-dark');
      }
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const currentTheme = getTheme(themeMode);

  // Load initial settings and templates
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [settingsRes, templatesRes, targetRes] = await Promise.all([
          api.getSettings(),
          api.getTemplates(),
          api.getTargetItems(),
        ]);

        if (settingsRes.success) {
          setSettings(settingsRes.data);
        }
        if (templatesRes.success) {
          setTemplates(templatesRes.data);
        }
        if (targetRes.success) {
          setTargetItems(targetRes.data);
        }
      } catch (err) {
        showNotification('Failed to load plugin data: ' + err.message, 'error');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  // Handle setting updates
  const handleFieldChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setHasChanges(true);
  };

  // Save all settings
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await api.saveSettings(settings);
      if (res.success) {
        setHasChanges(false);
        showNotification('All settings saved successfully!', 'success');
      } else {
        showNotification(res.data?.message || 'Failed to save settings', 'error');
      }
    } catch (err) {
      showNotification('Save error: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 60px)',
            backgroundColor: 'background.default',
            p: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3.5, sm: 4.5 },
              maxWidth: 420,
              width: '100%',
              textAlign: 'center',
              borderRadius: '16px !important',
              border: `1px solid ${currentTheme.palette.divider}`,
              backgroundColor: 'background.paper',
              boxShadow: themeMode === 'dark' ? '0 10px 30px rgba(0, 0, 0, 0.4)' : '0 10px 30px -5px rgba(15, 23, 42, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 8px 16px rgba(37, 99, 235, 0.25)',
                mb: 2.5,
              }}
            >
              <AccessTimeFilledRoundedIcon sx={{ fontSize: 30 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.15rem' }}>
              Coming Soon Pro Studio
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Loading workspace settings & templates...
            </Typography>
            <CircularProgress size={32} thickness={4} color="primary" />
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  const modeBadge = {
    1: { label: 'Coming Soon Mode Active', color: 'primary' },
    2: { label: 'Maintenance Mode Active', color: 'warning' },
    3: { label: 'Website Live (Disabled)', color: 'success' },
  }[settings?.website_mode || 3];

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ pb: 6, pt: 2, backgroundColor: 'background.default', minHeight: '100vh', transition: 'background-color 0.25s ease' }}>
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
              border: `1px solid ${currentTheme.palette.divider}`,
              backgroundColor: 'background.paper',
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
                  <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                    Coming Soon Maintenance Mode Pro
                  </Typography>
                  <Chip
                    label={`v${api.getConfig().version || '3.2.0'}`}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      height: 22,
                      backgroundColor: themeMode === 'dark' ? '#334155' : '#f1f5f9',
                      color: themeMode === 'dark' ? '#cbd5e1' : '#475569',
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
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    by FARAZFRANK
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {/* Theme Mode Toggle Button */}
              <Tooltip title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <IconButton
                  onClick={toggleThemeMode}
                  sx={{
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: themeMode === 'dark' ? '#475569' : '#cbd5e1',
                    backgroundColor: themeMode === 'dark' ? '#334155' : '#f8fafc',
                    color: themeMode === 'dark' ? '#fbbf24' : '#64748b',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: themeMode === 'dark' ? '#475569' : '#f1f5f9',
                      borderColor: themeMode === 'dark' ? '#64748b' : '#94a3b8',
                      transform: 'rotate(15deg)',
                    },
                    p: '8px',
                  }}
                >
                  {themeMode === 'dark' ? (
                    <LightModeRoundedIcon sx={{ fontSize: 20, color: '#f59e0b' }} />
                  ) : (
                    <DarkModeRoundedIcon sx={{ fontSize: 20, color: '#475569' }} />
                  )}
                </IconButton>
              </Tooltip>

              <Button
                variant="outlined"
                color="inherit"
                startIcon={<VisibilityRoundedIcon />}
                component="a"
                href={settings?.preview_url || '#'}
                target="_blank"
                sx={{
                  borderColor: themeMode === 'dark' ? '#475569' : '#cbd5e1',
                  fontWeight: 600,
                  borderRadius: '8px',
                }}
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
              border: `1px solid ${currentTheme.palette.divider}`,
              backgroundColor: 'background.paper',
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
            <ErrorBoundary key={tabIndex}>
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
            </ErrorBoundary>
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
    </ThemeProvider>
  );
}
