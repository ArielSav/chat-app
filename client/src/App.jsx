import React from 'react';
import ThemeProvider from './theme';
import Router from './Router';
import { Provider } from './Provider';


function App() {
  return (
    <Provider>
          <ThemeProvider>
        <Router />  
      </ThemeProvider>
    </Provider>
    );
}

export default App;
