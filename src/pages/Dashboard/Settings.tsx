/* eslint-disable react-hooks/static-components */
import { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  TextField,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import {
  Edit as EditIcon,
  LockOutlined as LockIcon,
  NotificationsOutlined as BellIcon,
  SecurityOutlined as ShieldIcon,
  HelpOutlined as HelpIcon,
  LogoutOutlined as LogoutIcon,
  KeyboardArrowRight as ArrowIcon,
  CheckCircle as CheckIcon,
  PhoneAndroid as DeviceIcon,
  EmailOutlined as EmailIcon,
  PersonOutlined as PersonIcon,
  CakeOutlined as CakeIcon,
  WarningAmberOutlined as WarnIcon,
  DeleteOutlined as DeleteIcon,
} from '@mui/icons-material';

// ─── Reusable section wrapper ─────────────────────────────────────────────────
function Section({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
      <Typography sx={{
        fontSize: '0.68rem', fontWeight: 800, color: '#FA510F',
        letterSpacing: '0.12em', textTransform: 'uppercase', mb: 1.2, px: { xs: 0, sm: 0 },
      }}>
        {label}
      </Typography>
      <Box sx={{
        borderRadius: '20px',
        bgcolor: '#fff',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
        overflow: 'hidden',
      }}>
        {children}
      </Box>
    </Box>
  );
}

// ─── Row for action buttons ───────────────────────────────────────────────────
function ActionRow({
  icon,
  title,
  subtitle,
  action,
//   actionColor = '#374151',
  danger = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action: React.ReactNode;
  actionColor?: string;
  danger?: boolean;
}) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center',
      px: { xs: 2, sm: 2.5 }, py: { xs: 1.8, sm: 2 },
      gap: 2,
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      '&:last-child': { borderBottom: 'none' },
      bgcolor: danger ? 'rgba(220,38,38,0.02)' : 'transparent',
      transition: 'background 0.15s',
      '&:hover': { bgcolor: danger ? 'rgba(220,38,38,0.04)' : '#FAFBFC' },
    }}>
      {/* Icon */}
      <Box sx={{
        width: 38, height: 38, borderRadius: '11px', flexShrink: 0,
        bgcolor: danger ? '#FEF2F2' : '#F8F9FA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Box sx={{ color: danger ? '#DC2626' : '#6B7280', display: 'flex', fontSize: '1.1rem' }}>
          {icon}
        </Box>
      </Box>

      {/* Text */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: danger ? '#DC2626' : '#0F172A', lineHeight: 1.3 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mt: 0.2, lineHeight: 1.4 }}>
          {subtitle}
        </Typography>
      </Box>

      {/* Action */}
      <Box sx={{ flexShrink: 0 }}>{action}</Box>
    </Box>
  );
}

// ─── Row for toggle switches ──────────────────────────────────────────────────
function ToggleRow({
  icon,
  title,
  subtitle,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center',
      px: { xs: 2, sm: 2.5 }, py: { xs: 1.8, sm: 2 },
      gap: 2,
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      '&:last-child': { borderBottom: 'none' },
      transition: 'background 0.15s',
      '&:hover': { bgcolor: '#FAFBFC' },
      cursor: 'pointer',
    }}
    onClick={() => onChange(!checked)}
    >
      <Box sx={{
        width: 38, height: 38, borderRadius: '11px', flexShrink: 0,
        bgcolor: checked ? '#FFF4F0' : '#F8F9FA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s',
      }}>
        <Box sx={{ color: checked ? '#FA510F' : '#9CA3AF', display: 'flex', fontSize: '1.1rem', transition: 'color 0.2s' }}>
          {icon}
        </Box>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mt: 0.2, lineHeight: 1.4 }}>
          {subtitle}
        </Typography>
      </Box>
      <Switch
        checked={checked}
        onChange={e => { e.stopPropagation(); onChange(e.target.checked); }}
        size="small"
        sx={{
          flexShrink: 0,
          '& .MuiSwitch-switchBase.Mui-checked': { color: '#FA510F' },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#FA510F' },
        }}
      />
    </Box>
  );
}

