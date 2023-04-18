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
import Switch from "@mui/material/Switch";
import { Grid } from "@mui/material";
import updateMenu from "../../../api/updateMenu.js";
import getMenu from "../../../api/getMenu.js";
import { Paper } from "@mui/material";

export default function MenuSelectionPage() {
  const { user } = useAuth();
  const { data: menuList, isLoading } = useFetch(() => getMenuList(user.token));
  const [open, setOpen] = useState();
  const [checked, setChecked] = useState();

  const handleChange = (id) => {
    setChecked(id);
    getMenu(user.token, id).then((res) => {
      if (checked == "true") {
        res.active = true;
        updateMenu(id, res, user.token);
      } else {
        res.active = false;
        updateMenu(id, res, user.token);
      }
    });
  };

  if (isLoading) {
    return null;
  }
  return (
    <Box>
      <AppBarR></AppBarR>
      <Box>
        <Box sx={{ p: 1, m: 1 }}>
          <Typography align="center" variant="h6">
            Active Menu
          </Typography>
        </Box>
        {menuList.map((p, i) => (
          <Paper key={i} elevation={3} sx={{ p: 1, m: 1 }}>
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "center",
                bgcolor: "background.paper",
                borderRadius: 2,
                p: 2,
                minWidth: 300,
              }}
            >
              <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={2}>
                  <Switch
                    sx={{ ml: 10 }}
                    checked={checked == p.id}
                    onChange={() => handleChange(p.id)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ pt: 1 }}>
                    <Typography>{p.name}</Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ display: "flex", justifyContent: "left" }}
                >
                  <Box>
                    <Link
                      to={`/restaurant/menu/${p.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outlined" key={i} onClick={() => {}}>
                        View Menu
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
        <Link to="/restaurant/menu/">
          <Button>Back</Button>
        </Link>
      </Box>
    </Box>
  );
}
