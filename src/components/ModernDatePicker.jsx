import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Popover,
  TextField,
  InputAdornment,
  Chip,
  MenuItem,
  Select,
  FormControl,
  useTheme,
  alpha,
} from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * Format Date to YYYY-MM-DD
 */
function formatDateToISO(date) {
  if (!date || isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse YYYY-MM-DD string safely into Date object at midnight local
 */
function parseISODate(str) {
  if (!str) return new Date();
  const parts = str.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return new Date(y, m, d);
  }
  const fallback = new Date(str);
  return isNaN(fallback.getTime()) ? new Date() : fallback;
}

/**
 * Modern Sleek DatePicker Popover for Coming Soon & Maintenance Mode Pro
 */
export default function ModernDatePicker({
  value,
  onChange,
  label = 'Target Launch Date',
  fullWidth = true,
  disabled = false,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Selected date parsed
  const selectedDate = useMemo(() => {
    return value ? parseISODate(value) : null;
  }, [value]);

  // Calendar view state (year & month being browsed)
  const [viewYear, setViewYear] = useState(() => {
    return selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();
  });
  const [viewMonth, setViewMonth] = useState(() => {
    return selectedDate ? selectedDate.getMonth() : new Date().getMonth();
  });

  // Keep view in sync when selected date changes externally
  const handleOpen = (event) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
    const d = selectedDate || new Date();
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (day) => {
    const newDate = new Date(viewYear, viewMonth, day);
    const iso = formatDateToISO(newDate);
    onChange(iso);
    handleClose();
  };

  const handleSelectPresetDays = (daysFromNow) => {
    const target = new Date();
    target.setDate(target.getDate() + daysFromNow);
    const iso = formatDateToISO(target);
    onChange(iso);
    setViewYear(target.getFullYear());
    setViewMonth(target.getMonth());
    handleClose();
  };

  // Generate days array for current month view
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const days = [];

    // Prev month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPrev: true,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    // Next month padding days to complete grid (42 cells = 6 weeks)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isNext: true,
      });
    }

    return days;
  }, [viewYear, viewMonth]);

  // Check today
  const today = new Date();
  const isToday = (day, isCurrentMonth) => {
    return (
      isCurrentMonth &&
      day === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear()
    );
  };

  // Check selected
  const isSelected = (day, isCurrentMonth) => {
    if (!selectedDate || !isCurrentMonth) return false;
    return (
      day === selectedDate.getDate() &&
      viewMonth === selectedDate.getMonth() &&
      viewYear === selectedDate.getFullYear()
    );
  };

  // Formatted display text for TextField input
  const displayFormattedDate = useMemo(() => {
    if (!selectedDate) return '';
    try {
      return selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return value;
    }
  }, [selectedDate, value]);

  // Year range options (Current - 2 to Current + 15)
  const currentYear = new Date().getFullYear();
  const yearOptions = useMemo(() => {
    const list = [];
    for (let y = currentYear - 2; y <= currentYear + 15; y++) {
      list.push(y);
    }
    return list;
  }, [currentYear]);

  return (
    <>
      <TextField
        label={label}
        fullWidth={fullWidth}
        value={displayFormattedDate || value || ''}
        onClick={handleOpen}
        disabled={disabled}
        placeholder="Select Launch Date"
        InputProps={{
          readOnly: true,
          sx: {
            cursor: disabled ? 'default' : 'pointer',
            fontWeight: 600,
            '& input': {
              cursor: disabled ? 'default' : 'pointer',
              fontWeight: 600,
            },
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleOpen}
                edge="end"
                color="primary"
                disabled={disabled}
                sx={{
                  backgroundColor: isDark
                    ? alpha(theme.palette.primary.main, 0.12)
                    : alpha(theme.palette.primary.main, 0.08),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                <CalendarMonthRoundedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
      />

      {/* Modern Glassmorphic Popover Calendar */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          elevation: 12,
          sx: {
            mt: 1,
            p: 2.5,
            width: 340,
            borderRadius: '16px',
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            backgroundImage: isDark
              ? 'linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))'
              : 'none',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(226, 232, 240, 0.9)'}`,
            boxShadow: isDark
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.05)'
              : '0 20px 35px -10px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)',
            userSelect: 'none',
          },
        }}
      >
        {/* Quick Launch Presets */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: isDark ? 'text.secondary' : '#64748b',
              fontSize: '0.7rem',
              display: 'block',
              mb: 1,
            }}
          >
            Quick Presets
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            <Chip
              size="small"
              label="Today"
              icon={<TodayRoundedIcon sx={{ fontSize: '14px !important' }} />}
              onClick={() => handleSelectPresetDays(0)}
              sx={{
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            />
            <Chip
              size="small"
              label="+7 Days"
              onClick={() => handleSelectPresetDays(7)}
              variant="outlined"
              sx={{
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            />
            <Chip
              size="small"
              label="+14 Days"
              onClick={() => handleSelectPresetDays(14)}
              variant="outlined"
              sx={{
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            />
            <Chip
              size="small"
              label="+30 Days"
              onClick={() => handleSelectPresetDays(30)}
              color="primary"
              variant="outlined"
              sx={{
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            />
            <Chip
              size="small"
              label="+60 Days"
              onClick={() => handleSelectPresetDays(60)}
              variant="outlined"
              sx={{
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            />
          </Box>
        </Box>

        {/* Month & Year Navigation Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.5,
            pb: 1,
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9'}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControl size="small" variant="standard">
              <Select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                disableUnderline
                sx={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'text.primary',
                  '& .MuiSelect-select': { py: 0.5, pr: '20px !important' },
                }}
              >
                {MONTH_NAMES.map((m, idx) => (
                  <MenuItem key={m} value={idx}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" variant="standard">
              <Select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                disableUnderline
                sx={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'text.primary',
                  '& .MuiSelect-select': { py: 0.5, pr: '20px !important' },
                }}
              >
                {yearOptions.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={handlePrevMonth}
              sx={{
                borderRadius: '8px',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                p: 0.5,
              }}
            >
              <ChevronLeftRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleNextMonth}
              sx={{
                borderRadius: '8px',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                p: 0.5,
              }}
            >
              <ChevronRightRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Week Day Column Headers */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 0.5,
            mb: 1,
            textAlign: 'center',
          }}
        >
          {WEEK_DAYS.map((w, idx) => (
            <Typography
              key={w}
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                color: idx === 0 || idx === 6 ? (isDark ? '#94a3b8' : '#64748b') : (isDark ? '#cbd5e1' : '#475569'),
              }}
            >
              {w}
            </Typography>
          ))}
        </Box>

        {/* 7x6 Calendar Days Matrix */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 0.5,
            textAlign: 'center',
          }}
        >
          {calendarDays.map((item, index) => {
            const selected = isSelected(item.day, item.isCurrentMonth);
            const currentToday = isToday(item.day, item.isCurrentMonth);

            if (!item.isCurrentMonth) {
              return (
                <Box
                  key={index}
                  sx={{
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)',
                    cursor: 'default',
                  }}
                >
                  {item.day}
                </Box>
              );
            }

            return (
              <Box
                key={index}
                onClick={() => handleSelectDay(item.day)}
                sx={{
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.84rem',
                  fontWeight: selected || currentToday ? 700 : 500,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease-in-out',
                  backgroundColor: selected
                    ? theme.palette.primary.main
                    : currentToday
                    ? isDark
                      ? alpha(theme.palette.primary.main, 0.18)
                      : alpha(theme.palette.primary.main, 0.12)
                    : 'transparent',
                  color: selected
                    ? '#ffffff'
                    : currentToday
                    ? theme.palette.primary.main
                    : 'text.primary',
                  border: currentToday && !selected
                    ? `1.5px solid ${theme.palette.primary.main}`
                    : '1.5px solid transparent',
                  boxShadow: selected
                    ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
                    : 'none',
                  '&:hover': {
                    backgroundColor: selected
                      ? theme.palette.primary.dark
                      : isDark
                      ? 'rgba(255,255,255,0.08)'
                      : '#f1f5f9',
                    transform: 'scale(1.08)',
                  },
                }}
              >
                {item.day}
              </Box>
            );
          })}
        </Box>

        {/* Selected Date Summary & Footer Actions */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 2,
            pt: 1.5,
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9'}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <EventAvailableRoundedIcon color="primary" sx={{ fontSize: '1.1rem' }} />
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {selectedDate
                ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'No date set'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="text"
              onClick={() => {
                const iso = formatDateToISO(new Date());
                onChange(iso);
                handleClose();
              }}
              sx={{ fontSize: '0.75rem', textTransform: 'none', py: 0.3, px: 1 }}
            >
              Today
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClose}
              sx={{
                fontSize: '0.75rem',
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                py: 0.4,
                px: 1.5,
              }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
