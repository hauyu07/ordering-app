import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { ListItemIcon } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";

export default function ConfirmOrder({
  setNoItem,
  setOpen,
  selectedItems,
  setSelectedItems,
  clearItem,
  subtractAmount,
  addAmount,
}) {
  const tempSelectedItems = [...selectedItems];
  const cancelItem = (i) => {
    tempSelectedItems.splice(i, 1);
    setSelectedItems(tempSelectedItems);
    tempSelectedItems = selectedItems;
  };
  return (
    <div>
      <List>
        {tempSelectedItems.map((p, i) => (
          <ListItem key={i}>
            <Grid container>
              <Grid item xs={7}>
                <ListItemText key={i}>{p.name}</ListItemText>
              </Grid>
              <Grid item xs={2}>
                <Button>
                  <ListItemIcon
                    onClick={() => {
                      subtractAmount(tempSelectedItems[i], i);
                    }}
                  >
                    <RemoveIcon />
                  </ListItemIcon>
                </Button>
              </Grid>
              <Grid item xs={1}>
                <ListItemText>{p.amount}</ListItemText>
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={() => {
                    addAmount(tempSelectedItems[i]);
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
        }}
      >
        Confirm Order
      </Button>
    </div>
  );
}
