
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Button,
} from '@mui/material';

import {
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Send as SendIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from 'recharts';

// const chartData = [
//   { month: 'Jan', balance: 28000, expenses: 12000 },
//   { month: 'Feb', balance: 32000, expenses: 14000 },
//   { month: 'Mar', balance: 35000, expenses: 10000 },
//   { month: 'Apr', balance: 38000, expenses: 16000 },
//   { month: 'May', balance: 42000, expenses: 12000 },
//   { month: 'Jun', balance: 45000, expenses: 15000 },
// ];

const DashboardHome = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Welcome back, John 👋
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          Here&apos;s your financial overview
        </Typography>
      </Box>

      {/* Balance Cards */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          mb: 4,
        }}
      >
        {/* Total Balance */}
        <Box
          sx={{
            flex: {
              xs: '1 1 100%',
              sm: '1 1 48%',
              md: '1 1 23%',
            },
          }}
        >
          <Card
            sx={{
              background: `linear-gradient(
                135deg,
                ${theme.palette.primary.main} 0%,
                ${theme.palette.primary.dark} 100%
              )`,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
              }}
            />

            <CardContent>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.9,
                  mb: 1,
                }}
              >
                Total Balance
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                $45,000
              </Typography>

              <Typography
                variant="caption"
                sx={{ opacity: 0.8 }}
              >
                +2.5% from last month
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Income */}
        <Box
          sx={{
            flex: {
              xs: '1 1 100%',
              sm: '1 1 48%',
              md: '1 1 23%',
            },
          }}
        >
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 1,
                    }}
                  >
                    Income
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    $8,500
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

              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.success.main,
                }}
              >
                ↑ 12% increase
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Expenses */}
        <Box
          sx={{
            flex: {
              xs: '1 1 100%',
              sm: '1 1 48%',
              md: '1 1 23%',
            },
          }}
        >
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 1,
                    }}
                  >
                    Expenses
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    $3,200
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

              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.error.main,
                }}
              >
                ↓ 5% decrease
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Savings */}
        <Box
          sx={{
            flex: {
              xs: '1 1 100%',
              sm: '1 1 48%',
              md: '1 1 23%',
            },
          }}
        >
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 1,
                    }}
                  >
                    Savings
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    $5,300
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
                  <SendIcon />
                </Box>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.info.main,
                }}
              >
                Goal: $10,000
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          mb: 4,
        }}
      >
        {/* Balance Chart */}
        <Box
          sx={{
            flex: {
              xs: '1 1 100%',
              md: '1 1 65%',
            },
          }}
        >
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Balance Overview
              </Typography>

              {/* <ResponsiveContainer
                width="100%"
                height={300}
              >
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorBalance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={theme.palette.primary.main}
                        stopOpacity={0.3}
                      />

                      <stop
                        offset="95%"
                        stopColor={theme.palette.primary.main}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={`${theme.palette.text.secondary}20`}
                  />

                  <XAxis
                    dataKey="month"
                    stroke={theme.palette.text.secondary}
                  />

                  <YAxis
                    stroke={theme.palette.text.secondary}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor:
                        theme.palette.background.paper,
                      border: `1px solid ${theme.palette.text.secondary}40`,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke={theme.palette.primary.main}
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                  />
                </AreaChart>
              </ResponsiveContainer> */}
            </CardContent>
          </Card>
        </Box>

        {/* Quick Actions */}
        <Box
          sx={{
            flex: {
              xs: '1 1 100%',
              md: '1 1 30%',
            },
          }}
        >
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Quick Actions
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<SendIcon />}
                  sx={{
                    backgroundColor:
                      theme.palette.primary.main,
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.5,

                    '&:hover': {
                      backgroundColor:
                        theme.palette.primary.dark,
                    },
                  }}
                >
                  Send Money
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<AddIcon />}
                  sx={{
                    borderColor:
                      theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.5,
                  }}
                >
                  Add Card
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.5,
                  }}
                >
                  Request Money
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Expenses Chart */}
      <Box sx={{ width: '100%' }}>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 3,
              }}
            >
              Monthly Expenses
            </Typography>

            {/* <ResponsiveContainer
              width="100%"
              height={250}
            >
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={`${theme.palette.text.secondary}20`}
                />

                <XAxis
                  dataKey="month"
                  stroke={theme.palette.text.secondary}
                />

                <YAxis
                  stroke={theme.palette.text.secondary}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      theme.palette.background.paper,
                    border: `1px solid ${theme.palette.text.secondary}40`,
                  }}
                />

                <Bar
                  dataKey="expenses"
                  fill={theme.palette.primary.main}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer> */}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default DashboardHome