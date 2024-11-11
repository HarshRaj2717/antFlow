import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid2, Card, CardContent, Typography } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useState(async () => {
    try {
      // Send the data as JSON to the backend using fetch
      const response = await fetch(
        "http://localhost:8080/api/fetchProjectsByUserEmail",
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
        setProjects(result);
      } else {
        // Handle error response
        console.error("error:", response.statusText);
        alert("Error getting employees. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendToAntFlow = (project) => {
    localStorage.setItem("project_name", project.project_name);
    localStorage.setItem("project_description", project.description);
    window.location.href = "/ai";
  };

  return (
    <Container>
      <button
        onClick={handleBack}
        style={{
          width: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaArrowLeft /> {/* Add the icon */}
      </button>
      <Typography variant="h4" align="center" gutterBottom>
        Projects
      </Typography>

      <Grid2 container spacing={4}>
        {/* Mapping through projects and displaying them in a grid2 */}
        {projects.map((project, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  {project.project_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {project.description}
                </Typography>
                <btn
                  onClick={() => handleSendToAntFlow(project)}
                  className="bg-blue-500 hover:bg-blue-300 p-1 italic shadow-lg rounded-md font-mono cursor-pointer"
                >
                  Send to AntFlow AI
                </btn>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default ProjectList;
