import { useState } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';
//Components
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
import { FaSignInAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdDashboard } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import { GrOverview } from 'react-icons/gr';

//const user= null

const App = () => {
  /* constLoadedUser:null
}  */

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link className="link" to="/">
            <div>Home</div>
            <br />
            <AiFillHome />
          </Link>
          <br />
          <Link className="link" to="/Dashboard">
            <div>Dashboard</div>
            <br />
            <MdDashboard />
          </Link>
          <br />
          <br />
          <br />
          <Link className="link" to="/overview">
            <div>My Overview</div>
            <br />
            <GrOverview />
          </Link>
          <Link className="link" to="/Profile">
            <div>Profile</div>
            <br />
            <CgProfile />
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
