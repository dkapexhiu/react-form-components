import React, { Component } from "react";

class Pill extends Component {
  state = {};

  render() {
    const { fruit, remove } = this.props;

    return fruit ? (
      <div className="Pill">
        <p>
          {fruit} <span onClick={() => remove(fruit)}>&#10005;</span>
        </p>
      </div>
    ) : (
      ""
    );
  }
}

export default Pill;
