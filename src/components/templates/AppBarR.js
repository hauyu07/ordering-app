import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { logout } from "../../firebase";
import { useAuth } from "../../firebase";

export default function AppBarR() {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  console.log(user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Ordering System
          </Typography>
          <Link to="/restaurant/main" style={{ textDecoration: "none" }}>
            <Button color="info" variant="contained">
              Main Page
            </Button>
          </Link>
          <Box width={10}></Box>
          <Link to="/restaurant" style={{ textDecoration: "none" }}>
            <Button
              color="info"
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
