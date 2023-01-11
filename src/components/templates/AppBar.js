import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ButtonAppBar({ buttonName }) {
  const [open, setOpen] = React.useState(false);

  const linkTo = () => {
    switch (buttonName) {
      case "ordered items":
        return "/ordered";
      case "back to menu":
        return "/main";
      default:
        return null;
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bon Appetit Cafe
          </Typography>
          <Link to={linkTo()}>
            <Button color="inherit" variant="contained">
              {buttonName}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
