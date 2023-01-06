import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router";

var appetizers = [
  {
    id: "1",
    name: "salad",
  },
  {
    id: "2",
    name: "cheese ball",
  },
];

// const selectedItems = [];

// function handleClick(i) {
//   selectedItems.push(appetizers[i].name);
//   console.log(selectedItems);
//   return selectedItems;
// }

export default function Appetizer({ passData }) {
  //const { state } = useLocation();

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
          <Button
            variant="contained"
            key={i}
            onClick={() => {
              passData(appetizers[i]);
            }}
          >
            {p.name}
          </Button>
        </Box>
      ))}
    </div>
  );
}
