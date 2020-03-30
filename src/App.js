import React from 'react';
import {
  Header,
  Footer,
  Home,
} from './components';
import { connect } from 'react-redux';

const App = () => (
  <>
    <Header />
    <Home />
    <Footer />
  </>
);

export default connect()(App);
