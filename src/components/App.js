import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './ui/Header';
import theme from './ui/Theme';
import Footer from './ui/Footer';
import LandingPage from './LandingPage';
import Services from './Services'

function App() {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header
            value={value}
            setValue={setValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <LandingPage
                  {...props}
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            />
            <Route
              exact
              path="/services"
              render={(props) => (
                <Services
                  {...props}
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            />
            <Route
              exact
              path="/customsoftware"
              component={() => <div>customsoftware</div>}
            />
            <Route
              exact
              path="/mobileapps"
              component={() => <div>mobileapps</div>}
            />
            <Route
              exact
              path="/websites"
              component={() => <div>websites</div>}
            />
            <Route
              exact
              path="/revolution"
              component={() => <div>revolution</div>}
            />
            <Route exact path="/about" component={() => <div>about</div>} />
            <Route exact path="/contact" component={() => <div>contact</div>} />
            <Route
              exact
              path="/estimate"
              component={() => <div>estimate</div>}
            />
          </Switch>
          <Footer setValue={setValue} setSelectedIndex={setSelectedIndex} />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
