import React, { useState } from "react";
import { Formik } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import createCustomer from "../../api/createCustomer";
import * as yup from "yup";

const schema = yup.object({
  headCount: yup.number().required(),
});

export default function HeadCountForm({
  table,
  setStep,
  setHeadCount,
  token,
  setCustomerId,
}) {
  const handleSubmit = () => {};

  const formik = useFormik({
    initialValues: {
      headCount: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setHeadCount(values.headCount);
      const num = Number(values.headCount);
      createCustomer(table, num, token)
        .then((res) => res.text())
        .then((text) => {
          text = text.substring(15, text.length - 2);
          console.log(text);
          setCustomerId(text);
          setStep(2);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={{ minWidth: 275 }}>
        <Box sx={{ p: 1, m: 1 }}>
          <Typography variant="h5" align="center">
            Table {table}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
          <TextField
            required
            label="Head Count"
            name="headCount"
            onChange={formik.handleChange}
            value={formik.values.headCount}
          ></TextField>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
          <Button variant="outlined" type="submit">
            Confirm
          </Button>
        </Box>
      </Card>
    </form>
  );
}
