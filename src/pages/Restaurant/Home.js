import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "../../img/background.jpeg";
import { Link } from "react-router-dom";

const styles = {
  paperContainer: {
    height: "100vh",
    backgroundImage: `url(${Image})`,
    opacity: 1,
  },
};

export default function HomePage() {
  return (
    <div>
      <div style={styles.paperContainer}></div>
      <Typography
        variant="h4"
        align="center"
        sx={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: `translate(-50%, -50%)`,
          color: "white",
        }}
      >
        Bon Appetit Cafe
      </Typography>
      <Link to="/restaurant/signup">
        <Button
          variant="outlined"
          color="info"
          sx={{
            position: "fixed",
            top: "50%",
            left: "40%",
            transform: `translate(-50%, -50%)`,
          }}
        >
          Sign Up
        </Button>
      </Link>
      <Link to="/restaurant/login">
        <Button
          variant="outlined"
          color="info"
          sx={{
            position: "fixed",
            top: "50%",
            left: "60%",
            transform: `translate(-50%, -50%)`,
          }}
        >
          Login
        </Button>
      </Link>
    </div>
  );
}
