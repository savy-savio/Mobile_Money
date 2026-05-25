import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Block as BlockIcon,
  Lock as LockIcon,
  CreditCard as CardIcon,
} from '@mui/icons-material';

const cards = [
  {
    id: 1,
    name: 'Primary Card',
    type: 'Visa',
    last4: '4242',
    expiry: '12/26',
    balance: 15000,
    status: 'active',
    color: '#FA510F',
  },
  {
    id: 2,
    name: 'Savings Card',
    type: 'Mastercard',
    last4: '5555',
    expiry: '08/25',
    balance: 25000,
    status: 'active',
    color: '#6C63FF',
  },
  {
    id: 3,
    name: 'Travel Card',
    type: 'Visa',
    last4: '1234',
    expiry: '06/27',
    balance: 5000,
    status: 'inactive',
    color: '#10B981',
  },
];

export default function Cards() {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddCard = () => {
    setOpenDialog(true);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            My Cards
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Manage your debit and credit cards
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCard}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Add New Card
        </Button>
      </Box>

      {/* Active Cards */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Active Cards
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {cards
            .filter((card) => card.status === 'active')
            .map((card) => (
              <Box sx={{ flex: '1 1 100%', '@media (min-width: 960px)': { flex: '0 1 calc(50% - 12px)' } }} key={card.id}>
                <Card
                  sx={{
                    background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)' }} />
                  <Box sx={{ position: 'absolute', bottom: -20, left: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)' }} />

                  <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          {card.type}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {card.name}
                        </Typography>
                      </Box>
                      <CardIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Card Number
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '0.1em', mt: 0.5 }}>
                        •••• •••• •••• {card.last4}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Expires
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>
                          {card.expiry}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Balance
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>
                          ${card.balance.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>

                  {/* Card Actions */}
                  <Box sx={{ display: 'flex', gap: 1, px: 2, pb: 2, position: 'relative', zIndex: 1 }}>
                    <Button
                      size="small"
                      startIcon={<LockIcon />}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        flex: 1,
                      }}
                    >
                      Lock
                    </Button>
                    <Button
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        flex: 1,
                      }}
                    >
                      Settings
                    </Button>
                  </Box>
                </Card>
              </Box>
            ))}
        </Box>
      </Box>

      {/* Inactive Cards */}
      {cards.filter((card) => card.status === 'inactive').length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Inactive Cards
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {cards
              .filter((card) => card.status === 'inactive')
              .map((card) => (
                <Box sx={{ flex: '1 1 100%', '@media (min-width: 960px)': { flex: '0 1 calc(50% - 12px)' } }} key={card.id}>
                  <Card sx={{ opacity: 0.6 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {card.type}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {card.name}
                          </Typography>
                        </Box>
                        <Chip
                          label="Inactive"
                          size="small"
                          icon={<BlockIcon />}
                          sx={{
                            backgroundColor: `${theme.palette.error.main}20`,
                            color: theme.palette.error.main,
                            fontWeight: 600,
                          }}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          •••• •••• •••• {card.last4}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          Expires: {card.expiry}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          Balance: ${card.balance.toLocaleString()}
                        </Typography>
                      </Box>

                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        Reactivate
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
          </Box>
        </Box>
      )}

      {/* Add Card Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>Add New Card</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField fullWidth label="Card Name" placeholder="e.g., My Visa" />
            <TextField fullWidth label="Card Number" placeholder="1234 5678 9012 3456" />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="MM/YY" placeholder="12/26" />
              <TextField fullWidth label="CVV" placeholder="123" />
            </Box>
            <TextField fullWidth label="Cardholder Name" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Add Card
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
