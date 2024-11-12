import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid2, Card, CardContent, Typography } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import DependencyGraphComponent from "../../Components/DependencyGraphComponent";

export default function Ai() {
  const [promptRes, setPromptRes] = useState({});
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useState(async () => {
    try {
      // Send the data as JSON to the backend using fetch
      const response = await fetch("http://localhost:8080/api/prompter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: localStorage.getItem("user_email"),
          project_description: localStorage.getItem("project_description"),
        }),
      });

      if (response.ok) {
        // Successfully sent data, handle success response here
        const result = await response.json();
        setPromptRes(result);
        console.log(result);
      } else {
        // Handle error response
        console.error("error:", response.statusText);
        alert("Error getting Antflow AI. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }, []);
// format 
  // const dependecyData = [
  //     { task_id: 1, task_name: "Project Planning", dependencies: [] },
  //     { task_id: 2, task_name: "Database Design", dependencies: [] },
  //     { task_id: 3, task_name: "Backend Development Setup", dependencies: [1, 2] },
  //     { task_id: 4, task_name: "User Authentication Development", dependencies: [3] },
  //     { task_id: 5, task_name: "Notes Model and API", dependencies: [4] },
  //     { task_id: 6, task_name: "Frontend Development", dependencies: [5] },
  //     { task_id: 7, task_name: "Testing and QA", dependencies: [6] },
  //     { task_id: 8, task_name: "Deployment", dependencies: [7] },
  //     { task_id: 9, task_name: "Documentaion", dependencies: [8] }
  //   ];

  if (!promptRes.data) {
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
          Project Insights by Antflow AI
        </Typography>
        <div>
          <Card>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Loading...
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

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
        Project Insights by Antflow AI
      </Typography>

      <div>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              <span className="italic font-light underline">
                Antflow AI Title:{" "}
              </span>
              {promptRes.data.project}
            </Typography>

            <DependencyGraphComponent promptRes={promptRes}/>

            {promptRes.data.tasks.map((task) => (
              <Card key={task.task_id} style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {task.task_id} --- {task.task_name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {task.task_description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Estimated Time: {task.estimated_time} days
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Required Skills: {task.required_skills.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Dependencies: {task.dependencies.join(" + ")}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <a
            href="/ai"
            className="bg-blue-500 hover:bg-blue-300 italic shadow-lg rounded-md font-semibold text-lg font-mono cursor-pointer m-4 p-2"
          >
            Regenerate
          </a>
        </Card>
      </div>
    </Container>
  );
}
