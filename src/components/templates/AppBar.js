import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ButtonAppBar({ buttonName }) {
  const params = useParams();
  const [open, setOpen] = React.useState(false);

  const linkTo = () => {
    switch (buttonName) {
      case "ordered items":
        return `/${params.customerId}/ordered`;
      case "back to menu":
        return `/${params.customerId}/main`;
      default:
        return null;
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Ordering System
          </Typography>
          <Link to={linkTo()} style={{ textDecoration: "none" }}>
            <Button color="info" variant="contained">
              {buttonName}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
