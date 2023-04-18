import React, { useState } from "react";
import { Formik } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import createCustomer from "../../api/createCustomer";
import updateMenu from "../../api/updateMenu";
import { useFetch } from "../../hooks/useFetch";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { SetMeal } from "@mui/icons-material";
import { useAuth } from "../../firebase";
import createMenu from "../../api/createMenu";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

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
  name: yup.string().required(),
  description: yup.string(),
  categories: yup.array(catSchema).min(1),
});

export default function AddMenuForm(setMenu) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [arr, setArr] = useState([{ id: [0] }]);
  const [snackBar, setSnackBar] = useState(false);
  const [severity, setSeverity] = useState();
  const [message, setMessage] = useState();

  const handleClose = () => {
    setSnackBar(false);
  };

  const addCat = (i) => {
    console.log("index", i);
    let array = [...arr];
    array.push({ id: [0] });
    setArr(array);

    console.log("arr add", arr);
  };

  const removeCat = (i) => {
    console.log("index", i);
    let array = [...arr];
    array = array.toSpliced(i, 1);
    setArr(array);
    console.log("arr remove", arr);
  };

  const addItem = (i, idx) => {
    console.log("index", i);
    let array = [...arr];
    array[i].id.push(array[i].id.length);
    setArr(array);

    console.log("arr add", arr);
  };

  const removeItem = (i, idx) => {
    let array = [...arr];
    array[i].id = array[i].id.toSpliced(idx, 1);
    console.log("update:", array);
    setArr(array);

    console.log("arr remove", arr);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      categories: [{ name: "apple" }],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      createMenu({ ...values, active: true }, user.token).then((res) => {
        if (res.status == 201) {
          setMessage("Menu Created!!");
          setSeverity("success");
          setSnackBar(true);
        } else {
          setMessage("Menu Creation failed, please try again");
          setSeverity("error");
          setSnackBar(true);
        }
      });
      console.log(values);
    },
  });
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Card sx={{ minWidth: 275, p: 2, m: 2 }} variant="outlined">
          <Box sx={{ p: 1, m: 1 }}>
            <Typography variant="h5" align="center">
              Create Menu
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <Box
                sx={{ display: "flex", justifyContent: "right", p: 1, m: 1 }}
              >
                <TextField
                  size="small"
                  required
                  label="Menu Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.menuName}
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", justifyContent: "left", p: 1, m: 1 }}>
                <TextField
                  size="small"
                  label="Description"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                ></TextField>
              </Box>
            </Grid>
          </Grid>
          {arr.map((p, i) => (
            <Box key={i}>
              <Box
                sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}
              >
                <Box>
                  <TextField
                    size="small"
                    required
                    label="Category"
                    name={`categories[${i}].name`}
                    onChange={formik.handleChange}
                    //   value={formik.values.categories[i]}
                  ></TextField>
                  <TextField
                    size="small"
                    label="Description"
                    name={`categories[${i}].description`}
                    onChange={formik.handleChange}
                    //   value={formik.values.categories[i]}
                  ></TextField>
                  <IconButton
                    onClick={() => {
                      addCat(i);
                    }}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      removeCat(i);
                    }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Box>
              {arr[i].id.map((p, idx) => (
                <Box key={idx}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 1,
                      m: 1,
                    }}
                  >
                    <Box>
                      <TextField
                        size="small"
                        required
                        label="Item"
                        name={`categories[${i}].items[${idx}].name`}
                        onChange={formik.handleChange}
                        //   value={formik.values.categories[i]}
                      ></TextField>
                      <IconButton
                        onClick={() => {
                          addItem(i, idx);
                        }}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          removeItem(i, idx);
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 1,
                      m: 1,
                    }}
                  >
                    <TextField
                      size="small"
                      label="Description"
                      name={`categories[${i}].items[${idx}].description`}
                      onChange={formik.handleChange}
                      //   value={formik.values.categories[i]}
                    ></TextField>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 1,
                      m: 1,
                    }}
                  >
                    <TextField
                      size="small"
                      required
                      label="Price"
                      name={`categories[${i}].items[${idx}].price`}
                      type="number"
                      onChange={formik.handleChange}

                      //   value={formik.values.categories[i]}
                    ></TextField>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <Button sx={{ p: 1, m: 1 }} variant="outlined" type="submit">
              Confirm
            </Button>
            <Button
              sx={{ p: 1, m: 1 }}
              variant="outlined"
              onClick={() => {
                navigate("/restaurant/menu");
              }}
            >
              Back
            </Button>
          </Box>
        </Card>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={snackBar}
        onClose={handleClose}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}
