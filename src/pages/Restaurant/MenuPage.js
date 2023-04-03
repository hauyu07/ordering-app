import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import AppBarR from "../../components/templates/AppBarR.js";
import Appetizer from "../../components/modules/Appetizers.js";
import MainCourse from "../../components/modules/MainCourses.js";
import { useFetch } from "../../hooks/useFetch.js";
import { queryforCategory } from "../../firebase";
import ConfirmOrder from "../../components/templates/ConfirmOrderDialog";
import "../../firebase.js";
import { addOrderedItems } from "../../firebase";
import { getOrderedItems } from "../../api/orderedItems.js";

export default function MainPage() {
  const [buttonName, setButtonName] = useState("ordered items");
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);

  const renderTab = () => {
    switch (value) {
      case 0:
        return <Appetizer />;
      case 1:
        return <MainCourse />;
      default:
        return null;
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data: menuCategory, isLoading } = useFetch(queryforCategory);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <AppBarR buttonName={buttonName} />
      <Box>
        <Tabs value={value} onChange={handleChange}>
          {menuCategory.map((p, i) => (
            <Tab label={p.name} key={i} />
          ))}
        </Tabs>
      </Box>
      <Box>{renderTab()}</Box>

      <Box>
        <Button
          onClick={() => {
            openDialog();
          }}
        >
          Add Item
        </Button>
        <Dialog open={open} onClose={handleClose} disableEscapeKeyDown></Dialog>
      </Box>
    </div>
  );
}
