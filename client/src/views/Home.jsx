import React, { Component } from 'react';
import './../styles/Home.scss';
import SignIn from './SignIn';
import SignUp from './SignUp';

class Home extends Component {
  constructor() {
    super();
    this.state = {
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
              <SignIn {...this.props} />
            </div>
          )) || (
            <div>
              <SignUp {...this.props} />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Home;
