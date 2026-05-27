/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Lock as LockIcon,
  LockOpen as UnlockIcon,
  Settings as SettingsIcon,
  Visibility as EyeIcon,
  VisibilityOff as EyeOffIcon,
  ContentCopy as CopyIcon,
  Close as CloseIcon,
  Send as SendIcon,
  SwapHoriz as TransferIcon,
  CheckCircle as CheckIcon,
  Block as BlockIcon,
  NorthEast as NorthEastIcon,
  SouthWest as SouthWestIcon,
} from '@mui/icons-material';

// ─── Data ──────────────────────────────────────────────────────────────────────
const INITIAL_CARDS = [
  {
    id: 1,
    name: 'Primary Card',
    holder: 'JOHN DOE',
    type: 'Visa',
    network: 'visa',
    number: '4159 3091 4227 6210',
    expiry: '03/29',
    cvv: '842',
    balance: 15000,
    spent: 3200,
    limit: 20000,
    status: 'active',
    // Obsidian Ember — used only as fallback bg for non-SVG contexts
    bg: 'linear-gradient(135deg, #0c0c0c 0%, #161616 55%, #0a0a0a 100%)',
    accentColor: '#FA510F',
    textColor: '#ffffff',
    shimmer: 'rgba(250,81,15,0.07)',
    cardStyle: 'obsidian', // <-- new flag used by CardFace
    transactions: [
      { name: 'Apple Store', amount: -299, date: 'Dec 23' },
      { name: 'Netflix', amount: -15.99, date: 'Dec 22' },
      { name: 'Salary', amount: 8500, date: 'Dec 21' },
    ],
  },
  {
    id: 2,
    name: 'Savings Card',
    holder: 'JOHN DOE',
    type: 'Mastercard',
    network: 'mastercard',
    number: '2300 5529 0048 0986',
    expiry: '03/29',
    cvv: '391',
    balance: 25000,
    spent: 890,
    limit: 30000,
    status: 'active',
    bg: 'linear-gradient(135deg, #ffe0cc 0%, #ffc9a0 30%, #ffb07a 60%, #ffd0b0 100%)',
    accentColor: '#b84000',
    textColor: '#4a1500',
    shimmer: 'rgba(255,255,255,0.5)',
    cardStyle: 'default',
    transactions: [
      { name: 'Amazon', amount: -89.99, date: 'Dec 20' },
      { name: 'Transfer In', amount: 5000, date: 'Dec 18' },
    ],
  },
  {
    id: 3,
    name: 'Travel Card',
    holder: 'JOHN DOE',
    type: 'Visa',
    network: 'visa',
    number: '2671 9860 8300 2023',
    expiry: '03/29',
    cvv: '517',
    balance: 5000,
    spent: 4200,
    limit: 5000,
    status: 'inactive',
    bg: 'linear-gradient(135deg, #FA510F 0%, #ff6b28 35%, #ff8545 65%, #e84009 100%)',
    accentColor: '#ffffff',
    textColor: '#ffffff',
    shimmer: 'rgba(255,255,255,0.1)',
    cardStyle: 'default',
    transactions: [
      { name: 'Emirates Air', amount: -1200, date: 'Dec 10' },
      { name: 'Hilton Hotel', amount: -320, date: 'Dec 8' },
    ],
  },
];

const QUICK_STATS = [
  { label: 'Total Balance',  value: '$45,000', change: '+2.5%',   color: '#FA510F', bg: '#FFF4F0' },
  { label: 'Monthly Spent',  value: '$8,290',  change: '-12%',    color: '#059669', bg: '#ECFDF5' },
  { label: 'Credit Limit',   value: '$55,000', change: '3 cards', color: '#6C63FF', bg: '#F3F2FF' },
  { label: 'Rewards Points', value: '12,450',  change: '+340 pts',color: '#D97706', bg: '#FFFBEB' },
];

