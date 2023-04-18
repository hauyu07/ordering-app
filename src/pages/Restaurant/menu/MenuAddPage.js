import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import AppBarR from "../../../components/templates/AppBarR.js";
import "../../../firebase.js";
import { useAuth } from "../../../firebase.js";
import AddMenuForm from "../../../components/templates/AddMenuForm.js";

export default function AddMenuPage() {
  const { user } = useAuth();
  const [menu, setMenu] = useState({});

  useEffect(() => {
    if (menu) {
      //   createMenu({ ...menu, active: true }, user.token);
    }
  }, [menu]);

  return (
    <Box>
      <AppBarR></AppBarR>
      <AddMenuForm setMenu={setMenu}></AddMenuForm>
    </Box>
  );
}
