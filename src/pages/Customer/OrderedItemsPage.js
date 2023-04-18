import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// import { queryforOrderedItems } from "../../firebase";
import getOrderedItems from "../../api/getOrderedItems";
import { useFetch } from "../../hooks/useFetch";
import AppBar from "../../components/templates/AppBar";
import { Divider, Grid, Paper, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderedItems() {
  const params = useParams();
  const [buttonName, setButtonName] = useState("back to menu");

  const { data: orderedItems, isLoading } = useFetch(() =>
    getOrderedItems("", "customer", params.customerId)
  );

  if (isLoading) {
    return null;
  }
  return (
    <div>
      <AppBar buttonName={buttonName} />
      {orderedItems.map((p, idx) => (
        <Paper sx={{ p: 1, m: 1 }} elevation={3}>
          <ListItem>
            <Grid container>
              <Grid item xs={7}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <ListItemText>Ordered Items</ListItemText>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <ListItemText>Quantity</ListItemText>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <ListItemText>Price</ListItemText>
                </Box>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
          <List>
            {orderedItems[idx].items.map((p, i) => (
              <ListItem key={i}>
                <Grid container>
                  <Grid item xs={8}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ListItemText key={i}>{p.name}</ListItemText>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ListItemText key={i}>{p.quantity}</ListItemText>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ListItemText key={i}>
                        {p.price * p.quantity}
                      </ListItemText>
                    </Box>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
      <Grid container>
        <Grid item xs={5}></Grid>
        <Grid item xs={4}>
          <Box sx={{ display: "flex", justifyContent: "right", pr: 2, m: 2 }}>
            <Typography>Total Price:</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              pr: 2,
              m: 2,
            }}
          >
            <Typography>{orderedItems[0].totalPrice}</Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
