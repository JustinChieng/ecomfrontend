import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { Container, Card, CardContent, Grid, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import { addUser } from "../../utils/api_users";


export default function Signup() {
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =  useState("");

  const addNewMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      enqueueSnackbar("Successfully created account", { variant: "success" });
      console.log(data)
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //trigger the mutation to call the API
    addNewMutation.mutate({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
  };

    return (
        <>
            <Container>
                <Header/>
                <Card>
        <CardContent>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm password"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleFormSubmit}>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
            </Container>
        </>
    )
}