// ─── Profile field row ────────────────────────────────────────────────────────
function FieldRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center',
      px: { xs: 2, sm: 2.5 }, py: { xs: 1.6, sm: 1.8 },
      gap: 2,
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      '&:last-child': { borderBottom: 'none' },
    }}>
      <Box sx={{ color: '#9CA3AF', display: 'flex', fontSize: '1rem', flexShrink: 0 }}>{icon}</Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.2 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Settings() {
  const isMobile = useMediaQuery('(max-width:600px)');

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  // Pill button used for security section
  const PillButton = ({ label, variant = 'default' }: { label: string; variant?: 'default' | 'orange' | 'green' }) => {
    const styles = {
      default: { bgcolor: '#F1F5F9', color: '#374151', hbg: '#E8EDF5' },
      orange:  { bgcolor: '#FFF4F0', color: '#FA510F', hbg: '#FFE8DC' },
      green:   { bgcolor: '#ECFDF5', color: '#059669', hbg: '#D1FAE5' },
    }[variant];
    return (
      <Box
        component="button"
        sx={{
          px: { xs: 1.2, sm: 1.5 }, py: 0.7,
          borderRadius: '10px', border: 'none', cursor: 'pointer',
          bgcolor: styles.bgcolor, color: styles.color,
          fontSize: '0.75rem', fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 0.4,
          transition: 'all 0.15s',
          '&:hover': { bgcolor: styles.hbg },
          whiteSpace: 'nowrap',
        }}
      >
        {label}
        <ArrowIcon sx={{ fontSize: '0.7rem' }} />
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: '100%', overflowX: 'hidden', pb: 4 }}>

      {/* ── Page header ── */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' }, fontWeight: 900, color: '#0F172A', lineHeight: 1.1, mb: 0.5 }}>
          Settings
        </Typography>
        <Typography sx={{ fontSize: '0.82rem', color: '#9CA3AF' }}>
          Manage your account and preferences
        </Typography>
      </Box>

      {/* ── Profile ── */}
      <Section label="Profile">
        {/* Avatar + name hero */}
        <Box sx={{
          px: { xs: 2, sm: 2.5 }, pt: { xs: 2.5, sm: 3 }, pb: 2.5,
          display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 2.5 },
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          background: 'linear-gradient(135deg, #FFFBF9 0%, #FFF4F0 100%)',
        }}>
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            <Avatar sx={{
              width: { xs: 60, sm: 72 }, height: { xs: 60, sm: 72 },
              background: 'linear-gradient(135deg, #FA510F, #D94309)',
              fontSize: { xs: '1.3rem', sm: '1.6rem' },
              fontWeight: 800,
              boxShadow: '0 8px 24px rgba(250,81,15,0.3)',
            }}>
              JD
            </Avatar>
            {/* Online dot */}
            <Box sx={{
              position: 'absolute', bottom: 2, right: 2,
              width: 12, height: 12, borderRadius: '50%',
              bgcolor: '#059669', border: '2px solid #fff',
            }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: { xs: '1rem', sm: '1.15rem' }, fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              John Doe
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF', mt: 0.2 }}>
              john@example.com
            </Typography>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.4,
              mt: 0.8, px: 1, py: 0.3, borderRadius: '6px',
              bgcolor: '#ECFDF5',
            }}>
              <CheckIcon sx={{ fontSize: '0.7rem', color: '#059669' }} />
              <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#059669', letterSpacing: '0.04em' }}>
                Verified Account
              </Typography>
            </Box>
          </Box>
          <Button
            variant={editing ? 'contained' : 'outlined'}
            size="small"
            startIcon={editing ? <CheckIcon /> : <EditIcon />}
            onClick={editing ? handleSave : () => setEditing(true)}
            sx={{
              textTransform: 'none', fontWeight: 700, borderRadius: '10px',
              flexShrink: 0, fontSize: '0.78rem',
              ...(editing ? {
                background: 'linear-gradient(135deg,#FA510F,#D94309)',
                boxShadow: '0 4px 14px rgba(250,81,15,0.3)',
                border: 'none', color: '#fff',
                '&:hover': { background: 'linear-gradient(135deg,#D94309,#B33000)' },
              } : {
                borderColor: 'rgba(0,0,0,0.15)', color: '#374151',
                '&:hover': { bgcolor: '#F8F9FA' },
              }),
            }}
          >
            {editing ? 'Save' : isMobile ? 'Edit' : 'Edit Profile'}
          </Button>
        </Box>

        {/* Saved banner */}
        {saved && (
          <Box sx={{
            px: 2.5, py: 1.2,
            bgcolor: '#ECFDF5', borderBottom: '1px solid rgba(5,150,105,0.12)',
            display: 'flex', alignItems: 'center', gap: 1,
          }}>
            <CheckIcon sx={{ fontSize: '0.9rem', color: '#059669' }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669' }}>Profile updated successfully</Typography>
          </Box>
        )}

        {/* Field rows */}
        {editing ? (
          <Box sx={{ p: { xs: 2, sm: 2.5 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
              {[
                { label: 'Full Name', value: 'John Doe', type: 'text' },
                { label: 'Email Address', value: 'john@example.com', type: 'email' },
                { label: 'Phone Number', value: '+1 (555) 123-4567', type: 'tel' },
                { label: 'Date of Birth', value: 'January 15, 1990', type: 'text' },
              ].map(f => (
                <TextField
                  key={f.label}
                  size="small"
                  label={f.label}
                  defaultValue={f.value}
                  type={f.type}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px', fontSize: '0.88rem',
                      '&.Mui-focused fieldset': { borderColor: '#FA510F' },
                    },
                    '& label.Mui-focused': { color: '#FA510F' },
                  }}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <>
            <FieldRow icon={<PersonIcon />}  label="Full Name"      value="John Doe" />
            <FieldRow icon={<EmailIcon />}   label="Email Address"  value="john@example.com" />
            <FieldRow icon={<DeviceIcon />}  label="Phone Number"   value="+1 (555) 123-4567" />
            <FieldRow icon={<CakeIcon />}    label="Date of Birth"  value="January 15, 1990" />
          </>
        )}

        {/* Account ID footer */}
        <Box sx={{ px: { xs: 2, sm: 2.5 }, py: 1.5, bgcolor: '#FAFBFC', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontSize: '0.7rem', color: '#C4C9D4', fontWeight: 600 }}>
            Account ID: <span style={{ color: '#9CA3AF' }}>ACC-123456789</span>
          </Typography>
        </Box>
      </Section>

      {/* ── Security ── */}
      <Section label="Security">
        <ActionRow
          icon={<LockIcon />}
          title="Password"
          subtitle="Last changed 2 months ago"
          action={<PillButton label="Change" />}
        />
        <ActionRow
          icon={<ShieldIcon />}
          title="Two-Factor Authentication"
          subtitle="Add an extra layer of security"
          action={<PillButton label="Enable" variant="orange" />}
        />
        <ActionRow
          icon={<DeviceIcon />}
          title="Active Sessions"
          subtitle="Manage your active logins"
          action={<PillButton label="View" />}
        />
      </Section>

      {/* ── Notifications ── */}
      <Section label="Notifications">
        <ToggleRow
          icon={<EmailIcon />}
          title="Email Notifications"
          subtitle="Receive updates and statements via email"
          checked={notifications.email}
          onChange={v => setNotifications(n => ({ ...n, email: v }))}
        />
        <ToggleRow
          icon={<BellIcon />}
          title="Push Notifications"
          subtitle="Real-time alerts on your device"
          checked={notifications.push}
          onChange={v => setNotifications(n => ({ ...n, push: v }))}
        />
        <ToggleRow
          icon={<DeviceIcon />}
          title="Transaction Alerts"
          subtitle="Instant notification for every transaction"
          checked={notifications.transactions}
          onChange={v => setNotifications(n => ({ ...n, transactions: v }))}
        />
      </Section>

      {/* ── Privacy & Security ── */}
      <Section label="Privacy">
        <ToggleRow
          icon={<ShieldIcon />}
          title="Login Alerts"
          subtitle="Alert me when someone logs into my account"
          checked={security.loginAlerts}
          onChange={v => setSecurity(s => ({ ...s, loginAlerts: v }))}
        />
        <ToggleRow
          icon={<LockIcon />}
          title="Suspicious Activity Protection"
          subtitle="Automatically block unauthorized access"
          checked={security.activityProtection}
          onChange={v => setSecurity(s => ({ ...s, activityProtection: v }))}
        />
      </Section>

      {/* ── Help & Support ── */}
      <Section label="Support">
        {[
          { icon: <HelpIcon />, title: 'Help Center', subtitle: 'Browse FAQs and guides' },
          { icon: <EmailIcon />, title: 'Contact Support', subtitle: 'Get help from our team' },
          { icon: <WarnIcon />, title: 'Report a Problem', subtitle: 'Let us know about an issue' },
        ].map(item => (
          <ActionRow
            key={item.title}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            action={
              <Box sx={{
                width: 30, height: 30, borderRadius: '8px', bgcolor: '#F8F9FA',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', '&:hover': { bgcolor: '#EDEFF5' }, transition: 'background 0.15s',
              }}>
                <ArrowIcon sx={{ fontSize: '0.75rem', color: '#9CA3AF' }} />
              </Box>
            }
          />
        ))}
      </Section>

      {/* ── Danger Zone ── */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{
          fontSize: '0.68rem', fontWeight: 800, color: '#DC2626',
          letterSpacing: '0.12em', textTransform: 'uppercase', mb: 1.2,
        }}>
          Danger Zone
        </Typography>
        <Box sx={{
          borderRadius: '20px',
          bgcolor: '#fff',
          border: '1.5px solid rgba(220,38,38,0.2)',
          boxShadow: '0 2px 16px rgba(220,38,38,0.06)',
          overflow: 'hidden',
        }}>
          <ActionRow
            icon={<LogoutIcon />}
            title="Sign Out All Devices"
            subtitle="End all active sessions immediately"
            danger
            action={
              <Box component="button" sx={{
                px: 1.5, py: 0.7, borderRadius: '10px', border: 'none', cursor: 'pointer',
                bgcolor: '#FEF3C7', color: '#D97706',
                fontSize: '0.75rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 0.4,
                transition: 'all 0.15s', whiteSpace: 'nowrap',
                '&:hover': { bgcolor: '#FDE68A' },
              }}>
                Sign Out <ArrowIcon sx={{ fontSize: '0.7rem' }} />
              </Box>
            }
          />
          <ActionRow
            icon={<DeleteIcon />}
            title="Delete Account"
            subtitle="Permanently remove your account and all data"
            danger
            action={
              <Box component="button" sx={{
                px: 1.5, py: 0.7, borderRadius: '10px', border: 'none', cursor: 'pointer',
                bgcolor: '#FEF2F2', color: '#DC2626',
                fontSize: '0.75rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 0.4,
                transition: 'all 0.15s', whiteSpace: 'nowrap',
                '&:hover': { bgcolor: '#FEE2E2' },
              }}>
                Delete <ArrowIcon sx={{ fontSize: '0.7rem' }} />
              </Box>
            }
          />
        </Box>
      </Box>

    </Box>
  );
}