import React, { Component } from 'react';
import { listHabitDetail } from '../services/habits-api';

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      habit: {}
    };
  }

  componentDidMount() {
    this.setState({ category: this.props.match.params.category }); //turn this into async await
    listHabitDetail(this.props.match.params.habitId)
      .then((habitFromAPI) => {
        this.setState({
          habit: habitFromAPI
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Habit Detail view</h1>
        <p>{this.state.habit.name}</p>
        <form>
          <button>Track this habit</button>
        </form>
      </div>
    );
  }
}

export default Detail;
