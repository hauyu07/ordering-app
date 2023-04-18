import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { Button, TextField } from "@mui/material";
import AppBar from "../../components/templates/AppBar.js";
import Appetizer from "../../components/modules/Appetizers.js";
import MainCourse from "../../components/modules/MainCourses.js";
import { useFetch } from "../../hooks/useFetch.js";
import { queryforCategory } from "../../firebase";
import ConfirmOrder from "../../components/templates/ConfirmOrderDialog";
import "../../firebase.js";
import { addOrderedItems } from "../../firebase";
import getOrderedItems from "../../api/getOrderedItems.js";
import getMenu from "../../api/getMenu.js";
import { useNavigate, useParams } from "react-router-dom";
import Filter from "../../components/templates/Filter.js";

export default function MainPage() {
  const [buttonName, setButtonName] = useState("ordered items");
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [value, setValue] = useState(0);
  const [noItem, setNoItem] = useState(true);
  const [open, setOpen] = React.useState(false);

  const params = useParams();

  const [data, setData] = useState({
    tableNumber: "2",
    items: [],
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addAmount = (res, id) => {
    // const updatedSelectedItems = [...selectedItems];
    // const updatingItem = updatedSelectedItems.find(
    //   (item) => data.name === item.name
    // );
    // if (updatingItem) {
    //   updatingItem.amount += 1;
    // } else {
    //   updatedSelectedItems.push({ ...data, amount: 1, id: id });
    //   console.log(selectedItems);
    //   setNoItem(false);
    // }
    // setSelectedItems(updatedSelectedItems);
    // setData({
    //   tableNumber: "",
    //   items: [{ menuItemId: "", quantity: "", remarks: "" }],
    // });

    const index = data.items.findIndex((item) => item.menuItemId == id);
    let temp = { ...data };
    if (index == -1) {
      temp.items.push({ menuItemId: res.id, quantity: 1, remarks: "" });
      setData(temp);
      setNoItem(false);
      console.log(data);
    } else {
      temp.items[index].quantity += 1;
      setData(temp);
      setNoItem(false);
      console.log(data);
    }
  };

  const subtractAmount = (res, id) => {
    // const updatedSelectedItems = [...selectedItems];
    // const updatingItem = updatedSelectedItems.find(
    //   (item) => data.name === item.name
    // );
    // if (data.amount === 1) {
    //   updatedSelectedItems.splice(i, 1);
    // } else {
    //   updatingItem.amount -= 1;
    //   console.log(selectedItems);
    // }
    // if (updatedSelectedItems.length === 0) {
    //   setNoItem(true);
    //   setOpen(false);
    // }
    // setSelectedItems(updatedSelectedItems);
    const index = data.items.findIndex((item) => item.menuItemId == id);
    const getValue = data.items.find((item) => item.menuItemId == id);
    let temp = { ...data };
    if (getValue.quantity === 1) {
      temp.items.splice(index, 1);
      setData(temp);
      console.log(data);
    } else {
      temp.items[index].quantity -= 1;
      setData(temp);
      console.log(data);
    }
    if (data.items.length === 0) {
      setNoItem(true);
      setOpen(false);
    }
  };

  const clearItem = () => {
    // const tempOrderedItems = [...orderedItems];
    // const tempSelectedItems = [...selectedItems];
    // tempOrderedItems.forEach((ordereditem) => {
    //   const checkExisted = tempSelectedItems.find(
    //     (selecteditem) => selecteditem.name === ordereditem.name
    //   );
    //   if (checkExisted) {
    //     ordereditem.amount += checkExisted.amount;
    //     const index = tempSelectedItems.findIndex(() => checkExisted);
    //     tempSelectedItems.splice(index, 1);
    //   }
    // });
    // const updatedOrderedItems = [...tempOrderedItems, ...tempSelectedItems];
    // updatedOrderedItems.forEach((item) => {
    //   const docData = item;
    //   addOrderedItems(item, item.name);
    // });
    // setSelectedItems([]);
    // getOrderedItems(setOrderedItems);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data: menu, isLoading } = useFetch(() =>
    getMenu("", params.customerId, "customer")
  );

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <AppBar buttonName={buttonName} />
      <Box>
        <Tabs value={value} onChange={handleChange}>
          {menu.categories.map((p, i) => (
            <Tab label={p.name} key={i} />
          ))}
        </Tabs>
      </Box>
      {/* <Filter /> */}
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
          <Button
            variant="outlined"
            key={i}
            onClick={() => {
              addAmount(p, p.id);
            }}
          >
            {p.name}
          </Button>
        </Box>
      ))}
      <Box sx={{ pl: 2 }}>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          disabled={noItem}
          variant="contained"
          color="info"
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
            id={params.customerId}
            data={data}
            menu={menu}
          />
        </Dialog>
      </Box>
    </div>
  );
}
