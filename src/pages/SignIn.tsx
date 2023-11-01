import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import axiosClient from "../utils/axiosClient";
import CachedIcon from "@mui/icons-material/Cached";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { login } = useAuth();
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: React.useCallback(async (values: any) => {
      try {
        setIsLoading(true);
        const response = await axiosClient.post("/users/login", values);
        if (response.status === 200) {
          window.localStorage.setItem("token", response.data.data.token);
          window.localStorage.setItem(
            "user",
            JSON.stringify(response.data.data)
          );
          enqueueSnackbar("Sign in successful", { variant: "success" });
          login(response.data.data);
          navigate("/", { replace: true });
        }
        console.log(response);
      } catch (error: any) {
        console.log("error", error);
        if (error.response.data.message) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        }
      } finally {
        setIsLoading(false);
      }

      console.log(values);
    }, []),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormikProvider value={loginFormik}>
          <Box
            component="form"
            onSubmit={loginFormik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              error={
                loginFormik.touched.email && Boolean(loginFormik.errors.email)
              }
              helperText={loginFormik.touched.email && loginFormik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              error={
                loginFormik.touched.password &&
                Boolean(loginFormik.errors.password)
              }
              helperText={
                loginFormik.touched.password && loginFormik.errors.password
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
              startIcon={isLoading && <CachedIcon />}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link to={"/"}>Forgot password?</Link>
              </Grid> */}
              <Grid item>
                <Link to={"/signup"}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </FormikProvider>
      </Box>
    </Container>
  );
}
