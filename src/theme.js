import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#01bfa6",
    },
    secondary: {
      main: "#ababab",
    },
    error: {
      main: "#FB6376",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "white",
        },
        outlined: {
          backgroundColor: "white",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Kanit", "sans-serif"].join(","),
    button: {
      textTransform: "none",
      textDecoration: "none",
    },
  },
});

export default theme;
