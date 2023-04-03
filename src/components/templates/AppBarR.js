import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { logout } from "../../firebase";

export default function AppBarR({ buttonName }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bon Appetit Cafe
          </Typography>
          <Link to="/restaurant/main">
            <Button color="inherit" variant="contained">
              Main Page
            </Button>
          </Link>
          <Link to="/restaurant/login">
            <Button
              color="inherit"
              variant="contained"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
