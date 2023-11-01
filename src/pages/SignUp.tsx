import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import axiosClient from "../utils/axiosClient";
import CachedIcon from "@mui/icons-material/Cached";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const singupFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: React.useCallback(async (values: any) => {
      try {
        setIsLoading(true);
        const response = await axiosClient.post("users/register", values);
        console.log(response);
        if (response.status === 201) {
          enqueueSnackbar("Sign up successful", { variant: "success" });
          navigate("/signin");
        }
      } catch (error: any) {
        console.log("error", error);
        if (error.response.data.message) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        }
      } finally {
        setIsLoading(false);
      }
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
          Sign up
        </Typography>
        <FormikProvider value={singupFormik}>
          <Box
            component="form"
            noValidate
            onSubmit={singupFormik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="FullName"
                  autoFocus
                  value={singupFormik.values.name}
                  onChange={singupFormik.handleChange}
                  error={
                    singupFormik.touched.name &&
                    Boolean(singupFormik.errors.name)
                  }
                  helperText={
                    singupFormik.touched.name && singupFormik.errors.name
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={singupFormik.values.email}
                  onChange={singupFormik.handleChange}
                  error={
                    singupFormik.touched.email &&
                    Boolean(singupFormik.errors.email)
                  }
                  helperText={
                    singupFormik.touched.email && singupFormik.errors.email
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={singupFormik.values.password}
                  onChange={singupFormik.handleChange}
                  error={
                    singupFormik.touched.password &&
                    Boolean(singupFormik.errors.password)
                  }
                  helperText={
                    singupFormik.touched.password &&
                    singupFormik.errors.password
                  }
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
              startIcon={isLoading && <CachedIcon />}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </FormikProvider>
      </Box>
    </Container>
  );
}
