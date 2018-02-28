import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Link to="/">HOME</Link>
        <Link to="/upload">UPLOAD</Link>
        <Link to="/vote">VOTE</Link>
        <Link to="/adoption">ADOPTION</Link>
        <Link to="/user">USER</Link>
      </div>
    );
  }
}
