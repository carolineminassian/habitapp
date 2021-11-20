import React from 'react';
import { Component } from 'react';
import { listMyHabits } from './../services/habits-api';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      habits: []
    };
  }

  componentDidMount() {
    const userId = '61969452775568975444e259';
    this.loadHabitData(userId);
    console.log(this.state);
  }

  loadHabitData = async (userId) => {
    await listMyHabits(userId)
      .then((habits) => {
        this.setState({ habits });
      })
      .catch((error) => {
        console.log('THERE WAS AN ERROR LOADING YOUR HABITS.');
        console.log(error);
      });
  };

  handleCompletion = () => {
    const dataTracking = this.state.habits.data;
  };

  render() {
    return (
      <div>
        <h1>My Habits Overview</h1>
        <ul id="ul-myHabits">
          {this.state.habits &&
            this.state.habits.map((habit) => {
              return (
                <li key={habit.name}>
                  <strong>{habit.name}:</strong> {habit.quantity} {habit.unit}{' '}
                  per day
                  <div>
                    <span>
                      Mon<button onClick={this.handleCompletion}>X</button>
                    </span>
                    <span>
                      {' '}
                      Tue<button onClick={this.handleCompletion}>X</button>
                    </span>
                    <span>
                      {' '}
                      Wed<button onClick={this.handleCompletion}>X</button>
                    </span>
                    <span>
                      {' '}
                      Thu<button onClick={this.handleCompletion}>X</button>
                    </span>
                    <span>
                      {' '}
                      Fri<button onClick={this.handleCompletion}>X</button>
                    </span>
                    <span>
                      {' '}
                      Sat<button onClick={this.handleCompletion}>X</button>
                    </span>
                    <span>
                      {' '}
                      Sun<button onClick={this.handleCompletion}>X</button>
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default Overview;
