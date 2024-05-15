import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Container, Card, CardContent, Grid, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import { loginUser } from "../../utils/api_users";

export default function Login() {
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addNewMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      enqueueSnackbar("Successfully Login", { variant: "success" });
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
      email: email,
      password: password,
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
              <Button variant="contained" fullWidth onClick={handleFormSubmit}>
                Login
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
            </Container>
        </>
    )
}
