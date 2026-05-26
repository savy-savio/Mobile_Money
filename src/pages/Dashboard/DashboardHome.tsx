import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
//   Button,
  Avatar,
//   IconButton,
} from '@mui/material';
import {
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Send as SendIcon,
  Add as AddIcon,
  AccountBalanceWallet as WalletIcon,
  SavingsOutlined as SavingsIcon,
//   MoreHoriz as MoreIcon,
  NorthEast as NorthEastIcon,
  ShoppingBag as ShoppingIcon,
  Restaurant as FoodIcon,
  LocalGasStation as FuelIcon,
  Subscriptions as SubsIcon,
  ArrowForwardIos as ArrowRightIcon,
  RequestPage as RequestIcon,
} from '@mui/icons-material';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// ─── Data ─────────────────────────────────────────────────────────────────────

const balanceHistory = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [28000, 32000, 35000, 38000, 42000, 45000],
};

const expenseHistory = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [12000, 14000, 10000, 16000, 12000, 15000],
};

const recentTransactions = [
  {
    id: 1,
    name: 'Apple Store',
    category: 'Shopping',
    amount: -299,
    date: 'Today, 2:30 PM',
    icon: ShoppingIcon,
    color: '#FA510F',
    bg: '#FFF4F0',
    avatar: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&q=80',
  },
  {
    id: 2,
    name: 'Salary Deposit',
    category: 'Income',
    amount: 8500,
    date: 'Today, 9:00 AM',
    icon: ArrowDownIcon,
    color: '#059669',
    bg: '#ECFDF5',
    avatar: null,
  },
  {
    id: 3,
    name: 'Netflix',
    category: 'Subscriptions',
    amount: -15.99,
    date: 'Yesterday',
    icon: SubsIcon,
    color: '#DC2626',
    bg: '#FEF2F2',
    avatar: null,
  },
  {
    id: 4,
    name: 'Chipotle',
    category: 'Food & Drink',
    amount: -24.5,
    date: 'Yesterday',
    icon: FoodIcon,
    color: '#D97706',
    bg: '#FFFBEB',
    avatar: null,
  },
  {
    id: 5,
    name: 'Shell Gas Station',
    category: 'Transport',
    amount: -62.0,
    date: 'Dec 20',
    icon: FuelIcon,
    color: '#0EA5E9',
    bg: '#F0F9FF',
    avatar: null,
  },
];

const spendingCategories = [
  { name: 'Shopping',  pct: 38, amount: 1216, color: '#FA510F' },
  { name: 'Food',      pct: 27, amount:  864, color: '#D97706' },
  { name: 'Transport', pct: 20, amount:  640, color: '#0EA5E9' },
  { name: 'Others',    pct: 15, amount:  480, color: '#6C63FF' },
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
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / 1200, 1);
      setDisplay((1 - Math.pow(1 - p, 3)) * value);
      if (p < 1) requestAnimationFrame(step);
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

// ─── Balance Area Chart ────────────────────────────────────────────────────────

function BalanceChart() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const chartRef   = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();
    const ctx = canvasRef.current.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 0, 260);
    grad.addColorStop(0,   'rgba(250,81,15,0.2)');
    grad.addColorStop(1,   'rgba(250,81,15,0)');

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: balanceHistory.labels,
        datasets: [{
          data: balanceHistory.values,
          borderColor: '#FA510F',
          borderWidth: 2.5,
          fill: true,
          backgroundColor: grad,
          tension: 0.45,
          pointRadius: 0,
          pointHoverRadius: 6,
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
            titleColor: 'rgba(255,255,255,0.5)',
            bodyColor: '#fff',
            bodyFont: { weight: 'bold', size: 14 },
            padding: 12,
            cornerRadius: 10,
            callbacks: { label: (c) => ` $${(c.parsed.y as number).toLocaleString()}` },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#9CA3AF', font: { size: 11 } },
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.04)' },
            border: { display: false },
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
    const ro = new ResizeObserver(() => chartRef.current?.resize());
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => { ro.disconnect(); chartRef.current?.destroy(); };
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ position: 'relative', width: '100%', height: 240 }}>
      <canvas ref={canvasRef} />
    </Box>
  );
}

// ─── Expenses Bar Chart ────────────────────────────────────────────────────────

