import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Alert,
  Button,
  IconButton,
  Divider,
  Paper,
  Chip,
  Stack,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Slider,
  Switch,
} from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';

function ProBadge() {
  return (
    <Box
      component="span"
      sx={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: '#ffffff',
        borderRadius: '4px',
        px: 0.6,
        py: 0.15,
        fontSize: '0.62rem',
        fontWeight: 800,
        letterSpacing: '0.5px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.3,
        boxShadow: '0 1px 4px rgba(245, 158, 11, 0.3)',
        ml: 0.8,
      }}
    >
      <WorkspacePremiumRoundedIcon sx={{ fontSize: 11 }} />
      PRO
    </Box>
  );
}

function ProFeatureAlert({ title, description }) {
  return (
    <Alert
      severity="warning"
      icon={<WorkspacePremiumRoundedIcon sx={{ color: '#f59e0b' }} />}
      action={
        <Button
          variant="contained"
          size="small"
          component="a"
          href="https://wpfrank.com/wordpress-plugins/coming-soon-maintenance-mode-pro/"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<WorkspacePremiumRoundedIcon sx={{ fontSize: 14 }} />}
          sx={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#ffffff',
            fontWeight: 700,
            borderRadius: '6px',
            fontSize: '0.75rem',
            textTransform: 'none',
            px: 1.6,
            py: 0.4,
            boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
            },
          }}
        >
          Upgrade to Pro
        </Button>
      }
      sx={{
        mb: 2,
        borderRadius: '8px',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.08)'),
        border: '1px solid rgba(245, 158, 11, 0.25)',
        color: (theme) => (theme.palette.mode === 'dark' ? '#fbbf24' : '#b45309'),
        '& .MuiAlert-icon': { color: '#f59e0b' },
        alignItems: 'center',
      }}
    >
      <strong>{title}</strong> {description || 'is a Pro feature. Upgrade to Pro to unlock this option on your coming soon page.'}
    </Alert>
  );
}

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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
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
      }}
      sx={{
        '& .MuiInputBase-input': {
          fontFamily: 'Consolas, Monaco, monospace',
          fontSize: '0.85rem',
          fontWeight: 600,
        },
      }}
    />
  );
}

