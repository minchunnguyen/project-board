import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const themeLight = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#efefef',
    },
  },
  overrides: {
    MuiTableRow: {
      root: {
        '&$selected': {
          backgroundColor: 'rgba(25, 118, 210, 0.14)',
        },
        '&$selected:hover': {
          backgroundColor: 'rgba(25, 118, 210, 0.14)',
        },
        '&$hover:hover': {
          backgroundColor: 'rgba(25, 118, 210, 0.14)',
        },
      },
    },
  },
});

export const themeDark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#518bc3',
    },
    secondary: {
      main: '#c53e53',
    },
    error: {
      main: red.A400,
    },
  },
  overrides: {
    MuiTableRow: {
      root: {
        '&$selected': {
          backgroundColor: 'rgba(81, 139, 195, 0.16)',
        },
        '&$selected:hover': {
          backgroundColor: 'rgba(81, 139, 195, 0.16)',
        },
        '&$hover:hover': {
          backgroundColor: 'rgba(81, 139, 195, 0.16)',
        },
      },
    },
  },
});
