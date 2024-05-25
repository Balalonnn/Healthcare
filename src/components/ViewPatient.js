import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const ViewPatient = ({ patient }) => {
  if (!patient) {
    return <Typography variant="h6">No patient data available</Typography>;
  }

  return (
    <Box sx={{ marginLeft: '240px', padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        View Patient
      </Typography>
      <Box>
        <Typography variant="body1" gutterBottom>
          First Name: {patient.name ? patient.name[0].given.join(' ') : 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Last Name: {patient.name ? patient.name[0].family : 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Gender: {patient.gender || 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Birth Date: {patient.birthDate || 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Address: {patient.address ? `${patient.address[0].line[0]}, ${patient.address[0].city}, ${patient.address[0].state}, ${patient.address[0].postalCode}, ${patient.address[0].country}` : 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Phone: {patient.telecom && patient.telecom.find(t => t.system === 'phone') ? patient.telecom.find(t => t.system === 'phone').value : 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {patient.telecom && patient.telecom.find(t => t.system === 'email') ? patient.telecom.find(t => t.system === 'email').value : 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          ID: {patient.id}
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={() => window.history.back()}>
        Back
      </Button>
    </Box>
  );
};

export default ViewPatient;
