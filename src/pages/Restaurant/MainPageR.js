import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import AppBarR from "../../components/templates/AppBarR";
import getMenu from "../../api/getMenu";
import getMenuList from "../../api/getMenuList";
import { useAuth } from "../../firebase";

export default function MainPage() {
  const { user } = useAuth();
  const [name, setName] = useState();

  // useEffect(() => {
  //   getMenuList(user.token).then((res) => {
  //     getMenu(user.token, res[0].id).then((res) => {
  //       setName(res.restaurant.name);
  //     });
  //   });
  // });
  return (
    <Box>
      <AppBarR></AppBarR>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} textAlign="center"></Grid>
        <Grid item xs={12} textAlign="center">
          <Link to="/restaurant/menu" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Menu Management</Button>
          </Link>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Link to="/restaurant/table" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Table Management</Button>
          </Link>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Link to="/restaurant/order" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Order Tracking</Button>
          </Link>
        </Grid>
        {/* <Grid item xs={12} textAlign="center">
          <Button variant="outlined">Inventory Management</Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button variant="outlined">Reports</Button>
        </Grid> */}
      </Grid>
    </Box>
  );
}
