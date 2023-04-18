import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import AppBarR from "../../../components/templates/AppBarR.js";
import { useFetch } from "../../../hooks/useFetch.js";
import "../../../firebase.js";
import { useAuth } from "../../../firebase.js";
import getMenuList from "../../../api/getMenuList.js";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import AddMenuForm from "../../../components/templates/AddMenuForm.js";

export default function MenuFunctionPage() {
  return (
    <Box>
      <AppBarR />
      <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
        <Link to="/restaurant/menu/add-menu">
          <Button variant="outlined">Add Menu</Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
        <Link to="/restaurant/menu/select-active">
          <Button variant="outlined">Select Active Menu</Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
        <Link to="/restaurant/main">
          <Button>Back</Button>
        </Link>
      </Box>
    </Box>
  );
}