export default function SocialMediaTab({ settings, onChange }) {
  const social = settings.social_media || {};
  const customChannels = social.custom_channels || [];

  const handleStandardChange = (key, value) => {
    onChange('social_media', {
      ...social,
      [key]: value,
    });
  };

  // Add a new custom social channel
  const handleAddCustomChannel = (preset) => {
    const newChannel = {
      id: 'soc_' + Date.now(),
      title: preset ? preset.name : 'Custom Channel',
      icon: preset ? preset.icon : 'fa-solid fa-globe',
      url: '',
    };
    onChange('social_media', {
      ...social,
      custom_channels: [...customChannels, newChannel],
    });
  };

  // Update a custom channel field
  const handleUpdateCustomChannel = (id, field, value) => {
    const updated = customChannels.map((ch) => {
      if (ch.id === id) {
        return { ...ch, [field]: value };
      }
      return ch;
    });
    onChange('social_media', {
      ...social,
      custom_channels: updated,
    });
  };

  // Remove a custom channel
  const handleRemoveCustomChannel = (id) => {
    const updated = customChannels.filter((ch) => ch.id !== id);
    onChange('social_media', {
      ...social,
      custom_channels: updated,
    });
  };

  const platforms = [
    { key: 'facebook', label: 'Facebook URL', icon: <FacebookRoundedIcon sx={{ color: '#1877f2' }} />, placeholder: 'https://facebook.com/yourbrand', isPro: false },
    { key: 'twitter', label: 'Twitter / X URL', icon: <TwitterIcon sx={{ color: '#1da1f2' }} />, placeholder: 'https://x.com/yourbrand', isPro: false },
    { key: 'instagram', label: 'Instagram URL', icon: <InstagramIcon sx={{ color: '#e4405f' }} />, placeholder: 'https://instagram.com/yourbrand', isPro: false },
    { key: 'youtube', label: 'YouTube Channel', icon: <YouTubeIcon sx={{ color: '#ff0000' }} />, placeholder: 'https://www.youtube.com/watch?v=91AcVUR0O8I', isPro: true },
    { key: 'linkedin', label: 'LinkedIn Profile/Page', icon: <LinkedInIcon sx={{ color: '#0a66c2' }} />, placeholder: 'https://linkedin.com/company/yourbrand', isPro: true },
    { key: 'pinterest', label: 'Pinterest Profile', icon: <PinterestIcon sx={{ color: '#bd081c' }} />, placeholder: 'https://pinterest.com/yourbrand', isPro: true },
    { key: 'whatsapp', label: 'WhatsApp Number/Link', icon: <WhatsAppIcon sx={{ color: '#25d366' }} />, placeholder: 'https://wa.me/1234567890', isPro: true },
    { key: 'tiktok', label: 'TikTok URL', icon: <ShareRoundedIcon sx={{ color: '#000000' }} />, placeholder: 'https://tiktok.com/@yourbrand', isPro: true },
    { key: 'behance', label: 'Behance Portfolio', icon: <LanguageRoundedIcon sx={{ color: '#1769ff' }} />, placeholder: 'https://behance.net/yourbrand', isPro: true },
    { key: 'dribbble', label: 'Dribbble Portfolio', icon: <LanguageRoundedIcon sx={{ color: '#ea4c89' }} />, placeholder: 'https://dribbble.com/yourbrand', isPro: true },
    { key: 'tumblr', label: 'Tumblr Blog', icon: <LanguageRoundedIcon sx={{ color: '#35465c' }} />, placeholder: 'https://yourbrand.tumblr.com', isPro: true },
    { key: 'snapchat', label: 'Snapchat Profile', icon: <LanguageRoundedIcon sx={{ color: '#fffc00' }} />, placeholder: 'https://snapchat.com/add/yourbrand', isPro: true },
    { key: 'qq', label: 'QQ Number / Link', icon: <LanguageRoundedIcon sx={{ color: '#12b7f5' }} />, placeholder: 'Your QQ ID', isPro: true },
  ];

  // Quick preset chips for 1-click addition
  const quickPresets = [
    { name: 'Discord', icon: 'fa-brands fa-discord' },
    { name: 'Telegram', icon: 'fa-brands fa-telegram' },
    { name: 'GitHub', icon: 'fa-brands fa-github' },
    { name: 'Threads', icon: 'fa-brands fa-threads' },
    { name: 'Twitch', icon: 'fa-brands fa-twitch' },
    { name: 'Reddit', icon: 'fa-brands fa-reddit' },
    { name: 'Spotify', icon: 'fa-brands fa-spotify' },
    { name: 'Medium', icon: 'fa-brands fa-medium' },
    { name: 'Slack', icon: 'fa-brands fa-slack' },
    { name: 'Patreon', icon: 'fa-brands fa-patreon' },
    { name: 'Vimeo', icon: 'fa-brands fa-vimeo-v' },
    { name: 'Website / Blog', icon: 'fa-solid fa-globe' },
  ];

  const isSocialEnabled = social.enabled !== false;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      {/* 0. Enable / Disable Social Media Icons Card */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                Social Media Icons Display
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enable or disable the display of all social media icons across your coming soon and maintenance mode templates.
              </Typography>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={isSocialEnabled}
                  onChange={(e) => handleStandardChange('enabled', e.target.checked)}
                  color="primary"
                />
              }
              label={isSocialEnabled ? 'Enabled' : 'Disabled'}
              sx={{ mr: 0 }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* 1. Standard Social Platforms */}
      <Card elevation={0} sx={{ borderRadius: '10px !important', opacity: isSocialEnabled ? 1 : 0.65, transition: 'opacity 0.3s ease' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.1rem' }}>
            Standard Social Channels
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Connect your active social profiles. Leave any platform URL empty to automatically hide its icon from the frontend page.
          </Typography>

          <Alert
            severity="warning"
            icon={<WorkspacePremiumRoundedIcon sx={{ color: '#f59e0b' }} />}
            action={
              <Button
                variant="contained"
                size="small"
                component="a"
                href="https://wpfrank.com/wordpress-plugins/coming-soon-maintenance-mode-pro/"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WorkspacePremiumRoundedIcon sx={{ fontSize: 14 }} />}
                sx={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  px: 1.6,
                  py: 0.4,
                  boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  },
                }}
              >
                Upgrade to Pro
              </Button>
            }
            sx={{
              mb: 2.5,
              borderRadius: '8px',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.08)'),
              border: '1px solid rgba(245, 158, 11, 0.25)',
              color: (theme) => (theme.palette.mode === 'dark' ? '#fbbf24' : '#b45309'),
              '& .MuiAlert-icon': { color: '#f59e0b' },
              alignItems: 'center',
            }}
          >
            The Free edition includes <strong>Facebook, Twitter / X, and Instagram</strong>. Upgrade to Pro to unlock YouTube, LinkedIn, WhatsApp, TikTok, Pinterest, Behance, and more.
          </Alert>

          <Grid container spacing={2.5}>
            {platforms.map((p) => (
              <Grid item xs={12} md={6} key={p.key}>
                <TextField
                  fullWidth
                  disabled={p.isPro}
                  label={
                    p.isPro ? (
                      <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                        <span>{p.label}</span>
                        <ProBadge />
                      </Box>
                    ) : (
                      p.label
                    )
                  }
                  value={p.isPro ? '' : (social[p.key] || '')}
                  onChange={(e) => handleStandardChange(p.key, e.target.value)}
                  placeholder={p.isPro ? 'Available in Pro Version' : p.placeholder}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {p.icon}
                      </InputAdornment>
                    ),
                  }}
                  sx={p.isPro ? { opacity: 0.65 } : {}}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* 2. Social Icon Appearance & Overrides (Size, Color, Hover Color) */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  Social Icon Styling & Overrides
                </Typography>
                <ProBadge />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Customize the size, icon color, and hover color of all social media icons across frontend templates.
              </Typography>
            </Box>
          </Box>

          <ProFeatureAlert
            title="Social Icon Styling & Overrides"
            description="is a Pro feature. Upgrade to Pro to customize social icon sizes, custom colors, and interactive hover effects."
          />

          <Box sx={{ opacity: 0.55, pointerEvents: 'none', userSelect: 'none' }}>
            <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
              {/* Size Override Section */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: '8px',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: social.social_icon_size_enabled ? 1.5 : 0, flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Icon Size Override
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          disabled
                          size="small"
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Override Icon Size
                        </Typography>
                      }
                      sx={{ mr: 0 }}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Color & Hover Color Section */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: '8px',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0, flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Icon Color & Hover Color Override
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          disabled
                          size="small"
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Override Icon Colors
                        </Typography>
                      }
                      sx={{ mr: 0 }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* 3. Dynamic Custom Social Channels */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  🌟 Dynamic Custom Social Channels & Links
                </Typography>
                <ProBadge />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Add any custom platform (Discord, Telegram, GitHub, Threads, Spotify, custom website, etc.) with custom icons.
              </Typography>
            </Box>
            <Button
              variant="contained"
              disabled
              startIcon={<AddRoundedIcon />}
              sx={{ borderRadius: '8px', fontWeight: 700 }}
            >
              Add Custom Channel
            </Button>
          </Box>

          <ProFeatureAlert
            title="Dynamic Custom Social Channels"
            description="is a Pro feature. Upgrade to Pro to add unlimited custom social platforms (Discord, Telegram, GitHub, Threads, Spotify, and more)."
          />

          <Box sx={{ opacity: 0.55, pointerEvents: 'none', userSelect: 'none' }}>
            {/* Quick Preset Selector Chips */}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 3,
                borderRadius: '8px !important',
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc'),
                borderColor: (theme) => (theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'),
                borderStyle: 'dashed',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1.2 }}>
                ⚡ 1-Click Popular Platform Presets (Pro Feature):
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {quickPresets.map((preset) => (
                  <Chip
                    key={preset.name}
                    label={preset.name}
                    size="small"
                    variant="outlined"
                    icon={<StarsRoundedIcon sx={{ fontSize: '15px !important', color: '#2563eb' }} />}
                    sx={{
                      borderRadius: '6px',
                      fontWeight: 600,
                      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff'),
                      borderColor: (theme) => (theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'),
                      color: 'text.primary',
                    }}
                  />
                ))}
              </Stack>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                p: 3.5,
                textAlign: 'center',
                borderRadius: '8px !important',
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc'),
                borderColor: (theme) => (theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'),
                borderStyle: 'dashed',
              }}
            >
              <ShareRoundedIcon sx={{ fontSize: 36, color: '#94a3b8', mb: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Custom Social Channels are available in Pro version
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Connect Discord, Telegram, GitHub, Threads, Spotify, or any custom URL in the Pro version.
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
