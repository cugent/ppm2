import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navigation = props => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/home" className="navbar-brand">
          PPM - Project Product Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Home <span className="sr-only" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Product List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products/new" className="nav-link" tabIndex="-1" aria-disabled="false">
                Product Creation
              </Link>
            </li>
          </ul>
          <span className="navbar-text">Active Number of Users {props.onlineUsers}</span>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({
  onlineUsers: state.onlineUsers
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
