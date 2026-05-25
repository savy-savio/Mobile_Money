import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Chip,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ArrowDownward as ArrowDownIcon,
  ArrowUpward as ArrowUpIcon,
//   SearchOutlined as SearchIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const transactions = [
  {
    id: 1,
    name: 'Netflix Subscription',
    category: 'Entertainment',
    amount: -15.99,
    date: '2024-05-22',
    status: 'completed',
    icon: '📺',
  },
  {
    id: 2,
    name: 'Salary Deposit',
    category: 'Income',
    amount: 5000,
    date: '2024-05-20',
    status: 'completed',
    icon: '💰',
  },
  {
    id: 3,
    name: 'Coffee Shop',
    category: 'Food',
    amount: -4.5,
    date: '2024-05-19',
    status: 'completed',
    icon: '☕',
  },
  {
    id: 4,
    name: 'Gym Membership',
    category: 'Health',
    amount: -50,
    date: '2024-05-18',
    status: 'completed',
    icon: '💪',
  },
  {
    id: 5,
    name: 'Online Purchase',
    category: 'Shopping',
    amount: -125.00,
    date: '2024-05-17',
    status: 'pending',
    icon: '🛍️',
  },
  {
    id: 6,
    name: 'Gas Station',
    category: 'Transportation',
    amount: -45.00,
    date: '2024-05-16',
    status: 'completed',
    icon: '⛽',
  },
  {
    id: 7,
    name: 'Restaurant',
    category: 'Food',
    amount: -75.50,
    date: '2024-05-15',
    status: 'completed',
    icon: '🍽️',
  },
  {
    id: 8,
    name: 'Transfer to Savings',
    category: 'Transfer',
    amount: -200,
    date: '2024-05-14',
    status: 'completed',
    icon: '💳',
  },
];

export default function Transactions() {
  const theme = useTheme();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter((tx) => {
    if (filter !== 'all' && tx.status !== filter) return false;
    if (searchTerm && !tx.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Transactions
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          View and manage your transaction history
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 100%', '@media (min-width: 600px)': { flex: '1 1 calc(50% - 12px)' }, '@media (min-width: 960px)': { flex: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    Total Income
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    $5,000
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '8px',
                    background: `${theme.palette.success.main}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.success.main,
                  }}
                >
                  <ArrowDownIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 100%', '@media (min-width: 600px)': { flex: '1 1 calc(50% - 12px)' }, '@media (min-width: 960px)': { flex: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    Total Expenses
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    $515.99
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '8px',
                    background: `${theme.palette.error.main}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.error.main,
                  }}
                >
                  <ArrowUpIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 100%', '@media (min-width: 600px)': { flex: '1 1 calc(50% - 12px)' }, '@media (min-width: 960px)': { flex: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    Transactions
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {transactions.length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '8px',
                    background: `${theme.palette.info.main}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.info.main,
                  }}
                >
                  💳
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 100%', '@media (min-width: 600px)': { flex: '1 1 calc(50% - 12px)' }, '@media (min-width: 960px)': { flex: '1 1 calc(25% - 12px)' } }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    Pending
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '8px',
                    background: `${theme.palette.warning.main}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.warning.main,
                  }}
                >
                  ⏳
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'flex-end' }}>
            <TextField
              placeholder="Search transactions..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            //   InputProps={{
            //     startAdornment: <SearchIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />,
            //   }}
              sx={{ flex: 1, minWidth: { xs: '100%', md: 250 } }}
            />
            <TextField
              select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              size="small"
              sx={{ minWidth: { xs: '100%', md: 150 } }}
            >
              <MenuItem value="all">All Transactions</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </TextField>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                minWidth: { xs: '100%', md: 'auto' },
              }}
            >
              Export
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: `${theme.palette.primary.main}08` }}>
                <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Amount
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.main}05`,
                    },
                    borderBottom: `1px solid ${theme.palette.text.secondary}15`,
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ fontSize: '1.5rem' }}>{transaction.icon}</Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {transaction.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {transaction.category}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: transaction.amount > 0 ? theme.palette.success.main : theme.palette.text.primary,
                      }}
                    >
                      {transaction.amount > 0 ? '+' : ''} ${Math.abs(transaction.amount).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor:
                          transaction.status === 'completed'
                            ? theme.palette.success.main
                            : theme.palette.warning.main,
                        color:
                          transaction.status === 'completed' ? theme.palette.success.main : theme.palette.warning.main,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
