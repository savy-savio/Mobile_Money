import { useState, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Badge,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  CreditCard as CardIcon,
  TrendingUp as InvestmentIcon,
  Settings as SettingsIcon,
  NotificationsOutlined as NotificationsIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

import img from '../../assets/crown.png';
import ScrollToTop from '../../utils/ScrollToTop';

const DRAWER_WIDTH = 280;
const BRAND = '#FA510F';

function Logo() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        cursor: 'pointer',
        flexShrink: 0,
        textDecoration: 'none',
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'scale(1.02)' },
      }}
    >
      <Box
        component="img"
        src={img}
        alt="Crown Ledger Bank"
        sx={{
          width: 44,
          height: 44,
          objectFit: 'contain',
          flexShrink: 0,
          filter: 'drop-shadow(0 2px 6px rgba(250,81,15,0.22))',
          transition: 'filter 0.2s ease',
          '&:hover': {
            filter: 'drop-shadow(0 4px 12px rgba(250,81,15,0.38))',
          },
        }}
      />

      <Box>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 16,
            color: '#0F172A',
            lineHeight: 1.15,
            letterSpacing: '-0.4px',
            whiteSpace: 'nowrap',
          }}
        >
          Crown{' '}
          <Box component="span" sx={{ color: BRAND }}>
            Ledger
          </Box>
        </Typography>

        <Typography
          sx={{
            fontSize: 9,
            color: '#94A3B8',
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            lineHeight: 1,
            mt: 0.35,
            whiteSpace: 'nowrap',
          }}
        >
          Smart Banking
        </Typography>
      </Box>
    </Box>
  );
}

