import React from 'react';
import { Component } from 'react';
import { listMyHabits, habitCompletion } from './../services/habits-api';
import { loadAuthenticatedUser } from './../services/authentication';
import { MdTransferWithinAStation } from 'react-icons/md';
import { CgBorderStyleDashed } from 'react-icons/cg';
import './../styles/CompletionButton.scss';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      user: null,
      currentDay: null,
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      habitCompleted: false
    };
  }

  componentDidMount() {
    this.loadUser();
    this.setState({ currentDay: new Date().getDay() }); //gets current weekday. 1 - mon, 2 - tue, 3 - wed, ...
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

  handleCompletion = (event) => {
    event.preventDefault();
    habitCompletion(this.state.user._id, '619a5261b74b9006054a3f43')
      .then(() => {
        this.setState({ habitCompleted: true });
      }) //first: userID, second: habitId.
      .catch((error) => console.log(error));
    //const dataTracking = this.state.habits.data;
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
                    {this.state.weekdays.map((day, index) => {
                      return (
                        <span>
                          {day}
                          <button
                            className="btn-habit-complete"
                            onClick={this.handleCompletion}
                            value={index + 1}
                            style={{
                              disabled:
                                this.state.currentDay !== index + 1 &&
                                !this.state.habitCompleted,
                              background:
                                (this.state.currentDay !== index + 1 &&
                                  'grey') ||
                                (this.state.currentDay === index + 1 &&
                                  this.state.habitCompleted &&
                                  'blue') ||
                                'white',
                              color: 'transparent',
                              pointerEvents:
                                (this.state.currentDay !== index + 1 ||
                                  this.state.habitCompleted) &&
                                ('none' || '')
                            }}
                          >
                            X
                          </button>
                        </span>
                      );
                    })}
                    {/* <span>
                      Mon
                      <button
                        className="btn-habit-complete"
                        onClick={this.handleCompletion}
                        value="1"
                        {this.state.currentDay === this.value && 'disabled'}
                      >
                        X
                      </button>
                    </span>
                    <span>
                      {' '}
                      Tue
                      <button
                        className="btn-habit-complete"
                        onClick={this.handleCompletion}
                        value="2"
                        {this.state.currentDay === this.value && 'disabled'}
                      >
                        X
                      </button>
                    </span>
                    <span>
                      {' '}
                      Wed
                      <button
                        className="btn-habit-complete"
                        onClick={this.handleCompletion}
                        value="3"
                        {this.state.currentDay === this.value && 'disabled'}
                      >
                        X
                      </button>
                    </span>
                    <span>
                      {' '}
                      Thu
                      <button
                        className="btn-habit-complete"
                        onClick={this.handleCompletion}
                        value="4"
                        {this.state.currentDay === this.value && 'disabled'}
                      >
                        X
                      </button>
                    </span>
                    <span>
                      {' '}
                      Fri
                      <button
                        className="btn-habit-complete"
                        onClick={this.handleCompletion}
                        value="5"
                        {this.state.currentDay === this.value && 'disabled'}
                      >
                        X
                      </button>
                    </span>
                    <span>
                      {' '}
                      Sat
                      <button
                        className="btn-habit-complete"
                        onClick={this.handleCompletion}
                        value="6"
                        {this.state.currentDay === this.value && 'disabled'}
                      >
                        X
                      </button>
                    </span>
                    <span>
                      {' '}
                      Sun
                      <button
                        className="btn-habit-complete"
                        onCompletion={this.handleCompletion}
                        value="7"
                        {this.state.currentDay === this.value && 'disabled'}
                      >
                        X
                      </button>
                    </span> */}
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
