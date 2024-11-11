import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid2, Card, CardContent, Typography } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

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
