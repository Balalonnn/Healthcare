import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

const PatientList = () => {
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

  return (
    <Box sx={{ marginLeft: '240px', padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Patient List
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
                onClick={() => handleEditClick(entry.resource)}
              >
                Edit
              </Button>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
};

export default PatientList;
