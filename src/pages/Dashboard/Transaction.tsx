/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
//   MenuItem,
  IconButton,
  Dialog,
  InputAdornment,
} from '@mui/material';
import {
  ArrowDownward as IncomeIcon,
  ArrowUpward as ExpenseIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  HourglassEmpty as PendingIcon,
  CreditCard as CardIcon,
  FilterList as FilterIcon,
  Receipt as ReceiptIcon,
  ShoppingBag as ShoppingIcon,
  LocalCafe as CafeIcon,
  FitnessCenter as GymIcon,
  LocalGasStation as GasIcon,
  Restaurant as RestaurantIcon,
  SwapHoriz as TransferIcon,
  Subscriptions as SubsIcon,
  AccountBalanceWallet as WalletIcon,
  Bolt as BoltIcon,
  MedicalServices as MedIcon,
  Flight as TravelIcon,
  Home as RentIcon,
  ArrowForwardIos as ChevronIcon,
} from '@mui/icons-material';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// ─── Types ────────────────────────────────────────────────────────────────────
type TxStatus = 'completed' | 'pending' | 'failed';
type TxType   = 'income' | 'expense';

interface Transaction {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  status: TxStatus;
  type: TxType;
  card: string;
  note?: string;
  Icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ALL_TRANSACTIONS: Transaction[] = [
  { id:  1, name: 'Salary Deposit',      category: 'Income',         amount:  8500.00, date: '2024-12-23', status: 'completed', type: 'income',  card: 'Primary ••4210', Icon: WalletIcon,    iconColor: '#059669', iconBg: '#ECFDF5', note: 'Monthly salary - December' },
  { id:  2, name: 'Netflix',             category: 'Entertainment',  amount:   -15.99, date: '2024-12-22', status: 'completed', type: 'expense', card: 'Primary ••4210', Icon: SubsIcon,      iconColor: '#DC2626', iconBg: '#FEF2F2', note: 'Monthly subscription' },
  { id:  3, name: 'Apple Store',         category: 'Shopping',       amount:  -299.00, date: '2024-12-22', status: 'completed', type: 'expense', card: 'Primary ••4210', Icon: ShoppingIcon,  iconColor: '#FA510F', iconBg: '#FFF4F0' },
  { id:  4, name: 'Starbucks',           category: 'Food & Drink',   amount:    -6.50, date: '2024-12-21', status: 'completed', type: 'expense', card: 'Savings ••0986', Icon: CafeIcon,      iconColor: '#92400E', iconBg: '#FEF3C7' },
  { id:  5, name: 'Freelance Payment',   category: 'Income',         amount:  2200.00, date: '2024-12-20', status: 'completed', type: 'income',  card: 'Primary ••4210', Icon: WalletIcon,    iconColor: '#059669', iconBg: '#ECFDF5', note: 'Web design project' },
  { id:  6, name: 'Gym Membership',      category: 'Health',         amount:   -50.00, date: '2024-12-19', status: 'completed', type: 'expense', card: 'Savings ••0986', Icon: GymIcon,       iconColor: '#7C3AED', iconBg: '#EDE9FE' },
  { id:  7, name: 'Shell Gas Station',   category: 'Transport',      amount:   -62.00, date: '2024-12-18', status: 'completed', type: 'expense', card: 'Travel ••2023',  Icon: GasIcon,       iconColor: '#0EA5E9', iconBg: '#F0F9FF' },
  { id:  8, name: 'Amazon',             category: 'Shopping',       amount:   -89.99, date: '2024-12-17', status: 'pending',   type: 'expense', card: 'Primary ••4210', Icon: ShoppingIcon,  iconColor: '#FA510F', iconBg: '#FFF4F0' },
  { id:  9, name: 'Chipotle',           category: 'Food & Drink',   amount:   -24.50, date: '2024-12-16', status: 'completed', type: 'expense', card: 'Travel ••2023',  Icon: RestaurantIcon,iconColor: '#D97706', iconBg: '#FFFBEB' },
  { id: 10, name: 'Transfer to Savings', category: 'Transfer',       amount:  -500.00, date: '2024-12-15', status: 'completed', type: 'expense', card: 'Primary ••4210', Icon: TransferIcon,  iconColor: '#6C63FF', iconBg: '#F3F2FF' },
  { id: 11, name: 'Electricity Bill',   category: 'Utilities',      amount:   -95.00, date: '2024-12-14', status: 'completed', type: 'expense', card: 'Savings ••0986', Icon: BoltIcon,      iconColor: '#D97706', iconBg: '#FFFBEB' },
  { id: 12, name: 'Doctor Visit',       category: 'Health',         amount:  -120.00, date: '2024-12-13', status: 'failed',    type: 'expense', card: 'Primary ••4210', Icon: MedIcon,       iconColor: '#DC2626', iconBg: '#FEF2F2', note: 'Payment declined' },
  { id: 13, name: 'Emirates Air',       category: 'Travel',         amount: -1200.00, date: '2024-12-10', status: 'completed', type: 'expense', card: 'Travel ••2023',  Icon: TravelIcon,    iconColor: '#0EA5E9', iconBg: '#F0F9FF', note: 'Round trip Lagos-Dubai' },
  { id: 14, name: 'Rent Payment',       category: 'Housing',        amount:  -850.00, date: '2024-12-05', status: 'completed', type: 'expense', card: 'Savings ••0986', Icon: RentIcon,      iconColor: '#374151', iconBg: '#F9FAFB' },
  { id: 15, name: 'Dividend Income',    category: 'Income',         amount:   340.00, date: '2024-12-03', status: 'completed', type: 'income',  card: 'Savings ••0986', Icon: WalletIcon,    iconColor: '#059669', iconBg: '#ECFDF5', note: 'Q4 dividend payout' },
];

const CATEGORIES = ['All', 'Income', 'Shopping', 'Food & Drink', 'Health', 'Transport', 'Entertainment', 'Transfer', 'Utilities', 'Travel', 'Housing'];

// ─── Animated number ──────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = '$' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number | null>(null);
  useEffect(() => {
    ref.current = null;
    const step = (ts: number) => {
      if (!ref.current) ref.current = ts;
      const p = Math.min((ts - ref.current) / 1100, 1);
      setDisplay((1 - Math.pow(1 - p, 3)) * value);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <>{prefix}{display.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>;
}

// ─── Donut chart ──────────────────────────────────────────────────────────────
function SpendingDonut({ data }: { data: { label: string; value: number; color: string }[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: data.map(d => d.label),
        datasets: [{ data: data.map(d => d.value), backgroundColor: data.map(d => d.color), borderWidth: 0, hoverOffset: 8 }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A', titleColor: 'rgba(255,255,255,0.5)',
            bodyColor: '#fff', bodyFont: { weight: 'bold', size: 13 },
            padding: 10, cornerRadius: 10,
            callbacks: { label: c => ` $${(c.parsed as number).toLocaleString()}` },
          },
        },
      },
    });
    const ro = new ResizeObserver(() => chartRef.current?.resize());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => { ro.disconnect(); chartRef.current?.destroy(); };
  }, [data]);

