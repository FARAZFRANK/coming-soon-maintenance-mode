import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  Alert,
} from '@mui/material';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
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
        borderRadius: '8px',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.08)'),
        border: '1px solid rgba(245, 158, 11, 0.25)',
        color: (theme) => (theme.palette.mode === 'dark' ? '#fbbf24' : '#b45309'),
        '& .MuiAlert-icon': { color: '#f59e0b' },
        alignItems: 'center',
      }}
    >
      <strong>{title}</strong> {description || 'is a Pro feature. Upgrade to Pro to capture email subscribers and manage leads.'}
    </Alert>
  );
}

export default function SubscribersTab() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Pro Alert Banner */}
      <ProFeatureAlert
        title="Email Subscribers Lead Capture & Management"
        description="is a Pro feature. Upgrade to Pro to collect subscriber email leads directly from your coming soon page, view database entries, and export CSV files."
      />

      <Box sx={{ opacity: 0.55, pointerEvents: 'none', userSelect: 'none', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Top Stat Card */}
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '10px !important',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: '#ffffff',
              }}
            >
              <div>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ opacity: 0.85, fontWeight: 500 }}>
                    Total Email Leads Captured
                  </Typography>
                  <ProBadge />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, fontSize: '1.75rem' }}>
                  0
                </Typography>
              </div>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PeopleAltRoundedIcon sx={{ fontSize: 26 }} />
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Main Table Card */}
        <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
          <CardContent sx={{ p: 2.5 }}>
            {/* Header Controls */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 2,
                mb: 2.5,
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, flex: 1, maxWidth: { sm: 380 } }}>
                <TextField
                  size="small"
                  fullWidth
                  disabled
                  placeholder="Search email address (Pro)..."
                  value=""
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="outlined" size="small" disabled sx={{ borderRadius: '6px' }}>
                  Search
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton disabled title="Refresh list" size="small" sx={{ border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <RefreshRoundedIcon fontSize="small" />
                </IconButton>

                <Button
                  variant="contained"
                  disabled
                  startIcon={<DownloadRoundedIcon />}
                  sx={{ borderRadius: '8px' }}
                >
                  Export CSV
                </Button>
              </Box>
            </Box>

            {/* Table */}
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px !important' }}>
              <Table size="medium">
                <TableHead sx={{ backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9') }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, width: 80, color: 'text.primary', borderColor: 'divider' }}># ID</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: 'text.primary', borderColor: 'divider' }}>Email Address</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: 'text.primary', borderColor: 'divider' }}>IP Address</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: 'text.primary', borderColor: 'divider' }}>Date Subscribed</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: 100, textAlign: 'center', color: 'text.primary', borderColor: 'divider' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 7, borderColor: 'divider' }}>
                      <PeopleAltRoundedIcon sx={{ fontSize: 44, color: 'text.secondary', opacity: 0.5, mb: 1 }} />
                      <Typography variant="subtitle1" fontWeight={700} color="text.secondary">
                        Subscriber Lead Management is Available in Pro Version
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 460, mx: 'auto', mt: 0.5 }}>
                        Upgrade to Pro to capture visitor email leads, sync with third-party newsletter marketing tools, and export CSV files.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
