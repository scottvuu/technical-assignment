import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Posts } from "./screens/Posts";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./screens/Auth/SignIn";
import SignUp from "./screens/Auth/SignUp";
import { AuthLayout } from "./layouts/AuthLayout";
import { MainLayout } from "./layouts/MainLayout";
import { AuthGuard } from "./components/widgets/AuthGuard";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <AuthGuard>
                    <AuthLayout />
                  </AuthGuard>
                }
              >
                <Route index path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />{" "}
              </Route>
              <Route element={<MainLayout />}>
                <Route index path="/post" element={<Posts />} />
              </Route>
              <Route index element={<Navigate to={"/post"} />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
