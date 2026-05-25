import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Close as CloseIcon,
  ArrowUpward as ArrowUpIcon,
  AccountBalance as BankIcon,
  Agriculture as AgricIcon,
  Apartment as RealEstateIcon,
  Diamond as PremiumIcon,
  WorkspacePremium as ExclusiveIcon,
  Stars as SupremeIcon,
  CheckCircleOutlined as CheckIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// ─── Data ─────────────────────────────────────────────────────────────────────

const growthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const growthValues = [23000,25500,24800,27200,29800,32100,30900,34600,36200,39500,41800,45050];

const allocationData = [
  { name: 'Equities',    value: 42, color: '#FA510F' },
  { name: 'Real Estate', value: 28, color: '#6C63FF' },
  { name: 'Agriculture', value: 18, color: '#10B981' },
  { name: 'Bonds',       value: 12, color: '#3B82F6' },
];

const plans = [
  {
    id: 'premium',
    name: 'Premium Plan',
    tagline: 'Your smart entry into wealth',
    type: 'Diversified Equity',
    icon: PremiumIcon,
    color: '#FA510F',
    gradient: 'linear-gradient(135deg, #FA510F 0%, #FF8C66 100%)',
    invested: 15000,
    currentValue: 18750,
    growth: 25,
    risk: 'Medium',
    duration: '2 years',
    minInvestment: 5000,
    features: [
      'Diversified equity portfolio',
      'Monthly performance reports',
      'Dedicated relationship manager',
      'Capital protection up to 80%',
    ],
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    trending: false,
  },
  {
    id: 'exclusive',
    name: 'Exclusive Plan',
    tagline: 'High growth for bold investors',
    type: 'Growth Fund',
    icon: ExclusiveIcon,
    color: '#6C63FF',
    gradient: 'linear-gradient(135deg, #6C63FF 0%, #A89CFF 100%)',
    invested: 30000,
    currentValue: 39900,
    growth: 33,
    risk: 'High',
    duration: '3 years',
    minInvestment: 15000,
    features: [
      'Tech & innovation sectors',
      'Weekly market intelligence',
      'Priority client support 24/7',
      'Quarterly portfolio rebalancing',
    ],
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80',
    trending: true,
  },
  {
    id: 'supreme',
    name: 'Supreme Plan',
    tagline: 'The pinnacle of private wealth',
    type: 'Private Equity',
    icon: SupremeIcon,
    color: '#D97706',
    gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    invested: 100000,
    currentValue: 142000,
    growth: 42,
    risk: 'Very High',
    duration: '5 years',
    minInvestment: 50000,
    features: [
      'Private equity & pre-IPO deals',
      'Bespoke portfolio construction',
      'VIP events & investor roundtables',
      'Full capital protection guarantee',
    ],
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    trending: false,
  },
  {
    id: 'realestate',
    name: 'Real Estate Plan',
    tagline: 'Tangible assets, solid returns',
    type: 'REIT & Property',
    icon: RealEstateIcon,
    color: '#0EA5E9',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
    invested: 50000,
    currentValue: 61500,
    growth: 23,
    risk: 'Medium',
    duration: '4 years',
    minInvestment: 20000,
    features: [
      'Commercial & residential REITs',
      'Rental income distributions',
      'Property development projects',
      'Annual valuation reports',
    ],
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    trending: false,
  },
  {
    id: 'agricultural',
    name: 'Agricultural Plan',
    tagline: 'Farm the future, harvest returns',
    type: 'Agri-Finance',
    icon: AgricIcon,
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    invested: 25000,
    currentValue: 30750,
    growth: 23,
    risk: 'Low',
    duration: '2.5 years',
    minInvestment: 10000,
    features: [
      'Farmland & commodity exposure',
      'ESG-compliant portfolio',
      'Food security sector focus',
      'Seasonal yield bonuses',
    ],
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    trending: false,
  },
];

// ─── Animated Counter ──────────────────────────────────────────────────────────

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;
    const duration = 1200;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  return (
    <>
      {prefix}
      {display.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </>
  );
}

// ─── Risk Badge ────────────────────────────────────────────────────────────────

