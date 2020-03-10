import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import {
  Header,
  Footer,
  Home,
} from './components';
import { connect } from 'react-redux';

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" render={() => <Home />} />
    </Switch>
    <Footer />
  </>
);

export default connect()(App);
