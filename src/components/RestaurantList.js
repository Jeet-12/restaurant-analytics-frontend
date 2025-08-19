import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Typography
} from '@mui/material';
import { getRestaurants } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function RestaurantList({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getRestaurants({
          search,
          sort_by: sortBy,
          sort_order: sortOrder,
          cuisine: cuisineFilter
        });
        setRestaurants(response.data.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, sortBy, sortOrder, cuisineFilter]);

  const cuisines = [...new Set(restaurants.map(r => r.cuisine))];
  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`); 
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Restaurants
      </Typography>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />
        <FormControl size="small" style={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="location">Location</MenuItem>
            <MenuItem value="cuisine">Cuisine</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" style={{ minWidth: 120 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Order"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" style={{ minWidth: 120 }}>
          <InputLabel>Cuisine</InputLabel>
          <Select
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
            label="Cuisine"
          >
            <MenuItem value="">All</MenuItem>
            {cuisines.map(cuisine => (
              <MenuItem key={cuisine} value={cuisine}>{cuisine}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Cuisine</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : restaurants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>No restaurants found</TableCell>
              </TableRow>
            ) : (
              restaurants.map(restaurant => (
                <TableRow 
                  key={restaurant.id} 
                  hover 
                  onClick={() => handleRestaurantClick(restaurant.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{restaurant.name}</TableCell>
                  <TableCell>{restaurant.location}</TableCell>
                  <TableCell>{restaurant.cuisine}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}