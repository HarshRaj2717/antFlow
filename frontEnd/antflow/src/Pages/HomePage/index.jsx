import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Container, Avatar } from "@mui/material";
import projectsLogo from "../../Assets/img/projects.png";
import teamLogo from "../../Assets/img/team.png";
// import antLogo from '../../Assets/img/antLogo.jpg'
import profileIcon from "../../Assets/img/profile.png";

function AntFlowDashboard() {
  const navigate = useNavigate();

  const handleAddNewEmployee = () => {
    navigate("/add-new-employee"); // Navigate to the employee form page
  };
  const handleAddNewProject = () => {
    navigate("/add-new-project"); // Navigate to the employee form page
  };
  const showEmployeeList = () => {
    navigate("/employee-list"); // go to employee-list
  };
  const showProjectList = () => {
    navigate("/project-list");
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "#E0E0E0",
        padding: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#D3D3D3",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <Avatar
            alt="AntFlow Logo"
            src={antLogo} // Replace with the actual path of the logo image
            sx={{ width: 80, height: 80, marginRight: 16 }}
          /> */}
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            ANTFLOW
          </Typography>
        </div>
        <Typography variant="h6" fontStyle="italic">
          An Automated Project Management Solution
        </Typography>
        <Avatar sx={{ backgroundColor: "#000" }} src={profileIcon} />
      </div>

      {/* Main Content Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "32px",
        }}
      >
        {/* Add New Employee */}
        <div
          style={{
            backgroundColor: "#F5F5F5",
            padding: "32px",
            textAlign: "center",
            borderRadius: "8px",
            width: "48%",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleAddNewEmployee}
          >
            ADD NEW EMPLOYEE
          </Button>
          <div onClick={showEmployeeList}>
            <img
              src={teamLogo}
              alt="Team Members"
              style={{ width: "100%", marginTop: "16px", borderRadius: "8px" }}
            />
          </div>
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            TEAM MEMBERS
          </Typography>
        </div>

        {/* Create New Project */}
        <div
          style={{
            backgroundColor: "#F5F5F5",
            padding: "32px",
            textAlign: "center",
            borderRadius: "8px",
            width: "48%",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleAddNewProject}
          >
            CREATE NEW PROJECT
          </Button>
          <div onClick={showProjectList}>
            <img
              src={projectsLogo}
              alt="Projects"
              style={{ width: "100%", marginTop: "16px", borderRadius: "8px" }}
            />
          </div>
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            PROJECTS
          </Typography>
        </div>
      </div>
    </Container>
  );
}

export default AntFlowDashboard;