  return (
    <Box ref={wrapRef} sx={{ position: 'relative', width: '100%', height: { xs: 180, sm: 160 } }}>
      <canvas ref={canvasRef} />
    </Box>
  );
}

// ─── Bar chart (monthly) ──────────────────────────────────────────────────────
function MonthlyBar() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);

  const labels = ['Jul','Aug','Sep','Oct','Nov','Dec'];
  const income  = [6200, 7100, 6800, 8200, 7500, 11040];
  const expense = [3800, 4200, 3600, 5100, 4400, 3313];

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Income',  data: income,  backgroundColor: 'rgba(5,150,105,0.85)',  borderRadius: 6, borderSkipped: false },
          { label: 'Expense', data: expense, backgroundColor: 'rgba(250,81,15,0.85)',  borderRadius: 6, borderSkipped: false },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        layout: { padding: { left: 0, right: 0, top: 4, bottom: 0 } },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A', titleColor: 'rgba(255,255,255,0.5)',
            bodyColor: '#fff', bodyFont: { weight: 'bold' },
            padding: 10, cornerRadius: 10,
            callbacks: { label: c => ` $${(c.parsed.y as number).toLocaleString()}` },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: '#9CA3AF',
              font: { size: 10 },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6,
            },
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.04)' },
            border: { display: false },
            ticks: {
              color: '#9CA3AF',
              font: { size: 10 },
              maxTicksLimit: 4,
              callback: v => `$${(Number(v)/1000).toFixed(0)}k`,
            },
          },
        },
      },
    });
    const ro = new ResizeObserver(() => chartRef.current?.resize());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => { ro.disconnect(); chartRef.current?.destroy(); };
  }, []);

  return (
    <Box ref={wrapRef} sx={{ position: 'relative', width: '100%', height: 180 }}>
      <canvas ref={canvasRef} />
    </Box>
  );
}

