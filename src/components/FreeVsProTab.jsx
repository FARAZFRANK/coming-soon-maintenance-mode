import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const PRO_URLS = {
  details: 'https://wpfrank.com/wordpress-plugins/coming-soon-maintenance-mode-pro/',
  demo: 'https://wpfrank.com/demo/coming-soon-maintenance-mode-pro',
  signup: 'https://wpfrank.com/account/signup/coming-soon-maintenance-mode-pro',
};

const COMPARISON_DATA = [
  {
    category: 'Templates & Visual Styling',
    features: [
      { name: 'Designer Coming Soon Templates', free: '5 Templates (1, 4, 8, 11, 15)', pro: 'All 36+ Premium Templates' },
      { name: '100% Responsive Mobile / Tablet / Desktop', free: true, pro: true },
      { name: 'Custom Logo & Text Logo Upload', free: true, pro: true },
      { name: 'Solid Color & Unsplash Stock Images', free: true, pro: true },
      { name: 'Dynamic Background Slideshow with Transitions', free: false, pro: true },
      { name: 'Video Background (YouTube, Vimeo, MP4)', free: false, pro: true },
      { name: 'Interactive Animated Graphic Patterns', free: false, pro: true },
      { name: 'Custom CSS Overrides Code Editor', free: false, pro: true },
    ],
  },
  {
    category: 'Lead Capture & Marketing Integrations',
    features: [
      { name: 'Frontend Email Subscription Form', free: false, pro: true },
      { name: 'Local Subscriber Database & Management', free: false, pro: true },
      { name: '1-Click Export Subscribers to CSV', free: false, pro: true },
      { name: 'Mailchimp API v3 Auto-Sync Audience', free: false, pro: true },
      { name: 'Brevo (Sendinblue) API v3 Auto-Sync', free: false, pro: true },
      { name: 'MailerLite API v2 Auto-Sync Groups', free: false, pro: true },
      { name: 'Custom Webhook (Zapier, Make, Pabbly)', free: false, pro: true },
    ],
  },
  {
    category: 'Email Delivery & Automation',
    features: [
      { name: 'Custom SMTP Server Configuration', free: false, pro: true },
      { name: 'Admin Instant Lead Alert Notifications', free: false, pro: true },
      { name: 'Automated Subscriber Welcome Emails', free: false, pro: true },
      { name: '1-Click Site Live Announcement Broadcast', free: false, pro: true },
      { name: 'Background Email Queue & Deliverability Monitoring', free: false, pro: true },
    ],
  },
  {
    category: 'Countdown Timer & Launch Automation',
    features: [
      { name: 'Live Countdown Timer Clock', free: true, pro: true },
      { name: 'Auto-Launch Feature (Switch to Live on Zero)', free: false, pro: true },
      { name: 'Coming Soon Mode & Maintenance Mode (503)', free: true, pro: true },
      { name: 'Selective Page & Post Targeting / Whitelisting', free: true, pro: true },
    ],
  },
  {
    category: 'Social Networks & SEO Tools',
    features: [
      { name: 'Social Media Profiles', free: '3 Networks (Facebook, X, Instagram)', pro: 'All 13+ Major Networks' },
      { name: 'Custom SEO Meta Title & Meta Description', free: true, pro: true },
      { name: 'Search Engine Robots Meta Control (noindex)', free: true, pro: true },
      { name: 'OpenGraph Social Share Image & Tags', free: true, pro: true },
      { name: 'Google Analytics Tracking Script', free: true, pro: true },
    ],
  },
  {
    category: 'Support & Guarantees',
    features: [
      { name: 'Plugin Updates & WordPress Core Compatibility', free: 'Standard Updates', pro: 'Priority Lifetime Updates' },
      { name: 'Technical Support', free: 'Community Forum', pro: 'Priority 24/7 Dedicated Ticket Support' },
      { name: 'Satisfaction Guarantee', free: 'Free Forever', pro: '100% Risk-Free 30-Day Money Back' },
    ],
  },
];

