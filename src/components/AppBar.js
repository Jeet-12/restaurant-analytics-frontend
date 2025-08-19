import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

export default function AppBar() {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Restaurant Analytics Dashboard
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}