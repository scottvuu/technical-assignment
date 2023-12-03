import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: "2rem 1rem",
      }}
    >
      <Outlet />
    </Box>
  );
};
