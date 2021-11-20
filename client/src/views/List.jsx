import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import allHabitData from './../habitdata';

class List extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      category: ''
    };
  }

  componentDidMount() {
    this.loadData(allHabitData);
  }

  componentDidUpdate() {}

  loadData = async () => {
    await this.setState({ category: this.props.match.params.category });
    await this.setState({
      habits: allHabitData.filter((habit) =>
        habit.category.includes(this.state.category)
      )
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.category}</h1>
        <ul>
          {this.state.habits.map((habit) => {
            return (
              <li key={habit._id}>
                <Link
                  className="link"
                  to={`/category/${this.state.category}/detail/${habit.id}`}
                >
                  {habit.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default List;
