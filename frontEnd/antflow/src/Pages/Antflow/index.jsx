import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/header';
import backgroundImg from '../../Assets/img/backgroundImg.webp';
import { Button} from '@mui/material';

const AntFlow = () => {
    const navigate = useNavigate();
    const handleSignInClick = () => {
        navigate('/log-in');
      };
    
    const handleCreateAccountClick = () => {
      navigate('/sign-up');
    };
  return (
    <>
      <Header />
      <div 
        style={{
            position:"fixed",
          height: "92vh",
          width: "100vw",
          background: `url(${backgroundImg}) no-repeat right center/contain,
                      linear-gradient(287.15deg, #fafbfc, #deebff 8.06%, #b3d4ff 35.45%, #deebff 77.6%, #fafbfc)`
        }}
      >  
      <div style={{margin:"100px", display:"flex", flexDirection:"column", gap:"50px", border:`1px solid green`, borderRadius:"10px", height:"500px", 
        width:"400px", padding:"80px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"}}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignInClick}
        sx={{
          padding: "8px 16px",
          fontWeight: "bold",
          textTransform: "none",
          background:"orange",
        }}
      >
        Sign In
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleCreateAccountClick}
        sx={{
          padding: "8px 16px",
          fontWeight: "bold",
          textTransform: "none",
          borderWidth: 2,
        }}
      >
        Create New Account
      </Button>
      </div> 
      </div>
    </>
  );
}

export default AntFlow;
