import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Switch,
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Avatar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Lock as LockIcon,
  NotificationsOutlined as BellIcon,
  SecurityOutlined as ShieldIcon,
  HelpOutlineOutlined as HelpIcon,
  LogoutOutlined as LogoutIcon,
} from '@mui/icons-material';

export default function Settings() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    transactions: true,
  });

  const [security, setSecurity] = useState({
    loginAlerts: true,
    deviceManagement: false,
    activityProtection: true,
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Manage your account and preferences
        </Typography>
      </Box>

      {/* Profile Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Profile Information
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, backgroundColor: theme.palette.primary.main, fontSize: '2rem' }}>
              JD
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                John Doe
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                john@example.com
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                Account ID: ACC-123456789
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Edit Profile
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 100%', '@media (min-width: 600px)': { flex: '1 1 calc(50% - 8px)' } }}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue="John Doe"
                variant="outlined"
                size="small"
                disabled
              />
            </Box>
            <Box sx={{ flex: '1 1 100%', '@media (min-width: 600px)': { flex: '1 1 calc(50% - 8px)' } }}>
              <TextField
                fullWidth
                label="Email Address"
                defaultValue="john@example.com"
                variant="outlined"
                size="small"
                disabled
              />
            </Box>
            <Box sx={{ flex: '1 1 100%', '@media (min-width: 600px)': { flex: '1 1 calc(50% - 8px)' } }}>
              <TextField
                fullWidth
                label="Phone Number"
                defaultValue="+1 (555) 123-4567"
                variant="outlined"
                size="small"
                disabled
              />
            </Box>
            <Box sx={{ flex: '1 1 100%', '@media (min-width: 600px)': { flex: '1 1 calc(50% - 8px)' } }}>
              <TextField
                fullWidth
                label="Date of Birth"
                defaultValue="January 15, 1990"
                variant="outlined"
                size="small"
                disabled
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LockIcon /> Security Settings
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: `${theme.palette.text.secondary}08`, borderRadius: 1 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Password
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Last changed 2 months ago
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Change Password
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: `${theme.palette.text.secondary}08`, borderRadius: 1 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Two-Factor Authentication
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Add an extra layer of security
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Enable
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: `${theme.palette.text.secondary}08`, borderRadius: 1 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Active Sessions
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Manage your active logins
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                View Sessions
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <BellIcon /> Notification Preferences
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Email Notifications
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Receive updates via email
                  </Typography>
                </Box>
              }
            />
            <Divider />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.push}
                  onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Push Notifications
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Receive notifications on your device
                  </Typography>
                </Box>
              }
            />
            <Divider />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.transactions}
                  onChange={(e) => setNotifications({ ...notifications, transactions: e.target.checked })}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Transaction Alerts
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Get alerts for every transaction
                  </Typography>
                </Box>
              }
            />
          </Box>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShieldIcon /> Privacy & Security
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={security.loginAlerts}
                  onChange={(e) => setSecurity({ ...security, loginAlerts: e.target.checked })}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Login Alerts
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Alert me when someone logs into my account
                  </Typography>
                </Box>
              }
            />
            <Divider />
            <FormControlLabel
              control={
                <Switch
                  checked={security.activityProtection}
                  onChange={(e) => setSecurity({ ...security, activityProtection: e.target.checked })}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Suspicious Activity Protection
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Protect against unauthorized access
                  </Typography>
                </Box>
              }
            />
          </Box>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <HelpIcon /> Help & Support
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                justifyContent: 'flex-start',
              }}
            >
              View Help Center
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                justifyContent: 'flex-start',
              }}
            >
              Contact Support
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                justifyContent: 'flex-start',
              }}
            >
              Report a Problem
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card sx={{ borderColor: theme.palette.error.main, borderWidth: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.error.main, mb: 2 }}>
            Danger Zone
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LogoutIcon />}
              sx={{
                borderColor: theme.palette.warning.main,
                color: theme.palette.warning.main,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Sign Out All Devices
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: theme.palette.error.main,
                color: theme.palette.error.main,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Delete Account
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
