import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Alert,
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

export default function SocialMediaTab({ settings, onChange }) {
  const social = settings.social_media || {};

  const handleSocialChange = (key, value) => {
    onChange('social_media', {
      ...social,
      [key]: value,
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Card elevation={0} sx={{ borderRadius: '10px !important' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.1rem' }}>
            Social Media Channels
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Connect your audience with your active social profiles. Leave any platform URL empty to automatically hide its icon from the frontend page.
          </Typography>

          <Alert severity="info" sx={{ mb: 2.5, borderRadius: '8px' }}>
            Icons will appear in the footer or social section of your chosen coming soon template.
          </Alert>

          <Grid container spacing={2.5}>
            {platforms.map((p) => (
              <Grid item xs={12} md={6} key={p.key}>
                <TextField
                  fullWidth
                  label={p.label}
                  value={social[p.key] || ''}
                  onChange={(e) => handleSocialChange(p.key, e.target.value)}
                  placeholder={p.placeholder}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
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
    </Box>
  );
}
