import React, { Component } from 'react';
import { listHabitDetail, addHabit } from '../services/habits-api';
import DateTimePicker from 'react-datetime-picker';

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      habit: {},
      startDate: new Date(),
      unit: '',
      quantity: 0
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

  handleSubmission = (event) => {
    event.preventDefault();
    const settings = {
      startDate: this.state.startDate,
      unit: this.state.unit,
      quantity: this.state.quantity
    };

    addHabit({
      userId: '618fb6cd7f5f300e76322246',
      habitId: this.state.habit._id,
      settings
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  handleDateChange = (event) => {
    this.setState({ startDate: event });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h1>Habit Detail view</h1>
        <p>{this.state.habit.name}</p>
        <form>
          <label htmlFor="input-quantity">How many?</label>
          <input
            id="input-quantity"
            type="number"
            min="0"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-unit">unit</label>
          <select
            id="input-unit"
            name="unit"
            onChange={this.handleInputChange}
            value={this.state.unit}
          >
            <option value="repetitions">repetitions</option>
            <option value="pages">pages</option>
            <option value="hours">hours</option>
            <option value="mins">mins</option>
            <option value="times">times</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
            <option value="oz">oz</option>
            <option value="cm">cm</option>
            <option value="m">m</option>
            <option value="mm">mm</option>
            <option value="km">km</option>
            <option value="inch">inch</option>
            <option value="miles">miles</option>
            <option value="glasses">glasses</option>
            <option value="bottles">bottles</option>
            <option value="other">other</option>
          </select>

          <label htmlFor="input-date">Starting date</label>
          <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            className="react-datetime-picker"
            clearAriaLabel="Clear value"
            clockClassName="react-clock"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="minute"
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={this.handleDateChange}
            secondAriaLabel="Second"
            value={this.state.date}
            yearAriaLabel="Year"
            id="input-date"
            name="startDate"
            value={this.state.startDate}
          />

          <button onClick={this.handleSubmission}>Track this habit</button>
        </form>
      </div>
    );
  }
}

export default Detail;