function RiskBadge({ risk }: { risk: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Low:       { bg: '#ECFDF5', color: '#059669' },
    Medium:    { bg: '#FFF7ED', color: '#D97706' },
    High:      { bg: '#FEF2F2', color: '#DC2626' },
    'Very High':{ bg: '#FDF2F8', color: '#9333EA' },
  };
  const s = map[risk] ?? map['Medium'];
  return (
    <Box sx={{ px: 1.2, py: 0.4, borderRadius: '8px', bgcolor: s.bg, color: s.color,
               fontSize: '0.7rem', fontWeight: 700, display: 'inline-block' }}>
      {risk} Risk
    </Box>
  );
}

// ─── Chart.js: Area (Portfolio Growth) ────────────────────────────────────────

function GrowthChart() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const chartRef   = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();
    const ctx = canvasRef.current.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, 'rgba(250,81,15,0.22)');
    gradient.addColorStop(1, 'rgba(250,81,15,0)');

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: growthLabels,
        datasets: [{
          data: growthValues,
          borderColor: '#FA510F',
          borderWidth: 2.5,
          fill: true,
          backgroundColor: gradient,
          tension: 0.45,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#FA510F',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: 'rgba(255,255,255,0.55)',
            bodyColor: '#fff',
            bodyFont: { weight: 'bold', size: 14 },
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              label: (c) => ` $${(c.parsed.y as number).toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#9CA3AF', font: { size: 11 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 6 },
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            border: { display: false, dash: [4, 4] },
            ticks: {
              color: '#9CA3AF',
              font: { size: 11 },
              maxTicksLimit: 5,
              callback: (v) => `$${(Number(v) / 1000).toFixed(0)}k`,
            },
          },
        },
      },
    });

    const ro = new ResizeObserver(() => { chartRef.current?.resize(); });
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => { ro.disconnect(); chartRef.current?.destroy(); };
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ position: 'relative', width: '100%', height: 220 }}>
      <canvas ref={canvasRef} />
    </Box>
  );
}

// ─── Chart.js: Doughnut (Allocation) ──────────────────────────────────────────

function AllocationChart() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const chartRef   = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: allocationData.map((d) => d.name),
        datasets: [{
          data: allocationData.map((d) => d.value),
          backgroundColor: allocationData.map((d) => d.color),
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: 'rgba(255,255,255,0.55)',
            bodyColor: '#fff',
            bodyFont: { weight: 'bold' },
            padding: 10,
            cornerRadius: 10,
            callbacks: { label: (ctx) => ` ${ctx.parsed}%` },
          },
        },
      },
    });
    const ro = new ResizeObserver(() => { chartRef.current?.resize(); });
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => { ro.disconnect(); chartRef.current?.destroy(); };
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ position: 'relative', width: '100%', height: 170 }}>
      <canvas ref={canvasRef} />
    </Box>
  );
}

// ─── Plan Detail Dialog ────────────────────────────────────────────────────────

function PlanDialog({
  plan,
  open,
  onClose,
}: {
  plan: (typeof plans)[0] | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!plan) return null;
  const gain = plan.currentValue - plan.invested;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
          },
        },
      }}
    >
      {/* Hero image */}
      <Box sx={{ height: 160, position: 'relative', overflow: 'hidden' }}>
        <Box
          component="img"
          src={plan.coverImage}
          alt={plan.name}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.55))',
        }} />
        <Box sx={{ position: 'absolute', bottom: 16, left: 20, color: '#fff' }}>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, lineHeight: 1 }}>
            {plan.name}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', opacity: 0.85, mt: 0.3 }}>
            {plan.tagline}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: 'absolute', top: 12, right: 12,
            bgcolor: 'rgba(0,0,0,0.35)', color: '#fff',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        {/* Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5, mb: 3 }}>
          {[
            { label: 'Invested',      value: `$${plan.invested.toLocaleString()}`,    green: false },
            { label: 'Current Value', value: `$${plan.currentValue.toLocaleString()}`, green: false },
            { label: 'Total Gain',    value: `+$${gain.toLocaleString()}`,             green: true, sub: `+${plan.growth}%` },
          ].map((s) => (
            <Box key={s.label} sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#F8F9FA', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.65rem', color: '#9CA3AF', mb: 0.5, fontWeight: 600 }}>
                {s.label}
              </Typography>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: s.green ? '#059669' : '#0F172A' }}>
                {s.value}
              </Typography>
              {s.sub && (
                <Typography sx={{ fontSize: '0.65rem', color: '#059669', fontWeight: 600 }}>
                  {s.sub}
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        {/* Meta */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
          {[
            { label: 'Min. Investment', value: `$${plan.minInvestment.toLocaleString()}` },
            { label: 'Duration',        value: plan.duration },
          ].map((m) => (
            <Box key={m.label}>
              <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF', mb: 0.3 }}>{m.label}</Typography>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>{m.value}</Typography>
            </Box>
          ))}
          <Box>
            <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF', mb: 0.3 }}>Risk Level</Typography>
            <RiskBadge risk={plan.risk} />
          </Box>
        </Box>

        {/* Features */}
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.2, color: '#374151' }}>
          What's Included
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 3 }}>
          {plan.features.map((f) => (
            <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckIcon sx={{ fontSize: '1rem', color: plan.color }} />
              <Typography sx={{ fontSize: '0.85rem', color: '#374151' }}>{f}</Typography>
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            background: plan.gradient,
            borderRadius: '12px',
            py: 1.4,
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '0.95rem',
            boxShadow: `0 6px 20px ${plan.color}40`,
            '&:hover': { background: plan.gradient, boxShadow: `0 8px 28px ${plan.color}55` },
          }}
        >
          Invest Now
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// ─── Plan Card ─────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  onViewDetails,
}: {
  plan: (typeof plans)[0];
  onViewDetails: (p: (typeof plans)[0]) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const gain    = plan.currentValue - plan.invested;
  const gainPct = ((gain / plan.invested) * 100).toFixed(1);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onViewDetails(plan)}
      sx={{
        borderRadius: '20px',
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
        border: '1px solid',
        borderColor: hovered ? plan.color + '40' : 'rgba(0,0,0,0.07)',
        boxShadow: hovered ? `0 16px 48px ${plan.color}20` : '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Cover */}
      <Box sx={{ height: 140, position: 'relative', overflow: 'hidden' }}>
        <Box
          component="img"
          src={plan.coverImage}
          alt={plan.name}
          sx={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        <Box sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.48))',
        }} />
        {plan.trending && (
          <Box sx={{
            position: 'absolute', top: 12, right: 12,
            px: 1.2, py: 0.4, borderRadius: '20px',
            bgcolor: '#FA510F', color: '#fff',
            fontSize: '0.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 0.4,
          }}>
            <TrophyIcon sx={{ fontSize: '0.75rem' }} />
            POPULAR
          </Box>
        )}
        <Box sx={{
          position: 'absolute', bottom: 12, right: 12,
          px: 1.2, py: 0.5, borderRadius: '10px',
          bgcolor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          color: '#fff', fontSize: '0.8rem', fontWeight: 700,
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          +{gainPct}%
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          <Box>
            <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', mb: 0.2 }}>
              {plan.name}
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{plan.type}</Typography>
          </Box>
          <Box sx={{
            width: 38, height: 38, borderRadius: '10px', background: plan.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 12px ${plan.color}35`, flexShrink: 0,
          }}>
            <plan.icon sx={{ color: '#fff', fontSize: '1.1rem' }} />
          </Box>
        </Box>

        {/* Progress */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6 }}>
            <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Performance</Typography>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: plan.color }}>
              {plan.growth}%
            </Typography>
          </Box>
          <Box sx={{ height: 6, borderRadius: '99px', bgcolor: '#F1F3F9', overflow: 'hidden' }}>
            <Box sx={{
              height: '100%', width: `${plan.growth}%`, background: plan.gradient,
              borderRadius: '99px', transition: 'width 1s ease',
            }} />
          </Box>
        </Box>

        {/* Figures */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
          <Box sx={{ p: 1.2, borderRadius: '10px', bgcolor: '#F8F9FA' }}>
            <Typography sx={{ fontSize: '0.65rem', color: '#9CA3AF', mb: 0.3 }}>Invested</Typography>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>
              ${plan.invested.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ p: 1.2, borderRadius: '10px', bgcolor: '#F0FDF4' }}>
            <Typography sx={{ fontSize: '0.65rem', color: '#6EE7B7', mb: 0.3, fontWeight: 600 }}>
              Current Value
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669' }}>
              ${plan.currentValue.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <RiskBadge risk={plan.risk} />
          <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF', ml: 'auto' }}>
            {plan.duration}
          </Typography>
        </Box>
      </Box>

      {/* CTA strip */}
      <Box sx={{
        mx: 2.5, mb: 2.5, py: 1.2, borderRadius: '12px',
        background: hovered ? plan.gradient : '#F8F9FA',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.6,
        transition: 'all 0.3s ease',
      }}>
        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: hovered ? '#fff' : '#374151', transition: 'color 0.3s' }}>
          View Details
        </Typography>
        <TrendingUpIcon sx={{ fontSize: '0.9rem', color: hovered ? '#fff' : '#374151', transition: 'color 0.3s' }} />
      </Box>
    </Box>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Investments() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null);
  const [dialogOpen, setDialogOpen]     = useState(false);

  const totalInvested = plans.reduce((s, p) => s + p.invested, 0);
  const totalValue    = plans.reduce((s, p) => s + p.currentValue, 0);
  const totalGain     = totalValue - totalInvested;
  const avgReturn     = ((totalGain / totalInvested) * 100).toFixed(1);

  const ytd = (((growthValues[11] - growthValues[0]) / growthValues[0]) * 100).toFixed(1);

  return (
    <Box>
      {/* Action row */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: 'linear-gradient(135deg, #FA510F 0%, #D94309 100%)',
            borderRadius: '12px', py: 1.2, px: 2.5,
            textTransform: 'none', fontWeight: 700,
            boxShadow: '0 6px 20px rgba(250,81,15,0.35)',
            '&:hover': { background: 'linear-gradient(135deg, #D94309 0%, #B33000 100%)' },
          }}
        >
          New Investment
        </Button>
      </Box>

      {/* Summary cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2, mb: 4 }}>
        {[
          { label: 'Total Invested',  value: totalInvested,          prefix: '$',  suffix: '',  color: '#FA510F', bg: '#FFF4F0', icon: BankIcon,       sub: `${plans.length} active plans` },
          { label: 'Portfolio Value', value: totalValue,             prefix: '$',  suffix: '',  color: '#6C63FF', bg: '#F3F2FF', icon: TrendingUpIcon,  sub: 'Updated today' },
          { label: 'Total Gains',     value: totalGain,              prefix: '+$', suffix: '',  color: '#059669', bg: '#ECFDF5', icon: ArrowUpIcon,     sub: 'All time profit' },
          { label: 'Avg. Return',     value: parseFloat(avgReturn),  prefix: '',   suffix: '%', color: '#D97706', bg: '#FFFBEB', icon: TrophyIcon,      sub: 'Across all plans' },
        ].map((stat) => (
          <Box key={stat.label} sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: '16px', bgcolor: stat.bg, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: -10, right: -10, width: 60, height: 60, borderRadius: '50%', bgcolor: stat.color + '18' }} />
            <Box sx={{ width: 34, height: 34, borderRadius: '10px', bgcolor: stat.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
              <stat.icon sx={{ color: stat.color, fontSize: '1.1rem' }} />
            </Box>
            <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF', mb: 0.3, fontWeight: 600 }}>{stat.label}</Typography>
            <Typography sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' }, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
              <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.suffix === '%' ? 1 : 0} />
            </Typography>
            <Typography sx={{ fontSize: '0.68rem', color: '#9CA3AF', mt: 0.4 }}>{stat.sub}</Typography>
          </Box>
        ))}
      </Box>

      {/* Charts */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2.5, mb: 4 }}>
        {/* Growth */}
        <Box sx={{ p: 3, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', minWidth: 0, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
            <Box>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>Portfolio Growth</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF' }}>12-month performance</Typography>
            </Box>
            <Box sx={{ px: 1.5, py: 0.5, borderRadius: '8px', bgcolor: '#ECFDF5', color: '#059669', fontSize: '0.75rem', fontWeight: 700 }}>
              +{ytd}% YTD
            </Box>
          </Box>
          <GrowthChart />
        </Box>

        {/* Allocation */}
        <Box sx={{ p: 3, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', minWidth: 0, overflow: 'hidden' }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', mb: 0.5 }}>Allocation</Typography>
          <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mb: 2 }}>Asset distribution</Typography>
          <AllocationChart />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1.5 }}>
            {allocationData.map((item) => (
              <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: item.color, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: '0.78rem', color: '#6B7280' }}>{item.name}</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>{item.value}%</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Plans heading */}
      <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Your Investment Plans</Typography>
        <Box sx={{ px: 1.2, py: 0.3, borderRadius: '8px', bgcolor: '#F1F5F9', fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>
          {plans.length} plans
        </Box>
      </Box>

      {/* Plans grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }, gap: 2.5 }}>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onViewDetails={(p) => { setSelectedPlan(p); setDialogOpen(true); }}
          />
        ))}
      </Box>

      <PlanDialog plan={selectedPlan} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}