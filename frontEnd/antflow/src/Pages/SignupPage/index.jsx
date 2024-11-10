import React from 'react';
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
  return (
    <Container component="main" maxWidth="xs" style={{border:`1px solid black` ,height:"85vh",marginTop:"10vh", padding:"50px", borderRadius:"10px"}}>
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
        <Box component="form" noValidate sx={{ mt: 3 }}>
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
