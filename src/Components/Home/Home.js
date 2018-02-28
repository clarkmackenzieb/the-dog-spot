import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div>Picture</div>
        <div>
          Content
          <div>Sign Up</div>
          <div>Dog Spot</div>
          <div>Adoptable Dogs</div>
        </div>
      </div>
    );
  }
}
