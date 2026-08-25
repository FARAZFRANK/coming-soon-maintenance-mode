import React, { useState, useRef } from 'react';
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
  Chip,
  Radio,
  RadioGroup,
  Checkbox,
  Slider,
  ButtonGroup,
  Tooltip,
  Select,
  FormControl,
} from '@mui/material';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import FormatAlignCenterRoundedIcon from '@mui/icons-material/FormatAlignCenterRounded';
import FormatAlignRightRoundedIcon from '@mui/icons-material/FormatAlignRightRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import PermMediaRoundedIcon from '@mui/icons-material/PermMediaRounded';

export default function ContentBrandingTab({ settings = {}, onChange }) {
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'code'
  const [formatBlock, setFormatBlock] = useState('p');
  const visualEditorRef = useRef(null);

  const logoType = settings.logo_type || (settings.logo_url ? 'graphic' : 'text');
  const logoText = settings.logo_text !== undefined ? settings.logo_text : (settings.title || 'Testing');
  const logoLink = settings.logo_link || '';
  const logoHeightEnabled = !!settings.logo_height_enabled;
  const logoHeight = settings.logo_height || 100;

  // Unified & resilient media picker helper
  const triggerMediaPicker = ({ title, buttonText, multiple = false, onSelect }) => {
    // 1. Try native WordPress media modal
    if (window.wp && typeof window.wp.media === 'function') {
      try {
        const frame = window.wp.media({
          title: title || 'Select Media',
          button: { text: buttonText || 'Select' },
          multiple: multiple,
          library: { type: 'image' },
        });

        frame.on('select', () => {
          const selection = frame.state().get('selection');
          if (multiple) {
            onSelect(selection.toJSON());
          } else {
            const first = selection.first();
            if (first) {
              onSelect(first.toJSON());
            }
          }
        });

        frame.open();
        return;
      } catch (err) {
        console.warn('wp.media frame error:', err);
      }
    }

    // 2. Try classic wp.media.editor
    if (window.wp && window.wp.media && window.wp.media.editor && typeof window.wp.media.editor.open === 'function') {
      try {
        window.wp.media.editor.send.attachment = (props, attachment) => {
          if (multiple) {
            onSelect([attachment]);
          } else {
            onSelect(attachment);
          }
        };
        window.wp.media.editor.open();
        return;
      } catch (err) {
        console.warn('wp.media.editor error:', err);
      }
    }

    // 3. Graceful client fallback: Direct file picker
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = multiple;
    input.onchange = (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      if (multiple) {
        const items = [];
        let readCount = 0;
        files.forEach((file, idx) => {
          const reader = new FileReader();
          reader.onload = (re) => {
            items.push({ id: 'local_' + Date.now() + '_' + idx, url: re.target.result });
            readCount++;
            if (readCount === files.length) {
              onSelect(items);
            }
          };
          reader.readAsDataURL(file);
        });
      } else {
        const reader = new FileReader();
        reader.onload = (re) => {
          onSelect({ id: 'local_' + Date.now(), url: re.target.result });
        };
        reader.readAsDataURL(files[0]);
      }
    };
    input.click();
  };

  // Handle Logo Media Uploader
  const handleLogoUpload = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    triggerMediaPicker({
      title: 'Select or Upload Brand Logo',
      buttonText: 'Use this Logo',
      multiple: false,
      onSelect: (attachment) => {
        onChange('logo', String(attachment.id));
        onChange('logo_url', attachment.url);
        onChange('logo_type', 'graphic');
      },
    });
  };

  const handleLogoRemove = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    onChange('logo', '');
    onChange('logo_url', '');
  };

  // Add media directly into Message Editor
  const handleInsertMediaToEditor = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    triggerMediaPicker({
      title: 'Insert Media into Message',
      buttonText: 'Insert into Message',
      multiple: false,
      onSelect: (attachment) => {
        const imgHtml = `<p><img src="${attachment.url}" alt="${attachment.alt || attachment.title || 'image'}" style="max-width: 100%; height: auto;" /></p>`;
        const currentDesc = settings.description || '';
        onChange('description', currentDesc + '\n' + imgHtml);
      },
    });
  };

  // Formatting actions for Visual Editor
  const applyFormatting = (tag, openTag, closeTag) => {
    const textarea = document.getElementById('csmm-message-textarea');
    if (!textarea) {
      onChange('description', (settings.description || '') + openTag + 'Text' + closeTag);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = settings.description || '';
    const selected = current.substring(start, end) || 'Sample text';
    const replacement = `${openTag}${selected}${closeTag}`;
    const nextVal = current.substring(0, start) + replacement + current.substring(end);
    onChange('description', nextVal);
  };

  const handleInsertLink = () => {
    const url = prompt('Enter link URL (e.g. https://example.com):', 'https://');
    if (url) {
      applyFormatting('a', `<a href="${url}" target="_blank">`, '</a>');
    }
  };

  const handleFormatBlockChange = (tag) => {
    setFormatBlock(tag);
    if (tag === 'p') {
      applyFormatting('p', '<p>', '</p>');
    } else {
      applyFormatting(tag, `<${tag}>`, `</${tag}>`);
    }
  };

  // Background Slider Uploader
  const handleAddSlide = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    triggerMediaPicker({
      title: 'Select Background Slide Images',
      buttonText: 'Add to Background',
      multiple: true,
      onSelect: (selection) => {
        const currentSlides = settings.slides || [];
        const newSlides = (Array.isArray(selection) ? selection : [selection]).map((item) => ({
          id: item.id,
          url: item.url,
        }));
        const combined = [...currentSlides, ...newSlides];
        onChange('slides', combined);
        onChange('bg_custom_images', combined);
        onChange(
          'slide_ids',
          combined.map((s) => s.id)
        );
      },
    });
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
      {/* 1. Logo Setup Section */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1.1rem' }}>
            Logo Setup
          </Typography>

          <Grid container spacing={3} alignItems="flex-start">
            {/* Left Side: Logo Type Radio Group */}
            <Grid item xs={12} sm={4} md={3}>
              <RadioGroup
                value={logoType}
                onChange={(e) => onChange('logo_type', e.target.value)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
              >
                <FormControlLabel value="text" control={<Radio color="primary" />} label="Text Logo" />
                <FormControlLabel value="graphic" control={<Radio color="primary" />} label="Graphic Logo" />
                <FormControlLabel value="disabled" control={<Radio color="primary" />} label="Disabled" />
              </RadioGroup>
            </Grid>

            {/* Right Side: Options based on selected logo type */}
            <Grid item xs={12} sm={8} md={9}>
              {logoType === 'text' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: 'serif',
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: 'text.primary',
                      letterSpacing: '-0.02em',
                      py: 0.5,
                    }}
                  >
                    {logoText || 'Testing'}
                  </Typography>

                  <TextField
                    size="small"
                    fullWidth
                    label="Logo Link URL"
                    placeholder="http://localhost/testing"
                    value={logoLink}
                    onChange={(e) => onChange('logo_link', e.target.value)}
                  />
                </Box>
              )}

              {logoType === 'graphic' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleLogoUpload}
                      sx={{ borderRadius: '6px', fontWeight: 600, px: 2.5 }}
                    >
                      {settings.logo_url ? 'Change Logo' : 'Select Logo'}
                    </Button>

                    {settings.logo_url && (
                      <Button
                        size="small"
                        color="error"
                        variant="text"
                        onClick={handleLogoRemove}
                        sx={{ fontWeight: 600 }}
                      >
                        Remove Logo
                      </Button>
                    )}
                  </Box>

                  {/* Logo Preview thumbnail */}
                  {settings.logo_url && (
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc'),
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: 320,
                      }}
                    >
                      <img
                        src={settings.logo_url}
                        alt="Selected Logo"
                        style={{
                          maxHeight: logoHeightEnabled ? `${logoHeight}px` : '70px',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  )}

                  {/* Set custom logo height */}
                  <Box sx={{ mt: 0.5 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={logoHeightEnabled}
                          onChange={(e) => onChange('logo_height_enabled', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Set custom logo height"
                      sx={{ '& .MuiTypography-root': { fontSize: '0.9rem', fontWeight: 500 } }}
                    />

                    {logoHeightEnabled && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, maxWidth: 360 }}>
                        <Slider
                          value={logoHeight}
                          min={20}
                          max={300}
                          step={5}
                          onChange={(_, val) => onChange('logo_height', val)}
                          color="primary"
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        <TextField
                          size="small"
                          type="number"
                          value={logoHeight}
                          onChange={(e) => onChange('logo_height', Number(e.target.value))}
                          sx={{ width: 80 }}
                          inputProps={{ min: 20, max: 300 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          px
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <TextField
                    size="small"
                    fullWidth
                    label="Logo Link URL"
                    placeholder="http://localhost/testing"
                    value={logoLink}
                    onChange={(e) => onChange('logo_link', e.target.value)}
                  />
                </Box>
              )}

              {logoType === 'disabled' && (
                <Box sx={{ py: 1 }}>
                  <Typography variant="body1" color="text.secondary">
                    Logo is disabled
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 2. Message / Headline & Description Card */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1.1rem' }}>
            Message
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Headline / Page Title"
              fullWidth
              variant="outlined"
              size="small"
              value={settings.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="e.g. Something Extraordinary is in the Works"
              helperText="Main primary heading displayed on your coming soon template."
            />

            {/* Rich Message Box with Toolbar (Screenshot 4) */}
            <Paper
              variant="outlined"
              sx={{
                borderRadius: '8px !important',
                overflow: 'hidden',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
              }}
            >
              {/* Top Action Bar: Add Media + Visual/Code Switch */}
              <Box
                sx={{
                  p: 1.2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc'),
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  startIcon={<PermMediaRoundedIcon sx={{ fontSize: 18 }} />}
                  onClick={handleInsertMediaToEditor}
                  sx={{ borderRadius: '6px', fontWeight: 600, fontSize: '0.82rem' }}
                >
                  Add Media
                </Button>

                <ButtonGroup size="small" variant="outlined">
                  <Button
                    variant={editorMode === 'visual' ? 'contained' : 'outlined'}
                    onClick={() => setEditorMode('visual')}
                    sx={{ textTransform: 'none', fontWeight: 600, px: 2 }}
                  >
                    Visual
                  </Button>
                  <Button
                    variant={editorMode === 'code' ? 'contained' : 'outlined'}
                    onClick={() => setEditorMode('code')}
                    sx={{ textTransform: 'none', fontWeight: 600, px: 2 }}
                  >
                    Code
                  </Button>
                </ButtonGroup>
              </Box>

              {/* Formatting Toolbar (Visual Mode) */}
              {editorMode === 'visual' && (
                <Box
                  sx={{
                    px: 1.2,
                    py: 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    flexWrap: 'wrap',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff'),
                  }}
                >
                  <Select
                    size="small"
                    value={formatBlock}
                    onChange={(e) => handleFormatBlockChange(e.target.value)}
                    sx={{
                      height: 32,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      mr: 1,
                      minWidth: 120,
                    }}
                  >
                    <MenuItem value="p">Paragraph</MenuItem>
                    <MenuItem value="h1">Heading 1</MenuItem>
                    <MenuItem value="h2">Heading 2</MenuItem>
                    <MenuItem value="h3">Heading 3</MenuItem>
                    <MenuItem value="h4">Heading 4</MenuItem>
                  </Select>

                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                  <Tooltip title="Bold (Ctrl+B)">
                    <IconButton size="small" onClick={() => applyFormatting('b', '<strong>', '</strong>')}>
                      <FormatBoldRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Italic (Ctrl+I)">
                    <IconButton size="small" onClick={() => applyFormatting('i', '<em>', '</em>')}>
                      <FormatItalicRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Bulleted List">
                    <IconButton size="small" onClick={() => applyFormatting('ul', '<ul>\n  <li>', '</li>\n</ul>')}>
                      <FormatListBulletedRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Numbered List">
                    <IconButton size="small" onClick={() => applyFormatting('ol', '<ol>\n  <li>', '</li>\n</ol>')}>
                      <FormatListNumberedRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Blockquote">
                    <IconButton size="small" onClick={() => applyFormatting('blockquote', '<blockquote>', '</blockquote>')}>
                      <FormatQuoteRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                  <Tooltip title="Align Left">
                    <IconButton size="small" onClick={() => applyFormatting('align-left', '<p style="text-align: left;">', '</p>')}>
                      <FormatAlignLeftRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Align Center">
                    <IconButton size="small" onClick={() => applyFormatting('align-center', '<p style="text-align: center;">', '</p>')}>
                      <FormatAlignCenterRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Align Right">
                    <IconButton size="small" onClick={() => applyFormatting('align-right', '<p style="text-align: right;">', '</p>')}>
                      <FormatAlignRightRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                  <Tooltip title="Insert Link">
                    <IconButton size="small" onClick={handleInsertLink}>
                      <InsertLinkRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Horizontal Line / Divider">
                    <IconButton size="small" onClick={() => onChange('description', (settings.description || '') + '\n<hr />\n')}>
                      <HorizontalRuleRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}

              {/* Text Area for Content Editing */}
              <TextField
                id="csmm-message-textarea"
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                value={settings.description || ''}
                onChange={(e) => onChange('description', e.target.value)}
                placeholder="Write your coming soon teaser description, upcoming features, or launch details..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    p: 2,
                    fontFamily: editorMode === 'code' ? 'Consolas, Monaco, monospace' : 'inherit',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' },
                  },
                }}
              />

              {/* Bottom Status Bar */}
              <Box
                sx={{
                  px: 1.5,
                  py: 0.75,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontWeight: 600 }}>
                  p
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {(settings.description || '').length} characters
                </Typography>
              </Box>
            </Paper>

            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              * WordPress embeds, custom HTML and shortcodes support
            </Typography>
          </Box>
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

      {/* 3. Graphic Background Section */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1.1rem' }}>
            Graphic Background
          </Typography>

          <Grid container spacing={3} alignItems="flex-start">
            {/* Left Side: Background Type Radio Selection */}
            <Grid item xs={12} sm={4} md={3}>
              <RadioGroup
                value={settings.bg_type || 'default'}
                onChange={(e) => onChange('bg_type', e.target.value)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
              >
                <FormControlLabel value="default" control={<Radio color="primary" />} label="Default Media" />
                <FormControlLabel value="custom" control={<Radio color="primary" />} label="Custom Images" />
                <FormControlLabel value="video" control={<Radio color="primary" />} label="Video" />
                <FormControlLabel value="pattern" control={<Radio color="primary" />} label="Graphic Pattern" />
                <FormControlLabel value="solid" control={<Radio color="primary" />} label="Solid Color" />
                <FormControlLabel value="gradient" control={<Radio color="primary" />} label="Gradient Color" />
              </RadioGroup>
            </Grid>

            {/* Right Side: Options based on selected background */}
            <Grid item xs={12} sm={8} md={9}>
              {/* Option 1: Default Media */}
              {(settings.bg_type === 'default' || !settings.bg_type) && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      width: '100%',
                      height: 260,
                      borderRadius: '8px !important',
                      overflow: 'hidden',
                      position: 'relative',
                      background: 'linear-gradient(135deg, #0d3b4c 0%, #175d69 35%, #85b8b7 70%, #d4e7e6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'radial-gradient(ellipse at center, rgba(13,59,76,0.3) 0%, rgba(13,59,76,0.8) 100%)',
                        backgroundSize: 'cover',
                      }}
                    />
                  </Paper>
                </Box>
              )}

              {/* Option 2: Custom Images */}
              {settings.bg_type === 'custom' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleAddSlide}
                      sx={{ borderRadius: '6px', fontWeight: 600, px: 2.5 }}
                    >
                      Add Images
                    </Button>
                  </Box>

                  {/* Thumbnail gallery */}
                  <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
                    {(settings.slides || []).map((slide) => (
                      <Grid item xs={6} sm={4} md={3} key={slide.id}>
                        <Paper
                          variant="outlined"
                          sx={{
                            position: 'relative',
                            height: 90,
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
                  </Grid>

                  {/* Mobile Device Override */}
                  <Box sx={{ mt: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!settings.bg_mobile_enabled}
                          onChange={(e) => onChange('bg_mobile_enabled', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Display different image on Mobile devices(upload button is below)"
                      sx={{ '& .MuiTypography-root': { fontSize: '0.9rem' } }}
                    />

                    {settings.bg_mobile_enabled && (
                      <Box sx={{ mt: 1.5, pl: 3.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            triggerMediaPicker({
                              title: 'Select Mobile Background Image',
                              buttonText: 'Use this Image',
                              multiple: false,
                              onSelect: (att) => {
                                onChange('bg_mobile_image_url', att.url);
                              },
                            });
                          }}
                          sx={{ borderRadius: '6px' }}
                        >
                          Select Mobile Image
                        </Button>
                        {settings.bg_mobile_image_url && (
                          <Box sx={{ height: 40, width: 40, borderRadius: '4px', overflow: 'hidden', border: '1px solid #ccc' }}>
                            <img src={settings.bg_mobile_image_url} alt="Mobile BG" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              )}

              {/* Option 3: Video Background */}
              {settings.bg_type === 'video' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                      Select Video Source
                    </Typography>
                    <Select
                      size="small"
                      fullWidth
                      value={settings.bg_video_source || 'youtube'}
                      onChange={(e) => onChange('bg_video_source', e.target.value)}
                    >
                      <MenuItem value="youtube">YouTube</MenuItem>
                      <MenuItem value="vimeo">Vimeo</MenuItem>
                      <MenuItem value="file">Direct Video File (MP4)</MenuItem>
                    </Select>
                  </Box>

                  <TextField
                    size="small"
                    fullWidth
                    label={settings.bg_video_source === 'youtube' ? 'Enter Youtube URL' : 'Enter Video URL'}
                    value={settings.video_url || settings.bg_video_url || ''}
                    onChange={(e) => {
                      onChange('video_url', e.target.value);
                      onChange('bg_video_url', e.target.value);
                    }}
                    placeholder={
                      settings.bg_video_source === 'youtube'
                        ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        : 'https://player.vimeo.com/video/427528336'
                    }
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={settings.bg_video_loop !== false}
                        onChange={(e) => onChange('bg_video_loop', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Loop video automatically"
                    sx={{ '& .MuiTypography-root': { fontSize: '0.9rem', fontWeight: 500 } }}
                  />

                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    Upload a placeholder/fallback image for mobile devices and video loading.
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        triggerMediaPicker({
                          title: 'Select Video Thumbnail / Mobile Poster',
                          buttonText: 'Use this Image',
                          multiple: false,
                          onSelect: (att) => {
                            onChange('bg_video_poster_url', att.url);
                          },
                        });
                      }}
                      sx={{ borderRadius: '6px', fontWeight: 600 }}
                    >
                      Select Placeholder Image
                    </Button>
                    {settings.bg_video_poster_url && (
                      <Box sx={{ height: 45, width: 70, borderRadius: '4px', overflow: 'hidden', border: '1px solid #ccc' }}>
                        <img src={settings.bg_video_poster_url} alt="Video Poster" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                    )}
                  </Box>
                </Box>
              )}

              {/* Option 4: Graphic Pattern */}
              {settings.bg_type === 'pattern' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                      Select Pattern
                    </Typography>
                    <Select
                      size="small"
                      fullWidth
                      value={settings.bg_pattern || 'sakura'}
                      onChange={(e) => onChange('bg_pattern', e.target.value)}
                    >
                      <MenuItem value="sakura">Sakura</MenuItem>
                      <MenuItem value="hexagons">Hexagons</MenuItem>
                      <MenuItem value="dots">Dots Pattern</MenuItem>
                      <MenuItem value="triangles">Triangles</MenuItem>
                      <MenuItem value="waves">Waves</MenuItem>
                      <MenuItem value="carbon">Carbon Fiber</MenuItem>
                      <MenuItem value="lines">Diagonal Lines</MenuItem>
                      <MenuItem value="stars">Night Stars</MenuItem>
                    </Select>
                  </Box>

                  {/* Pattern Strip Preview */}
                  <Paper
                    variant="outlined"
                    sx={{
                      width: '100%',
                      height: 160,
                      borderRadius: '8px !important',
                      backgroundColor: '#a39281',
                      backgroundImage:
                        settings.bg_pattern === 'hexagons'
                          ? 'radial-gradient(#ffffff 15%, transparent 16%), radial-gradient(#ffffff 15%, transparent 16%)'
                          : settings.bg_pattern === 'dots'
                          ? 'radial-gradient(#ffffff 10%, transparent 11%)'
                          : 'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 10px, transparent 10px, transparent 20px)',
                      backgroundSize: '30px 30px',
                      opacity: 0.9,
                    }}
                  />
                </Box>
              )}

              {/* Option 5: Solid Color */}
              {settings.bg_type === 'solid' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      Select Color
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, maxWidth: 280 }}>
                      <Box
                        component="label"
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: settings.bg_solid_color || '#e2e8f0',
                          cursor: 'pointer',
                          display: 'inline-block',
                          flexShrink: 0,
                          overflow: 'hidden',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                      >
                        <input
                          type="color"
                          value={settings.bg_solid_color || '#e2e8f0'}
                          onChange={(e) => onChange('bg_solid_color', e.target.value)}
                          style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                        />
                      </Box>
                      <TextField
                        size="small"
                        fullWidth
                        value={settings.bg_solid_color || '#e2e8f0'}
                        onChange={(e) => onChange('bg_solid_color', e.target.value)}
                        placeholder="#e2e8f0"
                      />
                    </Box>
                  </Box>

                  {/* Solid Color Preview */}
                  <Paper
                    variant="outlined"
                    sx={{
                      width: '100%',
                      height: 180,
                      borderRadius: '8px !important',
                      backgroundColor: settings.bg_solid_color || '#e2e8f0',
                    }}
                  />
                </Box>
              )}

              {/* Option 6: Gradient Color */}
              {settings.bg_type === 'gradient' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Gradient Type
                      </Typography>
                      <Select
                        size="small"
                        fullWidth
                        value={settings.bg_gradient_type || 'linear'}
                        onChange={(e) => onChange('bg_gradient_type', e.target.value)}
                      >
                        <MenuItem value="linear">Linear Gradient</MenuItem>
                        <MenuItem value="radial">Radial Gradient</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Color 1
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          component="label"
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            backgroundColor: settings.bg_gradient_color1 || '#1e3a8a',
                            cursor: 'pointer',
                            display: 'inline-block',
                            flexShrink: 0,
                            overflow: 'hidden',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          }}
                        >
                          <input
                            type="color"
                            value={settings.bg_gradient_color1 || '#1e3a8a'}
                            onChange={(e) => onChange('bg_gradient_color1', e.target.value)}
                            style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                          />
                        </Box>
                        <TextField
                          size="small"
                          fullWidth
                          value={settings.bg_gradient_color1 || '#1e3a8a'}
                          onChange={(e) => onChange('bg_gradient_color1', e.target.value)}
                          placeholder="#1e3a8a"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Color 2
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          component="label"
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            backgroundColor: settings.bg_gradient_color2 || '#0f172a',
                            cursor: 'pointer',
                            display: 'inline-block',
                            flexShrink: 0,
                            overflow: 'hidden',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          }}
                        >
                          <input
                            type="color"
                            value={settings.bg_gradient_color2 || '#0f172a'}
                            onChange={(e) => onChange('bg_gradient_color2', e.target.value)}
                            style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                          />
                        </Box>
                        <TextField
                          size="small"
                          fullWidth
                          value={settings.bg_gradient_color2 || '#0f172a'}
                          onChange={(e) => onChange('bg_gradient_color2', e.target.value)}
                          placeholder="#0f172a"
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Gradient Preview */}
                  <Paper
                    variant="outlined"
                    sx={{
                      width: '100%',
                      height: 180,
                      borderRadius: '8px !important',
                      background:
                        settings.bg_gradient_type === 'radial'
                          ? `radial-gradient(circle, ${settings.bg_gradient_color1 || '#1e3a8a'} 0%, ${settings.bg_gradient_color2 || '#0f172a'} 100%)`
                          : `linear-gradient(${settings.bg_gradient_angle || 135}deg, ${settings.bg_gradient_color1 || '#1e3a8a'} 0%, ${settings.bg_gradient_color2 || '#0f172a'} 100%)`,
                    }}
                  />
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Common Overlay Settings (Screenshots 1-5) */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                    Background Overlay
                  </Typography>
                  <Select
                    size="small"
                    fullWidth
                    value={settings.bg_overlay_type || 'solid'}
                    onChange={(e) => onChange('bg_overlay_type', e.target.value)}
                  >
                    <MenuItem value="solid">Solid Color</MenuItem>
                    <MenuItem value="gradient">Gradient</MenuItem>
                    <MenuItem value="none">None</MenuItem>
                  </Select>
                </Box>

                {settings.bg_overlay_type !== 'none' && (
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                      Background Overlay Color
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, maxWidth: 280 }}>
                      <Box
                        component="label"
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: settings.bg_overlay_color || '#000000',
                          cursor: 'pointer',
                          display: 'inline-block',
                          flexShrink: 0,
                          overflow: 'hidden',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                      >
                        <input
                          type="color"
                          value={settings.bg_overlay_color || '#000000'}
                          onChange={(e) => onChange('bg_overlay_color', e.target.value)}
                          style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                        />
                      </Box>
                      <TextField
                        size="small"
                        fullWidth
                        value={settings.bg_overlay_color || '#000000'}
                        onChange={(e) => onChange('bg_overlay_color', e.target.value)}
                        placeholder="#000000"
                      />
                    </Box>
                  </Box>
                )}

                {/* Background Overlay Opacity Slider - Compact */}
                <Box sx={{ maxWidth: 360 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Background Overlay Opacity
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.85rem' }}>
                      {settings.bg_overlay_opacity !== undefined ? settings.bg_overlay_opacity : 0.4}
                    </Typography>
                  </Box>
                  <Slider
                    value={settings.bg_overlay_opacity !== undefined ? Number(settings.bg_overlay_opacity) : 0.4}
                    min={0}
                    max={1}
                    step={0.05}
                    onChange={(_, val) => onChange('bg_overlay_opacity', val)}
                    color="primary"
                    size="small"
                  />
                </Box>

                {/* Background Blur Amount Slider - Compact */}
                <Box sx={{ maxWidth: 360 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Background Blur Amount
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.85rem' }}>
                      {settings.bg_blur || 0}px
                    </Typography>
                  </Box>
                  <Slider
                    value={settings.bg_blur ? Number(settings.bg_blur) : 0}
                    min={0}
                    max={20}
                    step={1}
                    onChange={(_, val) => onChange('bg_blur', val)}
                    color="primary"
                    size="small"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 4. Email Lead Capture Card */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <MarkEmailReadRoundedIcon color="secondary" />
              <div>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  Email Lead Capture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Show an email subscription box on your coming soon template to capture visitor leads.
                </Typography>
              </div>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={String(settings.susbcriber_form) === '1'}
                  onChange={(e) => onChange('susbcriber_form', e.target.checked ? '1' : '0')}
                  color="primary"
                />
              }
              label={String(settings.susbcriber_form) === '1' ? 'Active' : 'Hidden'}
            />
          </Box>

          {String(settings.susbcriber_form) === '1' && (
            <Box sx={{ mt: 3, pt: 2.5, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                Subscription Form Appearance & Styling
              </Typography>

              <Grid container spacing={2.5}>
                {/* Placeholder Text */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                    Input Placeholder Text
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    value={settings.form_placeholder_text !== undefined ? settings.form_placeholder_text : 'Email Address'}
                    onChange={(e) => onChange('form_placeholder_text', e.target.value)}
                    placeholder="Email Address"
                  />
                </Grid>

                {/* Button Text */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                    Button Label / Text
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    value={settings.form_btn_text !== undefined ? settings.form_btn_text : 'Notify Me'}
                    onChange={(e) => onChange('form_btn_text', e.target.value)}
                    placeholder="Notify Me"
                  />
                </Grid>

                {/* Input Background Color */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                    Input Background Color
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box
                      component="label"
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: settings.form_input_bg || '#1e293b',
                        cursor: 'pointer',
                        display: 'inline-block',
                        flexShrink: 0,
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }}
                    >
                      <input
                        type="color"
                        value={settings.form_input_bg && settings.form_input_bg.startsWith('#') ? settings.form_input_bg : '#1e293b'}
                        onChange={(e) => onChange('form_input_bg', e.target.value)}
                        style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                      />
                    </Box>
                    <TextField
                      size="small"
                      fullWidth
                      value={settings.form_input_bg !== undefined ? settings.form_input_bg : 'rgba(0, 0, 0, 0.35)'}
                      onChange={(e) => onChange('form_input_bg', e.target.value)}
                      placeholder="rgba(0, 0, 0, 0.35)"
                    />
                  </Box>
                </Grid>

                {/* Input Text & Placeholder Color */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                    Input / Placeholder Color
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box
                      component="label"
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: settings.form_input_color || '#ffffff',
                        cursor: 'pointer',
                        display: 'inline-block',
                        flexShrink: 0,
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }}
                    >
                      <input
                        type="color"
                        value={settings.form_input_color && settings.form_input_color.startsWith('#') ? settings.form_input_color : '#ffffff'}
                        onChange={(e) => onChange('form_input_color', e.target.value)}
                        style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                      />
                    </Box>
                    <TextField
                      size="small"
                      fullWidth
                      value={settings.form_input_color !== undefined ? settings.form_input_color : '#ffffff'}
                      onChange={(e) => onChange('form_input_color', e.target.value)}
                      placeholder="#ffffff"
                    />
                  </Box>
                </Grid>

                {/* Button Background Color */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                    Button Background Color
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box
                      component="label"
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: settings.form_btn_bg || '#e11d48',
                        cursor: 'pointer',
                        display: 'inline-block',
                        flexShrink: 0,
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }}
                    >
                      <input
                        type="color"
                        value={settings.form_btn_bg && settings.form_btn_bg.startsWith('#') ? settings.form_btn_bg : '#e11d48'}
                        onChange={(e) => onChange('form_btn_bg', e.target.value)}
                        style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                      />
                    </Box>
                    <TextField
                      size="small"
                      fullWidth
                      value={settings.form_btn_bg !== undefined ? settings.form_btn_bg : '#e11d48'}
                      onChange={(e) => onChange('form_btn_bg', e.target.value)}
                      placeholder="#e11d48"
                    />
                  </Box>
                </Grid>

                {/* Button Text Color */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                    Button Text Color
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box
                      component="label"
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: settings.form_btn_color || '#ffffff',
                        cursor: 'pointer',
                        display: 'inline-block',
                        flexShrink: 0,
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }}
                    >
                      <input
                        type="color"
                        value={settings.form_btn_color && settings.form_btn_color.startsWith('#') ? settings.form_btn_color : '#ffffff'}
                        onChange={(e) => onChange('form_btn_color', e.target.value)}
                        style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                      />
                    </Box>
                    <TextField
                      size="small"
                      fullWidth
                      value={settings.form_btn_color !== undefined ? settings.form_btn_color : '#ffffff'}
                      onChange={(e) => onChange('form_btn_color', e.target.value)}
                      placeholder="#ffffff"
                    />
                  </Box>
                </Grid>

                {/* Border Radius Slider - Compact */}
                <Grid item xs={12}>
                  <Box sx={{ maxWidth: 360 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Form & Button Border Radius
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.85rem' }}>
                        {settings.form_border_radius !== undefined ? settings.form_border_radius : 0}px
                      </Typography>
                    </Box>
                    <Slider
                      value={settings.form_border_radius !== undefined ? Number(settings.form_border_radius) : 0}
                      onChange={(e, val) => onChange('form_border_radius', val)}
                      min={0}
                      max={30}
                      step={1}
                      color="primary"
                      size="small"
                    />
                  </Box>
                </Grid>

                {/* Live Form UI Preview */}
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Live Form Preview
                  </Typography>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: '8px',
                      background: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #334155',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: 480,
                        width: '100%',
                        gap: settings.form_border_radius > 0 ? 1 : 0,
                      }}
                    >
                      <input
                        type="text"
                        readOnly
                        placeholder={settings.form_placeholder_text || 'Email Address'}
                        style={{
                          flex: 1,
                          padding: '12px 18px',
                          backgroundColor: settings.form_input_bg || 'rgba(0, 0, 0, 0.35)',
                          color: settings.form_input_color || '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRight: settings.form_border_radius > 0 ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                          borderRadius: settings.form_border_radius ? `${settings.form_border_radius}px` : '0px',
                          outline: 'none',
                          fontSize: '14px',
                          fontFamily: 'inherit',
                        }}
                      />
                      <button
                        type="button"
                        style={{
                          padding: '12px 24px',
                          backgroundColor: settings.form_btn_bg || '#e11d48',
                          color: settings.form_btn_color || '#ffffff',
                          border: 'none',
                          borderRadius: settings.form_border_radius ? `${settings.form_border_radius}px` : '0px',
                          fontWeight: 700,
                          fontSize: '14px',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {settings.form_btn_text || 'Notify Me'}
                      </button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* SEO & Social Metadata Suite */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'text.primary' }}>
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
                label="Custom SEO Meta Description"
                placeholder="e.g. We are building the next generation platform..."
                value={(settings.seo && settings.seo.meta_description) || ''}
                onChange={(e) =>
                  onChange('seo', {
                    ...(settings.seo || {}),
                    meta_description: e.target.value,
                  })
                }
                helperText="Brief summary for search engine snippet"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Search Engine Robots Indexing"
                value={(settings.seo && settings.seo.robots_meta) || 'auto'}
                onChange={(e) =>
                  onChange('seo', {
                    ...(settings.seo || {}),
                    robots_meta: e.target.value,
                  })
                }
                helperText="Controls indexing in robots meta tags"
              >
                <MenuItem value="auto">Automatic (Index when Live, NoIndex in Maintenance/Coming Soon)</MenuItem>
                <MenuItem value="index_follow">Always Index & Follow (index, follow)</MenuItem>
                <MenuItem value="noindex_nofollow">Block All Search Engines (noindex, nofollow)</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Google Analytics / G-Tag Tracking ID"
                placeholder="e.g. G-XXXXXXXXXX or UA-XXXXXXXX-X"
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
            <Chip
              label="custom.css"
              size="small"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 22,
                borderRadius: '4px',
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#334155' : '#f1f5f9'),
                color: (theme) => (theme.palette.mode === 'dark' ? '#f8fafc' : '#475569'),
              }}
            />
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
