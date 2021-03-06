import React, { Component } from 'react';
import { addHabit } from '../services/habits-api';
import DateTimePicker from 'react-datetime-picker';
import allHabitData from './../habitdata';
import './../styles/Detail.scss';
import { loadAuthenticatedUser } from './../services/authentication';

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      habit: {},
      startDate: new Date(),
      unit: 'times',
      quantity: ''
    };
  }

  componentDidMount() {
    this.loadUser();
    this.loadData();
  }

  loadData = async () => {
    await this.setState({ category: this.props.match.params.category }); //turn this into async await
    await this.setState({
      habit: Object.assign(
        ...allHabitData.filter(
          (habit) => habit.id === Number(this.props.match.params.habitId)
        )
      )
    });
    console.log(this.state);
  };

  loadUser = () => {
    loadAuthenticatedUser()
      .then((authenticatedUser) => {
        if (authenticatedUser) {
          this.setState({ user: authenticatedUser });
        }
        console.log(authenticatedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmission = (event) => {
    event.preventDefault();
    this.setState({
      startDate: event.target.startDate,
      unit: event.target.unit,
      quantity: event.target.quantity
    });
    const userId = this.state.user._id;
    const habit = this.state.habit;
    const startDate = this.state.startDate;
    const unit = this.state.unit;
    const quantity = this.state.quantity;
    // this.loadUser();

    addHabit({
      userId,
      habit,
      startDate,
      unit,
      quantity
    })
      .then((response) => {
        console.log(response);
        this.props.history.push(`/user/${this.state.user._id}/overview`);
      })
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
      <div id="div-detail">
        <h1>{this.state.habit.name}</h1>
        <form id="form-detail">
          <label htmlFor="input-quantity">How many?</label>
          <input
            id="input-quantity"
            type="number"
            min="0"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleInputChange}
            required
            placeholder="Choose a quantity for your habit."
          />

          <label htmlFor="input-unit">unit</label>
          <select
            id="input-unit"
            name="unit"
            onChange={this.handleInputChange}
            value={this.state.unit}
            required
          >
            <option value="times">times</option>
            <option value="repetitions">repetitions</option>
            <option value="pages">pages</option>
            <option value="hours">hours</option>
            <option value="mins">mins</option>
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
            yearAriaLabel="Year"
            id="input-date"
            name="startDate"
            value={this.state.startDate}
          />

          <button className="btn-darkblue" onClick={this.handleSubmission}>
            Track this habit
          </button>
        </form>
      </div>
    );
  }
}

export default Detail;
