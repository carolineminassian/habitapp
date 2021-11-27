import React from 'react';
import { Component } from 'react';
import { signUp } from './../services/authentication';
import './../styles/Home.scss';

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
    signUp({ name, email, password })
      .then((user) => {
        this.props.onAuthenticationChange(user);
        console.log('SIGN UP SUCCESSFUL');
        // window.location.href = '/dashboard';
        this.props.history.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        alert('Sorry, signing up didn`t work :(');
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-name"> Name</label>
          <input
            id="input-name"
            type="text"
            placeholder="Your first name"
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
          >
            Email
          </label>
          <input
            id="input-email"
            type="email"
            placeholder="Your Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <br />
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
          <button className="btn-darkblue">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
