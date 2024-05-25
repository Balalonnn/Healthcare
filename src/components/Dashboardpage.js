import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the ฟอมเฟียว Dashboard
      </Typography>
      <Typography variant="body1">
        Use the navigation bar to manage patients.
      </Typography>
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ฟอมเฟียว Hospital สาขา 1
            </Typography>
            <Button color="inherit" component={Link} to="/patients">
              Patients
            </Button>
          </Toolbar>
        </AppBar>
        <AppBar position="static" sx={{ mt: 2, bgcolor: '#AD36B1' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ฟอมเฟียว Hospital สาขา 2
            </Typography>
            <Button color="inherit" component={Link} to="/patients2">
              Patients
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
};

export default Dashboard;
