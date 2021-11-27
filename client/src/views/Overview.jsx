import React from 'react';
import { Component } from 'react';
import {
  listMyHabits,
  habitCompletion,
  removeHabit
} from './../services/habits-api';
import { loadAuthenticatedUser } from './../services/authentication';
import './../styles/CompletionButton.scss';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      user: null,
      currentDay: null,
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      habitCompleted: { habitId: null, status: false }
    };
  }

  componentDidMount() {
    this.loadUser();
    this.setState({ currentDay: new Date().getDay() }); //gets current weekday. 1 - mon, 2 - tue, 3 - wed, ...
  }

  componentDidUpdate() {}

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

  loadUser = () => {
    loadAuthenticatedUser()
      .then((authenticatedUser) => {
        if (authenticatedUser) {
          this.setState({ user: authenticatedUser });
          this.loadHabitData(this.state.user._id);
        }
        console.log(authenticatedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // checkHabitStatus = () => {
  //   this.state.habits.forEach((habit) => {
  //     (habit.data[habit.data.length - 1].getDay() === Date().getDay() &&
  //       console.log('Habit was completed today')) ||
  //       console.log('Habit was NOT completed today');
  //   });
  // };

  handleCompletion = (event) => {
    // event.preventDefault();
    habitCompletion(this.state.user._id, event.target.value)
      .then((doc) => {
        doc === event.target.value &&
          this.setState({
            habitCompleted: {
              habitId: doc,
              status: !this.state.habitCompleted.status
            }
          });
      })
      .catch((error) => console.log(error));

    //const dataTracking = this.state.habits.data;
  };

  handleDeletion = (event) => {
    event.preventDefault();
    console.log('I WAS FIRED');
    removeHabit(this.state.user._id, event.target.value)
      .then(() => {
        this.loadHabitData(this.state.user._id);
      })
      .catch((error) => console.log(error));
    //const dataTracking = this.state.habits.data;
  };

  render() {
    return (
      <div>
        <h1>My Habits Overview</h1>
        <ul id="ul-myHabits" style={{ 'list-style': 'none' }}>
          {this.state.habits &&
            this.state.habits.map((habit) => {
              return (
                <li key={habit._id}>
                  <strong>{habit.name}:</strong> {habit.quantity} {habit.unit}{' '}
                  per day
                  <span>
                    <strong>
                      {' '}
                      - current streak: {habit.data.length}{' '}
                      {habit.data.length === 1 ? 'day' : 'days'}
                    </strong>
                  </span>
                  <div>
                    {this.state.weekdays.map((day, index) => {
                      return (
                        <span>
                          {day}
                          <button
                            className="btn-habit-complete"
                            onClick={this.handleCompletion}
                            style={{
                              disabled:
                                this.state.currentDay !== index + 1 &&
                                !this.state.habitCompleted.status,
                              background:
                                (this.state.currentDay !== index + 1 &&
                                  '#b9b9b9') ||
                                (this.state.currentDay === index + 1 &&
                                  this.state.habitCompleted.status &&
                                  '#3e2d83') ||
                                'white',
                              pointerEvents:
                                (this.state.currentDay !== index + 1 ||
                                  this.state.habitCompleted.status) &&
                                ('none' || '')
                            }}
                            value={habit._id}
                          ></button>
                        </span>
                      );
                    })}
                  </div>
                  <button onClick={this.handleDeletion} value={habit._id}>
                    Delete habit
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default Overview;
