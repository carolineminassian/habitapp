// import { useState } from 'react';
//import { useState } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';
//Components
import { Component } from 'react';
import Home from './views/Home';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import Dashboard from './views/Dashboard';
import List from './views/List';
import Detail from './views/Detail';
import Profile from './views/Profile';
import Overview from './views/Overview';
//Icons
import { AiFillHome } from 'react-icons/ai';
// import { FaSignInAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdDashboard } from 'react-icons/md';
// import { FaPencilAlt } from 'react-icons/fa';
import { GrOverview } from 'react-icons/gr';
import { loadAuthenticatedUser, signOut } from './services/authentication';

//const user= null

class App extends Component {
  /* constLoadedUser:null
}  */

  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    loadAuthenticatedUser()
      .then((user) => {
        if (user) {
          this.setState({ user });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ loaded: true });
      });
  };

  handleAuthenticationChange = (user) => {
    this.setState({ user });
  };

  handleSignOut = () => {
    signOut()
      .then(() => {
        this.setState({ user: null });
        window.location.href = '/';
        //this.props.history.push('/'); -> no loading bar :)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          {this.state.user && (
            <nav>
              <Link className="link" to="/Dashboard">
                <div>Dashboard</div>
                <MdDashboard />
              </Link>

              <Link
                className="link"
                to={`/user/${this.state.user._id}/overview`}
              >
                <div>My Overview</div>
                <GrOverview />
              </Link>
              <Link className="link" to="/Profile">
                <div>Profile</div>
                <CgProfile />
              </Link>
              <button className="signOutButton" onClick={this.handleSignOut}>
                <span>Sign Out</span>
              </button>
            </nav>
          )}

          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/SignUp" component={SignUp} exact />
            <Route path="/SignIn" component={SignIn} exact />
            <Route path="/Dashboard" component={Dashboard} exact />
            <Route path="/category/:category/list" component={List} exact />

            <Route path="/user/:userId/overview" component={Overview} exact />
            <Route
              path="/category/:category/detail/:habitId"
              component={Detail}
              exact
            />
            <Route path="/Profile" component={Profile} exact />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
