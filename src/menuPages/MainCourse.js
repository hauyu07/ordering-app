import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function MainCourse() {
  var appetizers = [
    {
      id: "1",
      name: "butter chicken",
    },
    {
      id: "2",
      name: "macaroni and cheese",
    },
  ];
  return (
    <div>
      {appetizers.map((p, i) => (
        <Box
          key={i}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 2,
            minWidth: 300,
          }}
        >
          <Button variant="contained" key={i}>
            {p.name}
          </Button>
        </Box>
      ))}
    </div>
  );
}
