import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dialog from "@mui/material/Dialog";
import OrderedItems from "./OrderedItemsDialog";

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ABC Restaurant
          </Typography>
          <Button color="inherit" onClick={openDialog}>
            Ordered Items
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
        <OrderedItems />
      </Dialog>
    </Box>
  );
}