const navigation = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  {
    label: 'Transactions',
    path: '/dashboard/transactions',
    icon: HistoryIcon,
  },
  { label: 'Cards', path: '/dashboard/cards', icon: CardIcon },
  {
    label: 'Investments',
    path: '/dashboard/investments',
    icon: InvestmentIcon,
  },
  { label: 'Settings', path: '/dashboard/settings', icon: SettingsIcon },
];

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/transactions': 'Transactions',
  '/dashboard/cards': 'Cards',
  '/dashboard/investments': 'Investments',
  '/dashboard/settings': 'Settings',
};

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const contentRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const currentTitle =
    PAGE_TITLES[location.pathname] ||
    (location.pathname === '/' ? 'Overview' : 'FinBank');

  const activeIndex = navigation.findIndex(
    (item) =>
      location.pathname === item.path ||
      (item.path === '/dashboard' && location.pathname === '/'),
  );

  const SidebarContent = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: '100%',
        bgcolor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, pt: 3.5, pb: 2 }}>
        <Logo />
      </Box>

      {/* User card */}
      <Box
        sx={{
          mx: 2,
          mb: 3,
          p: 2,
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #FFF4F0 0%, #FEE8DF 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: BRAND,
            fontSize: '0.95rem',
            fontWeight: 700,
          }}
        >
          JD
        </Avatar>

        <Box>
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#1A1A1A',
            }}
          >
            John Doe
          </Typography>

          <Typography
            sx={{
              fontSize: '0.75rem',
              color: '#6B7280',
            }}
          >
            Premium Account
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ px: 1.5, flex: 1 }}>
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path ||
            (item.path === '/dashboard' && location.pathname === '/');

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: '12px',
                  py: 1.2,
                  color: isActive ? '#FFFFFF' : '#6B7280',
                  background: isActive
                    ? 'linear-gradient(135deg, #FA510F 0%, #D94309 100%)'
                    : 'transparent',
                  boxShadow: isActive
                    ? '0 4px 14px rgba(250,81,15,0.3)'
                    : 'none',
                  '&:hover': {
                    background: isActive
                      ? 'linear-gradient(135deg, #FA510F 0%, #D94309 100%)'
                      : 'rgba(250, 81, 15, 0.06)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: 'inherit',
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: '0.9rem',
                        fontWeight: isActive ? 700 : 500,
                      },
                    },
                  }}
                />

                {isActive && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.7)',
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom hint */}
      <Box sx={{ p: 2.5, pt: 0 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: '12px',
            bgcolor: '#F8F9FA',
            border: '1px solid #F0F0F0',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#1A1A1A',
            }}
          >
            Need help?
          </Typography>

          <Typography
            sx={{
              fontSize: '0.7rem',
              color: '#9CA3AF',
              mt: 0.3,
            }}
          >
            Contact our 24/7 support team
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#F5F6FA',
      }}
    >
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            borderRight: '1px solid rgba(0,0,0,0.06)',
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          {SidebarContent}
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              border: 'none',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={() => setMobileOpen(false)}
              sx={{
                bgcolor: '#F5F6FA',
                '&:hover': {
                  bgcolor: '#EDEFF5',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {SidebarContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100vh',
        }}
      >
        <ScrollToTop containerRef={contentRef} />

        {/* Header */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: '#FFFFFF',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Toolbar
            sx={{
              minHeight: { xs: 64, md: 72 },
              px: { xs: 2, md: 4 },
              gap: 1.5,
            }}
          >
            {/* Mobile menu */}
            {isMobile && (
              <IconButton
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{
                  color: '#1A1A1A',
                  mr: 0.5,
                  '&:hover': {
                    bgcolor: 'rgba(250,81,15,0.06)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Page title */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: '1.15rem', md: '1.3rem' },
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.3px',
                  lineHeight: 1.2,
                }}
              >
                {currentTitle}
              </Typography>

              <Typography
                sx={{
                  fontSize: '0.72rem',
                  color: '#9CA3AF',
                  display: { xs: 'none', sm: 'block' },
                  mt: 0.2,
                }}
              >
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>

            {/* Notifications */}
            <IconButton
              sx={{
                bgcolor: '#F5F6FA',
                borderRadius: '12px',
                width: 42,
                height: 42,
                '&:hover': {
                  bgcolor: '#EDEFF5',
                },
              }}
            >
              <Badge
                badgeContent={3}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: BRAND,
                    color: '#fff',
                    fontSize: '0.6rem',
                    minWidth: 16,
                    height: 16,
                    borderRadius: '8px',
                  },
                }}
              >
                <NotificationsIcon
                  sx={{
                    color: '#374151',
                    fontSize: '1.3rem',
                  }}
                />
              </Badge>
            </IconButton>

            {/* Avatar */}
            <Avatar
              sx={{
                width: 42,
                height: 42,
                bgcolor: BRAND,
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(250,81,15,0.3)',
                border: '2px solid #fff',
              }}
            >
              JD
            </Avatar>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          ref={contentRef}
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: { xs: 2, sm: 3, md: 4 },
            pb: { xs: '96px', md: 4 },
          }}
        >
          <Outlet />
        </Box>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1300,
              px: 2,
              pb: 'env(safe-area-inset-bottom, 12px)',
              pt: 1,
              background:
                'linear-gradient(to top, rgba(255,255,255,1) 80%, rgba(255,255,255,0))',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                bgcolor: '#FFFFFF',
                borderRadius: '24px',
                boxShadow:
                  '0 -2px 0 rgba(0,0,0,0.03), 0 8px 32px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.06)',
                px: 1,
                py: 0.75,
                mb: 0.5,
              }}
            >
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeIndex === index;

                return (
                  <Box
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      py: 0.75,
                      px: 0.5,
                      borderRadius: '18px',
                      position: 'relative',
                      userSelect: 'none',
                      WebkitTapHighlightColor: 'transparent',
                      transition:
                        'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  >
                    {isActive && (
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '18px',
                          background:
                            'linear-gradient(135deg, #FA510F 0%, #D94309 100%)',
                          boxShadow:
                            '0 4px 12px rgba(250,81,15,0.35)',
                        }}
                      />
                    )}

                    <Box
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        color: isActive ? '#FFFFFF' : '#9CA3AF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition:
                          'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                        transform: isActive
                          ? 'scale(1.1)'
                          : 'scale(1)',
                      }}
                    >
                      <Icon sx={{ fontSize: '1.3rem' }} />
                    </Box>

                    <Typography
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        fontSize: '0.62rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#FFFFFF' : '#9CA3AF',
                        mt: 0.3,
                        letterSpacing: '0.01em',
                        transition: 'color 0.2s ease',
                        lineHeight: 1,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}