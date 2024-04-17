import { createTheme } from '@mui/material/styles';
import {red} from '@mui/material/colors';

// Create a theme instance.
export const purpletheme = createTheme({
  palette: {
    primary: {
      main: "#262254",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

