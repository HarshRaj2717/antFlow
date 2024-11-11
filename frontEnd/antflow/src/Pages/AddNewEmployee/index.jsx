import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  Box,
  ListItemText,
  Checkbox,
} from "@mui/material";
import "./style.css";
import backIcon from "../../Assets/img/backIcon.jpg";
const AddNewEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [history, setHistory] = useState("");
  const [empID, setEmpID] = useState("");

  // Function to handle skills selection
  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object to send to the backend
    const employeeData = {
      user_email: localStorage.getItem("user_email"),
      employeeInfo: {
        id: empID,
        name: name,
        email: email,
        skill: selectedSkills,
        history: history,
      },
    };

    try {
      // Send the data as JSON to the backend using fetch
      const response = await fetch("http://localhost:8080/api/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        // Successfully sent data, handle success response here
        const result = await response.json();
        console.log("Employee added:", result);
        alert("Employee added successfully!");
        window.location.href = "/home";
      } else {
        // Handle error response
        console.error("Failed to add employee:", response.statusText);
        alert("Error adding employee. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      {/* Back Button */}
      <button onClick={handleBack} style={{ width: "60px" }}>
        <img src={backIcon} alt="Back" className="back-icon" />
      </button>
      <Box className="container">
        {/* Employee Details Form */}
        <form id="employeeForm" className="form" onSubmit={handleSubmit}>
          <h1>Employee Details</h1>

          <TextField
            label="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Email ID"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <Select
              labelId="skills-label"
              multiple
              value={selectedSkills}
              onChange={handleSkillsChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em style={{ color: "gray" }}>Select employee skills</em>;
                }
                return selected.join(", ");
              }}
            >
              <MenuItem value="Project Management">
                <Checkbox
                  checked={selectedSkills.indexOf("Project Management") > -1}
                />
                <ListItemText primary="Project Management" />
              </MenuItem>
              <MenuItem value="Requirement Gathering">
                <Checkbox
                  checked={selectedSkills.indexOf("Requirement Gathering") > -1}
                />
                <ListItemText primary="Requirement Gathering" />
              </MenuItem>
              <MenuItem value="Stakeholder Communication">
                <Checkbox
                  checked={
                    selectedSkills.indexOf("Stakeholder Communication") > -1
                  }
                />
                <ListItemText primary="Stakeholder Communication" />
              </MenuItem>
              <MenuItem value="Python">
                <Checkbox checked={selectedSkills.indexOf("Python") > -1} />
                <ListItemText primary="Python" />
              </MenuItem>
              <MenuItem value="JavaScript">
                <Checkbox checked={selectedSkills.indexOf("JavaScript") > -1} />
                <ListItemText primary="JavaScript" />
              </MenuItem>
              <MenuItem value="TypeScript">
                <Checkbox checked={selectedSkills.indexOf("TypeScript") > -1} />
                <ListItemText primary="TypeScript" />
              </MenuItem>
              <MenuItem value="C#">
                <Checkbox checked={selectedSkills.indexOf("C#") > -1} />
                <ListItemText primary="C#" />
              </MenuItem>
              <MenuItem value="Go">
                <Checkbox checked={selectedSkills.indexOf("Go") > -1} />
                <ListItemText primary="Go" />
              </MenuItem>
              <MenuItem value="Machine Learning">
                <Checkbox
                  checked={selectedSkills.indexOf("Machine Learning") > -1}
                />
                <ListItemText primary="Machine Learning" />
              </MenuItem>
              <MenuItem value="Natural Language Processing">
                <Checkbox
                  checked={
                    selectedSkills.indexOf("Natural Language Processing") > -1
                  }
                />
                <ListItemText primary="Natural Language Processing" />
              </MenuItem>
              <MenuItem value="Data Analysis">
                <Checkbox
                  checked={selectedSkills.indexOf("Data Analysis") > -1}
                />
                <ListItemText primary="Data Analysis" />
              </MenuItem>
              <MenuItem value="Backend Development">
                <Checkbox
                  checked={selectedSkills.indexOf("Backend Development") > -1}
                />
                <ListItemText primary="Backend Development" />
              </MenuItem>
              <MenuItem value="Frontend Development">
                <Checkbox
                  checked={selectedSkills.indexOf("Frontend Development") > -1}
                />
                <ListItemText primary="Frontend Development" />
              </MenuItem>
              <MenuItem value="API Integration">
                <Checkbox
                  checked={selectedSkills.indexOf("API Integration") > -1}
                />
                <ListItemText primary="API Integration" />
              </MenuItem>
              <MenuItem value="Database Management">
                <Checkbox
                  checked={selectedSkills.indexOf("Database Management") > -1}
                />
                <ListItemText primary="Database Management" />
              </MenuItem>
              <MenuItem value="UI/UX Design">
                <Checkbox
                  checked={selectedSkills.indexOf("UI/UX Design") > -1}
                />
                <ListItemText primary="UI/UX Design" />
              </MenuItem>
              <MenuItem value="Testing & QA">
                <Checkbox
                  checked={selectedSkills.indexOf("Testing & QA") > -1}
                />
                <ListItemText primary="Testing & QA" />
              </MenuItem>
              <MenuItem value="DevOps">
                <Checkbox checked={selectedSkills.indexOf("DevOps") > -1} />
                <ListItemText primary="DevOps" />
              </MenuItem>
              <MenuItem value="Cloud Infrastructure">
                <Checkbox
                  checked={selectedSkills.indexOf("Cloud Infrastructure") > -1}
                />
                <ListItemText primary="Cloud Infrastructure" />
              </MenuItem>
              <MenuItem value="AGILE Methodologies">
                <Checkbox
                  checked={selectedSkills.indexOf("AGILE Methodologies") > -1}
                />
                <ListItemText primary="AGILE Methodologies" />
              </MenuItem>
              <MenuItem value="Version Control (Git)">
                <Checkbox
                  checked={selectedSkills.indexOf("Version Control (Git)") > -1}
                />
                <ListItemText primary="Version Control (Git)" />
              </MenuItem>
              <MenuItem value="Technical Writing">
                <Checkbox
                  checked={selectedSkills.indexOf("Technical Writing") > -1}
                />
                <ListItemText primary="Technical Writing" />
              </MenuItem>
              <MenuItem value="Documentation">
                <Checkbox
                  checked={selectedSkills.indexOf("Documentation") > -1}
                />
                <ListItemText primary="Documentation" />
              </MenuItem>
              <MenuItem value="Team Coordination">
                <Checkbox
                  checked={selectedSkills.indexOf("Team Coordination") > -1}
                />
                <ListItemText primary="Team Coordination" />
              </MenuItem>
              <MenuItem value="Communication Skills">
                <Checkbox
                  checked={selectedSkills.indexOf("Communication Skills") > -1}
                />
                <ListItemText primary="Communication Skills" />
              </MenuItem>
            </Select>
            <FormHelperText>Choose your skills</FormHelperText>
          </FormControl>

          <TextField
            label="Employee History"
            id="history"
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />

          <TextField
            label="Employee ID"
            id="empID"
            value={empID}
            onChange={(e) => setEmpID(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Add Employee
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddNewEmployee;
