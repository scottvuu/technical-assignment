import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AUTH_CARD_WIDTH } from "constants/form";
import { Link as LinkMui, useTheme } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { indexingArray } from "utils/data";
import { useAppDispatch, useAppSelector } from "store";
import { usersSelector } from "store/selectors/user";
import { hash } from "utils/encryptDecrypt";
import { login } from "store/slices/user";
import { User } from "src/models/user";

const initialValues = {
  username: "",
  password: "",
};

type Values = typeof initialValues;

const validationSchema = Yup.object({
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

export default function SignIn() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(usersSelector);
  const theme = useTheme();

  const submitHandler = (values: Values) => {
    const indexingUserByUsername = indexingArray(users, "username");
    const user = indexingUserByUsername[values.username];
    if (!indexingUserByUsername[values.username]) {
      formik.setFieldError("username", "This username does not exist");
      throw new Error("Username does not exist");
    }
    const hasPasswordMatch = hash(values.password!).hashed === user?.password
    if(!hasPasswordMatch){
      formik.setFieldError("password", "Password does not match");
      throw new Error("Password does not match");
    }
    console.log(122);
    
    dispatch(login(user as User));
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
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.errors.username}
            />
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.errors.password}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => formik.handleSubmit()}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-up">
                  <LinkMui href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
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
