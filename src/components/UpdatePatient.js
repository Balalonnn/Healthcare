import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

const UpdatePatient = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  const [firstName, setFirstName] = useState(patient ? patient.name[0].given.join(' ') : '');
  const [lastName, setLastName] = useState(patient ? patient.name[0].family : '');
  const [gender, setGender] = useState(patient ? patient.gender : '');
  const [birthDate, setBirthDate] = useState(patient ? patient.birthDate : '');
  const [line, setLine] = useState(patient ? patient.address[0].line[0] : '');
  const [city, setCity] = useState(patient ? patient.address[0].city : '');
  const [state, setState] = useState(patient ? patient.address[0].state : '');
  const [postalCode, setPostalCode] = useState(patient ? patient.address[0].postalCode : '');
  const [country, setCountry] = useState(patient ? patient.address[0].country : '');
  const [phone, setPhone] = useState(patient ? patient.telecom.find(t => t.system === 'phone').value : '');
  const [email, setEmail] = useState(patient ? patient.telecom.find(t => t.system === 'email').value : '');

  if (!patient) {
    return <Typography variant="h6">No patient selected</Typography>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedPatient = {
      resourceType: 'Patient',
      id: patient.id,
      name: [
        {
          family: lastName,
          given: firstName.split(' '),
        },
      ],
      gender,
      birthDate,
      address: [
        {
          use: 'home',
          line: [line],
          city,
          state,
          postalCode,
          country,
        },
      ],
      telecom: [
        {
          system: 'phone',
          value: phone,
          use: 'home',
        },
        {
          system: 'email',
          value: email,
          use: 'home',
        },
      ],
    };

    try {
      await axios.put(`http://localhost:8080/fhir/Patient/${patient.id}`, updatedPatient);
      alert('Patient updated successfully!');
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Failed to update patient.');
    }
  };

  return (
    <Box sx={{ marginLeft: '240px', padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Update Patient
      </Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fullWidth
          margin="normal"
          select
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
          <MenuItem value="unknown">Unknown</MenuItem>
        </TextField>
        <TextField
          label="Birth Date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address Line"
          value={line}
          onChange={(e) => setLine(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="ID"
          value={patient.id}
          fullWidth
          margin="normal"
          disabled
        />
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
      </form>
    </Box>
  );
};

export default UpdatePatient;
