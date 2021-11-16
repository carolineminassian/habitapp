import React from 'react';
import { Component } from 'react';
import Calendar from 'react-calendar';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      habits: []
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>My Habits Overview</h1>
        <Calendar />
      </div>
    );
  }
}
export default Overview;
