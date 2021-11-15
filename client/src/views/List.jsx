import React from 'react';
import { Component } from 'react';
import { listAllHabits } from './../services/habits-api';
import { Link } from 'react-router-dom';

class List extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      category: ''
    };
  }

  componentDidMount() {
    this.setState({ category: this.props.match.params.category }); //turn this into async await
  }

  componentDidUpdate() {
    listAllHabits(this.state.category)
      .then((habitsFromAPI) => {
        this.setState({
          habits: habitsFromAPI
        });
      })
      .catch((error) => console.log(error));
  }

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
                  to={`/category/${this.state.category}/detail/${habit._id}`}
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
