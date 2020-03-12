import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = () => (
  <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <img src="assets/img/logo.svg" className="logo" alt="logo" />
      </Link>
      <h3>.rsk domains batch</h3>
      <small>{process.env.REACT_APP_NETWORK_NAME}</small>
    </div>
  </nav>
);

export default connect()(Header);
