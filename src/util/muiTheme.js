import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: '#rgb(117, 223, 198)', // Replace 'yourBackgroundColor' with your desired background color
          },
          barColorPrimary: {
            backgroundColor: 'rgb(243, 243, 243)', // Replace 'yourBarColor' with your desired progress bar color
          },
        },
      },
    },
  });