import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { ListItemIcon } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import createOrder from "../../api/createOrder";

export default function ConfirmOrder({
  setNoItem,
  setOpen,
  selectedItems,
  setSelectedItems,
  clearItem,
  subtractAmount,
  addAmount,
  id,
  data,
  menu,
}) {
  const postOrder = (id, body) => {
    console.log(body);
    createOrder("", id, "customer", body);
  };
  const tempSelectedItems = [...selectedItems];
  const cancelItem = (i) => {
    tempSelectedItems.splice(i, 1);
    setSelectedItems(tempSelectedItems);
    tempSelectedItems = selectedItems;
  };
  const displayName = (menu, id) => {
    console.log(menu, id);
    for (let i = 0; i < menu.categories.length; i++) {
      for (let j = 0; j < menu.categories[i].items.length; j++) {
        console.log(menu.categories[i].items[j].id, id);
        if (menu.categories[i].items[j].id === id) {
          return menu.categories[i].items[j].name;
        }
        // console.log(menu.categories[i].items.find((item) => item.id === id));
        // return menu.categories[i].items.find((item) => item.id === id);
      }
    }
  };

  return (
    <div>
      <List>
        {data.items.map((p, i) => (
          <ListItem key={i}>
            <Grid container>
              <Grid item xs={7}>
                <ListItemText key={i}>
                  {displayName(menu, p.menuItemId)}
                </ListItemText>
              </Grid>
              <Grid item xs={2}>
                <Button>
                  <ListItemIcon
                    onClick={() => {
                      subtractAmount(p, p.menuItemId);
                    }}
                  >
                    <RemoveIcon />
                  </ListItemIcon>
                </Button>
              </Grid>
              <Grid item xs={1}>
                <ListItemText>{p.quantity}</ListItemText>
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={() => {
                    addAmount(p, p.menuItemId);
                  }}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Button
        onClick={() => {
          setNoItem(true);
          setOpen(false);
          clearItem();
          postOrder(id, data);
        }}
      >
        Confirm Order
      </Button>
    </div>
  );
}
