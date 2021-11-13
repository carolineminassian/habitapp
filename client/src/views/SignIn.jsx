import React, { Component } from 'react';
import { signIn } from '../services/authentication';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
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
    const { email, password } = this.state;
    signIn({ email, password })
      .then((user) => {
        this.props.onAuthenticationChange(user);
      })
      .catch((error) => {
        console.log(error);
        alert('Sorry, signing in didn`t work :(');
      });
  };
  render() {
    return (
      <div>
        <h1>Sign in here</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-email">Email</label>
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
          <button>Sign In now</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
