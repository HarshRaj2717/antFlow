import React, { useState } from "react";
import {
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Avatar,
  Button,
  Container,
} from "@mui/material";
import profileIcon from "../../Assets/img/profile.png";

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
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = {
      user_email: email,
      password,
      company_name: companyName,
      company_description: companyDescription,
      employeeInfo: [],
      projectInfo: [],
    };

    try {
      const response = await fetch("http://localhost:8080/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User signed up successfully:", data);
        localStorage.setItem("user_email", formData.user_email);
        window.location.href = "/home";
        // Optionally, navigate to a different page or show a success message
      } else {
        console.error("Sign up failed:", response.statusText);
        // Handle error, show a message to the user
      }
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error, show a message to the user
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        border: "1px solid black",
        height: "85vh",
        marginTop: "10vh",
        padding: "50px",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar src={profileIcon} sx={{ bgcolor: "secondary.main" }} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="companyName"
                variant="outlined"
                required
                fullWidth
                id="companyName"
                label="Company Name"
                autoFocus
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="companyDescription"
                label="Company Description"
                name="companyDescription"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
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
                type="email"
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
};
export default SignUpForm;
