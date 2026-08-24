import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  ButtonGroup,
  Paper,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import TabletMacRoundedIcon from '@mui/icons-material/TabletMacRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';

export default function TemplatesTab({ settings, onChange, templates, previewUrlBase }) {
  const selectedTemplateId = Number(settings.template_id) || 1;
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop | tablet | mobile

  const handleSelect = (id) => {
    onChange('template_id', id);
  };

  const getDeviceWidth = () => {
    if (deviceMode === 'mobile') return '375px';
    if (deviceMode === 'tablet') return '768px';
    return '100%';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card elevation={0}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <div>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Choose Pre-Built Template
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select from 36 modern, mobile-ready Coming Soon and Maintenance Mode layouts.
              </Typography>
            </div>
            <Chip
              label={`Active: Template #${String(selectedTemplateId).padStart(2, '0')}`}
              color="primary"
              variant="filled"
              sx={{ fontWeight: 700, px: 1 }}
            />
          </Box>

          <Grid container spacing={3}>
            {templates.map((tpl) => {
              const isSelected = selectedTemplateId === tpl.id;
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={tpl.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      border: '2px solid',
                      borderColor: isSelected ? '#2563eb' : '#e2e8f0',
                      transition: 'all 0.25s ease-in-out',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                        borderColor: isSelected ? '#2563eb' : '#94a3b8',
                      },
                    }}
                  >
                    {/* Thumbnail */}
                    <Box
                      sx={{
                        position: 'relative',
                        height: 180,
                        backgroundColor: '#0f172a',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={tpl.thumbnail}
                        alt={tpl.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {isSelected && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            borderRadius: '50%',
                            display: 'flex',
                            p: 0.5,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                          }}
                        >
                          <CheckCircleRoundedIcon sx={{ fontSize: 20 }} />
                        </Box>
                      )}
                    </Box>

                    {/* Card Footer Actions */}
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {tpl.name}
                        </Typography>
                        {isSelected && (
                          <Chip label="Selected" size="small" color="primary" sx={{ height: 20, fontSize: '0.75rem' }} />
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          fullWidth
                          size="small"
                          variant={isSelected ? 'contained' : 'outlined'}
                          color="primary"
                          onClick={() => handleSelect(tpl.id)}
                          sx={{ fontWeight: 600 }}
                        >
                          {isSelected ? 'Activated' : 'Activate'}
                        </Button>
                        <IconButton
                          size="small"
                          color="default"
                          onClick={() => setPreviewTemplate(tpl)}
                          sx={{ border: '1px solid #e2e8f0', borderRadius: 1.5 }}
                          title="Live Preview"
                        >
                          <VisibilityRoundedIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Live Preview Modal */}
      <Dialog
        open={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            height: '92vh',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 2,
            px: 3,
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {previewTemplate ? previewTemplate.name : 'Template Preview'}
            </Typography>
            <ButtonGroup size="small" variant="outlined" sx={{ ml: 2 }}>
              <Button
                variant={deviceMode === 'desktop' ? 'contained' : 'outlined'}
                onClick={() => setDeviceMode('desktop')}
                startIcon={<DesktopWindowsRoundedIcon />}
              >
                Desktop
              </Button>
              <Button
                variant={deviceMode === 'tablet' ? 'contained' : 'outlined'}
                onClick={() => setDeviceMode('tablet')}
                startIcon={<TabletMacRoundedIcon />}
              >
                Tablet
              </Button>
              <Button
                variant={deviceMode === 'mobile' ? 'contained' : 'outlined'}
                onClick={() => setDeviceMode('mobile')}
                startIcon={<PhoneIphoneRoundedIcon />}
              >
                Mobile
              </Button>
            </ButtonGroup>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {previewTemplate && (
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSelect(previewTemplate.id);
                  setPreviewTemplate(null);
                }}
              >
                Use This Template
              </Button>
            )}
            {previewTemplate && (
              <IconButton
                size="small"
                component="a"
                href={previewTemplate.preview_url}
                target="_blank"
                title="Open in new tab"
              >
                <LaunchRoundedIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small" onClick={() => setPreviewTemplate(null)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 0,
            backgroundColor: '#1e293b',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {previewTemplate && (
            <Box
              sx={{
                width: getDeviceWidth(),
                height: '100%',
                transition: 'width 0.3s ease',
                boxShadow: deviceMode !== 'desktop' ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
                backgroundColor: '#ffffff',
              }}
            >
              <iframe
                src={previewTemplate.preview_url}
                title={previewTemplate.name}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