// ─── Obsidian Ember SVG card face ─────────────────────────────────────────────
function ObsidianEmberCard({
  card,
  showNumber = false,
  size = 'full',
}: {
  card: typeof INITIAL_CARDS[0];
  showNumber?: boolean;
  size?: 'full' | 'small';
}) {
  const uid = `oe_${card.id}`;
  const maskedNumber = card.number.split(' ').map((g, i) => i < 3 ? '••••' : g).join('  ');
  const displayNumber = showNumber ? card.number : maskedNumber;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingBottom: '62.5%',
        borderRadius: size === 'small' ? '12px' : '18px',
        overflow: 'hidden',
        boxShadow: card.status === 'inactive'
          ? 'none'
          : size === 'small'
            ? '0 8px 28px rgba(0,0,0,0.45)'
            : '0 28px 72px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06) inset',
        filter: card.status === 'inactive' ? 'grayscale(60%) brightness(0.65)' : 'none',
        transition: 'all 0.35s ease',
      }}
    >
      <svg
        viewBox="0 0 400 250"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id={`${uid}_base`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c0c0c" />
            <stop offset="55%" stopColor="#161616" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <linearGradient id={`${uid}_ember`} x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FA510F" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#c83800" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FA510F" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}_sheen`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}_leftBar`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FA510F" stopOpacity="0" />
            <stop offset="30%" stopColor="#FA510F" stopOpacity="1" />
            <stop offset="70%" stopColor="#FF7849" stopOpacity="1" />
            <stop offset="100%" stopColor="#FA510F" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}_bottomLine`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FA510F" stopOpacity="0" />
            <stop offset="20%" stopColor="#FA510F" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#FF7849" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FA510F" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}_chipGold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a84b" />
            <stop offset="35%" stopColor="#f2c96a" />
            <stop offset="65%" stopColor="#e0b84e" />
            <stop offset="100%" stopColor="#b8892a" />
          </linearGradient>
          <linearGradient id={`${uid}_chipInner`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c8973a" />
            <stop offset="100%" stopColor="#a87420" />
          </linearGradient>
          <radialGradient id={`${uid}_cornerGlow`} cx="100%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#FA510F" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#FA510F" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FA510F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}_topGlow`} cx="15%" cy="0%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layers */}
        <rect width="400" height="250" rx="18" fill={`url(#${uid}_base)`} />
        <rect width="400" height="250" rx="18" fill={`url(#${uid}_sheen)`} />
        <rect width="400" height="250" rx="18" fill={`url(#${uid}_ember)`} />
        <rect width="400" height="250" rx="18" fill={`url(#${uid}_cornerGlow)`} />
        <rect width="400" height="250" rx="18" fill={`url(#${uid}_topGlow)`} />

        {/* Orange left accent bar */}
        <rect x="0" y="0" width="3.5" height="250" rx="1.75" fill={`url(#${uid}_leftBar)`} />

        {/* Orange bottom line */}
        <rect x="24" y="242" width="352" height="2" rx="1" fill={`url(#${uid}_bottomLine)`} />

        {/* Geometric cut shapes */}
        <polygon points="220,0 400,0 400,130 310,50" fill="#FA510F" fillOpacity="0.045" />
        <polygon points="310,0 400,0 400,70" fill="#ffffff" fillOpacity="0.025" />
        <polygon points="0,180 110,145 70,250 0,250" fill="#FA510F" fillOpacity="0.03" />

        {/* Card number */}
        <text x="28" y="50" fontFamily="'Courier New', monospace" fontSize="8.5" fill="#ffffff" fillOpacity="0.35" letterSpacing="1.8" fontWeight="600">CARD NUMBER</text>
        <text x="28" y="72" fontFamily="'Courier New', monospace" fontSize="17" fill="#ffffff" letterSpacing="3.5" fontWeight="700">
          {displayNumber}
        </text>

        {/* Contactless icon */}
        <g transform="translate(356, 22)">
          <path d="M7 19 C7 19 12 15 12 11 C12 7 7 4 7 4" stroke="#FA510F" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45" />
          <path d="M7 19 C7 19 16 13 16 6" stroke="#FA510F" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M7 19 C7 19 20 11 20 1" stroke="#FA510F" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.95" />
          <circle cx="7" cy="19" r="2.5" fill="#FA510F" />
        </g>

        {/* Gold EMV Chip */}
        <g transform="translate(28, 96)">
          <rect width="48" height="38" rx="5" fill={`url(#${uid}_chipGold)`} stroke="#c8972a" strokeWidth="0.5" />
          <line x1="0" y1="13" x2="48" y2="13" stroke="#9a7020" strokeWidth="0.8" strokeOpacity="0.8" />
          <line x1="0" y1="25" x2="48" y2="25" stroke="#9a7020" strokeWidth="0.8" strokeOpacity="0.8" />
          <line x1="24" y1="0" x2="24" y2="38" stroke="#9a7020" strokeWidth="0.8" strokeOpacity="0.8" />
          <rect x="9" y="13" width="12" height="12" rx="1" fill={`url(#${uid}_chipInner)`} fillOpacity="0.6" />
          <rect x="27" y="13" width="12" height="12" rx="1" fill={`url(#${uid}_chipInner)`} fillOpacity="0.6" />
        </g>

        {/* Expiry */}
        <text x="28" y="180" fontFamily="'Courier New', monospace" fontSize="8.5" fill="#ffffff" fillOpacity="0.35" letterSpacing="1.8" fontWeight="600">VALID THRU</text>
        <text x="28" y="200" fontFamily="'Courier New', monospace" fontSize="16" fill="#ffffff" letterSpacing="2.5" fontWeight="700">{card.expiry}</text>

        {/* Name */}
        <text x="28" y="228" fontFamily="'Courier New', monospace" fontSize="13.5" fill="#ffffff" letterSpacing="2.5" fontWeight="700" fillOpacity="0.92">{card.holder}</text>

        {/* VISA */}
        <text x="310" y="232" fontFamily="Georgia, serif" fontSize="24" fontStyle="italic" fontWeight="900" fill="#ffffff" fillOpacity="0.95" letterSpacing="-1">VISA</text>

        {/* PRIMARY badge */}
        <rect x="290" y="16" width="80" height="22" rx="11" fill="#FA510F" fillOpacity="0.18" />
        <rect x="290" y="16" width="80" height="22" rx="11" fill="none" stroke="#FA510F" strokeWidth="0.8" strokeOpacity="0.5" />
        <text x="330" y="31" fontFamily="'Courier New', monospace" fontSize="8" fill="#FA510F" fillOpacity="0.9" letterSpacing="1.5" fontWeight="700" textAnchor="middle">PRIMARY</text>

        {/* Outer border */}
        <rect width="400" height="250" rx="18" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.07" />
        <rect x="1" y="1" width="398" height="248" rx="17" fill="none" stroke="#FA510F" strokeWidth="0.4" strokeOpacity="0.12" />

        {/* Inactive overlay */}
        {card.status === 'inactive' && (
          <>
            <rect width="400" height="250" rx="18" fill="rgba(0,0,0,0.42)" />
            <rect x="130" y="107" width="140" height="36" rx="18" fill="rgba(0,0,0,0.5)" />
            <text x="200" y="130" fontFamily="'Courier New', monospace" fontSize="11" fill="#ffffff" fontWeight="800" letterSpacing="3" textAnchor="middle">CARD LOCKED</text>
          </>
        )}
      </svg>
    </Box>
  );
}

