import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import RestaurantList from './components/RestaurantList';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import TopRestaurants from './components/TopRestaurants';
import AppBar from './components/AppBar';
import theme from './styles/theme';

export default function App() {
  // const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar />
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
          <Routes>
            <Route path="/" element={
              <>
                <TopRestaurants />
                <RestaurantList  />
              </>
            } />
            <Route path="/restaurant/:id" element={
                <AnalyticsDashboard  />
            } />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}