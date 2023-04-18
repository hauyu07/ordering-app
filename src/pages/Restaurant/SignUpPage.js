import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase";
import { useFormik } from "formik";
import Card from "@mui/material/Card";
import signUp from "../../api/signUp";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Snackbar from "@mui/material/Snackbar";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
  username: yup.string().required(),
  restaurantName: yup.string().required(),
});

export default function SignUpPage() {
  const { createUser, updateUser, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const handleClose = () => {
    setOpen(false);
    if (severity == "success") {
      navigate("/restaurant/login");
    }
  };

  const signUpUser = (username, restaurantName, token) => {
    updateUser(restaurantName);
    signUp(username, restaurantName, token).then((res) => {
      if (res.status == 201) {
        console.log("success");
        setMessage("Signed Up successfully! Please Login to the system!");
        setSeverity("success");
        setOpen(true);
      } else {
        setMessage("Sign Up fail! Please try again");
        setSeverity("error");
        setOpen(true);
      }
    });
  };

  const emailSignUp = (email, password, username, restaurantName) => {
    createUser(email, password, restaurantName).then(async (res) => {
      let token = res.user.accessToken;
      signUpUser(username, restaurantName, token);
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      restaurantName: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      emailSignUp(
        values.email,
        values.password,
        values.username,
        values.restaurantName
      );
    },
  });
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Card sx={{ minWidth: 275 }}>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={open}
            onClose={handleClose}
          >
            <Alert severity={severity}>{message}</Alert>
          </Snackbar>
          <Box sx={{ p: 1, m: 1 }}>
            <Typography variant="h5" align="center">
              Sign Up for the Online Ordering System
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <TextField
              required
              label="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <TextField
              required
              label="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <TextField
              required
              label="Username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <TextField
              required
              label="Restaurant Name"
              name="restaurantName"
              onChange={formik.handleChange}
              value={formik.values.restaurantName}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <Button variant="outlined" type="submit">
              Sign Up
            </Button>
          </Box>
        </Card>
      </form>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
        <Link to="/restaurant" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Return To Home</Button>
        </Link>
      </Box>
    </Box>
  );
}
