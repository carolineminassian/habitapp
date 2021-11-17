import React, { Component } from 'react';
import './../styles/Home.scss';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      txt: 'ou deserve feeling awesome.',
      speed: 150,
      i: 0
    };
  }
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
          <Link className="link" to="/SignUp">
            <div>Sign Up</div>
          </Link>
          <br />
          <Link className="link" to="/SignIn">
            <div>Sign In</div>
          </Link>
        </div>
      </>
    );
  }
}

export default Home;
