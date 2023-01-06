import * as React from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";

export default function ConfirmOrder({ setNoItem, setOpen }) {
  return (
    <div>
      <List>main course</List>
      <Button
        onClick={() => {
          setNoItem(true);
          setOpen(false);
        }}
      >
        Confirm Order
      </Button>
    </div>
  );
}
