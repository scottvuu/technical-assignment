import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AUTH_CARD_WIDTH } from "constants/form";
import { useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "store";
import { usersSelector } from "store/selectors/user";
import { indexingArray } from "utils/data";
import { addUser } from "store/slices/user";
import { Link as LinkMui } from "@mui/material";
import { Link } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
};

type Values = typeof initialValues;

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  username: Yup.string()
    .trim()
    .required("Username is required")
    .min(8, "Username must be at least 8 characters long")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username should not contain special characters"
    ),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password should not contain special characters"
    ),
});

export default function SignUp() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const users = useAppSelector(usersSelector);

  const submitHandler = async (values: Values) => {
    const indexingUserByUsername = indexingArray(users, "username");
    if (indexingUserByUsername[values.username]) {
      formik.setFieldError("userName", "This username already exists");
      throw new Error("Username already exists");
    } else {
      dispatch(addUser(values));
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: submitHandler,
    validationSchema: validationSchema,
  });

  return (
    <Box m={"auto"} maxWidth={AUTH_CARD_WIDTH}>
      <Box boxShadow={theme.palette.card?.shadow}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  size="small"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  size="small"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  size="small"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => formik.handleSubmit()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in">
                  <LinkMui href="#" variant="body2">
                    Already have an account? Sign in
                  </LinkMui>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
