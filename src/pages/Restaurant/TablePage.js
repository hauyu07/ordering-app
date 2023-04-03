import React from "react";
import Box from "@mui/material/Box";
import AppBarR from "../../components/templates/AppBarR";
import Button from "@mui/material/Button";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function TablePage() {
  const numbers = [4, 4, 2, 4, 4, 2, 4, 4, 2];

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
    </Box>
  );
}
