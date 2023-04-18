import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AppBarR from "../../components/templates/AppBarR";
import Typography from "@mui/material/Typography";
import getOrderList from "../../api/getOrderList";
import { useAuth } from "../../firebase";
import { Card, Paper, Button, Link } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";

export default function OrderPage() {
  const { user } = useAuth();

  const { data: orderList, isLoading } = useFetch(() =>
    getOrderList(user.token)
  );

  if (isLoading) {
    return null;
  }

  return (
    <Box>
      <AppBarR />
      <Box sx={{ m: 6 }}>
        {orderList.map((p, i) => (
          <Paper elevation={3} key={i}>
            <Box sx={{ m: 2, p: 2 }}>
              <Typography>Order Id: {p.id}</Typography>
              <Typography>Number of Items: {p.numberOfItems}</Typography>
              <Typography>Total Price: {p.totalPrice}</Typography>
              <Typography>Created At: {p.createdAt}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
        <Link to="/restaurant/main">
          <Button>Back</Button>
        </Link>
      </Box>
    </Box>
  );
}
