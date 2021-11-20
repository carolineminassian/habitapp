import React from 'react';
import { Component } from 'react';
import Calendar from 'react-calendar';
import { listMyHabits } from './../services/habits-api';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      habits: []
    };
  }

  componentDidMount() {
    this.loadHabitData('618fb6cd7f5f300e76322246');
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
        {/* <Calendar /> */}
        <ul id="ul-myHabits">
          {this.state.habits &&
            this.state.habits.map((habit) => {
              return (
                <li key={habit.name}>
                  {habit.name}
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
