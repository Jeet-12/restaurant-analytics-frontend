import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  Button,
  CircularProgress,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, subDays } from 'date-fns';
import { getTopRestaurants } from '../services/api';

export default function TopRestaurants() {
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 7),
    endDate: new Date(),
  });

  useEffect(() => {
    fetchTopRestaurants();
  }, [dateRange]);

  const fetchTopRestaurants = async () => {
    try {
      setLoading(true);
      const params = {
        start_date: format(dateRange.startDate, 'yyyy-MM-dd'),
        end_date: format(dateRange.endDate, 'yyyy-MM-dd'),
      };
      const response = await getTopRestaurants(params);
      setTopRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching top restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box style={{ marginBottom: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Top Restaurants by Revenue
      </Typography>
      
      <Paper elevation={3} style={{ padding: '1rem', marginBottom: '1rem' }}>
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
              onClick={fetchTopRestaurants}
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
      ) : topRestaurants.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Restaurant</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Cuisine</TableCell>
                <TableCell>Orders</TableCell>
                <TableCell>Total Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topRestaurants.map((restaurant, index) => (
                <TableRow key={restaurant.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{restaurant.restaurant.name}</TableCell>
                  <TableCell>{restaurant.restaurant.location}</TableCell>
                  <TableCell>{restaurant.restaurant.cuisine}</TableCell>
                  <TableCell>{restaurant.order_count}</TableCell>
                  <TableCell>₹{restaurant.total_revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
          <Typography variant="h6">No data available for the selected date range</Typography>
        </Paper>
      )}
    </Box>
  );
}