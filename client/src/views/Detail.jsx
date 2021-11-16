import React, { Component } from 'react';
import { listHabitDetail } from '../services/habits-api';
import DateTimePicker from 'react-datetime-picker';

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      habit: {}
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    await this.setState({ category: this.props.match.params.category }); //turn this into async await
    listHabitDetail(this.props.match.params.habitId)
      .then((habitFromAPI) => {
        this.setState({
          habit: habitFromAPI
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <h1>Habit Detail view</h1>
        <p>{this.state.habit.name}</p>
        <DateTimePicker
          amPmAriaLabel="Select AM/PM"
          calendarAriaLabel="Toggle calendar"
          clearAriaLabel="Clear value"
          dayAriaLabel="Day"
          hourAriaLabel="Hour"
          maxDetail="second"
          minuteAriaLabel="Minute"
          monthAriaLabel="Month"
          nativeInputAriaLabel="Date and time"
          secondAriaLabel="Second"
          yearAriaLabel="Year"
        />
        <form>
          <button>Track this habit</button>
        </form>
      </div>
    );
  }
}

export default Detail;
