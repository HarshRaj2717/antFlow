import React, { useState } from 'react';
import {  
  TextField, 
  Link,
  Grid,
  Box,
  Typography,
  Avatar,
  Button,
  Container
} from '@mui/material'; 
import profileIcon from '../../Assets/img/profile.png';  

function MadeWithLove() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Built with love by the "}
      <Link color="inherit" href="https://mui.com/">
        Material-UI
      </Link>
      {" team."}
    </Typography>
  );
}

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      password
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User signed up successfully:', data);
        // Optionally, navigate to a different page or show a success message
      } else {
        console.error('Sign up failed:', response.statusText);
        // Handle error, show a message to the user
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error, show a message to the user
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{border: '1px solid black', height: '85vh', marginTop: '10vh', padding: '50px', borderRadius: '10px'}}>
      <Box
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar src={profileIcon} sx={{ bgcolor: 'secondary.main' }}/>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid> 
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
export default SignUpForm;