// ─── Transaction Detail Dialog ────────────────────────────────────────────────
function TxDetail({ tx, open, onClose }: { tx: Transaction | null; open: boolean; onClose: () => void }) {
  if (!tx) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      slotProps={{ paper: { sx: { borderRadius: '24px', m: { xs: 1.5, sm: 3 } } } }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A' }}>Transaction Details</Typography>
          <IconButton size="small" onClick={onClose} sx={{ bgcolor: '#F5F6FA' }}><CloseIcon fontSize="small" /></IconButton>
        </Box>

        {/* Icon + name */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Box sx={{ width: 64, height: 64, borderRadius: '18px', bgcolor: tx.iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5,
            boxShadow: `0 8px 24px ${tx.iconColor}25` }}>
            <tx.Icon sx={{ color: tx.iconColor, fontSize: '1.8rem' }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>{tx.name}</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF', mt: 0.3 }}>{tx.category}</Typography>
          <Typography sx={{ fontSize: '1.9rem', fontWeight: 900, mt: 1.5,
            color: tx.type === 'income' ? '#059669' : '#0F172A' }}>
            {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Typography>
        </Box>

        {/* Details grid */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          {[
            { label: 'Date', value: new Date(tx.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
            { label: 'Card', value: tx.card },
            { label: 'Status', value: tx.status.charAt(0).toUpperCase() + tx.status.slice(1) },
            ...(tx.note ? [{ label: 'Note', value: tx.note }] : []),
          ].map(row => (
            <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1,
              borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <Typography sx={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 600 }}>{row.label}</Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#0F172A', fontWeight: 700, textAlign: 'right', maxWidth: '60%' }}>
                {row.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Status badge */}
        <Box sx={{
          py: 1, borderRadius: '12px', textAlign: 'center',
          bgcolor: tx.status === 'completed' ? '#ECFDF5' : tx.status === 'pending' ? '#FFFBEB' : '#FEF2F2',
          color: tx.status === 'completed' ? '#059669' : tx.status === 'pending' ? '#D97706' : '#DC2626',
          fontWeight: 700, fontSize: '0.85rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8,
        }}>
          {tx.status === 'completed' ? <CheckIcon sx={{ fontSize: '1rem' }} />
            : tx.status === 'pending' ? <PendingIcon sx={{ fontSize: '1rem' }} />
            : <CloseIcon sx={{ fontSize: '1rem' }} />}
          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
        </Box>
      </Box>
    </Dialog>
  );
}

// ─── Status pill ──────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: TxStatus }) {
  const map = {
    completed: { bg: '#ECFDF5', color: '#059669', label: 'Completed' },
    pending:   { bg: '#FFFBEB', color: '#D97706', label: 'Pending' },
    failed:    { bg: '#FEF2F2', color: '#DC2626', label: 'Failed' },
  };
  const s = map[status];
  return (
    <Box sx={{ px: 1.2, py: 0.4, borderRadius: '8px', bgcolor: s.bg, color: s.color,
      fontSize: '0.68rem', fontWeight: 700, display: 'inline-block', whiteSpace: 'nowrap' }}>
      {s.label}
    </Box>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Transactions() {
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('all');
  const [categoryFilter, setCat]  = useState('All');
  const [typeFilter, setType]     = useState('all');
  const [selectedTx, setSelected] = useState<Transaction | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => ALL_TRANSACTIONS.filter(tx => {
    if (search && !tx.name.toLowerCase().includes(search.toLowerCase()) &&
        !tx.category.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && tx.category !== categoryFilter) return false;
    if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
    return true;
  }), [search, statusFilter, categoryFilter, typeFilter]);

  const totalIncome  = ALL_TRANSACTIONS.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = Math.abs(ALL_TRANSACTIONS.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
  const pending      = ALL_TRANSACTIONS.filter(t => t.status === 'pending').length;
  const net          = totalIncome - totalExpense;

  // Spending by category (for donut)
  const categoryTotals = useMemo(() => {
    const map: Record<string, number> = {};
    ALL_TRANSACTIONS.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + Math.abs(t.amount);
    });
    const colors = ['#FA510F','#D97706','#059669','#0EA5E9','#6C63FF','#DC2626','#374151','#10B981'];
    return Object.entries(map).map(([label, value], i) => ({ label, value, color: colors[i % colors.length] }))
      .sort((a, b) => b.value - a.value).slice(0, 6);
  }, []);

  const handleExport = () => {
    const rows = ['Name,Category,Amount,Date,Status',
      ...filtered.map(t => `${t.name},${t.category},${t.amount},${t.date},${t.status}`)];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href = url; a.download = 'transactions.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      {/* ── Summary cards ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 1.5, sm: 2 }, mb: 3.5 }}>
        {[
          { label: 'Total Income',   value: totalIncome,  Icon: IncomeIcon,  color: '#059669', bg: '#ECFDF5', prefix: '+$' },
          { label: 'Total Expenses', value: totalExpense, Icon: ExpenseIcon, color: '#FA510F', bg: '#FFF4F0', prefix: '-$' },
          { label: 'Net Balance',    value: net,          Icon: CardIcon,    color: '#6C63FF', bg: '#F3F2FF', prefix: '$' },
          { label: 'Pending',        value: pending,      Icon: PendingIcon, color: '#D97706', bg: '#FFFBEB', prefix: '', isCount: true },
        ].map(s => (
          <Box key={s.label} sx={{
            p: { xs: 1.5, sm: 2.5 }, borderRadius: '16px', bgcolor: s.bg,
            position: 'relative', overflow: 'hidden', minWidth: 0,
            transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' },
          }}>
            <Box sx={{ position: 'absolute', top: -16, right: -16, width: 60, height: 60,
              borderRadius: '50%', bgcolor: s.color + '1a' }} />
            <Box sx={{ width: { xs: 28, sm: 36 }, height: { xs: 28, sm: 36 }, borderRadius: '10px', bgcolor: s.color + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <s.Icon sx={{ color: s.color, fontSize: { xs: '0.9rem', sm: '1.1rem' } }} />
            </Box>
            <Typography sx={{ fontSize: { xs: '0.6rem', sm: '0.68rem' }, color: '#9CA3AF', fontWeight: 600, mb: 0.3,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</Typography>
            <Typography sx={{ fontSize: { xs: '0.88rem', sm: '1.15rem' }, fontWeight: 800, color: '#0F172A', lineHeight: 1.1,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {s.isCount ? `${s.value} pending` : <AnimatedNumber value={s.value as number} prefix={s.prefix} />}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── Charts row ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, mb: 3.5 }}>
        {/* Monthly bar */}
        <Box sx={{ p: { xs: 2, sm: 3 }, borderRadius: '20px', bgcolor: '#fff',
          border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', minWidth: 0, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>Monthly Overview</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mt: 0.3 }}>Income vs Expenses</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {[{ color: '#059669', label: 'Income' }, { color: '#FA510F', label: 'Expense' }].map(l => (
                <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: l.color }} />
                  <Typography sx={{ fontSize: '0.68rem', color: '#6B7280' }}>{l.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <MonthlyBar />
        </Box>

        {/* Spending donut */}
        <Box sx={{ p: { xs: 2, sm: 3 }, borderRadius: '20px', bgcolor: '#fff',
          border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', minWidth: 0, overflow: 'hidden' }}>
          <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', mb: 0.5 }}>Spending Breakdown</Typography>
          <Typography sx={{ fontSize: '0.72rem', color: '#9CA3AF', mb: 2 }}>By category this month</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, alignItems: 'center' }}>
            <SpendingDonut data={categoryTotals} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.9 }}>
              {categoryTotals.map(c => (
                <Box key={c.label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, minWidth: 0 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: c.color, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '0.72rem', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.label}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#0F172A', flexShrink: 0 }}>${c.value.toFixed(0)}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Filter bar ── */}
      <Box sx={{ p: 2.5, borderRadius: '18px', bgcolor: '#fff',
        border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', mb: 2.5 }}>
        {/* Top row: search + actions */}
        <Box sx={{ display: 'flex', gap: 1, mb: showFilters ? 2 : 0, flexWrap: 'nowrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search…"
            size="small"
            value={search}
            onChange={e => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#9CA3AF', fontSize: '1rem' }} /></InputAdornment>,
                sx: { borderRadius: '12px', fontSize: '0.85rem', bgcolor: '#F8F9FA' },
              },
            }}
            sx={{ flex: 1, minWidth: 0, '& fieldset': { border: 'none' } }}
          />
          <IconButton
            onClick={() => setShowFilters(v => !v)}
            sx={{
              borderRadius: '12px', flexShrink: 0,
              bgcolor: showFilters ? '#FA510F' : '#F8F9FA',
              color: showFilters ? '#fff' : '#374151',
              '&:hover': { bgcolor: showFilters ? '#D94309' : '#EDEFF5' },
            }}
          >
            <FilterIcon fontSize="small" />
          </IconButton>
          <Button
            variant="contained" onClick={handleExport}
            startIcon={<DownloadIcon sx={{ fontSize: '1rem !important' }} />}
            sx={{
              background: 'linear-gradient(135deg,#FA510F,#D94309)',
              borderRadius: '12px', textTransform: 'none', fontWeight: 700,
              fontSize: '0.78rem', px: { xs: 1.2, sm: 2 },
              minWidth: 0, flexShrink: 0,
              boxShadow: '0 4px 14px rgba(250,81,15,0.3)',
              '&:hover': { background: 'linear-gradient(135deg,#D94309,#B33000)' },
              '& .MuiButton-startIcon': { mr: { xs: 0, sm: 0.5 } },
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Export CSV</Box>
          </Button>
        </Box>

        {/* Expandable filter chips */}
        {showFilters && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Status */}
            <Box>
              <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 700, mb: 0.8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['all','completed','pending','failed'].map(s => (
                  <Box key={s} onClick={() => setStatus(s)} sx={{
                    px: 1.5, py: 0.5, borderRadius: '8px', cursor: 'pointer',
                    fontWeight: 700, fontSize: '0.75rem', textTransform: 'capitalize',
                    bgcolor: statusFilter === s ? '#FA510F' : '#F8F9FA',
                    color:  statusFilter === s ? '#fff' : '#6B7280',
                    transition: 'all 0.15s',
                  }}>{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</Box>
                ))}
              </Box>
            </Box>
            {/* Type */}
            <Box>
              <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 700, mb: 0.8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Type</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['all','income','expense'].map(t => (
                  <Box key={t} onClick={() => setType(t)} sx={{
                    px: 1.5, py: 0.5, borderRadius: '8px', cursor: 'pointer',
                    fontWeight: 700, fontSize: '0.75rem', textTransform: 'capitalize',
                    bgcolor: typeFilter === t ? '#FA510F' : '#F8F9FA',
                    color:  typeFilter === t ? '#fff' : '#6B7280',
                    transition: 'all 0.15s',
                  }}>{t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}</Box>
                ))}
              </Box>
            </Box>
            {/* Category */}
            <Box>
              <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 700, mb: 0.8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {CATEGORIES.map(c => (
                  <Box key={c} onClick={() => setCat(c)} sx={{
                    px: 1.5, py: 0.5, borderRadius: '8px', cursor: 'pointer',
                    fontWeight: 700, fontSize: '0.75rem',
                    bgcolor: categoryFilter === c ? '#FA510F' : '#F8F9FA',
                    color:  categoryFilter === c ? '#fff' : '#6B7280',
                    transition: 'all 0.15s',
                  }}>{c}</Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* ── Transaction list ── */}
      <Box sx={{ borderRadius: '20px', bgcolor: '#fff',
        border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        {/* List header */}
        <Box sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>
            All Transactions
          </Typography>
          <Box sx={{ px: 1.2, py: 0.3, borderRadius: '8px', bgcolor: '#F1F5F9',
            fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>
            {filtered.length} results
          </Box>
        </Box>

        {/* ── Desktop table header (hidden on mobile) ── */}
        <Box sx={{
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: '2fr 1fr 1fr 1fr 100px 32px',
          px: 3, py: 1.5,
          bgcolor: '#FAFBFC',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        }}>
          {['Description','Category','Date','Card','Status',''].map(h => (
            <Typography key={h} sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#9CA3AF',
              textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</Typography>
          ))}
        </Box>

        {/* Rows */}
        {filtered.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <ReceiptIcon sx={{ fontSize: '2.5rem', color: '#E5E7EB', mb: 1 }} />
            <Typography sx={{ fontWeight: 700, color: '#9CA3AF' }}>No transactions found</Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#C4C9D4', mt: 0.5 }}>Try adjusting your filters</Typography>
          </Box>
        ) : (
          filtered.map((tx, idx) => (
            <Box
              key={tx.id}
              onClick={() => { setSelected(tx); setDetailOpen(true); }}
              sx={{
                cursor: 'pointer',
                borderBottom: idx < filtered.length - 1 ? '1px solid rgba(0,0,0,0.045)' : 'none',
                transition: 'background 0.15s',
                '&:hover': { bgcolor: '#FAFBFC' },
                // Desktop: grid layout
                display: { xs: 'flex', md: 'grid' },
                gridTemplateColumns: { md: '2fr 1fr 1fr 1fr 100px 32px' },
                // Mobile: flex row
                flexDirection: { xs: 'row' },
                alignItems: 'center',
                px: 3, py: { xs: 1.8, md: 1.5 },
                gap: { xs: 1.5, md: 0 },
              }}
            >
              {/* Description */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                <Box sx={{
                  width: { xs: 38, md: 40 }, height: { xs: 38, md: 40 },
                  borderRadius: '12px', bgcolor: tx.iconBg, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <tx.Icon sx={{ color: tx.iconColor, fontSize: '1.1rem' }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {tx.name}
                  </Typography>
                  {/* On mobile: show category + date below name */}
                  <Typography sx={{ fontSize: '0.68rem', color: '#9CA3AF',
                    display: { xs: 'block', md: 'none' } }}>
                    {tx.category} · {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Typography>
                </Box>
              </Box>

              {/* Category — desktop only */}
              <Typography sx={{ fontSize: '0.82rem', color: '#6B7280', display: { xs: 'none', md: 'block' } }}>
                {tx.category}
              </Typography>

              {/* Date — desktop only */}
              <Typography sx={{ fontSize: '0.82rem', color: '#6B7280', display: { xs: 'none', md: 'block' } }}>
                {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </Typography>

              {/* Card — desktop only */}
              <Typography sx={{ fontSize: '0.78rem', color: '#9CA3AF', display: { xs: 'none', md: 'block' } }}>
                {tx.card}
              </Typography>

              {/* Status — desktop only */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                <StatusPill status={tx.status} />
              </Box>

              {/* Amount — always shown, pushed to right on mobile */}
              <Box sx={{ ml: { xs: 'auto', md: 0 }, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.4, flexShrink: 0 }}>
                <Typography sx={{
                  fontWeight: 800, fontSize: '0.9rem',
                  color: tx.type === 'income' ? '#059669' : '#0F172A',
                  whiteSpace: 'nowrap',
                }}>
                  {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Typography>
                {/* On mobile: show status pill here */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <StatusPill status={tx.status} />
                </Box>
              </Box>

              {/* Chevron — desktop only */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                <ChevronIcon sx={{ fontSize: '0.75rem', color: '#C4C9D4' }} />
              </Box>
            </Box>
          ))
        )}

        {/* Footer total */}
        {filtered.length > 0 && (
          <Box sx={{ px: 3, py: 2, borderTop: '1px solid rgba(0,0,0,0.06)',
            bgcolor: '#FAFBFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
              Showing {filtered.length} of {ALL_TRANSACTIONS.length} transactions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
                +${filtered.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0).toLocaleString('en-US',{minimumFractionDigits:2})}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#FA510F', fontWeight: 700 }}>
                -${Math.abs(filtered.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0)).toLocaleString('en-US',{minimumFractionDigits:2})}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Detail dialog */}
      <TxDetail tx={selectedTx} open={detailOpen} onClose={() => setDetailOpen(false)} />
    </Box>
  );
}