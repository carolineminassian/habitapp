import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import Dashboard from './views/Dashboard';
import List from './views/List';
import Detail from './views/Detail';
import Profile from './views/Profile';
import Overview from './views/Overview';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link className="link" to="/">
            Home
          </Link>
          <br />
          <Link className="link" to="/SignUp">
            SignUp
          </Link>
          <br />
          <Link className="link" to="/SignIn">
            SignIn
          </Link>
          <br />
          <Link className="link" to="/Dashboard">
            Dashboard
          </Link>
          <br />
          <Link className="link" to="/List">
            List
          </Link>
          <br />
          <Link className="link" to="/Detail">
            Detail
          </Link>
          <br />
          <Link className="link" to="/Profile">
            Profile
          </Link>
          <Link className="link" to="/overview">
            My Overview
          </Link>
        </nav>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/SignUp" component={SignUp} exact />
          <Route path="/SignIn" component={SignIn} exact />
          <Route path="/Dashboard" component={Dashboard} exact />
          <Route path="/category/:category/list" component={List} exact />

          <Route path="/overview" component={Overview} exact />
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
};

export default App;
