import React from "react";
import { Box, TextField } from "@mui/material";

export default function Filter({ setFilter, setFiltered, menu }) {
  const handleChange = (e) => {
    setFilter(true);
    for (let i = 0; i < menu.categories.length; i++) {
      for (let j = 0; j < menu.categories[i].items.length; j++) {
        if (menu.categories[i].items[j] === e.target.value) {
          setFiltered(menu.categories[i].items[j]);
        }
      }
    }
  };
  return (
    <Box sx={{ p: 1, m: 1 }}>
      <TextField
        label="filter"
        onChange={(e) => {
          handleChange(e);
        }}
      ></TextField>
    </Box>
  );
}
