import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Container, Avatar } from "@mui/material";
import projectsLogo from "../../Assets/img/projects.png";
import teamLogo from "../../Assets/img/team.png";
// import antLogo from '../../Assets/img/antLogo.jpg'
import profileIcon from "../../Assets/img/profile.png";
import AnimatedText from "../../Components/animationText";

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
    <div style={{height:"100vh", width:"100vw", background:`linear-gradient(rgb(0, 184, 217), rgb(0, 101, 255)) 0% 0% / auto repeat scroll padding-box border-box rgb(0, 121, 191)`,padding: 4,
      minHeight: "100vh", 
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      border:`1px solid black`, }}>
    {/* Header Section */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2C3E50", // Darker blue for header
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
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ECF0F1" }}>
          ANTFLOW
        </Typography>
      </div>
      <Typography variant="h6" fontStyle="italic" sx={{ color: "#ECF0F1" }}>
        An Automated Project Management Solution
      </Typography>
      <Avatar sx={{ backgroundColor: "#34495E" }} src={profileIcon} />
    </div>

    {/* Main Content Section */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-around", 
      }}
    >
      {/* Add New Employee */}
      <div
        style={{
          backgroundColor: "#FFFFFF", // White background for cards
          padding: "32px",
          textAlign: "center",
          borderRadius: "8px",
          width: "45%",
          boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`, // Light shadow for depth
        }}
      >
        <Button
          variant="contained"
          color="primary" // Use primary color for the button
          fullWidth
          onClick={handleAddNewEmployee}
        >
          ADD NEW EMPLOYEE
        </Button>
        <div onClick={showEmployeeList} style={{ cursor: "pointer" }}>
          <img
            src={teamLogo}
            alt="Team Members"
            style={{ width: "100%", marginTop: "16px", borderRadius: "8px" }}
          />
        </div>
        <Typography variant="subtitle1" sx={{ marginTop: 2, color: "#34495E" }}>
          TEAM MEMBERS
        </Typography>
      </div>

      {/* Create New Project */}
      <div
        style={{
          backgroundColor: "#FFFFFF", // White background for cards
          padding: "32px",
          textAlign: "center",
          borderRadius: "8px",
          width: "45%",
          boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`, // Light shadow for depth
        }}
      >
        <Button
          variant="contained"
          color="primary" 
          fullWidth
          onClick={handleAddNewProject}
        >
          CREATE NEW PROJECT
        </Button>
        <div 
          onClick={showProjectList} 
          style={{ cursor: "pointer" }} 
        >
          <img
            src={projectsLogo}
            alt="Projects"
            style={{ width: "100%", marginTop: "16px", borderRadius: "8px" }}
          />
        </div>
        <Typography variant="subtitle1" sx={{ marginTop: 2, color: "#34495E" }}>
          PROJECTS
        </Typography>
      </div>
    </div> 
    </div>
  );
}

export default AntFlowDashboard;
