import React, { useState, useEffect } from 'react';
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  InputAdornment,
  TablePagination,
} from '@mui/material';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import { api } from '../api';

export default function SubscribersTab({ onNotify }) {
  const [subscribers, setSubscribers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0); // MUI 0-indexed
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const data = await api.getSubscribers(page + 1, rowsPerPage, search);
      setSubscribers(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      if (onNotify) onNotify('Failed to fetch subscribers: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [page, rowsPerPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    fetchSubscribers();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.deleteSubscriber(deleteId);
      if (onNotify) onNotify('Subscriber deleted successfully', 'success');
      setDeleteId(null);
      fetchSubscribers();
    } catch (err) {
      if (onNotify) onNotify('Failed to delete subscriber: ' + err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleDownloadCsv = () => {
    const config = api.getConfig();
    if (config.exportUrl) {
      window.location.href = config.exportUrl;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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
              <Typography variant="body2" sx={{ opacity: 0.85, fontWeight: 500 }}>
                Total Email Leads Captured
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, fontSize: '1.75rem' }}>
                {total}
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
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{ display: 'flex', gap: 1, flex: 1, maxWidth: { sm: 380 } }}
            >
              <TextField
                size="small"
                fullWidth
                placeholder="Search email address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" variant="outlined" size="small" sx={{ borderRadius: '6px' }}>
                Search
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={fetchSubscribers} title="Refresh list" size="small" sx={{ border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                <RefreshRoundedIcon fontSize="small" />
              </IconButton>

              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadRoundedIcon />}
                onClick={handleDownloadCsv}
                disabled={total === 0}
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 6, borderColor: 'divider' }}>
                      <CircularProgress size={32} />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                        Loading subscribers...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : subscribers.length > 0 ? (
                  subscribers.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600, borderColor: 'divider' }}>
                        #{item.id}
                      </TableCell>
                      <TableCell sx={{ borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                          <MarkEmailReadRoundedIcon sx={{ fontSize: 18, color: '#2563eb' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {item.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderColor: 'divider' }}>
                        <Chip label={item.ip_address || '127.0.0.1'} size="small" variant="outlined" sx={{ fontSize: '0.75rem', borderRadius: '4px' }} />
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem', borderColor: 'divider' }}>
                        {item.created_at}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', borderColor: 'divider' }}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteId(item.id)}
                          title="Delete subscriber"
                          sx={{ borderRadius: '6px' }}
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 6, borderColor: 'divider' }}>
                      <PeopleAltRoundedIcon sx={{ fontSize: 40, color: '#64748b', mb: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        No subscribers found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        When visitors enter their email on your coming soon page, they will appear here.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[10, 15, 25, 50]}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '10px !important' } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to permanently remove this subscriber email from your database? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setDeleteId(null)} disabled={deleting} sx={{ borderRadius: '6px' }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={deleting} sx={{ borderRadius: '6px' }}>
            {deleting ? 'Deleting...' : 'Delete Permanently'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
