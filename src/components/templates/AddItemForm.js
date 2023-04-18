import React, { useState, useEffect } from "react";
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

const schema = yup.object({
  name: yup.string().required(),
  price: yup.number().required(),
});

export default function AddItemForm({
  id,
  menu,
  idx,
  token,
  setOpen,
  type,
  indexes,
}) {
  const [title, setTitle] = useState();
  const [nameValue, setNameValue] = useState();

  useEffect(() => {
    if (type == "edit") {
      setTitle("Edit Item");
      setNameValue(
        menu.categories[indexes.categories].items[indexes.items].name
      );
    } else {
      setTitle(`Add ${menu.categories[idx].name}`);
      setNameValue(formik.values.name);
    }
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      menu.categories[idx].items.push(values);
      console.log(menu);
      updateMenu(id, menu, token);
      setOpen(false);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={{ minWidth: 275 }}>
        <Box sx={{ p: 1, m: 1 }}>
          <Typography variant="h5" align="center">
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
          <TextField
            required
            label="Item Name"
            name="name"
            onChange={formik.handleChange}
            defaultValue={nameValue}
          ></TextField>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
          <TextField
            label="Description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          ></TextField>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
          <TextField
            required
            label="Price"
            name="price"
            onChange={formik.handleChange}
            type="number"
            value={formik.values.price}
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
