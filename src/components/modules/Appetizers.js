import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { queryforDishes } from "../../firebase";
import { useFetch } from "../../hooks/useFetch";

export default function Appetizer({ addAmount }) {
  const [tabName, setTabName] = useState("appetizers");

  const { data: appetizers, isLoading } = useFetch(() =>
    queryforDishes(tabName)
  );

  if (isLoading) {
    return null;
  }

  return (
    <div>
      {appetizers?.map((p, i) => (
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
              addAmount(appetizers[i]);
            }}
          >
            {p.name}
          </Button>
        </Box>
      ))}
    </div>
  );
}
