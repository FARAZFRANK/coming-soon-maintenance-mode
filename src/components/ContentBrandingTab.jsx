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
import WallpaperRoundedIcon from '@mui/icons-material/WallpaperRounded';
import { api } from '../api';

export default function ContentBrandingTab({ settings = {}, onChange }) {
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'code'
  const [formatBlock, setFormatBlock] = useState('p');
  const visualEditorRef = useRef(null);

  const defaultSiteUrl = api.getConfig().siteUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  const defaultSiteTitle = api.getConfig().siteTitle || 'Coming Soon';

  const logoType = settings.logo_type || (settings.logo_url ? 'graphic' : 'text');
  const logoText = settings.logo_text !== undefined && settings.logo_text !== '' ? settings.logo_text : (settings.title || defaultSiteTitle);
  const logoLink = settings.logo_link !== undefined && settings.logo_link !== '' ? settings.logo_link : defaultSiteUrl;
  const logoHeightEnabled = !!settings.logo_height_enabled;
  const logoHeight = settings.logo_height || 100;

  const logoEnabled = settings.logo_enabled !== undefined
    ? String(settings.logo_enabled) === '1'
    : (settings.logo_type !== 'disabled');
  const titleEnabled = settings.title_enabled !== undefined
    ? String(settings.title_enabled) === '1'
    : true;
  const descriptionEnabled = settings.description_enabled !== undefined
    ? String(settings.description_enabled) === '1'
    : true;

  const handleLogoToggle = (checked) => {
    onChange('logo_enabled', checked ? '1' : '0');
    if (checked) {
      if (settings.logo_type === 'disabled') {
        onChange('logo_type', settings.logo_url ? 'graphic' : 'text');
      }
    } else {
      onChange('logo_type', 'disabled');
    }
  };

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

  // Background Custom Image Uploader
  const handleAddSlide = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    triggerMediaPicker({
      title: 'Select Background Image',
      buttonText: 'Use this Image',
      multiple: false,
      onSelect: (selection) => {
        const newSlides = (Array.isArray(selection) ? selection : [selection]).map((item) => ({
          id: item.id,
          url: item.url,
        }));
        onChange('slides', newSlides);
        onChange('bg_custom_images', newSlides);
        onChange(
          'slide_ids',
          newSlides.map((s) => s.id)
        );
      },
    });
  };

  const handleRemoveSlide = (slideIdOrUrl) => {
    const currentList = (settings.slides && settings.slides.length > 0) ? settings.slides : (settings.bg_custom_images || []);
    const updated = currentList.filter((s) => (s.id ? s.id !== slideIdOrUrl : s.url !== slideIdOrUrl));
    onChange('slides', updated);
    onChange('bg_custom_images', updated);
    onChange(
      'slide_ids',
      updated.map((s) => s.id).filter(Boolean)
    );
  };

  const handleAddSlideshowImages = () => {
    triggerMediaPicker({
      title: 'Select Slideshow Images',
      buttonText: 'Add to Slideshow',
      multiple: true,
      onSelect: (selection) => {
        const newItems = (Array.isArray(selection) ? selection : [selection]).map((item) => ({
          id: item.id,
          url: item.url,
        }));
        const current = (settings.bg_slideshow_images && Array.isArray(settings.bg_slideshow_images)) ? settings.bg_slideshow_images : [];
        const updated = [...current, ...newItems];
        onChange('bg_slideshow_images', updated);
        onChange('slides', updated);
        onChange('slide_ids', updated.map((s) => s.id).filter(Boolean));
      },
    });
  };

  const handleRemoveSlideshowImage = (slideIdOrUrl) => {
    const current = (settings.bg_slideshow_images && Array.isArray(settings.bg_slideshow_images)) ? settings.bg_slideshow_images : [];
    const updated = current.filter((s) => (s.id ? s.id !== slideIdOrUrl : s.url !== slideIdOrUrl));
    onChange('bg_slideshow_images', updated);
    onChange('slides', updated);
    onChange('slide_ids', updated.map((s) => s.id).filter(Boolean));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* 1. Logo Setup Section */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <div>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                Logo Setup
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure your brand logo or image displayed on the coming soon page.
              </Typography>
            </div>

            <FormControlLabel
              control={
                <Switch
                  checked={logoEnabled}
                  onChange={(e) => handleLogoToggle(e.target.checked)}
                  color="primary"
                />
              }
              label={logoEnabled ? 'Enabled' : 'Disabled'}
            />
          </Box>

          {logoEnabled ? (
            <Grid container spacing={3} alignItems="flex-start" sx={{ mt: 0.5 }}>
              {/* Left Side: Logo Type Radio Group */}
              <Grid item xs={12} sm={4} md={3}>
                <RadioGroup
                  value={logoType === 'disabled' ? (settings.logo_url ? 'graphic' : 'text') : logoType}
                  onChange={(e) => onChange('logo_type', e.target.value)}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                  <FormControlLabel value="text" control={<Radio color="primary" />} label="Text Logo" />
                  <FormControlLabel value="graphic" control={<Radio color="primary" />} label="Graphic Logo" />
                </RadioGroup>
              </Grid>

              {/* Right Side: Options based on selected logo type */}
              <Grid item xs={12} sm={8} md={9}>
                {(logoType === 'text' || (logoType === 'disabled' && !settings.logo_url)) && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography
                      sx={{
                        fontFamily: 'serif',
                        fontSize: '2.2rem',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        color: 'text.primary',
                        letterSpacing: '-0.02em',
                        py: 0.5,
                      }}
                    >
                      {logoText || defaultSiteTitle}
                    </Typography>

                    <TextField
                      size="small"
                      fullWidth
                      label="Logo Link URL"
                      placeholder={defaultSiteUrl || 'https://yoursite.com'}
                      value={logoLink}
                      onChange={(e) => onChange('logo_link', e.target.value)}
                    />
                  </Box>
                )}

                {(logoType === 'graphic' || (logoType === 'disabled' && !!settings.logo_url)) && (
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
                      placeholder={defaultSiteUrl || 'https://yoursite.com'}
                      value={logoLink}
                      onChange={(e) => onChange('logo_link', e.target.value)}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          ) : (
            <Alert severity="info" variant="outlined" sx={{ borderRadius: '8px', mt: 1 }}>
              Logo is disabled and will not be displayed on your coming soon template.
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 2. Message / Headline & Description Card */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.1rem' }}>
            Message
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Configure the primary headline and teaser description for your coming soon page.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Headline / Title Section */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Headline / Page Title
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={titleEnabled}
                      onChange={(e) => onChange('title_enabled', e.target.checked ? '1' : '0')}
                      color="primary"
                      size="small"
                    />
                  }
                  label={titleEnabled ? 'Enabled' : 'Disabled'}
                  sx={{ mr: 0, '& .MuiTypography-root': { fontSize: '0.85rem', fontWeight: 600 } }}
                />
              </Box>

              {titleEnabled ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={settings.title !== undefined ? settings.title : ''}
                    onChange={(e) => onChange('title', e.target.value)}
                    placeholder="Exclusive New Platform Launching Soon"
                    helperText="Main primary heading displayed on your coming soon template."
                  />

                  {/* Title Font Size Override */}
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '8px',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!settings.title_font_size_enabled}
                            onChange={(e) => onChange('title_font_size_enabled', e.target.checked)}
                            size="small"
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Override Title Font Size
                          </Typography>
                        }
                        sx={{ mr: 0 }}
                      />
                      {settings.title_font_size_enabled && (
                        <Typography variant="caption" color="text.secondary">
                          Custom size applied over template default
                        </Typography>
                      )}
                    </Box>

                    {settings.title_font_size_enabled && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 0.5, maxWidth: 400 }}>
                        <Slider
                          value={Number(settings.title_font_size) || 48}
                          min={16}
                          max={120}
                          step={1}
                          onChange={(_, val) => onChange('title_font_size', val)}
                          color="primary"
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        <TextField
                          size="small"
                          type="number"
                          value={settings.title_font_size !== undefined ? settings.title_font_size : 48}
                          onChange={(e) => onChange('title_font_size', Number(e.target.value))}
                          sx={{ width: 85 }}
                          inputProps={{ min: 16, max: 120 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          px
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 0.5 }}>
                  Headline / Page title is disabled and will be hidden on frontend.
                </Typography>
              )}
            </Box>

            <Divider />

            {/* Description Section */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Description / Message
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={descriptionEnabled}
                      onChange={(e) => onChange('description_enabled', e.target.checked ? '1' : '0')}
                      color="primary"
                      size="small"
                    />
                  }
                  label={descriptionEnabled ? 'Enabled' : 'Disabled'}
                  sx={{ mr: 0, '& .MuiTypography-root': { fontSize: '0.85rem', fontWeight: 600 } }}
                />
              </Box>

              {descriptionEnabled ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {/* Rich Message Box with Toolbar */}
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

                  {/* Description Font Size Override */}
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '8px',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!settings.description_font_size_enabled}
                            onChange={(e) => onChange('description_font_size_enabled', e.target.checked)}
                            size="small"
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Override Description Font Size
                          </Typography>
                        }
                        sx={{ mr: 0 }}
                      />
                      {settings.description_font_size_enabled && (
                        <Typography variant="caption" color="text.secondary">
                          Custom size applied over template default
                        </Typography>
                      )}
                    </Box>

                    {settings.description_font_size_enabled && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 0.5, maxWidth: 400 }}>
                        <Slider
                          value={Number(settings.description_font_size) || 18}
                          min={12}
                          max={60}
                          step={1}
                          onChange={(_, val) => onChange('description_font_size', val)}
                          color="primary"
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        <TextField
                          size="small"
                          type="number"
                          value={settings.description_font_size !== undefined ? settings.description_font_size : 18}
                          onChange={(e) => onChange('description_font_size', Number(e.target.value))}
                          sx={{ width: 85 }}
                          inputProps={{ min: 12, max: 60 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          px
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 0.5 }}>
                  Description is disabled and will be hidden on frontend.
                </Typography>
              )}
            </Box>
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
                onChange={(e) => {
                  const newType = e.target.value;
                  onChange('bg_type', newType);
                  if (['custom', 'slideshow', 'video', 'pattern'].includes(newType) && (!settings.bg_overlay_type || settings.bg_overlay_type === 'solid')) {
                    onChange('bg_overlay_type', 'none');
                  }
                }}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
              >
                <FormControlLabel value="default" control={<Radio color="primary" />} label="Default Media" />
                <FormControlLabel value="custom" control={<Radio color="primary" />} label="Custom Images" />
                <FormControlLabel value="slideshow" control={<Radio color="primary" />} label="Background Slideshow" />
                <FormControlLabel value="video" control={<Radio color="primary" />} label="Video" />
                <FormControlLabel value="pattern" control={<Radio color="primary" />} label="Graphic Pattern" />
                <FormControlLabel value="solid" control={<Radio color="primary" />} label="Solid Color" />
                <FormControlLabel value="gradient" control={<Radio color="primary" />} label="Gradient Color" />
              </RadioGroup>
            </Grid>

            {/* Right Side: Options based on selected background */}
            <Grid item xs={12} sm={8} md={9}>
              {/* Option 1: Default Media Info Box */}
              {(settings.bg_type === 'default' || !settings.bg_type) && (
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: '10px !important',
                    borderColor: 'divider',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.07)' : 'rgba(37, 99, 235, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: '8px',
                        backgroundColor: 'primary.main',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <WallpaperRoundedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        Template-Specific Background Active
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        Active template utilizes its own built-in design, photography, and styling.
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mt: 0.5 }}>
                    Default setting par har active template ki <strong>Template-Specific Background Settings</strong> naturally apply hongi. Agar aap apna custom background use karna chahte hain, toh left side ke options (<em>Custom Images, Video, Graphic Pattern, Solid Color, Gradient Color</em>) configure and use kar sakte hain.
                  </Typography>
                </Paper>
              )}

              {/* Option 2: Custom Images */}
              {settings.bg_type === 'custom' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {(() => {
                    const customImages = (settings.slides && settings.slides.length > 0)
                      ? settings.slides
                      : (settings.bg_custom_images && settings.bg_custom_images.length > 0)
                      ? settings.bg_custom_images
                      : [];
                    const hasImages = customImages.length > 0;

                    return (
                      <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAddSlide}
                            sx={{ borderRadius: '6px', fontWeight: 600, px: 2.5 }}
                          >
                            {hasImages ? 'Change Image' : 'Select Image'}
                          </Button>
                          {hasImages && (
                            <Button
                              size="small"
                              color="error"
                              variant="text"
                              onClick={() => {
                                onChange('slides', []);
                                onChange('bg_custom_images', []);
                                onChange('slide_ids', []);
                              }}
                              sx={{ fontWeight: 600 }}
                            >
                              Remove Image
                            </Button>
                          )}
                        </Box>

                        {/* Thumbnail gallery */}
                        {hasImages && (
                          <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
                            {customImages.map((slide, idx) => (
                              <Grid item xs={12} sm={6} md={4} key={slide.id || slide.url || idx}>
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
                                    alt="Custom Background"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleRemoveSlide(slide.id || slide.url)}
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
                        )}
                      </>
                    );
                  })()}

                  {/* Background Scale Mode */}
                  <Box sx={{ mt: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75, color: 'text.primary' }}>
                      Background Scale Mode
                    </Typography>
                    <Select
                      size="small"
                      fullWidth
                      value={settings.bg_image_size || 'cover'}
                      onChange={(e) => onChange('bg_image_size', e.target.value)}
                      sx={{ borderRadius: '8px' }}
                    >
                      <MenuItem value="cover">Cover (Fill screen, maintain aspect ratio - Default)</MenuItem>
                      <MenuItem value="contain">Contain (Fit entirely inside screen without cropping)</MenuItem>
                      <MenuItem value="auto">Auto (Original natural image size)</MenuItem>
                      <MenuItem value="fill">Stretch / Fill (100% width & 100% height)</MenuItem>
                    </Select>
                    <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
                      Manage how the custom background image is sized and fitted across desktop and mobile screens.
                    </Typography>
                  </Box>

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

              {/* Option: Background Slideshow */}
              {settings.bg_type === 'slideshow' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {(() => {
                    const slideshowImages = (settings.bg_slideshow_images && settings.bg_slideshow_images.length > 0)
                      ? settings.bg_slideshow_images
                      : (settings.slides && settings.slides.length > 0)
                      ? settings.slides
                      : [];
                    const hasSlides = slideshowImages.length > 0;

                    return (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAddSlideshowImages}
                            sx={{ borderRadius: '6px', fontWeight: 600, px: 2.5 }}
                          >
                            {hasSlides ? 'Add More Slides' : 'Select Slides'}
                          </Button>
                          {hasSlides && (
                            <Button
                              size="small"
                              color="error"
                              variant="text"
                              onClick={() => {
                                onChange('bg_slideshow_images', []);
                                onChange('slides', []);
                                onChange('slide_ids', []);
                              }}
                              sx={{ fontWeight: 600 }}
                            >
                              Clear All Slides
                            </Button>
                          )}
                          {hasSlides && (
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                              {slideshowImages.length} {slideshowImages.length === 1 ? 'slide' : 'slides'} in playlist
                            </Typography>
                          )}
                        </Box>

                        {/* Thumbnail gallery */}
                        {hasSlides ? (
                          <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
                            {slideshowImages.map((slide, idx) => (
                              <Grid item xs={12} sm={6} md={4} key={slide.id || slide.url || idx}>
                                <Paper
                                  variant="outlined"
                                  sx={{
                                    position: 'relative',
                                    height: 110,
                                    borderRadius: '8px !important',
                                    overflow: 'hidden',
                                    backgroundColor: '#1e293b',
                                  }}
                                >
                                  <img
                                    src={slide.url}
                                    alt={`Slide ${idx + 1}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                  <Box
                                    sx={{
                                      position: 'absolute',
                                      bottom: 4,
                                      left: 6,
                                      backgroundColor: 'rgba(0,0,0,0.65)',
                                      color: '#ffffff',
                                      px: 1,
                                      py: 0.2,
                                      borderRadius: '4px',
                                      fontSize: '0.72rem',
                                      fontWeight: 700,
                                    }}
                                  >
                                    Slide {idx + 1}
                                  </Box>
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleRemoveSlideshowImage(slide.id || slide.url)}
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
                        ) : (
                          <Alert severity="info" sx={{ borderRadius: '8px' }}>
                            Upload multiple images to create an interactive background slideshow.
                          </Alert>
                        )}
                      </Box>
                    );
                  })()}

                  <Divider />

                  {/* Transition Animation & Scale */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                        Transition Effect
                      </Typography>
                      <Select
                        size="small"
                        fullWidth
                        value={settings.bg_slideshow_animation || 'fade'}
                        onChange={(e) => onChange('bg_slideshow_animation', e.target.value)}
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="fade">Smooth Crossfade (Default)</MenuItem>
                        <MenuItem value="slide">Slide Horizontal</MenuItem>
                        <MenuItem value="zoom">Ken Burns / Zoom Effect</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                        Background Scale Mode
                      </Typography>
                      <Select
                        size="small"
                        fullWidth
                        value={settings.bg_slideshow_scale || 'cover'}
                        onChange={(e) => onChange('bg_slideshow_scale', e.target.value)}
                        sx={{ borderRadius: '8px' }}
                      >
                        <MenuItem value="cover">Cover (Fill screen, maintain aspect ratio - Default)</MenuItem>
                        <MenuItem value="contain">Contain (Fit entirely inside screen)</MenuItem>
                        <MenuItem value="auto">Auto (Original image size)</MenuItem>
                        <MenuItem value="fill">Stretch / Fill (100% width & 100% height)</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ maxWidth: 420 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Slide Display Duration
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.85rem' }}>
                            {settings.bg_slideshow_speed || 5} seconds
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Slider
                            value={Number(settings.bg_slideshow_speed) || 5}
                            min={2}
                            max={20}
                            step={1}
                            onChange={(_, val) => onChange('bg_slideshow_speed', val)}
                            color="primary"
                            size="small"
                            sx={{ flex: 1 }}
                          />
                          <TextField
                            size="small"
                            type="number"
                            value={settings.bg_slideshow_speed !== undefined ? settings.bg_slideshow_speed : 5}
                            onChange={(e) => onChange('bg_slideshow_speed', Math.max(2, Number(e.target.value)))}
                            sx={{ width: 80 }}
                            inputProps={{ min: 2, max: 20 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            sec
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
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
              {settings.bg_type === 'pattern' && (() => {
                const pat = settings.bg_pattern || 'waves';
                const patternMap = {
                  sakura: {
                    backgroundColor: '#1a0b18',
                    backgroundImage:
                      'radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.4) 10%, transparent 20%), radial-gradient(circle at 20% 20%, rgba(251, 113, 133, 0.35) 15%, transparent 25%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.35) 15%, transparent 25%), radial-gradient(circle at 70% 30%, rgba(244, 114, 182, 0.3) 12%, transparent 24%)',
                    backgroundSize: '100px 100px',
                  },
                  hexagons: {
                    backgroundColor: '#0b1120',
                    backgroundImage:
                      'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.35) 15%, transparent 16%), radial-gradient(circle at 0 0, rgba(99, 102, 241, 0.35) 15%, transparent 16%), radial-gradient(circle at 100% 0, rgba(99, 102, 241, 0.35) 15%, transparent 16%), radial-gradient(circle at 0 100%, rgba(99, 102, 241, 0.35) 15%, transparent 16%), radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.35) 15%, transparent 16%)',
                    backgroundSize: '40px 40px',
                  },
                  dots: {
                    backgroundColor: '#0b1120',
                    backgroundImage: 'radial-gradient(rgba(59, 130, 246, 0.5) 2px, transparent 2px)',
                    backgroundSize: '24px 24px',
                  },
                  triangles: {
                    backgroundColor: '#090e1a',
                    backgroundImage:
                      'linear-gradient(30deg, #131d33 12%, transparent 12.5%, transparent 87%, #131d33 87.5%, #131d33), linear-gradient(150deg, #131d33 12%, transparent 12.5%, transparent 87%, #131d33 87.5%, #131d33), linear-gradient(30deg, #131d33 12%, transparent 12.5%, transparent 87%, #131d33 87.5%, #131d33), linear-gradient(150deg, #131d33 12%, transparent 12.5%, transparent 87%, #131d33 87.5%, #131d33), linear-gradient(60deg, rgba(30, 58, 138, 0.35) 25%, transparent 25.5%, transparent 75%, rgba(30, 58, 138, 0.35) 75%, rgba(30, 58, 138, 0.35)), linear-gradient(60deg, rgba(30, 58, 138, 0.35) 25%, transparent 25.5%, transparent 75%, rgba(30, 58, 138, 0.35) 75%, rgba(30, 58, 138, 0.35))',
                    backgroundSize: '80px 140px',
                    backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
                  },
                  waves: {
                    backgroundColor: '#081226',
                    backgroundImage:
                      'radial-gradient(ellipse at 50% 50%, rgba(14, 165, 233, 0.35) 0%, transparent 60%), repeating-radial-gradient(circle at 0 0, transparent 0, #081226 20px, transparent 21px, rgba(14, 165, 233, 0.25) 22px, transparent 23px)',
                    backgroundSize: '100% 100%, 60px 60px',
                  },
                  carbon: {
                    backgroundColor: '#0f1117',
                    backgroundImage:
                      'linear-gradient(27deg, #151821 5px, transparent 5px), linear-gradient(207deg, #151821 5px, transparent 5px), linear-gradient(27deg, #1e2230 5px, transparent 5px), linear-gradient(207deg, #1e2230 5px, transparent 5px), linear-gradient(90deg, #181c27 10px, transparent 10px), linear-gradient(#1b1e2b 25%, #141722 25%, #141722 50%, transparent 50%, transparent 75%, #232838 75%, #232838)',
                    backgroundSize: '20px 20px',
                  },
                  lines: {
                    backgroundColor: '#0b1120',
                    backgroundImage:
                      'repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.2) 2px, transparent 2px, transparent 16px)',
                  },
                  stars: {
                    backgroundColor: '#030712',
                    backgroundImage:
                      'radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.9), rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 120px, rgba(147,197,253,0.9), rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 230px 190px, #ffffff, rgba(0,0,0,0))',
                    backgroundSize: '250px 250px',
                  },
                };
                const activeStyle = patternMap[pat] || patternMap.waves;

                return (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                        Select Pattern
                      </Typography>
                      <Select
                        size="small"
                        fullWidth
                        value={pat}
                        onChange={(e) => onChange('bg_pattern', e.target.value)}
                      >
                        <MenuItem value="waves">Waves</MenuItem>
                        <MenuItem value="sakura">Sakura</MenuItem>
                        <MenuItem value="hexagons">Hexagons</MenuItem>
                        <MenuItem value="dots">Dots Pattern</MenuItem>
                        <MenuItem value="triangles">Triangles</MenuItem>
                        <MenuItem value="carbon">Carbon Fiber</MenuItem>
                        <MenuItem value="lines">Diagonal Lines</MenuItem>
                        <MenuItem value="stars">Night Stars</MenuItem>
                      </Select>
                    </Box>

                    {/* Pattern Strip Preview */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        Live Pattern Preview:
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          width: '100%',
                          height: 140,
                          borderRadius: '8px !important',
                          border: '1px solid #334155',
                          ...activeStyle,
                          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)',
                        }}
                      />
                    </Box>
                  </Box>
                );
              })()}

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

              {/* Common Overlay & Blur Settings (Only for Custom Backgrounds) */}
              {settings.bg_type && settings.bg_type !== 'default' && (
                <>
                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
                        Background Overlay
                      </Typography>
                      <Select
                        size="small"
                        fullWidth
                        value={
                          settings.bg_overlay_type !== undefined && settings.bg_overlay_type !== ''
                            ? settings.bg_overlay_type
                            : (['custom', 'video', 'pattern'].includes(settings.bg_type) ? 'none' : 'solid')
                        }
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
                </>
              )}
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
                      p: 4,
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #0e303d 0%, #061922 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #1e293b',
                      minHeight: 130,
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        maxWidth: 540,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <style>{`
                        #csmm-live-preview-input::placeholder {
                          color: ${settings.form_input_color || '#ffffff'} !important;
                          opacity: 0.85;
                        }
                      `}</style>
                      <input
                        id="csmm-live-preview-input"
                        type="text"
                        readOnly
                        placeholder={settings.form_placeholder_text || 'Email Address'}
                        style={{
                          width: '100%',
                          height: '52px',
                          padding: '0 190px 0 20px',
                          backgroundColor: settings.form_input_bg || '#222326',
                          color: settings.form_input_color || '#ffffff',
                          border: 'none',
                          borderTopLeftRadius: settings.form_border_radius !== undefined ? `${settings.form_border_radius}px` : '0px',
                          borderBottomLeftRadius: settings.form_border_radius !== undefined ? `${settings.form_border_radius}px` : '0px',
                          borderTopRightRadius: '0px',
                          borderBottomRightRadius: '0px',
                          outline: 'none',
                          fontSize: '15px',
                          fontWeight: 500,
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          boxSizing: 'border-box',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                        }}
                      />
                      <button
                        type="button"
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          height: '52px',
                          padding: '0 26px',
                          backgroundColor: settings.form_btn_bg || '#000000',
                          color: settings.form_btn_color || '#ffffff',
                          border: 'none',
                          borderTopRightRadius: settings.form_border_radius !== undefined ? `${settings.form_border_radius}px` : '0px',
                          borderBottomRightRadius: settings.form_border_radius !== undefined ? `${settings.form_border_radius}px` : '0px',
                          borderTopLeftRadius: '0px',
                          borderBottomLeftRadius: '0px',
                          fontWeight: 700,
                          fontSize: '13px',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          whiteSpace: 'nowrap',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {settings.form_btn_text || 'NOTIFY ME'}
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
