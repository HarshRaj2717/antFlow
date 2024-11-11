import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid2, Card, CardContent, Typography, Container } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

const EmployeeList = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  // Function to fetch user data (uncomment and modify if you have an API)
  useState(async () => {
    try {
      // Send the data as JSON to the backend using fetch
      const response = await fetch(
        "http://localhost:8080/api/fetchEmployeesByUserEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: localStorage.getItem("user_email"),
          }),
        }
      );

      if (response.ok) {
        // Successfully sent data, handle success response here
        const result = await response.json();
        setUserData(result);
      } else {
        // Handle error response
        console.error("Failed to add employee:", response.statusText);
        alert("Error getting employees. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container sx={{ py: 4 }}>
      <button
        onClick={handleBack}
        style={{
          width: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
                  Skills: {user.skill.join(", ")}
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
