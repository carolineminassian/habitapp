import React from 'react';
import { Component } from 'react';
import { listAllHabits } from './../services/habits-api';

class List extends Component {
  constructor() {
    super();
    this.state = {
      habits: []
    };
  }

  componentDidMount() {
    listAllHabits('health');
    /*
      .then((habitsFromAPI) => {
        console.log(habitsFromAPI);
        /* this.setState({
          habits: habitsFromAPI
        });
      })
      .catch((error) => console.log(error));
      */
  }

  render() {
    return <div>hello</div>;
  }
}
export default List;