// ─── Default card face (for Cards 2 & 3) ─────────────────────────────────────
function ChipIcon({ color = '#c9a84c' }: { color?: string }) {
  return (
    <svg width="46" height="36" viewBox="0 0 46 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="44" height="34" rx="5" fill={color} stroke={color === '#ffffff' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.15)'} strokeWidth="1" />
      <line x1="1" y1="12" x2="45" y2="12" stroke={color === '#ffffff' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.18)'} strokeWidth="1" />
      <line x1="1" y1="24" x2="45" y2="24" stroke={color === '#ffffff' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.18)'} strokeWidth="1" />
      <line x1="23" y1="1" x2="23" y2="35" stroke={color === '#ffffff' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.18)'} strokeWidth="1" />
      <rect x="14" y="12" width="18" height="12" rx="1" fill={color === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'} />
    </svg>
  );
}

function ContactlessIcon({ color = '#fff' }: { color?: string }) {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14C12 14 15 11.5 15 8.5C15 5.5 12 3 12 3" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M12 14C12 14 18 10 18 5" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M12 14C12 14 21 8.5 21 2" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <circle cx="12" cy="14" r="2" fill={color} />
    </svg>
  );
}

function VisaLogo({ color = '#fff' }: { color?: string }) {
  return (
    <svg width="52" height="18" viewBox="0 0 52 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="15" fontFamily="serif" fontWeight="900" fontSize="18" fontStyle="italic" fill={color} letterSpacing="-1">VISA</text>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="14" r="13" fill="#EB001B" />
      <circle cx="28" cy="14" r="13" fill="#F79E1B" />
      <path d="M22 5.28C24.6 7.1 26.3 10 26.3 14C26.3 18 24.6 20.9 22 22.72C19.4 20.9 17.7 18 17.7 14C17.7 10 19.4 7.1 22 5.28Z" fill="#FF5F00" />
    </svg>
  );
}

