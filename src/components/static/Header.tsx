import React, { useState, useRef, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Paper,
  ListItemIcon,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
} from '@mui/material';
import {
//   Menu as MenuIcon,
  Close as CloseIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  AccountBalance as PersonalBankingIcon,
  BusinessCenter as BusinessBankingIcon,
  TrendingUp as InvestmentsIcon,
  CreditCard as CardIcon,
//   ExpandLess,
  ExpandMore,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const BRAND = '#FA510F';
const BRAND_DARK = '#D94309';
const BRAND_LIGHT = 'rgba(250,81,15,0.08)';

const headerTheme = createTheme({
  palette: {
    primary: { main: BRAND },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          fontSize: 14,
          letterSpacing: '-0.1px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // prevent any horizontal overflow inside drawer
          overflowX: 'hidden',
          maxWidth: '100vw',
        },
      },
    },
  },
});

interface ServiceItem {
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const NAV_LINKS = ['Home', 'About', 'Services', 'Contact'] as const;
type NavLink = (typeof NAV_LINKS)[number];

const SERVICES: ServiceItem[] = [
  {
    label: 'Personal Banking',
    description: 'Accounts, savings & everyday banking',
    icon: <PersonalBankingIcon sx={{ fontSize: 20 }} />,
    color: '#1D4ED8',
    bgColor: '#EFF6FF',
  },
  {
    label: 'Business Banking',
    description: 'Solutions for growing businesses',
    icon: <BusinessBankingIcon sx={{ fontSize: 20 }} />,
    color: '#065F46',
    bgColor: '#ECFDF5',
  },
  {
    label: 'Investments',
    description: 'Grow your wealth intelligently',
    icon: <InvestmentsIcon sx={{ fontSize: 20 }} />,
    color: '#92400E',
    bgColor: '#FFFBEB',
  },
  {
    label: 'Card',
    description: 'Debit, credit & prepaid cards',
    icon: <CardIcon sx={{ fontSize: 20 }} />,
    color: '#6B21A8',
    bgColor: '#FAF5FF',
  },
];


function Logo() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        cursor: 'pointer',
        flexShrink: 0,
        textDecoration: 'none',
        // subtle scale on hover
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'scale(1.02)' },
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: '11px',
          bgcolor: BRAND,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 4px 12px rgba(250,81,15,0.35)`,
          transition: 'box-shadow 0.2s ease',
          '&:hover': { boxShadow: `0 6px 18px rgba(250,81,15,0.45)` },
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L3 7v11h5v-5h4v5h5V7L10 2z" fill="white" opacity="0.95" />
          <circle cx="10" cy="9" r="2" fill="white" />
        </svg>
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 17,
            color: '#0F172A',
            lineHeight: 1,
            letterSpacing: '-0.4px',
          }}
        >
          Nova<Box component="span" sx={{ color: BRAND }}>Pay</Box>
        </Typography>
        <Typography
          sx={{
            fontSize: 9,
            color: '#94A3B8',
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            lineHeight: 1,
            mt: 0.3,
          }}
        >
          Digital Bank
        </Typography>
      </Box>
    </Box>
  );
}

interface ServicesDropdownProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

function ServicesDropdown({ open, anchorEl, onClose }: ServicesDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorEl &&
        !anchorEl.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    if (open) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open, anchorEl, onClose]);

  if (!anchorEl) return null;
  const rect = anchorEl.getBoundingClientRect();

  return (
    <Grow in={open} timeout={180} style={{ transformOrigin: 'top center' }}>
      <Paper
        ref={dropdownRef}
        elevation={0}
        sx={{
          position: 'fixed',
          top: rect.bottom + 10,
          left: Math.max(8, rect.left - 60),
          width: 370,
          borderRadius: 3,
          border: '1px solid rgba(0,0,0,0.09)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.13)',
          zIndex: 1400,
          overflow: 'hidden',
          p: 1.5,
          // make sure it never causes horizontal scroll
          maxWidth: 'calc(100vw - 16px)',
        }}
      >
        <Box sx={{ px: 1.5, pb: 0.75 }}>
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 700,
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Our Services
          </Typography>
        </Box>

        {SERVICES.map((service, i) => (
          <Fade in={open} timeout={120 + i * 60} key={service.label}>
            <Box
              onClick={onClose}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 1.5,
                py: 1.25,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'background 0.15s ease, transform 0.15s ease',
                '&:hover': {
                  bgcolor: '#F8FAFC',
                  transform: 'translateX(3px)',
                  '& .arrow': { opacity: 1, transform: 'translateX(0)' },
                },
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: service.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: service.color,
                  flexShrink: 0,
                  transition: 'transform 0.15s ease',
                }}
              >
                {service.icon}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A', lineHeight: 1.3 }}
                >
                  {service.label}
                </Typography>
                <Typography
                  sx={{ fontSize: 12, color: '#64748B', lineHeight: 1.4, mt: 0.2 }}
                >
                  {service.description}
                </Typography>
              </Box>
              <ArrowForwardIcon
                className="arrow"
                sx={{
                  fontSize: 15,
                  color: '#CBD5E1',
                  opacity: 0,
                  transform: 'translateX(-4px)',
                  transition: 'opacity 0.15s ease, transform 0.15s ease',
                  flexShrink: 0,
                }}
              />
            </Box>
          </Fade>
        ))}

        <Divider sx={{ my: 1.25 }} />
        <Box
          sx={{
            mx: 1.5,
            px: 2,
            py: 1.25,
            borderRadius: 2,
            bgcolor: BRAND_LIGHT,
            border: `1px solid rgba(250,81,15,0.2)`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background 0.15s ease',
            '&:hover': { bgcolor: `rgba(250,81,15,0.13)` },
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: BRAND }}>
              Compare all services
            </Typography>
            <Typography sx={{ fontSize: 11, color: BRAND_DARK, opacity: 0.8 }}>
              Find the right plan for you
            </Typography>
          </Box>
          <ArrowForwardIcon sx={{ fontSize: 16, color: BRAND }} />
        </Box>
      </Paper>
    </Grow>
  );
}

interface DesktopNavProps {
  activeNav: NavLink | null;
  onNavClick: (nav: NavLink, e: React.MouseEvent<HTMLElement>) => void;
  servicesOpen: boolean;
}

function DesktopNav({ activeNav, onNavClick, servicesOpen }: DesktopNavProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
      {NAV_LINKS.map((link) => {
        const isActive = activeNav === link || (link === 'Services' && servicesOpen);
        return (
          <Button
            key={link}
            onClick={(e) => onNavClick(link, e)}
            endIcon={
              link === 'Services'
                ? servicesOpen
                  ? <ArrowUpIcon sx={{ fontSize: '15px !important', ml: -0.75, transition: 'transform 0.2s ease' }} />
                  : <ArrowDownIcon sx={{ fontSize: '15px !important', ml: -0.75, transition: 'transform 0.2s ease' }} />
                : undefined
            }
            sx={{
              color: isActive ? BRAND : '#475569',
              fontWeight: isActive ? 700 : 500,
              fontSize: 14,
              px: 1.5,
              py: 0.75,
              borderRadius: 1.5,
              position: 'relative',
              transition: 'color 0.15s ease, background 0.15s ease',
              '&:hover': { bgcolor: BRAND_LIGHT, color: BRAND },
              ...(isActive && { bgcolor: BRAND_LIGHT }),
              // animated underline
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 4,
                left: '50%',
                transform: isActive ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                width: '60%',
                height: 2,
                bgcolor: BRAND,
                borderRadius: 1,
                transition: 'transform 0.2s ease',
              },
              '&:hover::after': {
                transform: 'translateX(-50%) scaleX(1)',
              },
            }}
          >
            {link}
          </Button>
        );
      })}
    </Box>
  );
}

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const handleClose = () => {
    setServicesExpanded(false);
    onClose();
  };



  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 280,
          maxWidth: '85vw',     
          overflowX: 'hidden',    
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      // backdrop closes drawer
      ModalProps={{ keepMounted: false }}
    >
      {/* Drawer header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 2,
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          flexShrink: 0,
        }}
      >
        <Logo />
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: '#475569',
            bgcolor: 'rgba(0,0,0,0.04)',
            borderRadius: 1.5,
            transition: 'transform 0.15s ease',
            '&:hover': { transform: 'rotate(90deg)', bgcolor: BRAND_LIGHT, color: BRAND },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Nav links */}
      <List sx={{ px: 1.5, pt: 1.5, flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {NAV_LINKS.map((link, i) => (
          <React.Fragment key={link}>
            <Fade in={open} timeout={200 + i * 60}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (link === 'Services') {
                      setServicesExpanded((p) => !p);
                    } else {
                      handleClose();
                    }
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    px: 2,
                    py: 1.25,
                    transition: 'background 0.15s ease',
                    '&:hover': { bgcolor: BRAND_LIGHT },
                    '&:hover .nav-label': { color: BRAND },
                  }}
                >
                  <ListItemText
                    primary={link}
                    primaryTypographyProps={{
                      className: 'nav-label',
                      fontSize: 15,
                      fontWeight: 500,
                      color: '#0F172A',
                      sx: { transition: 'color 0.15s ease' },
                    }}
                  />
                  {link === 'Services' && (
                    <Box
                      sx={{
                        transform: servicesExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        display: 'flex',
                        color: '#64748B',
                      }}
                    >
                      <ExpandMore sx={{ fontSize: 20 }} />
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
            </Fade>

            {link === 'Services' && (
              <Collapse in={servicesExpanded} timeout={220} unmountOnExit>
                <List disablePadding sx={{ pl: 1, pb: 0.5 }}>
                  {SERVICES.map((service) => (
                    <ListItem key={service.label} disablePadding>
                      <ListItemButton
                        onClick={handleClose}
                        sx={{
                          borderRadius: 2,
                          mb: 0.25,
                          px: 2,
                          py: 0.875,
                          transition: 'background 0.15s ease',
                          '&:hover': { bgcolor: BRAND_LIGHT },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 38 }}>
                          <Box
                            sx={{
                              width: 30,
                              height: 30,
                              borderRadius: 1.5,
                              bgcolor: service.bgColor,
                              color: service.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {React.cloneElement(
                              service.icon as React.ReactElement,
                              { sx: { fontSize: 15 } }
                            )}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={service.label}
                          primaryTypographyProps={{
                            fontSize: 13.5,
                            fontWeight: 500,
                            color: '#1E293B',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      {/* CTA buttons */}
      <Box sx={{ px: 2.5, pb: 3, pt: 1, flexShrink: 0 }}>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'rgba(250,81,15,0.4)',
              color: BRAND,
              py: 1.25,
              fontWeight: 600,
              transition: 'all 0.15s ease',
              '&:hover': {
                borderColor: BRAND,
                bgcolor: BRAND_LIGHT,
              },
            }}
          >
            Log in
          </Button>
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              bgcolor: BRAND,
              color: 'white',
              py: 1.25,
              fontWeight: 600,
              boxShadow: `0 4px 14px rgba(250,81,15,0.35)`,
              transition: 'all 0.15s ease',
              '&:hover': {
                bgcolor: BRAND_DARK,
                boxShadow: `0 6px 20px rgba(250,81,15,0.45)`,
                transform: 'translateY(-1px)',
              },
              '&:active': { transform: 'translateY(0)' },
            }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}


function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <Box
      sx={{
        width: 20,
        height: 14,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            height: 2,
            bgcolor: '#0F172A',
            borderRadius: 1,
            transition: 'all 0.25s ease',
            transformOrigin: 'center',
            ...(open && i === 0 && { transform: 'rotate(45deg) translate(4px, 4px)' }),
            ...(open && i === 1 && { opacity: 0, transform: 'scaleX(0)' }),
            ...(open && i === 2 && { transform: 'rotate(-45deg) translate(4px, -4px)' }),
          }}
        />
      ))}
    </Box>
  );
}

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavLink | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesAnchor, setServicesAnchor] = useState<HTMLElement | null>(null);

  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 10 });

  const handleNavClick = (nav: NavLink, e: React.MouseEvent<HTMLElement>) => {
    if (nav === 'Services') {
      if (servicesOpen) {
        setServicesOpen(false);
        setServicesAnchor(null);
      } else {
        setServicesOpen(true);
        setServicesAnchor(e.currentTarget);
        setActiveNav('Services');
      }
    } else {
      setActiveNav(nav);
      setServicesOpen(false);
      setServicesAnchor(null);
    }
  };

  return (
    <ThemeProvider theme={headerTheme}>
      <Box sx={{ width: '100%', overflowX: 'hidden' }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'white',
            borderBottom: '1px solid',
            borderColor: scrolled ? 'rgba(0,0,0,0.09)' : 'rgba(0,0,0,0.06)',
            boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.07)' : 'none',
            transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
          }}
        >
          <Toolbar
            disableGutters
            sx={{
            //   maxWidth: 1200,
              width: '100%',
              mx: 'auto',
              px: { xs: 2, sm: 3, md: 4 },
              minHeight: { xs: 64, md: 72 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              // prevent toolbar from ever overflowing its own width
              overflow: 'hidden',
            }}
          >
            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            {!isMobile && (
              <DesktopNav
                activeNav={activeNav}
                onNavClick={handleNavClick}
                servicesOpen={servicesOpen}
              />
            )}

            {/* Desktop CTA */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexShrink: 0 }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(250,81,15,0.4)',
                    color: BRAND,
                    px: 2.5,
                    py: 0.875,
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      borderColor: BRAND,
                      bgcolor: BRAND_LIGHT,
                      transform: 'translateY(-1px)',
                    },
                    '&:active': { transform: 'translateY(0)' },
                  }}
                >
                  Log in
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: BRAND,
                    color: 'white',
                    px: 2.5,
                    py: 0.875,
                    boxShadow: `0 3px 10px rgba(250,81,15,0.3)`,
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      bgcolor: BRAND_DARK,
                      boxShadow: `0 5px 18px rgba(250,81,15,0.45)`,
                      transform: 'translateY(-1px)',
                    },
                    '&:active': { transform: 'translateY(0)' },
                  }}
                >
                  Sign up
                </Button>
              </Box>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton
                onClick={() => setMobileOpen((p) => !p)}
                disableRipple
                sx={{
                    marginRight: {xs: "30px"},
                  p: 1,
                  borderRadius: 1.5,
                  border: '1px solid rgba(0,0,0,0.09)',
                  bgcolor: mobileOpen ? BRAND_LIGHT : 'transparent',
                  transition: 'background 0.15s ease',
                  '&:hover': { bgcolor: BRAND_LIGHT },
                  flexShrink: 0,
                }}
              >
                <HamburgerIcon open={mobileOpen} />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      {/* Services dropdown — desktop only */}
      {!isMobile && (
        <ServicesDropdown
          open={servicesOpen}
          anchorEl={servicesAnchor}
          onClose={() => {
            setServicesOpen(false);
            setServicesAnchor(null);
          }}
        />
      )}

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </ThemeProvider>
  );
}

export default Header