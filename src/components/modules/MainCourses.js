import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useFetch } from "../../hooks/useFetch";
import { queryforDishes } from "../../firebase";

export default function MainCourse({ addAmount }) {
  const [tabName, setTabName] = useState("mainCourses");

  const { data: mainCourses, isLoading } = useFetch(() =>
    queryforDishes(tabName)
  );

  if (isLoading) {
    return null;
  }
  return (
    <div>
      {mainCourses.map((p, i) => (
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
              addAmount(mainCourses[i]);
            }}
          >
            {p.name}
          </Button>
        </Box>
      ))}
    </div>
  );
}