function CardPolygons({ shimmer }: { shimmer: string }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <polygon points="280,0 400,0 400,120 320,60" fill={shimmer} />
      <polygon points="340,0 400,0 400,70" fill={shimmer} opacity="0.6" />
      <polygon points="200,180 350,120 400,250 230,250" fill={shimmer} />
      <polygon points="0,200 120,160 80,250 0,250" fill={shimmer} opacity="0.8" />
      <polygon points="150,0 260,0 200,80" fill={shimmer} opacity="0.5" />
      <polygon points="300,180 400,140 400,250 280,250" fill={shimmer} opacity="0.4" />
    </svg>
  );
}

function DefaultCardFace({
  card,
  showNumber = false,
  size = 'full',
}: {
  card: typeof INITIAL_CARDS[0];
  showNumber?: boolean;
  size?: 'full' | 'small';
}) {
  const chipColor = card.accentColor;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingBottom: '62.5%',
        borderRadius: size === 'small' ? '12px' : '18px',
        overflow: 'hidden',
        background: card.bg,
        boxShadow: card.status === 'inactive'
          ? 'none'
          : size === 'small'
            ? '0 8px 24px rgba(0,0,0,0.2)'
            : '0 20px 60px rgba(0,0,0,0.28)',
        filter: card.status === 'inactive' ? 'grayscale(55%) brightness(0.75)' : 'none',
        transition: 'all 0.35s ease',
      }}
    >
      <CardPolygons shimmer={card.shimmer} />

      <Box sx={{
        position: 'absolute', inset: 0,
        p: size === 'small' ? '5%' : { xs: '5%', sm: '6%' },
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography sx={{
              fontSize: size === 'small' ? '0.5rem' : { xs: '0.55rem', sm: '0.6rem' },
              fontWeight: 700, color: card.textColor, opacity: 0.65,
              letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1, mb: 0.2,
            }}>
              CARD NUMBER
            </Typography>
            <Typography sx={{
              fontSize: size === 'small' ? '0.65rem' : { xs: '0.85rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 700, color: card.textColor,
              letterSpacing: '0.15em', fontFamily: 'monospace',
            }}>
              {showNumber
                ? card.number
                : card.number.split(' ').map((g, i) => i < 3 ? '••••' : g).join('  ')}
            </Typography>
          </Box>
          <ContactlessIcon color={card.textColor} />
        </Box>

        <Box>
          <ChipIcon color={chipColor} />
        </Box>

        <Box>
          <Typography sx={{
            fontSize: size === 'small' ? '0.45rem' : { xs: '0.5rem', sm: '0.55rem' },
            fontWeight: 700, opacity: 0.65,
            color: card.textColor, letterSpacing: '0.1em',
            textTransform: 'uppercase', mb: 0.3,
          }}>
            EXPIRATION DATE
          </Typography>
          <Typography sx={{
            fontSize: size === 'small' ? '0.7rem' : { xs: '0.9rem', sm: '1rem' },
            fontWeight: 700, color: card.textColor,
            letterSpacing: '0.05em', mb: 0.6,
          }}>
            {card.expiry}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Typography sx={{
              fontSize: size === 'small' ? '0.6rem' : { xs: '0.75rem', sm: '0.85rem' },
              fontWeight: 700, color: card.textColor,
              letterSpacing: '0.08em',
            }}>
              {card.holder}
            </Typography>
            {card.network === 'visa'
              ? <VisaLogo color={card.textColor} />
              : <MastercardLogo />
            }
          </Box>
        </Box>
      </Box>

      {card.status === 'inactive' && (
        <Box sx={{
          position: 'absolute', inset: 0,
          bgcolor: 'rgba(0,0,0,0.38)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Box sx={{
            px: 2.5, py: 1, borderRadius: '20px',
            bgcolor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.85rem', letterSpacing: 3 }}>
              CARD LOCKED
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

// ─── Unified CardFace dispatcher ──────────────────────────────────────────────
function CardFace({
  card,
  showNumber = false,
  size = 'full',
}: {
  card: typeof INITIAL_CARDS[0];
  showNumber?: boolean;
  size?: 'full' | 'small';
}) {
  if ((card as any).cardStyle === 'obsidian') {
    return <ObsidianEmberCard card={card} showNumber={showNumber} size={size} />;
  }
  return <DefaultCardFace card={card} showNumber={showNumber} size={size} />;
}

// ─── Spend bar ────────────────────────────────────────────────────────────────
function SpendBar({ spent, limit }: { spent: number; limit: number }) {
  const pct = Math.min((spent / limit) * 100, 100);
  const warn = pct > 80;
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6 }}>
        <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Spent this month</Typography>
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: warn ? '#DC2626' : '#374151' }}>
          ${spent.toLocaleString()} / ${limit.toLocaleString()}
        </Typography>
      </Box>
      <Box sx={{ height: 6, borderRadius: 99, bgcolor: '#F1F3F9', overflow: 'hidden' }}>
        <Box sx={{
          height: '100%', borderRadius: 99,
          width: `${pct}%`,
          background: warn
            ? 'linear-gradient(90deg,#DC2626,#EF4444)'
            : 'linear-gradient(90deg,#FA510F,#FF7849)',
          transition: 'width 1.1s cubic-bezier(0.34,1.56,0.64,1)',
        }} />
      </Box>
    </Box>
  );
}

// ─── Add Card Dialog ──────────────────────────────────────────────────────────
function AddCardDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', number: '', expiry: '', cvv: '', holder: '' });
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setForm({ name: '', number: '', expiry: '', cvv: '', holder: '' });
      onClose();
    }, 2000);
  };

  const inputSx = { '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '0.9rem' } };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      slotProps={{ paper: { sx: { borderRadius: '24px', m: { xs: 1.5, sm: 3 } } } }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Add New Card</Typography>
          <IconButton size="small" onClick={onClose} sx={{ bgcolor: '#F5F6FA' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {done ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{
              width: 68, height: 68, borderRadius: '50%', bgcolor: '#ECFDF5',
              display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2,
              animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              '@keyframes popIn': { '0%': { transform: 'scale(0)' }, '100%': { transform: 'scale(1)' } },
            }}>
              <CheckIcon sx={{ color: '#059669', fontSize: '2.2rem' }} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>Card Added!</Typography>
            <Typography sx={{ fontSize: '0.78rem', color: '#9CA3AF', mt: 0.5 }}>Your card is now linked to your account.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField size="small" fullWidth label="Card Nickname" placeholder="e.g. My Visa" sx={inputSx}
              value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <TextField size="small" fullWidth label="Card Number" placeholder="1234 5678 9012 3456" sx={inputSx}
              value={form.number} onChange={e => setForm(f => ({ ...f, number: e.target.value }))} />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <TextField size="small" fullWidth label="Expiry (MM/YY)" placeholder="03/29" sx={inputSx}
                value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} />
              <TextField size="small" fullWidth label="CVV" placeholder="•••" type="password" sx={inputSx}
                value={form.cvv} onChange={e => setForm(f => ({ ...f, cvv: e.target.value }))} />
            </Box>
            <TextField size="small" fullWidth label="Cardholder Name" placeholder="JOHN DOE" sx={inputSx}
              value={form.holder} onChange={e => setForm(f => ({ ...f, holder: e.target.value }))} />
            <Button fullWidth variant="contained" onClick={handleSubmit}
              sx={{
                background: 'linear-gradient(135deg,#FA510F,#D94309)',
                borderRadius: '12px', py: 1.4, fontWeight: 700, textTransform: 'none', mt: 0.5,
                boxShadow: '0 6px 20px rgba(250,81,15,0.35)',
                '&:hover': { background: 'linear-gradient(135deg,#D94309,#B33000)' },
              }}>
              Add Card
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}

// ─── Card Detail Dialog ───────────────────────────────────────────────────────
function CardDetailDialog({
  card, open, onClose, onToggleLock,
}: {
  card: typeof INITIAL_CARDS[0] | null;
  open: boolean;
  onClose: () => void;
  onToggleLock: (id: number) => void;
}) {
  const [showNum, setShowNum] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!card) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(card.number).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      slotProps={{ paper: { sx: { borderRadius: '24px', m: { xs: 1.5, sm: 3 } } } }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{card.name}</Typography>
          <IconButton size="small" onClick={onClose} sx={{ bgcolor: '#F5F6FA' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2.5 }}>
          <CardFace card={card} showNumber={showNum} size="full" />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2.5 }}>
          <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontSize: '0.65rem', color: '#9CA3AF', mb: 0.2 }}>Card Number</Typography>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
                {showNum ? card.number : card.number.split(' ').map((g, i) => i < 3 ? '••••' : g).join('  ')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <IconButton size="small" onClick={() => setShowNum(v => !v)} sx={{ color: '#9CA3AF' }}>
                {showNum ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
              </IconButton>
              <IconButton size="small" onClick={handleCopy} sx={{ color: copied ? '#059669' : '#9CA3AF' }}>
                {copied ? <CheckIcon fontSize="small" /> : <CopyIcon fontSize="small" />}
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#F8F9FA' }}>
              <Typography sx={{ fontSize: '0.65rem', color: '#9CA3AF', mb: 0.2 }}>Expiry Date</Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>{card.expiry}</Typography>
            </Box>
            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontSize: '0.65rem', color: '#9CA3AF', mb: 0.2 }}>CVV</Typography>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                  {showCVV ? card.cvv : '•••'}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setShowCVV(v => !v)} sx={{ color: '#9CA3AF' }}>
                {showCVV ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ p: 1.8, borderRadius: '12px', background: 'linear-gradient(135deg,#FFF4F0,#FEE8DF)' }}>
            <Typography sx={{ fontSize: '0.65rem', color: '#FA510F', mb: 0.3, fontWeight: 700 }}>Available Balance</Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#FA510F' }}>${card.balance.toLocaleString()}</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2.5 }}>
          <SpendBar spent={card.spent} limit={card.limit} />
        </Box>

        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', mb: 1.2 }}>Recent Transactions</Typography>
        <Box sx={{ mb: 2.5 }}>
          {card.transactions.map((tx, i) => (
            <Box key={i} sx={{
              display: 'flex', justifyContent: 'space-between', py: 1.1,
              borderBottom: i < card.transactions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
            }}>
              <Box>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F172A' }}>{tx.name}</Typography>
                <Typography sx={{ fontSize: '0.68rem', color: '#9CA3AF' }}>{tx.date}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: tx.amount > 0 ? '#059669' : '#0F172A' }}>
                {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Button fullWidth variant="contained"
            onClick={() => onToggleLock(card.id)}
            startIcon={card.status === 'active' ? <LockIcon /> : <UnlockIcon />}
            sx={{
              background: card.status === 'active'
                ? 'linear-gradient(135deg,#FA510F,#D94309)'
                : 'linear-gradient(135deg,#059669,#047857)',
              borderRadius: '12px', py: 1.2, fontWeight: 700, textTransform: 'none', fontSize: '0.82rem',
              boxShadow: card.status === 'active' ? '0 4px 14px rgba(250,81,15,0.3)' : '0 4px 14px rgba(5,150,105,0.3)',
              '&:hover': { opacity: 0.9 },
            }}>
            {card.status === 'active' ? 'Lock Card' : 'Unlock Card'}
          </Button>
          <Button fullWidth variant="outlined"
            sx={{
              borderColor: 'rgba(0,0,0,0.12)', color: '#374151',
              borderRadius: '12px', py: 1.2, fontWeight: 700, textTransform: 'none', fontSize: '0.82rem',
              '&:hover': { bgcolor: '#F8F9FA', borderColor: 'rgba(0,0,0,0.2)' },
            }}>
            Settings
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Cards() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [addOpen, setAddOpen] = useState(false);
  const [detailCard, setDetailCard] = useState<typeof INITIAL_CARDS[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive'>('all');

  const toggleLock = (id: number) => {
    setCards(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
    setDetailCard(prev => prev?.id === id
      ? { ...prev, status: prev.status === 'active' ? 'inactive' : 'active' }
      : prev
    );
  };

  const filtered = cards.filter(c =>
    activeTab === 'all' ? true :
    activeTab === 'active' ? c.status === 'active' : c.status === 'inactive'
  );

  return (
    <Box>
      {/* ── Top bar ── */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained" startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
          sx={{
            background: 'linear-gradient(135deg,#FA510F,#D94309)',
            borderRadius: '12px', py: 1.2, px: 2.5,
            textTransform: 'none', fontWeight: 700,
            boxShadow: '0 6px 20px rgba(250,81,15,0.35)',
            '&:hover': { background: 'linear-gradient(135deg,#D94309,#B33000)' },
          }}
        >
          Add New Card
        </Button>
      </Box>

      {/* ── Stats ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2, mb: 4 }}>
        {QUICK_STATS.map(s => (
          <Box key={s.label} sx={{
            p: { xs: 1.8, sm: 2.2 }, borderRadius: '16px', bgcolor: s.bg,
            position: 'relative', overflow: 'hidden',
            transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' },
          }}>
            <Box sx={{ position: 'absolute', top: -16, right: -16, width: 56, height: 56,
              borderRadius: '50%', bgcolor: s.color + '18' }} />
            <Typography sx={{ fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 600, mb: 0.3 }}>{s.label}</Typography>
            <Typography sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
              {s.value}
            </Typography>
            <Typography sx={{ fontSize: '0.67rem', color: s.color, fontWeight: 700, mt: 0.4 }}>{s.change}</Typography>
          </Box>
        ))}
      </Box>

      {/* ── Filter tabs ── */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {(['all', 'active', 'inactive'] as const).map(tab => (
          <Box key={tab} onClick={() => setActiveTab(tab)} sx={{
            px: { xs: 1.5, sm: 2 }, py: 0.8, borderRadius: '10px', cursor: 'pointer',
            fontWeight: 700, fontSize: '0.8rem', textTransform: 'capitalize',
            bgcolor: activeTab === tab ? '#FA510F' : '#F8F9FA',
            color: activeTab === tab ? '#fff' : '#6B7280',
            boxShadow: activeTab === tab ? '0 4px 12px rgba(250,81,15,0.3)' : 'none',
            transition: 'all 0.2s ease',
            userSelect: 'none',
          }}>
            {tab === 'all' ? `All (${cards.length})` :
             tab === 'active' ? `Active (${cards.filter(c => c.status === 'active').length})` :
             `Inactive (${cards.filter(c => c.status === 'inactive').length})`}
          </Box>
        ))}
      </Box>

      {/* ── Cards grid ── */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', xl: 'repeat(3,1fr)' },
        gap: 3, mb: 4,
      }}>
        {filtered.map(card => (
          <Box key={card.id} sx={{
            borderRadius: '20px', bgcolor: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.07)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 50px rgba(0,0,0,0.13)' },
          }}>
            <Box sx={{ p: 2.5, pb: 2 }}>
              <CardFace card={card} showNumber={false} />
            </Box>

            <Box sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Box>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>{card.name}</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                    {card.type} •••• {card.number.slice(-4)}
                  </Typography>
                </Box>
                <Box sx={{
                  px: 1.2, py: 0.4, borderRadius: '8px',
                  bgcolor: card.status === 'active' ? '#ECFDF5' : '#FEF2F2',
                  color: card.status === 'active' ? '#059669' : '#DC2626',
                  fontSize: '0.68rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 0.4,
                }}>
                  {card.status === 'active'
                    ? <><CheckIcon sx={{ fontSize: '0.72rem' }} />Active</>
                    : <><BlockIcon sx={{ fontSize: '0.72rem' }} />Locked</>
                  }
                </Box>
              </Box>

              <Box sx={{ mb: 2, p: 1.5, borderRadius: '12px',
                background: 'linear-gradient(135deg,#FFF4F0,#FEE8DF)' }}>
                <Typography sx={{ fontSize: '0.63rem', color: '#FA510F', fontWeight: 700, mb: 0.2 }}>
                  Available Balance
                </Typography>
                <Typography sx={{ fontSize: '1.35rem', fontWeight: 800, color: '#FA510F' }}>
                  ${card.balance.toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <SpendBar spent={card.spent} limit={card.limit} />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1 }}>
                {[
                  { label: 'Details', icon: <EyeIcon sx={{ fontSize: '1rem' }} />, color: '#FA510F', bg: '#FFF4F0', hbg: '#FFE8DC', action: () => { setDetailCard(card); setDetailOpen(true); } },
                  {
                    label: card.status === 'active' ? 'Lock' : 'Unlock',
                    icon: card.status === 'active' ? <LockIcon sx={{ fontSize: '1rem' }} /> : <UnlockIcon sx={{ fontSize: '1rem' }} />,
                    color: card.status === 'active' ? '#374151' : '#059669',
                    bg: card.status === 'active' ? '#F8F9FA' : '#ECFDF5',
                    hbg: card.status === 'active' ? '#EDEFF5' : '#D1FAE5',
                    action: () => toggleLock(card.id),
                  },
                  { label: 'Settings', icon: <SettingsIcon sx={{ fontSize: '1rem' }} />, color: '#374151', bg: '#F8F9FA', hbg: '#EDEFF5', action: () => {} },
                ].map(btn => (
                  <Box key={btn.label} onClick={btn.action} sx={{
                    py: 1, borderRadius: '10px', cursor: 'pointer',
                    bgcolor: btn.bg, color: btn.color,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4,
                    transition: 'all 0.18s ease',
                    '&:hover': { bgcolor: btn.hbg, transform: 'scale(1.04)' },
                  }}>
                    {btn.icon}
                    <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: btn.color }}>{btn.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}

        {/* Add card placeholder */}
        <Box onClick={() => setAddOpen(true)} sx={{
          borderRadius: '20px', border: '2px dashed rgba(250,81,15,0.3)',
          bgcolor: '#FFFBF9', minHeight: 300,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 1.5, cursor: 'pointer',
          transition: 'all 0.25s ease',
          '&:hover': { border: '2px dashed #FA510F', bgcolor: '#FFF4F0', transform: 'translateY(-5px)' },
        }}>
          <Box sx={{
            width: 54, height: 54, borderRadius: '16px',
            background: 'linear-gradient(135deg,#FA510F,#D94309)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(250,81,15,0.35)',
          }}>
            <AddIcon sx={{ color: '#fff', fontSize: '1.6rem' }} />
          </Box>
          <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: '#374151' }}>Add New Card</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF', textAlign: 'center', px: 3, lineHeight: 1.5 }}>
            Link a debit or credit card to your account
          </Typography>
        </Box>
      </Box>

      {/* ── Card Actions strip ── */}
      <Box sx={{ p: 3, borderRadius: '20px', bgcolor: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', mb: 2 }}>Card Actions</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2,1fr)', sm: 'repeat(4,1fr)' }, gap: 1.5 }}>
          {[
            { label: 'Send Money',  icon: SendIcon,       color: '#FA510F', bg: '#FFF4F0' },
            { label: 'Transfer',    icon: TransferIcon,   color: '#6C63FF', bg: '#F3F2FF' },
            { label: 'Top Up',      icon: NorthEastIcon,  color: '#059669', bg: '#ECFDF5' },
            { label: 'Withdraw',    icon: SouthWestIcon,  color: '#D97706', bg: '#FFFBEB' },
          ].map(a => (
            <Box key={a.label} sx={{
              p: 2, borderRadius: '14px', bgcolor: a.bg, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
              transition: 'all 0.2s',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 6px 20px ${a.color}22` },
            }}>
              <Box sx={{
                width: 44, height: 44, borderRadius: '12px', bgcolor: a.color + '20',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <a.icon sx={{ color: a.color, fontSize: '1.25rem' }} />
              </Box>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>{a.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Dialogs */}
      <AddCardDialog open={addOpen} onClose={() => setAddOpen(false)} />
      <CardDetailDialog
        card={detailCard} open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onToggleLock={toggleLock}
      />
    </Box>
  );
}