import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AppBarR from "../../components/templates/AppBarR";
import Typography from "@mui/material/Typography";
import getOrderList from "../../api/getOrderList";
import { useAuth } from "../../firebase";
import Card from "@mui/material/Card";
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
          <Card>
            <Typography>{p.id}</Typography>
            <Typography>{p.numberOfItems}</Typography>
            <Typography>{p.totalPrice}</Typography>
            <Typography>{p.createdAt}</Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
