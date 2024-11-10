import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid2, Card, CardContent, Typography} from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';

const projectData = [
  {
    name: "Project A",
    description: "Description for Project A",
  },
  {
    name: "Project B",
    description: "Description for Project B",
  },
  {
    name: "Project C",
    description: "Description for Project C",
  },
  {
    name: "Project D",
    description: "Description for Project D",
  },
  {
    name: "Project E",
    description: "Description for Project E",
  },
  {
    name: "Project F",
    description: "Description for Project F",
  },
];

const ProjectList = () => {
  const [projects, setProjects] = useState(projectData);

  useEffect(() => {
    setProjects(projectData);
  },[]) ;

  const handleBack = () => {
    navigate(-1);
  }
  const navigate = useNavigate();

  return (
    <Container>
    <button onClick={handleBack} style={{ width: "60px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {project.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default ProjectList;
