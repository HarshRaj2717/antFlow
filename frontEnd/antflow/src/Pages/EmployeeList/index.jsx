import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid2, Card, CardContent, Typography, Container } from "@mui/material";
import { FaArrowLeft } from 'react-icons/fa';

const EmployeeList = () => { 
  const [userData] = useState([
    { name: "John Doe", email: "johndoe@example.com", age: 30 },
    { name: "Jane Smith", email: "janesmith@example.com", age: 25 },
    { name: "Alex Johnson", email: "alexjohnson@example.com", age: 40 },
    { name: "Maria Garcia", email: "mariagarcia@example.com", age: 35 },
    { name: "David Brown", email: "davidbrown@example.com", age: 28 },
  ]);
  const navigate = useNavigate();
  // Function to fetch user data (uncomment and modify if you have an API)
  // useEffect(() => {
  //   fetch("https://api.example.com/users")
  //     .then(response => response.json())
  //     .then(data => setUserData(data))
  //     .catch(error => console.error("Error fetching user data:", error));
  // }, []);

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <Container sx={{ py: 4 }}>
    <button onClick={handleBack} style={{ width: "60px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FaArrowLeft /> 
    </button>
      <Typography variant="h4" component="h1" gutterBottom>
        User Data
      </Typography>
      <Grid2 container spacing={4}>
        {userData.map((user, index) => (
          <Grid2 item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" component="h2">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {user.age}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default EmployeeList;
