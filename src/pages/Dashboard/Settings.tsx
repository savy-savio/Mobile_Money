/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/static-components */
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Switch,
  TextField,
  Button,
  Avatar,
  useMediaQuery,
  Dialog,
  IconButton,
  CircularProgress,
  Skeleton,
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
  CameraAlt as CameraIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  Refresh as RetakeIcon,
} from '@mui/icons-material';
import {
  useGetProfile,
  useUpdateProfileDetails,
  useUploadProfilePhoto,
} from '../../hooks/useProfile'; // adjust path as needed

// ─── Reusable section wrapper ─────────────────────────────────────────────────
function Section({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
      <Typography sx={{
        fontSize: '0.68rem', fontWeight: 800, color: '#FA510F',
        letterSpacing: '0.12em', textTransform: 'uppercase', mb: 1.2,
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
  icon, title, subtitle, action, danger = false,
}: {
  icon: React.ReactNode; title: string; subtitle: string;
  action: React.ReactNode; actionColor?: string; danger?: boolean;
}) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center',
      px: { xs: 2, sm: 2.5 }, py: { xs: 1.8, sm: 2 }, gap: 2,
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      '&:last-child': { borderBottom: 'none' },
      bgcolor: danger ? 'rgba(220,38,38,0.02)' : 'transparent',
      transition: 'background 0.15s',
      '&:hover': { bgcolor: danger ? 'rgba(220,38,38,0.04)' : '#FAFBFC' },
    }}>
      <Box sx={{
        width: 38, height: 38, borderRadius: '11px', flexShrink: 0,
        bgcolor: danger ? '#FEF2F2' : '#F8F9FA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Box sx={{ color: danger ? '#DC2626' : '#6B7280', display: 'flex', fontSize: '1.1rem' }}>{icon}</Box>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: danger ? '#DC2626' : '#0F172A', lineHeight: 1.3 }}>{title}</Typography>
        <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mt: 0.2, lineHeight: 1.4 }}>{subtitle}</Typography>
      </Box>
      <Box sx={{ flexShrink: 0 }}>{action}</Box>
    </Box>
  );
}

// ─── Row for toggle switches ──────────────────────────────────────────────────
function ToggleRow({
  icon, title, subtitle, checked, onChange,
}: {
  icon: React.ReactNode; title: string; subtitle: string;
  checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center',
      px: { xs: 2, sm: 2.5 }, py: { xs: 1.8, sm: 2 }, gap: 2,
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      '&:last-child': { borderBottom: 'none' },
      transition: 'background 0.15s',
      '&:hover': { bgcolor: '#FAFBFC' }, cursor: 'pointer',
    }}
    onClick={() => onChange(!checked)}
    >
      <Box sx={{
        width: 38, height: 38, borderRadius: '11px', flexShrink: 0,
        bgcolor: checked ? '#FFF4F0' : '#F8F9FA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s',
      }}>
        <Box sx={{ color: checked ? '#FA510F' : '#9CA3AF', display: 'flex', fontSize: '1.1rem', transition: 'color 0.2s' }}>{icon}</Box>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{title}</Typography>
        <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mt: 0.2, lineHeight: 1.4 }}>{subtitle}</Typography>
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
      px: { xs: 2, sm: 2.5 }, py: { xs: 1.6, sm: 1.8 }, gap: 2,
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      '&:last-child': { borderBottom: 'none' },
    }}>
      <Box sx={{ color: '#9CA3AF', display: 'flex', fontSize: '1rem', flexShrink: 0 }}>{icon}</Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.2 }}>{label}</Typography>
        <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value || '—'}</Typography>
      </Box>
    </Box>
  );
}

// ─── Profile field skeleton ───────────────────────────────────────────────────
function FieldRowSkeleton() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', px: { xs: 2, sm: 2.5 }, py: { xs: 1.6, sm: 1.8 }, gap: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <Skeleton variant="circular" width={20} height={20} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="30%" height={12} />
        <Skeleton variant="text" width="60%" height={18} sx={{ mt: 0.5 }} />
      </Box>
    </Box>
  );
}

