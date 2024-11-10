import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import backIcon from '../../Assets/img/backIcon.jpg'

const AddNewProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [errors, setErrors] = useState({ name: false, description: false });
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: ensure inputs are not empty
    if (!projectName || !projectDescription) {
      setErrors({
        name: !projectName,
        description: !projectDescription,
      });
      return;
    }

    // Create the JSON data object
    const projectData = {
      name: projectName,
      description: projectDescription,
    };

    try {
      // Send data to backend
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      // Check if the response is successful
      if (response.ok) {
        alert("Project added successfully!");
        
        // Clear form after successful submission
        setProjectName("");
        setProjectDescription("");
        setErrors({ name: false, description: false });
      } else {
        alert("Failed to add project. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the project.");
    }
  };
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
    <button onClick={handleBack} style={{width:"60px"}}>
    <img src={backIcon} alt="Back" className="back-icon" />
    </button> 
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add New Project
      </Typography>

      <TextField
        label="Project Name"
        variant="outlined"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        fullWidth
        required
        error={errors.name}
        helperText={errors.name ? "Project name is required." : ""}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Project Description"
        variant="outlined"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        fullWidth
        required
        multiline
        rows={4}
        error={errors.description}
        helperText={errors.description ? "Project description is required." : ""}
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Project
      </Button>
    </Box>
    </>
  );
};

export default AddNewProjectForm;
