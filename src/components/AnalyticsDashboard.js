import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, subDays } from 'date-fns';
import { useParams } from 'react-router-dom'; // Add this import
import DailyOrdersChart from './charts/DailyOrdersChart';
import RevenueChart from './charts/RevenueChart';
import { getRestaurantMetrics } from '../services/api';

export default function AnalyticsDashboard() {
  const { id } = useParams(); 
  const restaurantId = parseInt(id); 
  
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 7),
    endDate: new Date(),
  });

  useEffect(() => {
    if (restaurantId) {
      fetchMetrics();
    }
  }, [restaurantId, dateRange]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const params = {
        start_date: format(dateRange.startDate, 'yyyy-MM-dd'),
        end_date: format(dateRange.endDate, 'yyyy-MM-dd'),
      };
      const response = await getRestaurantMetrics(restaurantId, params);
      setMetrics(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Restaurant Analytics {restaurantId && `- ID: ${restaurantId}`}
      </Typography>
      
      <Paper elevation={3} style={{ padding: '1rem', marginBottom: '2rem' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5} md={3}>
            <DatePicker
              label="Start Date"
              value={dateRange.startDate}
              onChange={(date) => handleDateChange('startDate', date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <DatePicker
              label="End Date"
              value={dateRange.endDate}
              onChange={(date) => handleDateChange('endDate', date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={1}>
            <Button 
              variant="contained" 
              onClick={fetchMetrics}
              disabled={loading}
              fullWidth
              style={{ height: '56px' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Apply'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : metrics.length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DailyOrdersChart data={metrics} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RevenueChart data={metrics} />
          </Grid>
          <Grid item xs={12}>
            <PeakHoursTable data={metrics} />
          </Grid>
        </Grid>
      ) : (
        <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
          <Typography variant="h6">No data available for the selected date range</Typography>
        </Paper>
      )}
    </Box>
  );
}

function PeakHoursTable({ data }) {
  return (
    <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h6" gutterBottom>
        Daily Metrics
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Peak Hour</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Orders Count</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Total Revenue</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Avg. Order Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map(day => (
              <tr key={day.date} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{day.date}</td>
                <td style={{ padding: '12px' }}>{day.peak_hour}</td>
                <td style={{ padding: '12px' }}>{day.order_count}</td>
                <td style={{ padding: '12px' }}>₹{day.total_revenue.toFixed(2)}</td>
                <td style={{ padding: '12px' }}>₹{day.average_order_value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Paper>
  );
}