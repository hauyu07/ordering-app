import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { queryforOrderedItems } from "../firebase";
import { useFetch } from "../hooks/useFetch";
import AppBar from "../components/templates/AppBar";
import { Divider, Grid } from "@mui/material";

export default function OrderedItems() {
  const [buttonName, setButtonName] = useState("back to menu");

  const { data: orderedItems, isLoading } = useFetch(() =>
    queryforOrderedItems()
  );

  if (isLoading) {
    return null;
  }
  return (
    <div>
      <AppBar buttonName={buttonName} />
      <ListItem>
        <Grid container>
          <Grid item xs={9}>
            <ListItemText>Ordered Items</ListItemText>
          </Grid>
          <Grid item xs={3}>
            <ListItemText>Amount</ListItemText>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
      <List>
        {orderedItems.map((p, i) => (
          <ListItem key={i}>
            <Grid container>
              <Grid item xs={10}>
                <ListItemText key={i}>{p.name}</ListItemText>
              </Grid>
              <Grid item xs={2}>
                <ListItemText key={i}>{p.amount}</ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
