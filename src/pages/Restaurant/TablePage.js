import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AppBarR from "../../components/templates/AppBarR";
import Button from "@mui/material/Button";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import HeadCountForm from "../../components/templates/HeadCountForm";
import QRCodeCard from "../../components/templates/QRCodeCard";
import { useAuth } from "../../firebase";

export default function TablePage() {
  const { user } = useAuth();
  const numbers = [4, 4, 2, 4, 4, 2, 4, 4, 2];
  const [headCount, setHeadCount] = useState();
  const [open, setOpen] = useState(false);
  const [num, setNum] = useState();
  const [table, setTable] = useState();
  const [step, setStep] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const generateQRcode = () => {
    setNum(Math.floor(Math.random() * 101));
  };

  const renderFormStep = (step) => {
    if (!step) {
      return;
    }

    if (step === 1) {
      return (
        <HeadCountForm
          table={table}
          setStep={setStep}
          setHeadCount={setHeadCount}
          token={user.token}
        />
      );
    }
    if (step === 2) {
      return <QRCodeCard table={table} headCount={headCount} />;
    }
  };

  return (
    <Box>
      <AppBarR />
      <Box sx={{ m: 6, border: 1 }}>
        <Grid container>
          {numbers.map((number, index) => (
            <Grid item xs={4} key={index}>
              <Box>
                <Button
                  sx={{
                    m: 4,
                    border: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onClick={() => {
                    generateQRcode();
                    setTable(index + 1);
                    setStep(1);
                    setOpen(true);
                  }}
                >
                  <Typography>Table {index + 1}</Typography>
                  <div>
                    {[...Array(number).fill(0)].map((_, i) => (
                      <ChairAltIcon fontSize="large" key={i} />
                    ))}
                  </div>
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        {renderFormStep(step)}
      </Dialog>
    </Box>
  );
}
