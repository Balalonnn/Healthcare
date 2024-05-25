import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const CreatePatient = ({ onPatientAdded }) => {
  const navigate = useNavigate();
  const [family, setFamily] = useState('');
  const [given, setGiven] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [line, setLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = {
      resourceType: 'Patient',
      name: [
        {
          family,
          given: given.split(' '),
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
      const response = await axios.post('http://localhost:8080/fhir/Patient', patientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Add Patient:', JSON.stringify(response.data, null, 2));
      onPatientAdded(); // Call the callback to update the patient list
      navigate('/patients');
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <Box sx={{ marginLeft: '240px', padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Add New Patient
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Family Name"
          value={family}
          onChange={(e) => setFamily(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Given Name"
          value={given}
          onChange={(e) => setGiven(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Birth Date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
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

      </form>
      <Link to="/patients">
        <Button type="submit" variant="contained" color="primary">
          Create Patient
        </Button>
      </Link>
    </Box>

  );
};

export default CreatePatient;
