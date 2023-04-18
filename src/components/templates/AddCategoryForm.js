import React, { useState } from "react";
import { Formik } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import createCustomer from "../../api/createCustomer";
import updateMenu from "../../api/updateMenu";
import { useFetch } from "../../hooks/useFetch";
import * as yup from "yup";
import Dialog from "@mui/material/Dialog";

const menuItemSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  price: yup.number().required(),
});

const catSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  items: yup.array(menuItemSchema).min(1),
});

const schema = yup.object({
  categories: yup.array(catSchema).required(),
});

export default function AddCategoryForm({ menu, id, token, setCatOpen }) {
  const formik = useFormik({
    initialValues: {
      categories: [{ name: "apple" }],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      menu.categories.push(values.categories[0]);
      updateMenu(id, menu, token);
      setCatOpen(false);
    },
  });
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Card sx={{ minWidth: 275 }}>
          <Typography sx={{ p: 1, m: 1 }} variant="h5" align="center">
            Add Category
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <TextField
              size="small"
              required
              label="Category"
              name="categories[0].name"
              onChange={formik.handleChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <TextField
              size="small"
              required
              label="Item"
              name="categories[0].items[0].name"
              onChange={formik.handleChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <TextField
              size="small"
              required
              label="Price"
              type="number"
              name="categories[0].items[0].price"
              onChange={formik.handleChange}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <Button sx={{ p: 1, m: 1 }} variant="outlined" type="submit">
              Confirm
            </Button>
          </Box>
        </Card>
      </form>
    </Box>
  );
}