function ExpensesChart() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const chartRef   = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: expenseHistory.labels,
        datasets: [{
          data: expenseHistory.values,
          backgroundColor: expenseHistory.values.map((_, i) =>
            i === expenseHistory.values.length - 1 ? '#FA510F' : 'rgba(250,81,15,0.15)'
          ),
          borderRadius: 8,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: 'rgba(255,255,255,0.5)',
            bodyColor: '#fff',
            bodyFont: { weight: 'bold', size: 13 },
            padding: 10,
            cornerRadius: 10,
            callbacks: { label: (c) => ` $${(c.parsed.y as number).toLocaleString()}` },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#9CA3AF', font: { size: 11 } },
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.04)' },
            border: { display: false },
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
    const ro = new ResizeObserver(() => chartRef.current?.resize());
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => { ro.disconnect(); chartRef.current?.destroy(); };
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ position: 'relative', width: '100%', height: 180 }}>
      <canvas ref={canvasRef} />
    </Box>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const DashboardHome = () => {
  const stats = [
    {
      label: 'Total Balance',
      value: 45000,
      prefix: '$',
      change: '+2.5%',
      positive: true,
      gradient: 'linear-gradient(135deg, #FA510F 0%, #D94309 100%)',
      shadow: '0 8px 32px rgba(250,81,15,0.35)',
      textColor: '#fff',
      labelColor: 'rgba(255,255,255,0.8)',
      changeColor: 'rgba(255,255,255,0.9)',
      icon: WalletIcon,
      iconBg: 'rgba(255,255,255,0.2)',
      iconColor: '#fff',
    },
    {
      label: 'Monthly Income',
      value: 8500,
      prefix: '$',
      change: '+12%',
      positive: true,
      gradient: null,
      bg: '#FFFFFF',
      textColor: '#0F172A',
      labelColor: '#9CA3AF',
      changeColor: '#059669',
      icon: ArrowDownIcon,
      iconBg: '#ECFDF5',
      iconColor: '#059669',
    },
    {
      label: 'Monthly Expenses',
      value: 3200,
      prefix: '$',
      change: '-5%',
      positive: false,
      gradient: null,
      bg: '#FFFFFF',
      textColor: '#0F172A',
      labelColor: '#9CA3AF',
      changeColor: '#DC2626',
      icon: ArrowUpIcon,
      iconBg: '#FEF2F2',
      iconColor: '#DC2626',
    },
    {
      label: 'Total Savings',
      value: 5300,
      prefix: '$',
      change: 'Goal: $10k',
      positive: true,
      gradient: null,
      bg: '#FFFFFF',
      textColor: '#0F172A',
      labelColor: '#9CA3AF',
      changeColor: '#0EA5E9',
      icon: SavingsIcon,
      iconBg: '#F0F9FF',
      iconColor: '#0EA5E9',
    },
  ];

  return (
    <Box>
      {/* ── Welcome ── */}
      <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80"
            sx={{ width: 48, height: 48, border: '2px solid #FA510F', boxShadow: '0 0 0 3px rgba(250,81,15,0.15)' }}
          />
          <Box>
            <Typography sx={{ fontSize: '0.78rem', color: '#9CA3AF', mb: 0.1 }}>Good morning 👋</Typography>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              Welcome back, John
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            px: 2, py: 1, borderRadius: '12px',
            background: 'linear-gradient(135deg, #FA510F 0%, #D94309 100%)',
            color: '#fff', fontSize: '0.8rem', fontWeight: 700,
            boxShadow: '0 4px 14px rgba(250,81,15,0.3)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 0.8,
          }}
        >
          <NorthEastIcon sx={{ fontSize: '0.9rem' }} />
          Dec 2024
        </Box>
      </Box>

      {/* ── Stat Cards ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2, mb: 3.5 }}>
        {stats.map((s) => (
          <Box
            key={s.label}
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: '18px',
              background: s.gradient || s.bg,
              boxShadow: s.shadow || '0 2px 12px rgba(0,0,0,0.06)',
              border: s.gradient ? 'none' : '1px solid rgba(0,0,0,0.06)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: s.shadow
                  ? '0 14px 40px rgba(250,81,15,0.4)'
                  : '0 8px 24px rgba(0,0,0,0.1)',
              },
            }}
          >
            {/* decorative circle */}
            <Box sx={{
              position: 'absolute', top: -20, right: -20,
              width: 80, height: 80, borderRadius: '50%',
              background: s.gradient ? 'rgba(255,255,255,0.12)' : (s.iconBg + '80'),
            }} />
            <Box sx={{
              width: 36, height: 36, borderRadius: '10px',
              bgcolor: s.iconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mb: 1.5,
            }}>
              <s.icon sx={{ color: s.iconColor, fontSize: '1.1rem' }} />
            </Box>
            <Typography sx={{ fontSize: '0.68rem', color: s.labelColor, fontWeight: 600, mb: 0.3 }}>
              {s.label}
            </Typography>
            <Typography sx={{ fontSize: { xs: '1.1rem', sm: '1.35rem' }, fontWeight: 800, color: s.textColor, lineHeight: 1.1 }}>
              <AnimatedNumber value={s.value} prefix={s.prefix} />
            </Typography>
            <Typography sx={{ fontSize: '0.68rem', color: s.changeColor, mt: 0.5, fontWeight: 600 }}>
              {s.change}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── Main 2-col section ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 340px' }, gap: 2.5, mb: 2.5 }}>

        {/* Balance chart card */}
        <Box sx={{ p: 3, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
            <Box>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>Balance Overview</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mt: 0.3 }}>6-month trend</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['1M','3M','6M'].map((t, i) => (
                <Box key={t} sx={{
                  px: 1.2, py: 0.4, borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700,
                  cursor: 'pointer',
                  bgcolor: i === 2 ? '#FA510F' : '#F8F9FA',
                  color: i === 2 ? '#fff' : '#9CA3AF',
                }}>
                  {t}
                </Box>
              ))}
            </Box>
          </Box>
          <BalanceChart />
        </Box>

        {/* Right col: Quick actions + spending */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

          {/* Quick Actions */}
          <Box sx={{ p: 2.5, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', mb: 2 }}>Quick Actions</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {[
                { label: 'Send Money',     icon: SendIcon,    gradient: 'linear-gradient(135deg,#FA510F,#D94309)', shadow: '0 4px 14px rgba(250,81,15,0.3)', text: '#fff' },
                { label: 'Add Card',       icon: AddIcon,     gradient: null, border: '1.5px solid rgba(250,81,15,0.3)', bg: '#FFF4F0', text: '#FA510F' },
                { label: 'Request Money',  icon: RequestIcon, gradient: null, border: '1.5px solid rgba(0,0,0,0.08)', bg: '#F8F9FA', text: '#374151' },
              ].map((action) => (
                <Box
                  key={action.label}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5,
                    py: 1.3, px: 1.8, borderRadius: '12px',
                    background: action.gradient || action.bg,
                    border: action.border || 'none',
                    boxShadow: action.shadow || 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { transform: 'translateY(-1px)', opacity: 0.92 },
                  }}
                >
                  <action.icon sx={{ color: action.text, fontSize: '1.1rem' }} />
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: action.text }}>
                    {action.label}
                  </Typography>
                  <ArrowRightIcon sx={{ fontSize: '0.75rem', color: action.text, ml: 'auto', opacity: 0.7 }} />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Spending breakdown */}
          <Box sx={{ p: 2.5, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>Spending</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: '#FA510F', fontWeight: 700, cursor: 'pointer' }}>Dec 2024</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {spendingCategories.map((cat) => (
                <Box key={cat.name}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography sx={{ fontSize: '0.78rem', color: '#374151', fontWeight: 600 }}>{cat.name}</Typography>
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>${cat.amount.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ height: 6, borderRadius: '99px', bgcolor: '#F1F3F9', overflow: 'hidden' }}>
                    <Box sx={{
                      height: '100%',
                      width: `${cat.pct}%`,
                      bgcolor: cat.color,
                      borderRadius: '99px',
                      transition: 'width 1s ease',
                    }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Bottom row: Expenses chart + Transactions ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 2.5 }}>

        {/* Monthly Expenses bar chart */}
        <Box sx={{ p: 3, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
            <Box>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>Monthly Expenses</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mt: 0.3 }}>Spending per month</Typography>
            </Box>
            <Box sx={{ px: 1.5, py: 0.5, borderRadius: '8px', bgcolor: '#FFF4F0', color: '#FA510F', fontSize: '0.72rem', fontWeight: 700 }}>
              $3,200 this month
            </Box>
          </Box>
          <ExpensesChart />
        </Box>

        {/* Recent Transactions */}
        <Box sx={{ p: 3, borderRadius: '20px', bgcolor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
            <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>Recent Transactions</Typography>
            <Typography sx={{ fontSize: '0.78rem', color: '#FA510F', fontWeight: 700, cursor: 'pointer' }}>See all</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentTransactions.map((tx, i) => (
              <Box
                key={tx.id}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  py: 1.4,
                  borderBottom: i < recentTransactions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  transition: 'background 0.15s',
                  borderRadius: '10px',
                  px: 0.5,
                  mx: -0.5,
                  '&:hover': { bgcolor: '#F8F9FA' },
                  cursor: 'pointer',
                }}
              >
                {/* Icon */}
                <Box sx={{
                  width: 40, height: 40, borderRadius: '12px',
                  bgcolor: tx.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <tx.icon sx={{ color: tx.color, fontSize: '1.1rem' }} />
                </Box>
                {/* Info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {tx.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{tx.date}</Typography>
                </Box>
                {/* Amount */}
                <Typography sx={{
                  fontSize: '0.9rem', fontWeight: 800, flexShrink: 0,
                  color: tx.amount > 0 ? '#059669' : '#0F172A',
                }}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHome;