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
    this.loadHabitData('61969452775568975444e259');
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

  handleCompletion = () => {};

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
                      Mon<button>X</button>
                    </span>
                    <span>
                      {' '}
                      Tue<button>X</button>
                    </span>
                    <span>
                      {' '}
                      Wed<button>X</button>
                    </span>
                    <span>
                      {' '}
                      Thu<button>X</button>
                    </span>
                    <span>
                      {' '}
                      Fri<button>X</button>
                    </span>
                    <span>
                      {' '}
                      Sat<button>X</button>
                    </span>
                    <span>
                      {' '}
                      Sun<button>X</button>
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
