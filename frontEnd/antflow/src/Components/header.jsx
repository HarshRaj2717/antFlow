import React from "react";
import { AppBar, Toolbar, Typography} from "@mui/material";

const Header = ({ handleBack, title }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* <IconButton
          edge="start"
          color="inherit"
          onClick={handleBack}
          aria-label="back"
          style={{ width: "60px", marginRight: "30px" }}
        >
          <img
            src={antLogo}
            alt="logo"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        </IconButton> */}
        <Typography variant="h4">AntFlow</Typography>
        <Typography
          variant="h8"
          style={{ marginLeft: "10px", fontStyle: "italic", color: "orange" }}
        >
          (An Automated Project Management Solution)
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
