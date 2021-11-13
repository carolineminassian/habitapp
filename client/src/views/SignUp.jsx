import React from 'react';
import { Component } from 'react';
import { signUp } from './../services/authentication';

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    signUp({ name, email, password }).then((user) => {});
  };
  render() {
    return (
      <div>
        <h1>Sign Up here</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-name">Your Name</label>
          <input
            id="input-name"
            type="text"
            placeholder="What's your name?"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          ></input>
          <br />
          <label
            htmlFor="input-email"
            type="email"
            placeholder="Your Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          ></label>
          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            placeholder="A Secure Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <br />
          <button>Sign Up now</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
