import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Image from "./img/start.jpg";

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
      <Typography
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
      </Typography>
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
    </div>
  );
}
