import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QRCode from "react-qr-code";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

export default function QRCodeCard({ table, headCount }) {
  const openCustomerTab = () => {
    console.log(window.location.origin);
    window.open(
      `${window.location.origin}/customer`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
        }}
      >
        <Typography align="center">QRCode Generated</Typography>
      </Box>
      <Box sx={{ p: 1, m: 1 }}>
        <Paper elevation={3}>
          <Box sx={{ p: 1, m: 1 }}>
            <Typography variant="h5" align="center">
              Table {table}
            </Typography>
          </Box>
          <Typography align="center">Head Count: {headCount}</Typography>
          <Typography variant="h5" align="center">
            Scan to order
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
            }}
          >
            <Button onClick={openCustomerTab}>
              <QRCode
                title="Restaurant"
                value={"test"}
                bgColor={"white"}
                size={200}
              />
            </Button>
          </Box>
        </Paper>
      </Box>
    </Card>
  );
}
