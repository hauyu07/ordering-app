import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "./img/start.jpg";
import { Link } from "react-router-dom";
import MainPage from "./page/MainPage";

const styles = {
  paperContainer: {
    height: "100vh",
    backgroundImage: `url(${Image})`,
    opacity: 0.6,
  },
};

export default function Start() {
  return (
    <div>
      <div style={styles.paperContainer}></div>
      {/* <Typography
        variant="h5"
        align="center"
        sx={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: `translate(-50%, -50%)`,
        }}
      >
        ABC Resturant
      </Typography> */}
      <Link to="/main">
        <Button
          variant="contained"
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
          }}
        >
          Start Ordering
        </Button>
      </Link>
    </div>
  );
}
