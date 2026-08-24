import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';

export default function DocumentationTab() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Overview Card */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AutoAwesomeRoundedIcon color="primary" sx={{ fontSize: 26 }} />
            <div>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                Coming Soon Maintenance Mode Pro v3.2.0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Modern, high-performance, and responsive landing page solution built with React 18, Vite, Material UI, and WordPress REST API.
              </Typography>
            </div>
          </Box>
        </CardContent>
      </Card>

      {/* Frequently Asked Questions */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2 }}>
            <HelpOutlineRoundedIcon color="secondary" />
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Knowledge Base & Helpful Tips
            </Typography>
          </Box>

          <Accordion defaultExpanded elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important', mb: 1.5 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                What is the difference between Coming Soon Mode and Maintenance Mode?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Coming Soon Mode (HTTP 200):</strong> Ideal for new sites or domains that have not launched yet. It tells search engines that your site is ready to be indexed while displaying a countdown teaser to public visitors.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Maintenance Mode (HTTP 503):</strong> Ideal when you are performing updates, theme redesigns, or database work on an established site. It sends an HTTP 503 "Service Unavailable" status header with a <code>Retry-After</code> header, ensuring your existing Google SEO rankings remain protected.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important', mb: 1.5 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                How do I preview my site while maintenance mode is active?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Logged-in Administrators will automatically see the live website normally. If you want to see the maintenance template preview as an admin, click the <strong>Live Preview</strong> button in the top navigation bar or add <code>?csmm=true</code> to your website URL.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important', mb: 1.5 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                How does Auto-Launch with Countdown work?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                When the Countdown Timer is enabled and your target launch date & time expires, the plugin automatically switches the Website Status to <strong>Disabled (Live Website)</strong> so your real site becomes accessible to all visitors without requiring manual intervention.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                How are subscriber leads protected?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                In v3.2.0, subscribers are stored in a dedicated indexed MySQL database table (<code>wp_csmm_subscribers</code>) rather than bloated options. CSV exports are streamed securely with direct authentication checks and sanitized against spreadsheet formula injection.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* Changelog Card */}
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1.1rem' }}>
            Version History
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Chip label="v3.2.0" color="primary" size="small" sx={{ fontWeight: 700, borderRadius: '6px' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Major Architecture Overhaul & React 18 Admin
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2, m: 0 }}>
                <li>Rewrote entire Admin Dashboard in React 18, Vite, and Material UI (MUI v5).</li>
                <li>Completely removed legacy Bootstrap and old jQuery tabs.</li>
                <li>Implemented clean PHP Singleton OOP backend with WordPress REST API (<code>/wp-json/csmm/v1/</code>).</li>
                <li>Added custom database table <code>wp_csmm_subscribers</code> with automated zero-loss migration.</li>
                <li>Implemented secure authenticated CSV streaming export.</li>
                <li>Added HTTP 503 SEO headers for Maintenance Mode.</li>
                <li>Fixed template loader debug override issue.</li>
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Chip label="v3.1.0" size="small" sx={{ fontWeight: 700, borderRadius: '6px' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  20 New Templates Addition
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2, m: 0 }}>
                <li>Added 20 new responsive templates (total 36 templates).</li>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Credits Card */}
      <Card elevation={0} sx={{ backgroundColor: '#f8fafc', borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Developed by FARAZFRANK
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Professional WordPress Plugins & Web Solutions.
            </Typography>
          </div>
          <Button
            variant="outlined"
            size="small"
            component="a"
            href="https://wpfrank.com/"
            target="_blank"
            endIcon={<LaunchRoundedIcon />}
            sx={{ borderRadius: '6px' }}
          >
            Visit WPFrank.com
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
