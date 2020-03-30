import React from 'react';
import { connect } from 'react-redux';

const Header = () => (
  <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
    <div className="container">
      <span className="navbar-brand">
        <img src="assets/img/logo.svg" className="logo" alt="logo" />
      </span>
      <h3>.rsk domains batch</h3>
      <small>{process.env.REACT_APP_NETWORK_NAME}</small>
    </div>
  </nav>
);

export default connect()(Header);
