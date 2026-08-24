import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Chip,
  Alert,
  Divider,
  Paper,
  Autocomplete,
  TextField,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';

export default function GeneralSettingsTab({ settings = {}, onChange, targetItems = {} }) {
  const currentSettings = settings || {};
  const currentTargetItems = targetItems || { pages: [], posts: [], roles: [] };
  const websiteMode = currentSettings.website_mode || 3;

  const handleModeSelect = (mode) => {
    onChange('website_mode', mode);
  };

  const handleOtherPageToggle = (slug) => {
    const current = currentSettings.selected_other_pages || [];
    const updated = current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug];
    onChange('selected_other_pages', updated);
  };

  const modes = [
    {
      id: 3,
      title: 'Disabled (Live Website)',
      subtitle: 'Your website is visible to all visitors normally.',
      color: '#10b981',
      icon: <PublicRoundedIcon sx={{ fontSize: 32, color: '#10b981' }} />,
    },
    {
      id: 1,
      title: 'Coming Soon Mode',
      subtitle: 'Show a coming soon landing page to all non-logged-in visitors (HTTP 200).',
      color: '#2563eb',
      icon: <RocketLaunchRoundedIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    },
    {
      id: 2,
      title: 'Maintenance Mode',
      subtitle: 'Show maintenance screen with HTTP 503 SEO header and selective targeting.',
      color: '#f59e0b',
      icon: <ConstructionRoundedIcon sx={{ fontSize: 32, color: '#f59e0b' }} />,
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Website Mode Cards */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700, fontSize: '1.1rem' }}>
            Website Status Mode
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Choose how visitors view your website. Logged-in administrators will always see the live site.
          </Typography>

          <Grid container spacing={2}>
            {modes.map((m) => {
              const isSelected = websiteMode === m.id;
              return (
                <Grid item xs={12} md={4} key={m.id}>
                  <Paper
                    elevation={0}
                    onClick={() => handleModeSelect(m.id)}
                    sx={{
                      p: 2.2,
                      height: '100%',
                      cursor: 'pointer',
                      borderRadius: '10px !important',
                      border: '2px solid',
                      borderColor: isSelected ? m.color : 'divider',
                      backgroundColor: isSelected ? `${m.color}14` : 'background.paper',
                      transition: 'all 0.2s ease-in-out',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      '&:hover': {
                        borderColor: isSelected ? m.color : 'text.secondary',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2 }}>
                      {m.icon}
                      {isSelected ? (
                        <CheckCircleRoundedIcon sx={{ color: m.color, fontSize: 24 }} />
                      ) : (
                        <Box sx={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #94a3b8' }} />
                      )}
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1rem' }}>
                      {m.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.45, fontSize: '0.875rem' }}>
                      {m.subtitle}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Selective Targeting (Only in Maintenance Mode) */}
      {websiteMode === 2 && (
        <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
              <ConstructionRoundedIcon color="warning" />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                Selective Maintenance Targeting
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              Leave all selections empty to apply maintenance mode <strong>site-wide</strong>, or pick specific pages/posts to restrict maintenance to only those URLs.
            </Typography>

            <Alert severity="info" sx={{ mb: 2.5, borderRadius: '8px' }}>
              Search engines (Google/Bing) will receive an <strong>HTTP 503 (Service Unavailable)</strong> response header to protect your search engine indexing and rankings.
            </Alert>

            {/* Standard Archives */}
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
              Standard WordPress Sections:
            </Typography>
            <FormGroup row sx={{ gap: 2, mb: 2.5 }}>
              {[
                { id: 'front', label: 'Front Page' },
                { id: 'home', label: 'Blog Index / Home' },
                { id: 'category', label: 'Category Archives' },
                { id: 'tag', label: 'Tag Archives' },
                { id: 'search', label: 'Search Results Page' },
              ].map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      checked={(currentSettings.selected_other_pages || []).includes(item.id)}
                      onChange={() => handleOtherPageToggle(item.id)}
                      color="primary"
                    />
                  }
                  label={item.label}
                />
              ))}
            </FormGroup>

            <Divider sx={{ my: 2 }} />

            {/* Target Pages */}
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                  Target Specific Pages:
                </Typography>
                <Autocomplete
                  multiple
                  options={currentTargetItems.pages || []}
                  getOptionLabel={(option) => option.title || ''}
                  value={(currentTargetItems.pages || []).filter((p) =>
                    (currentSettings.selected_pages || []).includes(p.id)
                  )}
                  onChange={(_, newValue) => {
                    onChange(
                      'selected_pages',
                      newValue.map((v) => v.id)
                    );
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select pages to put under maintenance..."
                      size="small"
                    />
                  )}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        label={option.title}
                        {...getTagProps({ index })}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: '6px' }}
                        key={option.id}
                      />
                    ))
                  }
                />
              </Grid>

              {/* Target Posts */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                  Target Specific Posts:
                </Typography>
                <Autocomplete
                  multiple
                  options={currentTargetItems.posts || []}
                  getOptionLabel={(option) => option.title || ''}
                  value={(currentTargetItems.posts || []).filter((p) =>
                    (currentSettings.selected_posts || []).includes(p.id)
                  )}
                  onChange={(_, newValue) => {
                    onChange(
                      'selected_posts',
                      newValue.map((v) => v.id)
                    );
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select posts to put under maintenance..."
                      size="small"
                    />
                  )}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        label={option.title}
                        {...getTagProps({ index })}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: '6px' }}
                        key={option.id}
                      />
                    ))
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
