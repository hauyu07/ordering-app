import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase";
import { Link } from "react-router-dom";

export default function Login() {
  const { loginUser, user } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    if (await loginUser(email, password)) {
      console.log(user);
      console.log(user.token);
      navigate("/restaurant/main");
    }
  };

  return (
    <Box component="form" align="center">
      <Typography variant="h4">Bon Appetit Cafe</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
        <TextField
          id="Email"
          label="Email"
          variant="outlined"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
        <TextField
          id="Password"
          label="Password"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Box>
      <Button onClick={handleSubmit} variant="outlined">
        Login
      </Button>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
        <Link to="/restaurant" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Return To Home</Button>
        </Link>
      </Box>
    </Box>
  );
}