export default function FreeVsProTab() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, pb: 4 }}>
      {/* 1. Hero Upgrade Banner */}
      <Card
        elevation={0}
        sx={{
          borderRadius: '12px !important',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1e293b 100%)',
          color: '#ffffff',
          border: '1px solid #334155',
          p: { xs: 3, md: 4.5 },
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 240,
            height: 240,
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Chip
            icon={<WorkspacePremiumRoundedIcon sx={{ fontSize: 16, color: '#f59e0b !important' }} />}
            label="POWERFUL PRO EDITION"
            size="small"
            sx={{
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              color: '#fbbf24',
              fontWeight: 800,
              fontSize: '0.72rem',
              letterSpacing: '0.8px',
              borderRadius: '6px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              lineHeight: 1.25,
              mb: 1.5,
              maxWidth: 820,
            }}
          >
            Supercharge Your Launch with Coming Soon Maintenance Mode Pro
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#cbd5e1',
              maxWidth: 780,
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              mb: 3.5,
            }}
          >
            Unlock all 36+ designer templates, collect leads with built-in subscriber forms, auto-sync directly with
            Mailchimp, Brevo & MailerLite, deliver emails with custom SMTP, and auto-launch your website when your countdown
            timer hits zero.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              component="a"
              href={PRO_URLS.signup}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<RocketLaunchRoundedIcon />}
              sx={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.92rem',
                borderRadius: '8px',
                px: 3.5,
                py: 1.2,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  boxShadow: '0 6px 18px rgba(245, 158, 11, 0.5)',
                },
              }}
            >
              Get Coming Soon Pro Now 🚀
            </Button>

            <Button
              variant="outlined"
              component="a"
              href={PRO_URLS.demo}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<VisibilityRoundedIcon />}
              sx={{
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                fontWeight: 700,
                fontSize: '0.92rem',
                borderRadius: '8px',
                px: 3,
                py: 1.2,
                textTransform: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  borderColor: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                },
              }}
            >
              View Live Pro Demo
            </Button>

            <Button
              variant="text"
              component="a"
              href={PRO_URLS.details}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: '#93c5fd',
                fontWeight: 700,
                fontSize: '0.92rem',
                px: 2,
                py: 1.2,
                textTransform: 'none',
                '&:hover': {
                  color: '#bfdbfe',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                },
              }}
            >
              Learn More Details
            </Button>
          </Stack>
        </Box>
      </Card>

      {/* 2. Key Value Highlights */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: '10px !important',
              height: '100%',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PaletteRoundedIcon />
              </Box>
              <Typography variant="subtitle1" fontWeight={800}>
                36+ Designer Templates
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              Unlock all 36 beautifully crafted, responsive templates covering agencies, startups, portfolios, eCommerce,
              events, construction, academies, and more.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: '10px !important',
              height: '100%',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MarkEmailReadRoundedIcon />
              </Box>
              <Typography variant="subtitle1" fontWeight={800}>
                Email Lead Capture & Sync
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              Capture visitor emails right on your coming soon page and automatically sync contacts directly into Mailchimp,
              Brevo, MailerLite, or custom webhooks.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: '10px !important',
              height: '100%',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.6)' : '#ffffff'),
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  color: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AutoAwesomeRoundedIcon />
              </Box>
              <Typography variant="subtitle1" fontWeight={800}>
                Auto-Launch & SMTP Delivery
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              Configure custom SMTP mail servers for guaranteed email deliverability, send automated welcome emails, and switch
              your site live automatically when the countdown ends.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 3. Detailed Comparison Table */}
      <Card sx={{ borderRadius: '12px !important', overflow: 'hidden' }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: { xs: 2.5, md: 3.5 }, pb: 2 }}>
            <Typography variant="h6" fontWeight={800}>
              Detailed Feature Comparison
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Review what features are included in the Free version versus the full Coming Soon Maintenance Mode Pro edition.
            </Typography>
          </Box>

          <TableContainer component={Box}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc'),
                    borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <TableCell sx={{ fontWeight: 800, fontSize: '0.9rem', width: '50%', py: 2 }}>
                    Features & Capabilities
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: '0.9rem', width: '25%', py: 2 }} align="center">
                    Free Version
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      width: '25%',
                      py: 2,
                      background: (theme) => (theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(245, 158, 11, 0.08)'),
                      color: '#d97706',
                    }}
                    align="center"
                  >
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8 }}>
                      <WorkspacePremiumRoundedIcon sx={{ fontSize: 18 }} />
                      Pro Version
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {COMPARISON_DATA.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {/* Category Header */}
                    <TableRow
                      sx={{
                        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#f1f5f9'),
                      }}
                    >
                      <TableCell
                        colSpan={3}
                        sx={{
                          fontWeight: 800,
                          fontSize: '0.82rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.7px',
                          color: 'text.secondary',
                          py: 1.5,
                          px: 3,
                        }}
                      >
                        {group.category}
                      </TableCell>
                    </TableRow>

                    {/* Feature Rows */}
                    {group.features.map((item, fIdx) => (
                      <TableRow
                        key={fIdx}
                        hover
                        sx={{
                          '&:last-child td, &:last-child th': { borderBottom: gIdx === COMPARISON_DATA.length - 1 ? 0 : undefined },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.88rem', py: 1.8, px: 3 }}>
                          {item.name}
                        </TableCell>

                        {/* Free Column */}
                        <TableCell align="center" sx={{ py: 1.8 }}>
                          {typeof item.free === 'boolean' ? (
                            item.free ? (
                              <CheckCircleRoundedIcon sx={{ color: '#10b981', fontSize: 22 }} />
                            ) : (
                              <CancelRoundedIcon sx={{ color: '#94a3b8', fontSize: 22, opacity: 0.6 }} />
                            )
                          ) : (
                            <Chip
                              label={item.free}
                              size="small"
                              variant="outlined"
                              sx={{ fontWeight: 700, fontSize: '0.75rem', borderRadius: '6px' }}
                            />
                          )}
                        </TableCell>

                        {/* Pro Column */}
                        <TableCell
                          align="center"
                          sx={{
                            py: 1.8,
                            background: (theme) => (theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.04)' : 'rgba(245, 158, 11, 0.03)'),
                          }}
                        >
                          {typeof item.pro === 'boolean' ? (
                            item.pro ? (
                              <CheckCircleRoundedIcon sx={{ color: '#10b981', fontSize: 24 }} />
                            ) : (
                              <CancelRoundedIcon sx={{ color: '#ef4444', fontSize: 24 }} />
                            )
                          ) : (
                            <Chip
                              label={item.pro}
                              size="small"
                              sx={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: '#ffffff',
                                fontWeight: 800,
                                fontSize: '0.75rem',
                                borderRadius: '6px',
                                boxShadow: '0 2px 6px rgba(245, 158, 11, 0.25)',
                              }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* 4. Bottom Callout / Conversion Card */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: '12px !important',
          p: { xs: 3, md: 4 },
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.08)' : '#fffbeb'),
          borderColor: 'rgba(245, 158, 11, 0.35)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box sx={{ maxWidth: 700 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
            <VerifiedRoundedIcon sx={{ color: '#f59e0b', fontSize: 28 }} />
            <Typography variant="h6" fontWeight={800} sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#fbbf24' : '#92400e') }}>
              Ready to Upgrade? Get 30 Days 100% Risk-Free Guarantee
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            Upgrade to <strong>Coming Soon Maintenance Mode Pro</strong> today to capture leads before launching, unlock all 36+ templates,
            and automate your email marketing. If you aren't completely satisfied within 30 days, we'll refund 100% of your money.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ minWidth: { md: 320 }, width: { xs: '100%', md: 'auto' } }}>
          <Button
            variant="contained"
            component="a"
            href={PRO_URLS.signup}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<RocketLaunchRoundedIcon />}
            sx={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.88rem',
              borderRadius: '8px',
              px: 3,
              py: 1.2,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
              '&:hover': {
                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
              },
            }}
          >
            Upgrade to Pro 🚀
          </Button>

          <Button
            variant="outlined"
            component="a"
            href={PRO_URLS.details}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontWeight: 700,
              fontSize: '0.88rem',
              borderRadius: '8px',
              borderColor: 'rgba(245, 158, 11, 0.5)',
              color: (theme) => (theme.palette.mode === 'dark' ? '#fbbf24' : '#b45309'),
              px: 2.5,
              py: 1.2,
              textTransform: 'none',
              '&:hover': {
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
              },
            }}
          >
            View Details
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
