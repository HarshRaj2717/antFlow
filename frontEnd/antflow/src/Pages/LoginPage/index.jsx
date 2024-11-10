import React, { useState } from 'react';
import {  
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid2,
  Box,
  Typography,
  Avatar,
  Button,
  Container
} from '@mui/material';  
import profileIcon from '../../Assets/img/profile.png'; 
import './style.css';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../Assets/img/backIcon.jpg'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        AntFlow.ai
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Basic validation: ensure inputs are not empty
    if (!email || !password) {
      console.log("enter both email and passward");
      return;
    }
 
    const loginData = {
      email: email,
      password: password,
    };

    try { 
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
 
      if (response.ok) {
       // alert("Project added successfully!");
        setEmail("");
        setPassword(""); 
      } else {
        alert("Failed to add project. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the project.");
    }
  };

  const goToHome = () => {
    navigate('/');
  }

  return (
    <div class="bod">
    <Button onClick={goToHome} style={{width:"60px",top:"10px"}}>
    <img src={backIcon} alt="Back" className="back-icon" />
    </Button> 
      <Container className="bod" component="main" maxWidth="xs" style={{height:"70vh", marginTop:"100px" , border:`1px solid black` , padding:"50px", borderRadius:"10px", background:"#D3D3D3", opacity:"0.8"}}>
      
      <div sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Avatar sx={{ margin: 1, backgroundColor: 'black' }} src={profileIcon}/> 
        <form sx={{ width: '100%', marginTop: 1 }} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, marginBottom: 2 }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Grid2 container>
            <Grid2 item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid2> 
          </Grid2>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}
