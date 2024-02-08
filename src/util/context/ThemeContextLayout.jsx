import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Box, LinearProgress, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectGlobalLoad } from "../store/globalLoadSlice";

const theme = createTheme({
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "rgb(202, 232, 226)", // Replace 'yourBackgroundColor' with your desired background color
        },
        barColorPrimary: {
          backgroundColor: "rgb(117, 223, 198)", // Replace 'yourBarColor' with your desired progress bar color
        },
      },
    },
  },
});

const ThemeContextLayout = () => {
  const loading = useSelector(selectGlobalLoad);
  return (
    <ThemeProvider theme={theme}>
      {loading && (
        <Box sx={{ width: "100%", position: "fixed", top: "0" }}>
          <LinearProgress className="progress-bar" />
        </Box>
      )}
      <Outlet />
    </ThemeProvider>
  );
};

export default ThemeContextLayout;
