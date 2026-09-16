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
  CircularProgress,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import TabletMacRoundedIcon from '@mui/icons-material/TabletMacRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';

const FREE_TEMPLATE_IDS = [1, 4, 8, 11, 15];

export default function TemplatesTab({ settings = {}, onChange, onActivate, templates = [] }) {
  const selectedTemplateId = Number(settings.template_id) || 1;
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop | tablet | mobile
  const [activatingId, setActivatingId] = useState(null);

  const templateList = Array.isArray(templates) ? templates : (Array.isArray(templates?.data) ? templates.data : []);

  const handleSelect = async (id) => {
    if (!FREE_TEMPLATE_IDS.includes(id)) return;
    if (selectedTemplateId === id) return;
    setActivatingId(id);
    if (onActivate) {
      await onActivate(id);
    } else if (onChange) {
      onChange('template_id', id);
    }
    setActivatingId(null);
  };

  const getDeviceWidth = () => {
    if (deviceMode === 'mobile') return '375px';
    if (deviceMode === 'tablet') return '768px';
    return '100%';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
            <div>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                Choose Pre-Built Template
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select from 5 free responsive templates or upgrade to Pro to unlock all 36 modern layouts.
              </Typography>
            </div>
            <Chip
              label={`Active: Template #${String(selectedTemplateId).padStart(2, '0')}`}
              color="primary"
              variant="filled"
              sx={{ fontWeight: 700, px: 1, borderRadius: '6px' }}
            />
          </Box>

          <Grid container spacing={2.5}>
            {templateList.map((tpl) => {
              const isFree = FREE_TEMPLATE_IDS.includes(tpl.id);
              const isSelected = selectedTemplateId === tpl.id;
              const isActivating = activatingId === tpl.id;

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={tpl.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: '10px !important',
                      overflow: 'hidden',
                      border: '2px solid',
                      borderColor: isSelected ? '#2563eb' : 'divider',
                      transition: 'all 0.2s ease-in-out',
                      backgroundColor: 'background.paper',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                        borderColor: isSelected ? '#2563eb' : (isFree ? '#94a3b8' : '#f59e0b'),
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={tpl.thumbnail}
                        alt={tpl.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.opacity = '0.4';
                        }}
                      />

                      {/* Numbering Badge on Top Left */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          backgroundColor: isSelected ? '#2563eb' : 'rgba(15, 23, 42, 0.82)',
                          backdropFilter: 'blur(6px)',
                          color: '#ffffff',
                          borderRadius: '6px',
                          px: 1.1,
                          py: 0.25,
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          letterSpacing: '0.5px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                          border: isSelected ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.18)',
                          zIndex: 2,
                        }}
                      >
                        {String(tpl.id).padStart(2, '0')}
                      </Box>

                      {isSelected ? (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            borderRadius: '50%',
                            display: 'flex',
                            p: 0.4,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            zIndex: 2,
                          }}
                        >
                          <CheckCircleRoundedIcon sx={{ fontSize: 18 }} />
                        </Box>
                      ) : !isFree && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: '#ffffff',
                            borderRadius: '6px',
                            px: 1,
                            py: 0.3,
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            letterSpacing: '0.5px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.4,
                            zIndex: 2,
                          }}
                        >
                          <WorkspacePremiumRoundedIcon sx={{ fontSize: 14 }} />
                          PRO
                        </Box>
                      )}
                    </Box>

                    {/* Card Footer Actions */}
                    <Box sx={{ p: 1.8, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {tpl.name || tpl.title}
                        </Typography>
                      </Box>

                      {isFree ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            fullWidth
                            size="small"
                            variant={isSelected ? 'contained' : 'outlined'}
                            color="primary"
                            disabled={isActivating}
                            onClick={() => handleSelect(tpl.id)}
                            startIcon={isActivating ? <CircularProgress size={14} color="inherit" /> : (isSelected ? <CheckCircleRoundedIcon sx={{ fontSize: 16 }} /> : null)}
                            sx={{ fontWeight: 600, borderRadius: '6px' }}
                          >
                            {isActivating ? 'Activating...' : (isSelected ? 'Activated' : 'Activate')}
                          </Button>
                          <IconButton
                            size="small"
                            onClick={() => setPreviewTemplate(tpl)}
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              color: 'text.primary',
                              borderRadius: '6px',
                              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#334155' : '#f8fafc'),
                              '&:hover': {
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#475569' : '#f1f5f9'),
                              },
                            }}
                            title="Live Preview"
                          >
                            <VisibilityRoundedIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            component="a"
                            href="https://wpfrank.com/wordpress-plugins/coming-soon-maintenance-mode-pro/"
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<WorkspacePremiumRoundedIcon sx={{ fontSize: 16, color: '#ffffff' }} />}
                            sx={{
                              fontWeight: 700,
                              borderRadius: '6px',
                              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                              color: '#ffffff',
                              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                              },
                              textTransform: 'none',
                              fontSize: '0.82rem',
                              py: 0.5,
                            }}
                          >
                            Upgrade to Pro
                          </Button>
                        </Box>
                      )}
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
            borderRadius: '10px !important',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 1.5,
            px: 2.5,
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              {previewTemplate ? (previewTemplate.name || previewTemplate.title) : 'Template Preview'}
            </Typography>
            <ButtonGroup size="small" variant="outlined" sx={{ ml: 1 }}>
              <Button
                variant={deviceMode === 'desktop' ? 'contained' : 'outlined'}
                onClick={() => setDeviceMode('desktop')}
                startIcon={<DesktopWindowsRoundedIcon />}
                sx={{ borderRadius: '6px' }}
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
                sx={{ borderRadius: '6px' }}
              >
                Mobile
              </Button>
            </ButtonGroup>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {previewTemplate && FREE_TEMPLATE_IDS.includes(previewTemplate.id) && (
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSelect(previewTemplate.id);
                  setPreviewTemplate(null);
                }}
                sx={{ borderRadius: '6px' }}
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
                sx={{ borderRadius: '6px' }}
              >
                <LaunchRoundedIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small" onClick={() => setPreviewTemplate(null)} sx={{ borderRadius: '6px' }}>
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
