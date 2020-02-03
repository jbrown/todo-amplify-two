import React from "react";

const Navbar = ({ onSignOut }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-2">
      <span className="navbar-brand mb-0 h1">Todos</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <span
              className="nav-link"
              data-test="sign-out-button"
              onClick={() => onSignOut()}
            >
              Sign Out
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
