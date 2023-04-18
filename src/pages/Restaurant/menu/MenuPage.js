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
import getMenu from "../../../api/getMenu.js";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AddItemForm from "../../../components/templates/AddItemForm.js";
import { Link } from "react-router-dom";
import AddCategoryForm from "../../../components/templates/AddCategoryForm.js";

export default function MenuPageR() {
  const { user } = useAuth();
  const params = useParams();

  console.log(params.menuId);

  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [type, setType] = useState();
  const [indexes, setIndexes] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEdit = (i) => {
    setType("edit");
    setIndexes({ categories: value, items: i });
    setOpen(true);
  };

  const { data: menu, isLoading } = useFetch(() =>
    getMenu(user.token, params.menuId)
  );

  if (isLoading) {
    return null;
  }

  return (
    <Box>
      <AppBarR />
      <Box>
        <Tabs value={value} onChange={handleChange}>
          {menu.categories.map((p, i) => (
            <Tab label={p.name} key={i} />
          ))}
        </Tabs>
        <Box sx={{ display: "flex", justifyContent: "right", p: 1, m: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setCatOpen(true);
            }}
          >
            Add Category
          </Button>
        </Box>
      </Box>
      <Box>
        {menu.categories[value].items.map((p, i) => (
          <Box
            key={i}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 2,
              minWidth: 300,
            }}
          >
            <Paper elevation={3}>
              <Grid container>
                <Grid item xs={10}>
                  <Box sx={{ p: 1, m: 1 }}>
                    <Typography>{p.name}</Typography>
                    <Typography>Price: ${p.price}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ p: 2, m: 1 }}>
                    <Button variant="outlined" onClick={() => handleEdit(i)}>
                      Edit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 1, m: 1 }}>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
            setType("");
          }}
        >
          Add Item
        </Button>
      </Box>
      <Dialog open={open}>
        <AddItemForm
          id={params.menuId}
          menu={menu}
          idx={value}
          token={user.token}
          setOpen={setOpen}
          type={type}
          indexes={indexes}
        />
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </Button>
      </Dialog>
      <Dialog open={catOpen}>
        <AddCategoryForm
          menu={menu}
          id={params.menuId}
          token={user.token}
          setCatOpen={setCatOpen}
        />
        <Button onClick={() => setCatOpen(false)}>Back</Button>
      </Dialog>
      <Box sx={{ p: 1, m: 1 }}>
        <Link to="/restaurant/menu/select-active">
          <Button>Back</Button>
        </Link>
      </Box>
    </Box>
  );
}
