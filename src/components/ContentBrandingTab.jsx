import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  IconButton,
  Divider,
  Paper,
  Alert,
  MenuItem,
} from '@mui/material';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';

export default function ContentBrandingTab({ settings, onChange }) {
  // WordPress Native Media Uploader for Logo
  const handleLogoUpload = () => {
    if (!window.wp || !window.wp.media) {
      alert('WordPress Media Uploader is not available.');
      return;
    }

    const frame = window.wp.media({
      title: 'Select or Upload Brand Logo',
      button: { text: 'Use this Logo' },
      multiple: false,
    });

    frame.on('select', () => {
      const attachment = frame.state().get('selection').first().toJSON();
      onChange('logo', String(attachment.id));
      onChange('logo_url', attachment.url);
    });

    frame.open();
  };

  const handleLogoRemove = () => {
    onChange('logo', '');
    onChange('logo_url', '');
  };

  // Background Slider Uploader
  const handleAddSlide = () => {
    if (!window.wp || !window.wp.media) {
      alert('WordPress Media Uploader is not available.');
      return;
    }

    const frame = window.wp.media({
      title: 'Select Background Slide Images',
      button: { text: 'Add to Slider' },
      multiple: true,
    });

    frame.on('select', () => {
      const selection = frame.state().get('selection').toJSON();
      const currentSlides = settings.slides || [];
      const newSlides = selection.map((item) => ({
        id: item.id,
        url: item.url,
      }));
      const combined = [...currentSlides, ...newSlides];
      onChange('slides', combined);
      onChange(
        'slide_ids',
        combined.map((s) => s.id)
      );
    });

    frame.open();
  };

  const handleRemoveSlide = (slideId) => {
    const updated = (settings.slides || []).filter((s) => s.id !== slideId);
    onChange('slides', updated);
    onChange(
      'slide_ids',
      updated.map((s) => s.id)
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Brand Identity & Main Content */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.1rem' }}>
            Branding & Core Content
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Customize your website logo, headline message, and descriptive teaser.
          </Typography>

          <Grid container spacing={2.5}>
            {/* Logo Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Brand Logo
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: '10px !important',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  minHeight: 180,
                  justifyContent: 'center',
                }}
              >
                {settings.logo_url ? (
                  <>
                    <Box
                      sx={{
                        maxWidth: '100%',
                        maxHeight: 90,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                        backgroundColor: '#1e293b',
                        borderRadius: '8px',
                      }}
                    >
                      <img
                        src={settings.logo_url}
                        alt="Logo Preview"
                        style={{ maxWidth: '100%', maxHeight: 70, objectFit: 'contain' }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined" onClick={handleLogoUpload} sx={{ borderRadius: '6px' }}>
                        Change
                      </Button>
                      <Button size="small" color="error" variant="outlined" onClick={handleLogoRemove} sx={{ borderRadius: '6px' }}>
                        Remove
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <CloudUploadRoundedIcon sx={{ fontSize: 36, color: '#94a3b8' }} />
                    <Typography variant="body2" color="text.secondary">
                      No custom logo selected
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<CloudUploadRoundedIcon />}
                      onClick={handleLogoUpload}
                      sx={{ borderRadius: '6px' }}
                    >
                      Upload Logo
                    </Button>
                  </>
                )}
              </Paper>
            </Grid>

            {/* Headline & Description */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Headline / Page Title"
                  fullWidth
                  variant="outlined"
                  value={settings.title || ''}
                  onChange={(e) => onChange('title', e.target.value)}
                  placeholder="e.g. Something Extraordinary is in the Works"
                  helperText="Displayed as the main primary heading on your landing page."
                />

                <TextField
                  label="Description / Teaser Text"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={settings.description || ''}
                  onChange={(e) => onChange('description', e.target.value)}
                  placeholder="Describe your upcoming project, features, or when visitors should check back..."
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Countdown Timer Settings */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <AccessTimeRoundedIcon color="primary" />
              <div>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  Launch Countdown Timer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Display a dynamic live countdown clock until your grand launch.
                </Typography>
              </div>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={String(settings.countdown) === '1'}
                  onChange={(e) => onChange('countdown', e.target.checked ? '1' : '0')}
                  color="primary"
                />
              }
              label={String(settings.countdown) === '1' ? 'Enabled' : 'Disabled'}
            />
          </Box>

          {String(settings.countdown) === '1' && (
            <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Countdown Title"
                  fullWidth
                  value={settings.countdown_title || ''}
                  onChange={(e) => onChange('countdown_title', e.target.value)}
                  placeholder="Launching In..."
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Target Launch Date"
                  type="date"
                  fullWidth
                  value={settings.countdown_date || ''}
                  onChange={(e) => onChange('countdown_date', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Target Launch Time"
                  type="time"
                  fullWidth
                  value={settings.countdown_time || '10:00'}
                  onChange={(e) => onChange('countdown_time', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <Alert severity="success" sx={{ borderRadius: '8px' }}>
                  <strong>Auto-Launch Feature:</strong> When the countdown clock reaches zero, the website mode will automatically switch to <strong>Live / Disabled</strong> so your visitors can access your live website immediately!
                </Alert>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Lead Capture & Video Background */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Grid container spacing={2.5}>
            {/* Newsletter Subscription */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
                <MarkEmailReadRoundedIcon color="secondary" />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  Email Lead Capture
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Show an email subscription box on your coming soon template to capture visitor leads.
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={String(settings.susbcriber_form) === '1'}
                    onChange={(e) => onChange('susbcriber_form', e.target.checked ? '1' : '0')}
                    color="primary"
                  />
                }
                label={String(settings.susbcriber_form) === '1' ? 'Subscriber Form Active' : 'Hidden'}
              />
            </Grid>

            {/* Video Background */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
                <VideocamRoundedIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  Video Background URL
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Applies to video-enabled templates (Vimeo embed URL or MP4).
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={settings.video_url || ''}
                onChange={(e) => onChange('video_url', e.target.value)}
                placeholder="https://player.vimeo.com/video/427528336?autoplay=1..."
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2.5 }} />

          {/* Background Slides */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <div>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Background Slideshow Images
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload images for slider-based templates.
              </Typography>
            </div>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddPhotoAlternateRoundedIcon />}
              onClick={handleAddSlide}
              sx={{ borderRadius: '6px' }}
            >
              Add Images
            </Button>
          </Box>

          <Grid container spacing={2}>
            {(settings.slides || []).map((slide) => (
              <Grid item xs={6} sm={4} md={2} key={slide.id}>
                <Paper
                  variant="outlined"
                  sx={{
                    position: 'relative',
                    height: 100,
                    borderRadius: '8px !important',
                    overflow: 'hidden',
                    backgroundColor: '#1e293b',
                  }}
                >
                  <img
                    src={slide.url}
                    alt="Slide"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveSlide(slide.id)}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      '&:hover': { backgroundColor: '#ffffff' },
                    }}
                  >
                    <DeleteOutlineRoundedIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
            {(settings.slides || []).length === 0 && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No slide images added yet. Click "Add Images" to select images from your WordPress media library.
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* SEO & Social Metadata Suite */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>
              🔍 Search Engine Optimization (SEO) & Social Sharing
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Customize how your pre-launch or maintenance page appears on Google, Bing, Facebook, LinkedIn, and Twitter/X.
          </Typography>

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Custom SEO Meta Title"
                placeholder="e.g. My Brand - Exciting New Experience Coming Soon"
                value={(settings.seo && settings.seo.meta_title) || ''}
                onChange={(e) =>
                  onChange('seo', {
                    ...(settings.seo || {}),
                    meta_title: e.target.value,
                  })
                }
                helperText="Leave empty to use main page title / site title"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Search Engine Robots Directive"
                value={(settings.seo && settings.seo.robots_meta) || 'auto'}
                onChange={(e) =>
                  onChange('seo', {
                    ...(settings.seo || {}),
                    robots_meta: e.target.value,
                  })
                }
                helperText="Smart Auto indexes Coming Soon & protects SEO during Maintenance"
              >
                <MenuItem value="auto">Smart Auto (Index Coming Soon / Noindex Maintenance)</MenuItem>
                <MenuItem value="index">Always Index (index, follow)</MenuItem>
                <MenuItem value="noindex">Never Index (noindex, nofollow)</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Custom SEO Meta Description"
                placeholder="Brief summary of your upcoming launch for Google search snippets (150-160 characters)..."
                value={(settings.seo && settings.seo.meta_description) || ''}
                onChange={(e) =>
                  onChange('seo', {
                    ...(settings.seo || {}),
                    meta_description: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Google Analytics / G-Tag Tracking ID"
                placeholder="e.g. G-XXXXXXXXXX or UA-XXXXX-Y"
                value={(settings.seo && settings.seo.google_analytics_id) || ''}
                onChange={(e) =>
                  onChange('seo', {
                    ...(settings.seo || {}),
                    google_analytics_id: e.target.value,
                  })
                }
                helperText="Automatically embeds Google tag on your coming soon page"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Custom CSS Editor */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <CodeRoundedIcon color="secondary" />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                Custom CSS Overrides
              </Typography>
            </Box>
            <Chip label="custom.css" size="small" sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.75rem', height: 22, borderRadius: '4px', backgroundColor: '#f1f5f9' }} />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add custom CSS styles to fine-tune colors, fonts, or layout tweaks on your selected template.
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              borderRadius: '10px !important',
              overflow: 'hidden',
              border: '1px solid #334155',
              backgroundColor: '#0f172a',
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: '#1e293b',
                borderBottom: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }} />
              <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace', ml: 1, fontSize: '0.75rem' }}>
                CSS Stylesheet
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={8}
              value={settings.custom_css || ''}
              onChange={(e) => onChange('custom_css', e.target.value)}
              placeholder={`/* Custom CSS Overrides */\n.home-content h1 {\n  font-family: 'Poppins', sans-serif;\n  color: #ffffff;\n}\n\nbody {\n  background-color: #0f172a;\n}`}
              sx={{
                '& .MuiOutlinedInput-root': {
                  p: 2,
                  fontFamily: 'Consolas, "Fira Code", Monaco, monospace',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: '#38bdf8',
                  backgroundColor: 'transparent',
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#64748b',
                  opacity: 0.85,
                  fontFamily: 'Consolas, "Fira Code", Monaco, monospace',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                },
              }}
            />
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}
