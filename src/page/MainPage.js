import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Outlet, Link } from "react-router-dom";
import AppBar from "../AppBar.js";
import Appetizer from "../menuPages/Appetizer.js";
import Dialog from "@mui/material/Dialog";
import ConfirmOrder from "./ConfirmOrderDialog.js";

var menuCategory = [
  {
    id: "1",
    name: "appetizer",
  },
  {
    id: "2",
    name: "main course",
  },
];

export default function MainPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [noItem, setNoItem] = useState(true);
  const allSelectedItems = [];

  const passData = (data) => {
    allSelectedItems.push(data);
    console.log(allSelectedItems);
    setNoItem(false);
  };

  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar />
      <Box>
        <Tabs value={value} onChange={handleChange}>
          {menuCategory.map((p, i) => (
            <Tab
              component={Link}
              to={{
                pathname: `${p.name}`,
                state: { passData: passData },
              }}
              label={p.name}
              key={i}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        <Outlet />
      </Box>
      <Box>
        <Button
          onClick={() => {
            openDialog();
          }}
          disabled={noItem}
        >
          Confirm Order
        </Button>
        <Dialog open={open} onClose={!open} disableEscapeKeyDown>
          <ConfirmOrder setNoItem={setNoItem} setOpen={setOpen} />
        </Dialog>
        <Appetizer passData={passData} />
      </Box>
    </div>
  );
}
