import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Color azul principal
    },
    secondary: {
      main: '#ff9800', // Color secundario
    },
    background: {
      default: '#f5f5f5', // Color de fondo general
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;

