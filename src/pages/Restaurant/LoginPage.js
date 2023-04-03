import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "../../img/background.jpeg";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { loginUser, checkState } from "../../firebase";
import { useNavigate } from "react-router-dom";
import login from "../../api/rlogin";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    // const user = await loginUser(email, password);
    const user = { name: name, password: password };
    const res = await login(user);
    if (user === "logined") {
      navigate("/restaurant/main");
    }
  };

  return (
    <Box component="form" align="center">
      <Typography variant="h4">Bon Appetit Cafe</Typography>
      <Box>
        <TextField
          id="Name"
          label="Name"
          variant="outlined"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Box>
      <Box>
        <TextField
          id="Password"
          label="Password"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Box>
      <Button onClick={handleSubmit}>Login</Button>
    </Box>
  );
}
