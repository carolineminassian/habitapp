import React, { Component } from 'react';
import { listHabitDetail, addHabit } from '../services/habits-api';
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

  handleSubmission = (event) => {
    event.target.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Habit Detail view</h1>
        <p>{this.state.habit.name}</p>
        <form>
          <label>How many?</label>
          <input type="number" min="0" />

          <label>unit</label>
          <select>
            <option>repetitions</option>
            <option>pages</option>
            <option>hours</option>
            <option>mins</option>
            <option>times</option>
            <option>l</option>
            <option>ml</option>
            <option>oz</option>
            <option>cm</option>
            <option>m</option>
            <option>mm</option>
            <option>km</option>
            <option>inch</option>
            <option>miles</option>
            <option>glasses</option>
            <option>bottles</option>
            <option>other</option>
          </select>

          <label>Starting date</label>
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

          <button onSubmit={this.handleSubmission}>Track this habit</button>
        </form>
      </div>
    );
  }
}

export default Detail;

/*
settings: {
  quantity: {
    type: Number,
    min: 0
  },
  unit: {
    type: String,
    enum: [
      'repetitions',
      'pages',
      'hours',
      'mins',
      'times',
      'l',
      'ml',
      'oz',
      'cm',
      'm',
      'mm',
      'km',
      'inch',
      'miles',
      'glasses',
      'bottles',
      'other'
    ]
  }
},
data: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Data',
  required: true,
  default: []
},
streak: {
  type: Number,
  required: true,
  default: 0,
  min: 0
},
startingDate: {
  type: Number, //save date as millisecond value
  required: true
},
additionalTags: [
  {
    type: String
  }
]
*/
