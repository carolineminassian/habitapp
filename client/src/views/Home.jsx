import React, { Component } from 'react';
import './../styles/Home.scss';
import SignIn from './SignIn';
import SignUp from './SignUp';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      txt: 'You deserve feeling awesome.',
      speed: 150,
      i: 0,
      signIn: true
    };
  }

  handleAuthIn = () => {
    this.setState({
      signIn: true
    });
  };

  handleAuthUp = () => {
    this.setState({
      signIn: false
    });
  };
  /*
  typeWriter = () => {
    if (this.state.i < this.state.txt.length) {
      document.getElementById('h1-landing-page').innerHTML +=
        this.state.txt.charAt(this.state.i);
      this.setState({ i: this.state.i + 1 });
      setTimeout(this.typeWriter, this.state.speed);
    }
  };

  componentDidMount() {
    this.typeWriter();
  }
*/
  render() {
    return (
      <>
        <h1 id="h1-landing-page">You deserve feeling awesome.</h1>

        <div id="div-dashboard-background"></div>
        <div id="div-dashboard-auth">
          <p>Start building new habits today.</p>
          <div id="div-btn-toggle">
            {(this.state.signIn && (
              <>
                <button className="btn-link" onClick={this.handleAuthUp}>
                  Sign up
                </button>
                <button
                  className="btn-link btn-active"
                  onClick={this.handleAuthIn}
                >
                  Sign in
                </button>
              </>
            )) || (
              <>
                <button
                  className="btn-link btn-active"
                  onClick={this.handleAuthUp}
                >
                  Sign up
                </button>
                <button className="btn-link" onClick={this.handleAuthIn}>
                  Sign in
                </button>
              </>
            )}
          </div>

          {(this.state.signIn && (
            <div>
              <SignIn
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            </div>
          )) || (
            <div>
              <SignUp
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Home;
