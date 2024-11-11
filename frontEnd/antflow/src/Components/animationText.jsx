import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { keyframes } from '@mui/system';

// Define the keyframes for a fade-in effect
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Component to animate text with each letter appearing one by one
const AnimatedText = ({ text }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 'bold', color: '#2C3E50', display: 'flex' }}
      >
        {text.split('').map((letter, index) => (
          <Box
            key={index}
            component="span"
            sx={{
              display: 'inline-block',
              animation: `${fadeIn} 0.5s ease-out`,
              animationDelay: `${index * 0.1}s`, // Delay each letter
              opacity: 0, // Start hidden
              animationFillMode: 'forwards', // Keep the last keyframe
            }}
          >
            {letter}
          </Box>
        ))}
      </Typography>
    </Container>
  );
};
export default AnimatedText;
