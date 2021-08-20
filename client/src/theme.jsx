import React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createGenerateClassName,
  createTheme,
  StylesProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();



const theme = createTheme({
    palette: {
      primary: {
        main: '#010057',
      },
      secondary: {
        main: '#5f5f5f',
      },
    },
  
    typography: {
      useNextVariants: true,
      fontFamily: "'Assistant'",
    },
  });

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => (
    <StylesProvider generateClassName ={generateClassName} >
        <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
    </StylesProvider>
);

export default ThemeProvider;
