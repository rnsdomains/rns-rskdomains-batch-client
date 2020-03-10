import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = () => (
  <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <img src="assets/img/logo.svg" className="logo" alt="logo" />
      </Link>
      <h3>
        .rsk domains batch
      </h3>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default connect()(Header);
