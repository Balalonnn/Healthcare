import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fhir/Patient');
        setPatients(response.data.entry || []);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleEditClick = (patient) => {
    navigate('/update-patient', { state: { patient } });
  };
  const handleViewClick = (patient) => {
    navigate('/view-patient', { state: { patient } });
  };


  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/fhir/Patient/${id}`);
      setPatients(patients.filter(patient => patient.resource.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Back
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Patient Management
          </Typography>
          <Button color="inherit" component={Link} to="/create-patient" sx={{ ml: 'auto' }}>
            Create Patient
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Patients
        </Typography>
        <Typography variant="body1" gutterBottom>
          Use the navigation bar to create, update, or delete.
        </Typography>
        <List>
          {patients.map((entry) => (
            <div key={entry.resource.id}>
              <ListItem>
                <ListItemText
                  primary={`${entry.resource.name[0].family}, ${entry.resource.name[0].given.join(' ')}`}
                  secondary={`ID: ${entry.resource.id}`}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => handleViewClick(entry.resource.id)}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditClick(entry.resource)}
                  sx={{ mr: 2 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteClick(entry.resource.id)}
                >
                  Delete
                </Button>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default PatientPage;
