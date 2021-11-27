import { BrowserRouter, Link, Switch } from 'react-router-dom';
import './App.css';

//Components
import { Component } from 'react';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import List from './views/List';
import Detail from './views/Detail';
import Profile from './views/Profile';
import Overview from './views/Overview';
import ProtectedRoute from './views/ProtectedRoute';

//Icons
import { CgProfile } from 'react-icons/cg';
import { MdDashboard } from 'react-icons/md';
import { GrOverview } from 'react-icons/gr';
import { loadAuthenticatedUser, signOut } from './services/authentication';

//const user= null

class App extends Component {
  /* constLoadedUser:null
}  */

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false
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
    this.setState({ user, loaded: this.state.user !== null });
  };

  handleSignOut = () => {
    signOut()
      .then(() => {
        this.setState({ user: null, loaded: false });
        window.location.href = '/';
        //this.props.history.push('/'); //-> no loading bar :)
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
            <ProtectedRoute
              path="/"
              authorized={!(this.state.loaded && this.state.user)}
              redirect="/Dashboard"
              render={(props) => (
                <Home
                  user={this.state.user}
                  {...props}
                  onAuthenticationChange={this.handleAuthenticationChange}
                />
              )}
              exact
            />

            <ProtectedRoute
              path="/Dashboard"
              authorized={!this.state.loaded || this.state.user}
              redirect="/"
              component={Dashboard}
              exact
            />
            <ProtectedRoute
              path="/category/:category/list"
              authorized={!this.state.loaded || this.state.user}
              redirect="/"
              component={List}
              exact
            />
            <ProtectedRoute
              path="/user/:userId/overview"
              authorized={!this.state.loaded || this.state.user}
              redirect="/"
              component={Overview}
              exact
            />
            <ProtectedRoute
              path="/category/:category/detail/:habitId"
              authorized={!this.state.loaded || this.state.user}
              redirect="/"
              component={Detail}
              exact
            />
            <ProtectedRoute
              path="/Profile"
              authorized={!this.state.loaded || this.state.user}
              redirect="/"
              component={Profile}
              exact
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
