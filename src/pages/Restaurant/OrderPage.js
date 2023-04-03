import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import currentOrder from "../../api/currentOrder";
import AppBarR from "../../components/templates/AppBarR";
import Typography from "@mui/material/Typography";

export default function OrderPage() {
  const [data, setData] = useState();

  async function fetchData() {
    const res = await currentOrder();
    setData(JSON.stringify(res));
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <Box>
      <AppBarR />
      <Box sx={{ m: 6 }}>
        <Typography>{data}</Typography>
      </Box>
    </Box>
  );
}
