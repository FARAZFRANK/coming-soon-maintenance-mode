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
    { key: 'facebook', label: 'Facebook URL', icon: <FacebookRoundedIcon sx={{ color: '#1877f2' }} />, placeholder: 'https://facebook.com/yourbrand' },
    { key: 'twitter', label: 'Twitter / X URL', icon: <TwitterIcon sx={{ color: '#1da1f2' }} />, placeholder: 'https://x.com/yourbrand' },
    { key: 'instagram', label: 'Instagram URL', icon: <InstagramIcon sx={{ color: '#e4405f' }} />, placeholder: 'https://instagram.com/yourbrand' },
    { key: 'youtube', label: 'YouTube Channel', icon: <YouTubeIcon sx={{ color: '#ff0000' }} />, placeholder: 'https://youtube.com/@yourchannel' },
    { key: 'linkedin', label: 'LinkedIn Profile/Page', icon: <LinkedInIcon sx={{ color: '#0a66c2' }} />, placeholder: 'https://linkedin.com/company/yourbrand' },
    { key: 'pinterest', label: 'Pinterest Profile', icon: <PinterestIcon sx={{ color: '#bd081c' }} />, placeholder: 'https://pinterest.com/yourbrand' },
    { key: 'whatsapp', label: 'WhatsApp Number/Link', icon: <WhatsAppIcon sx={{ color: '#25d366' }} />, placeholder: 'https://wa.me/1234567890' },
    { key: 'tiktok', label: 'TikTok URL', icon: <ShareRoundedIcon sx={{ color: '#000000' }} />, placeholder: 'https://tiktok.com/@yourbrand' },
    { key: 'behance', label: 'Behance Portfolio', icon: <LanguageRoundedIcon sx={{ color: '#1769ff' }} />, placeholder: 'https://behance.net/yourbrand' },
    { key: 'dribbble', label: 'Dribbble Portfolio', icon: <LanguageRoundedIcon sx={{ color: '#ea4c89' }} />, placeholder: 'https://dribbble.com/yourbrand' },
    { key: 'tumblr', label: 'Tumblr Blog', icon: <LanguageRoundedIcon sx={{ color: '#35465c' }} />, placeholder: 'https://yourbrand.tumblr.com' },
    { key: 'snapchat', label: 'Snapchat Profile', icon: <LanguageRoundedIcon sx={{ color: '#fffc00' }} />, placeholder: 'https://snapchat.com/add/yourbrand' },
    { key: 'qq', label: 'QQ Number / Link', icon: <LanguageRoundedIcon sx={{ color: '#12b7f5' }} />, placeholder: 'Your QQ ID' },
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      {/* 1. Standard Social Platforms */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.1rem' }}>
            Standard Social Channels
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Connect your active social profiles. Leave any platform URL empty to automatically hide its icon from the frontend page.
          </Typography>

          <Grid container spacing={2.5}>
            {platforms.map((p) => (
              <Grid item xs={12} md={6} key={p.key}>
                <TextField
                  fullWidth
                  label={p.label}
                  value={social[p.key] || ''}
                  onChange={(e) => handleStandardChange(p.key, e.target.value)}
                  placeholder={p.placeholder}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {p.icon}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* 2. Dynamic Custom Social Channels */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                🌟 Dynamic Custom Social Channels & Links
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add any custom platform (Discord, Telegram, GitHub, Threads, Spotify, custom website, etc.) with custom icons.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddRoundedIcon />}
              onClick={() => handleAddCustomChannel(null)}
              sx={{ borderRadius: '8px', fontWeight: 700 }}
            >
              Add Custom Channel
            </Button>
          </Box>

          {/* Quick Preset Selector Chips */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 3,
              borderRadius: '8px !important',
              backgroundColor: '#f8fafc',
              borderStyle: 'dashed',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'block', mb: 1.2 }}>
              ⚡ 1-Click Popular Platform Presets:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {quickPresets.map((preset) => (
                <Chip
                  key={preset.name}
                  label={preset.name}
                  onClick={() => handleAddCustomChannel(preset)}
                  size="small"
                  clickable
                  variant="outlined"
                  icon={<StarsRoundedIcon sx={{ fontSize: '15px !important', color: '#2563eb' }} />}
                  sx={{
                    borderRadius: '6px',
                    fontWeight: 600,
                    backgroundColor: '#ffffff',
                    '&:hover': { backgroundColor: '#eff6ff', borderColor: '#2563eb' },
                  }}
                />
              ))}
            </Stack>
          </Paper>

          {/* Custom Channels List */}
          {customChannels.length === 0 ? (
            <Paper
              variant="outlined"
              sx={{
                p: 3.5,
                textAlign: 'center',
                borderRadius: '8px !important',
                backgroundColor: '#f8fafc',
                borderStyle: 'dashed',
              }}
            >
              <ShareRoundedIcon sx={{ fontSize: 36, color: '#94a3b8', mb: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#334155' }}>
                No Custom Channels Added Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Click a 1-Click Preset above (Discord, Telegram, GitHub, Threads) or click "Add Custom Channel" to create your own.
              </Typography>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {customChannels.map((channel, index) => (
                <Paper
                  key={channel.id || index}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: '10px !important',
                    borderColor: '#e2e8f0',
                    backgroundColor: '#ffffff',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: '#2563eb' },
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3.5}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Channel / Platform Name"
                        placeholder="e.g. Discord, Telegram, GitHub"
                        value={channel.title || ''}
                        onChange={(e) => handleUpdateCustomChannel(channel.id, 'title', e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} md={3.5}>
                      <TextField
                        fullWidth
                        size="small"
                        label="FontAwesome Icon Class"
                        placeholder="fa-brands fa-discord"
                        value={channel.icon || ''}
                        onChange={(e) => handleUpdateCustomChannel(channel.id, 'icon', e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#2563eb',
                                  fontSize: 14,
                                }}
                              >
                                <i className={channel.icon || 'fa-solid fa-globe'} />
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                        helperText="e.g. fa-brands fa-discord, fa-brands fa-telegram"
                      />
                    </Grid>

                    <Grid item xs={12} md={4.2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Profile / Destination URL"
                        placeholder="https://..."
                        value={channel.url || ''}
                        onChange={(e) => handleUpdateCustomChannel(channel.id, 'url', e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <LinkRoundedIcon sx={{ color: '#64748b', fontSize: 18 }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={0.8} sx={{ textAlign: 'right' }}>
                      <Tooltip title="Delete this channel">
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveCustomChannel(channel.id)}
                          sx={{
                            backgroundColor: '#fee2e2',
                            '&:hover': { backgroundColor: '#fca5a5' },
                          }}
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