// ─── Avatar Upload Dialog ─────────────────────────────────────────────────────
function AvatarUploadDialog({
  open, onClose, onSave, currentImage, isUploading,
}: {
  open: boolean; onClose: () => void;
  onSave: (url: string) => void;
  currentImage: string | null;
  isUploading: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file: File) => {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, GIF, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleSave = () => {
    if (preview) onSave(preview);
  };

  const handleClose = () => {
    if (isUploading) return;
    onClose();
    setPreview(null);
    setError('');
  };

  // Reset preview when dialog closes
  const handleDialogClose = () => {
    if (!isUploading) {
      setPreview(null);
      setError('');
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: '24px', m: { xs: 1.5, sm: 3 }, overflow: 'hidden' } } }}
    >
      {/* Header */}
      <Box sx={{
        px: 3, py: 2.5,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>Update Profile Photo</Typography>
          <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mt: 0.2 }}>JPG, PNG, GIF or WebP · Max 5 MB</Typography>
        </Box>
        <IconButton size="small" onClick={handleClose} disabled={isUploading} sx={{ bgcolor: '#F5F6FA', '&:hover': { bgcolor: '#EDEFF5' } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>

        {preview ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={preview}
                sx={{
                  width: 120, height: 120,
                  boxShadow: '0 12px 40px rgba(250,81,15,0.2)',
                  border: '3px solid #FA510F',
                }}
              />
              <Box sx={{
                position: 'absolute', bottom: 4, right: 4,
                width: 28, height: 28, borderRadius: '50%',
                bgcolor: '#059669', border: '2px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckIcon sx={{ fontSize: '0.85rem', color: '#fff' }} />
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600 }}>
              Looking good! Ready to save.
            </Typography>
            <Box
              component="button"
              onClick={() => { setPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
              disabled={isUploading}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.6,
                border: 'none', bgcolor: 'transparent', cursor: 'pointer',
                color: '#9CA3AF', fontSize: '0.75rem', fontWeight: 700,
                '&:hover': { color: '#FA510F' }, transition: 'color 0.15s',
                '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
              }}
            >
              <RetakeIcon sx={{ fontSize: '0.9rem' }} />
              Choose a different photo
            </Box>
          </Box>
        ) : (
          <Box
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              border: `2px dashed ${dragOver ? '#FA510F' : 'rgba(0,0,0,0.12)'}`,
              borderRadius: '16px',
              bgcolor: dragOver ? '#FFF4F0' : '#FAFBFC',
              py: 4, px: 2,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': { border: '2px dashed #FA510F', bgcolor: '#FFF4F0' },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={currentImage ?? undefined}
                sx={{
                  width: 80, height: 80,
                  background: 'linear-gradient(135deg,#FA510F,#D94309)',
                  fontSize: '1.8rem', fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(250,81,15,0.2)',
                }}
              >
                JD
              </Avatar>
              <Box sx={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                bgcolor: 'rgba(0,0,0,0.38)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CameraIcon sx={{ color: '#fff', fontSize: '1.5rem' }} />
              </Box>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', mb: 0.3 }}>
                {dragOver ? 'Drop to upload' : 'Click or drag & drop'}
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                Your photo will be cropped to a circle
              </Typography>
            </Box>

            <Box sx={{
              px: 2, py: 0.8, borderRadius: '10px',
              background: 'linear-gradient(135deg,#FA510F,#D94309)',
              display: 'flex', alignItems: 'center', gap: 0.6,
            }}>
              <UploadIcon sx={{ color: '#fff', fontSize: '0.9rem' }} />
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>Browse Files</Typography>
            </Box>
          </Box>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />

        {error && (
          <Box sx={{ px: 2, py: 1.2, borderRadius: '10px', bgcolor: '#FEF2F2', display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarnIcon sx={{ fontSize: '0.9rem', color: '#DC2626' }} />
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#DC2626' }}>{error}</Typography>
          </Box>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Button
            fullWidth variant="outlined" onClick={handleClose} disabled={isUploading}
            sx={{
              borderRadius: '12px', textTransform: 'none', fontWeight: 700,
              borderColor: 'rgba(0,0,0,0.12)', color: '#374151', py: 1.2,
              '&:hover': { bgcolor: '#F8F9FA', borderColor: 'rgba(0,0,0,0.2)' },
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth variant="contained" disabled={!preview || isUploading} onClick={handleSave}
            sx={{
              borderRadius: '12px', textTransform: 'none', fontWeight: 700, py: 1.2,
              background: preview && !isUploading ? 'linear-gradient(135deg,#FA510F,#D94309)' : undefined,
              boxShadow: preview && !isUploading ? '0 4px 14px rgba(250,81,15,0.3)' : 'none',
              '&:not(:disabled):hover': { background: 'linear-gradient(135deg,#D94309,#B33000)' },
            }}
          >
            {isUploading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={14} sx={{ color: '#fff' }} />
                Uploading…
              </Box>
            ) : 'Save Photo'}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Settings() {
  const isMobile = useMediaQuery('(max-width:600px)');

  // ── API hooks ──────────────────────────────────────────────────────────────
  const { data: profileResponse, isLoading: profileLoading, isError: profileError } = useGetProfile();
  const updateProfileMutation = useUpdateProfileDetails();
  const uploadPhotoMutation = useUploadProfilePhoto();

  const profile = profileResponse?.data;

  // ── Local state ────────────────────────────────────────────────────────────
  const [editing, setEditing] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  // Edit form state — seeded from API data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    currency: '',
    accountType: '',
  });

  // Track displayed photo URL (from API or local preview after upload)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  // Success/error banners
  const [profileSaved, setProfileSaved] = useState(false);
  const [photoSaved, setPhotoSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [photoError, setPhotoError] = useState('');

  const [notifications, setNotifications] = useState({ email: true, push: true, transactions: true });
  const [security, setSecurity] = useState({ loginAlerts: true, deviceManagement: false, activityProtection: true });

  // Sync profile photo from API when profile loads
  useEffect(() => {
    if (profile?.profilePhoto) {
      setPhotoUrl(profile.profilePhoto);
    }
  }, [profile?.profilePhoto]);

  // Seed form when entering edit mode
  const handleEditClick = () => {
    setFormData({
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      phoneNumber: profile?.phoneNumber ?? '',
      dateOfBirth: profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '',
      country: profile?.country ?? '',
      currency: profile?.currency ?? '',
      accountType: profile?.accountType ?? '',
    });
    setSaveError('');
    setEditing(true);
  };

  const handleSave = async () => {
    setSaveError('');
    try {
      await updateProfileMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth || undefined,
        country: formData.country || undefined,
        currency: formData.currency || undefined,
        accountType: formData.accountType || undefined,
      });
      setEditing(false);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch {
      setSaveError('Failed to update profile. Please try again.');
    }
  };

  const handlePhotoSave = async (base64Url: string) => {
    setPhotoError('');
    try {
      const response = await uploadPhotoMutation.mutateAsync({ photoUrl: base64Url });
      // Update photoUrl with the response from server (in case it's processed/stored differently)
      if (response?.data?.profilePhoto) {
        setPhotoUrl(response.data.profilePhoto);
      } else {
        // Fallback to the uploaded base64 if server doesn't return processed version
        setPhotoUrl(base64Url);
      }
      setAvatarOpen(false);
      setPhotoSaved(true);
      setTimeout(() => setPhotoSaved(false), 3000);
    } catch {
      setPhotoError('Failed to upload photo. Please try again.');
    }
  };

  const displayName = profile
    ? `${profile.firstName}${profile.middleName ? ' ' + profile.middleName : ''} ${profile.lastName}`.trim()
    : 'John Doe';

  const displayInitials = profile
    ? `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase()
    : 'JD';

  const PillButton = ({ label, variant = 'default' }: { label: string; variant?: 'default' | 'orange' | 'green' }) => {
    const styles = {
      default: { bgcolor: '#F1F5F9', color: '#374151', hbg: '#E8EDF5' },
      orange:  { bgcolor: '#FFF4F0', color: '#FA510F', hbg: '#FFE8DC' },
      green:   { bgcolor: '#ECFDF5', color: '#059669', hbg: '#D1FAE5' },
    }[variant];
    return (
      <Box component="button" sx={{
        px: { xs: 1.2, sm: 1.5 }, py: 0.7, borderRadius: '10px', border: 'none', cursor: 'pointer',
        bgcolor: styles.bgcolor, color: styles.color, fontSize: '0.75rem', fontWeight: 700,
        display: 'flex', alignItems: 'center', gap: 0.4,
        transition: 'all 0.15s', '&:hover': { bgcolor: styles.hbg }, whiteSpace: 'nowrap',
      }}>
        {label}<ArrowIcon sx={{ fontSize: '0.7rem' }} />
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
          {/* Clickable avatar */}
          <Box
            onClick={() => setAvatarOpen(true)}
            sx={{
              position: 'relative', flexShrink: 0, cursor: 'pointer',
              '&:hover .cam-overlay': { opacity: 1 },
            }}
          >
            <Avatar
              src={photoUrl ?? undefined}
              sx={{
                width: { xs: 60, sm: 72 }, height: { xs: 60, sm: 72 },
                background: 'linear-gradient(135deg, #FA510F, #D94309)',
                fontSize: { xs: '1.3rem', sm: '1.6rem' }, fontWeight: 800,
                boxShadow: photoUrl ? '0 8px 24px rgba(250,81,15,0.25)' : '0 8px 24px rgba(250,81,15,0.3)',
                border: photoUrl ? '2.5px solid #FA510F' : 'none',
                transition: 'box-shadow 0.2s',
              }}
            >
              {profileLoading ? null : displayInitials}
            </Avatar>

            <Box
              className="cam-overlay"
              sx={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                bgcolor: 'rgba(0,0,0,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'opacity 0.2s',
              }}
            >
              <CameraIcon sx={{ color: '#fff', fontSize: { xs: '1.1rem', sm: '1.3rem' } }} />
            </Box>

            <Box sx={{
              position: 'absolute', bottom: 2, right: 2,
              width: 12, height: 12, borderRadius: '50%',
              bgcolor: '#059669', border: '2px solid #fff',
            }} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {profileLoading ? (
              <>
                <Skeleton variant="text" width="50%" height={22} />
                <Skeleton variant="text" width="70%" height={16} sx={{ mt: 0.5 }} />
              </>
            ) : (
              <>
                <Typography sx={{ fontSize: { xs: '1rem', sm: '1.15rem' }, fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                  {displayName}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF', mt: 0.2 }}>
                  {profile?.email ?? ''}
                </Typography>
              </>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.8, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, px: 1, py: 0.3, borderRadius: '6px', bgcolor: '#ECFDF5' }}>
                <CheckIcon sx={{ fontSize: '0.7rem', color: '#059669' }} />
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#059669', letterSpacing: '0.04em' }}>Verified Account</Typography>
              </Box>
              <Box
                onClick={() => setAvatarOpen(true)}
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.4,
                  px: 1, py: 0.3, borderRadius: '6px',
                  bgcolor: '#FFF4F0', cursor: 'pointer',
                  '&:hover': { bgcolor: '#FFE8DC' }, transition: 'background 0.15s',
                }}
              >
                <CameraIcon sx={{ fontSize: '0.7rem', color: '#FA510F' }} />
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#FA510F', letterSpacing: '0.04em' }}>
                  {photoUrl ? 'Change Photo' : 'Add Photo'}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            variant={editing ? 'contained' : 'outlined'}
            size="small"
            startIcon={editing
              ? (updateProfileMutation.isPending ? <CircularProgress size={12} sx={{ color: '#fff' }} /> : <CheckIcon />)
              : <EditIcon />
            }
            onClick={editing ? handleSave : handleEditClick}
            disabled={profileLoading || updateProfileMutation.isPending}
            sx={{
              textTransform: 'none', fontWeight: 700, borderRadius: '10px',
              flexShrink: 0, fontSize: '0.78rem',
              ...(editing ? {
                background: 'linear-gradient(135deg,#FA510F,#D94309)',
                boxShadow: '0 4px 14px rgba(250,81,15,0.3)',
                border: 'none', color: '#fff',
                '&:hover': { background: 'linear-gradient(135deg,#D94309,#B33000)' },
                '&:disabled': { opacity: 0.7 },
              } : {
                borderColor: 'rgba(0,0,0,0.15)', color: '#374151',
                '&:hover': { bgcolor: '#F8F9FA' },
              }),
            }}
          >
            {editing
              ? (updateProfileMutation.isPending ? 'Saving…' : 'Save')
              : (isMobile ? 'Edit' : 'Edit Profile')
            }
          </Button>
        </Box>

        {/* ── Banners ── */}
        {photoSaved && (
          <Box sx={{ px: 2.5, py: 1.2, bgcolor: '#FFF4F0', borderBottom: '1px solid rgba(250,81,15,0.12)', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CameraIcon sx={{ fontSize: '0.9rem', color: '#FA510F' }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#FA510F' }}>Profile photo updated!</Typography>
          </Box>
        )}
        {photoError && (
          <Box sx={{ px: 2.5, py: 1.2, bgcolor: '#FEF2F2', borderBottom: '1px solid rgba(220,38,38,0.12)', display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarnIcon sx={{ fontSize: '0.9rem', color: '#DC2626' }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#DC2626' }}>{photoError}</Typography>
          </Box>
        )}
        {profileSaved && (
          <Box sx={{ px: 2.5, py: 1.2, bgcolor: '#ECFDF5', borderBottom: '1px solid rgba(5,150,105,0.12)', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckIcon sx={{ fontSize: '0.9rem', color: '#059669' }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669' }}>Profile updated successfully</Typography>
          </Box>
        )}
        {saveError && (
          <Box sx={{ px: 2.5, py: 1.2, bgcolor: '#FEF2F2', borderBottom: '1px solid rgba(220,38,38,0.12)', display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarnIcon sx={{ fontSize: '0.9rem', color: '#DC2626' }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#DC2626' }}>{saveError}</Typography>
          </Box>
        )}
        {profileError && !profileLoading && (
          <Box sx={{ px: 2.5, py: 1.2, bgcolor: '#FEF2F2', borderBottom: '1px solid rgba(220,38,38,0.12)', display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarnIcon sx={{ fontSize: '0.9rem', color: '#DC2626' }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#DC2626' }}>Could not load profile data.</Typography>
          </Box>
        )}

        {/* ── Fields ── */}
        {profileLoading ? (
          <>
            <FieldRowSkeleton />
            <FieldRowSkeleton />
            <FieldRowSkeleton />
            <FieldRowSkeleton />
            <FieldRowSkeleton />
            <FieldRowSkeleton />
          </>
        ) : editing ? (
          <Box sx={{ p: { xs: 2, sm: 2.5 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
              <TextField
                size="small" label="First Name" value={formData.firstName} type="text" fullWidth
                onChange={e => setFormData(f => ({ ...f, firstName: e.target.value }))}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '0.88rem', '&.Mui-focused fieldset': { borderColor: '#FA510F' } },
                  '& label.Mui-focused': { color: '#FA510F' },
                }}
              />
              <TextField
                size="small" label="Last Name" value={formData.lastName} type="text" fullWidth
                onChange={e => setFormData(f => ({ ...f, lastName: e.target.value }))}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '0.88rem', '&.Mui-focused fieldset': { borderColor: '#FA510F' } },
                  '& label.Mui-focused': { color: '#FA510F' },
                }}
              />
              <TextField
                size="small" label="Phone Number" value={formData.phoneNumber} type="tel" fullWidth
                onChange={e => setFormData(f => ({ ...f, phoneNumber: e.target.value }))}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '0.88rem', '&.Mui-focused fieldset': { borderColor: '#FA510F' } },
                  '& label.Mui-focused': { color: '#FA510F' },
                }}
              />
              <TextField
                size="small" label="Date of Birth" value={formData.dateOfBirth} type="date"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                onChange={e => setFormData(f => ({ ...f, dateOfBirth: e.target.value }))}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '0.88rem', '&.Mui-focused fieldset': { borderColor: '#FA510F' } },
                  '& label.Mui-focused': { color: '#FA510F' },
                }}
              />
              <TextField
                size="small" label="Country" value={formData.country} type="text" fullWidth
                onChange={e => setFormData(f => ({ ...f, country: e.target.value }))}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '0.88rem', '&.Mui-focused fieldset': { borderColor: '#FA510F' } },
                  '& label.Mui-focused': { color: '#FA510F' },
                }}
              />
              <TextField
                size="small" label="Currency" value={formData.currency} type="text" fullWidth
                onChange={e => setFormData(f => ({ ...f, currency: e.target.value }))}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '0.88rem', '&.Mui-focused fieldset': { borderColor: '#FA510F' } },
                  '& label.Mui-focused': { color: '#FA510F' },
                }}
              />
            </Box>
          </Box>
        ) : (
          <>
            <FieldRow icon={<PersonIcon />} label="Full Name"     value={displayName} />
            <FieldRow icon={<EmailIcon />}  label="Email Address" value={profile?.email ?? ''} />
            <FieldRow icon={<DeviceIcon />} label="Phone Number"  value={profile?.phoneNumber ?? ''} />
            <FieldRow icon={<CakeIcon />}   label="Date of Birth" value={profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''} />
            <FieldRow icon={<PersonIcon />} label="Country"       value={profile?.country ?? ''} />
            <FieldRow icon={<PersonIcon />} label="Currency"      value={profile?.currency ?? ''} />
          </>
        )}

        <Box sx={{ px: { xs: 2, sm: 2.5 }, py: 1.5, bgcolor: '#FAFBFC', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontSize: '0.7rem', color: '#C4C9D4', fontWeight: 600 }}>
            Member since:{' '}
            <span style={{ color: '#9CA3AF' }}>
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : '—'}
            </span>
          </Typography>
        </Box>
      </Section>

      {/* ── Security ── */}
      <Section label="Security">
        <ActionRow icon={<LockIcon />}   title="Password"                    subtitle="Last changed 2 months ago"       action={<PillButton label="Change" />} />
        <ActionRow icon={<ShieldIcon />} title="Two-Factor Authentication"   subtitle="Add an extra layer of security"   action={<PillButton label="Enable" variant="orange" />} />
        <ActionRow icon={<DeviceIcon />} title="Active Sessions"             subtitle="Manage your active logins"        action={<PillButton label="View" />} />
      </Section>

      {/* ── Notifications ── */}
      <Section label="Notifications">
        <ToggleRow icon={<EmailIcon />}  title="Email Notifications" subtitle="Receive updates and statements via email"   checked={notifications.email}        onChange={v => setNotifications(n => ({ ...n, email: v }))} />
        <ToggleRow icon={<BellIcon />}   title="Push Notifications"  subtitle="Real-time alerts on your device"            checked={notifications.push}         onChange={v => setNotifications(n => ({ ...n, push: v }))} />
        <ToggleRow icon={<DeviceIcon />} title="Transaction Alerts"  subtitle="Instant notification for every transaction" checked={notifications.transactions}  onChange={v => setNotifications(n => ({ ...n, transactions: v }))} />
      </Section>

      {/* ── Privacy ── */}
      <Section label="Privacy">
        <ToggleRow icon={<ShieldIcon />} title="Login Alerts"                   subtitle="Alert me when someone logs into my account"  checked={security.loginAlerts}        onChange={v => setSecurity(s => ({ ...s, loginAlerts: v }))} />
        <ToggleRow icon={<LockIcon />}   title="Suspicious Activity Protection" subtitle="Automatically block unauthorized access"      checked={security.activityProtection} onChange={v => setSecurity(s => ({ ...s, activityProtection: v }))} />
      </Section>

      {/* ── Support ── */}
      <Section label="Support">
        {[
          { icon: <HelpIcon />,  title: 'Help Center',      subtitle: 'Browse FAQs and guides' },
          { icon: <EmailIcon />, title: 'Contact Support',  subtitle: 'Get help from our team' },
          { icon: <WarnIcon />,  title: 'Report a Problem', subtitle: 'Let us know about an issue' },
        ].map(item => (
          <ActionRow
            key={item.title} icon={item.icon} title={item.title} subtitle={item.subtitle}
            action={
              <Box sx={{ width: 30, height: 30, borderRadius: '8px', bgcolor: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#EDEFF5' }, transition: 'background 0.15s' }}>
                <ArrowIcon sx={{ fontSize: '0.75rem', color: '#9CA3AF' }} />
              </Box>
            }
          />
        ))}
      </Section>

      {/* ── Danger Zone ── */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontSize: '0.68rem', fontWeight: 800, color: '#DC2626', letterSpacing: '0.12em', textTransform: 'uppercase', mb: 1.2 }}>
          Danger Zone
        </Typography>
        <Box sx={{ borderRadius: '20px', bgcolor: '#fff', border: '1.5px solid rgba(220,38,38,0.2)', boxShadow: '0 2px 16px rgba(220,38,38,0.06)', overflow: 'hidden' }}>
          <ActionRow
            icon={<LogoutIcon />} title="Sign Out All Devices" subtitle="End all active sessions immediately" danger
            action={
              <Box component="button" sx={{ px: 1.5, py: 0.7, borderRadius: '10px', border: 'none', cursor: 'pointer', bgcolor: '#FEF3C7', color: '#D97706', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.4, transition: 'all 0.15s', whiteSpace: 'nowrap', '&:hover': { bgcolor: '#FDE68A' } }}>
                Sign Out <ArrowIcon sx={{ fontSize: '0.7rem' }} />
              </Box>
            }
          />
          <ActionRow
            icon={<DeleteIcon />} title="Delete Account" subtitle="Permanently remove your account and all data" danger
            action={
              <Box component="button" sx={{ px: 1.5, py: 0.7, borderRadius: '10px', border: 'none', cursor: 'pointer', bgcolor: '#FEF2F2', color: '#DC2626', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.4, transition: 'all 0.15s', whiteSpace: 'nowrap', '&:hover': { bgcolor: '#FEE2E2' } }}>
                Delete <ArrowIcon sx={{ fontSize: '0.7rem' }} />
              </Box>
            }
          />
        </Box>
      </Box>

      {/* ── Upload dialog ── */}
      <AvatarUploadDialog
        open={avatarOpen}
        onClose={() => { setAvatarOpen(false); setPhotoError(''); }}
        onSave={handlePhotoSave}
        currentImage={photoUrl}
        isUploading={uploadPhotoMutation.isPending}
      />
    </Box>
  );
}
