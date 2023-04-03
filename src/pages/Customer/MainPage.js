import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import AppBar from "../../components/templates/AppBar.js";
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
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [value, setValue] = useState(0);
  const [noItem, setNoItem] = useState(true);
  const [open, setOpen] = React.useState(false);

  const renderTab = () => {
    switch (value) {
      case 0:
        return <Appetizer addAmount={addAmount} />;
      case 1:
        return <MainCourse addAmount={addAmount} />;
      default:
        return null;
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addAmount = (data) => {
    const updatedSelectedItems = [...selectedItems];
    const updatingItem = updatedSelectedItems.find(
      (item) => data.name === item.name
    );
    if (updatingItem) {
      updatingItem.amount += 1;
    } else {
      updatedSelectedItems.push({ ...data, amount: 1 });
      console.log(selectedItems);
      setNoItem(false);
    }
    setSelectedItems(updatedSelectedItems);
  };

  const subtractAmount = (data, i) => {
    const updatedSelectedItems = [...selectedItems];
    const updatingItem = updatedSelectedItems.find(
      (item) => data.name === item.name
    );
    if (data.amount === 1) {
      updatedSelectedItems.splice(i, 1);
    } else {
      updatingItem.amount -= 1;
      console.log(selectedItems);
    }
    if (updatedSelectedItems.length === 0) {
      setNoItem(true);
      setOpen(false);
    }
    setSelectedItems(updatedSelectedItems);
  };

  const clearItem = () => {
    const tempOrderedItems = [...orderedItems];
    const tempSelectedItems = [...selectedItems];
    tempOrderedItems.forEach((ordereditem) => {
      const checkExisted = tempSelectedItems.find(
        (selecteditem) => selecteditem.name === ordereditem.name
      );

      if (checkExisted) {
        ordereditem.amount += checkExisted.amount;
        const index = tempSelectedItems.findIndex(() => checkExisted);
        tempSelectedItems.splice(index, 1);
      }
    });

    const updatedOrderedItems = [...tempOrderedItems, ...tempSelectedItems];
    updatedOrderedItems.forEach((item) => {
      const docData = item;
      addOrderedItems(item, item.name);
    });

    setSelectedItems([]);
    getOrderedItems(setOrderedItems);
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
      <AppBar buttonName={buttonName} />
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
          disabled={noItem}
        >
          Confirm Order
        </Button>
        <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
          <ConfirmOrder
            setNoItem={setNoItem}
            setOpen={setOpen}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            clearItem={clearItem}
            addAmount={addAmount}
            subtractAmount={subtractAmount}
          />
        </Dialog>
      </Box>
    </div>
  );
}
