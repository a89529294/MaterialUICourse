import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './ui/Header';
import theme from './ui/Theme';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Header />
        hello
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
