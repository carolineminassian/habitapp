import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import Dashboard from './views/Dashboard';
import List from './views/List';
import Detail from './views/Detail';
import Profile from './views/Profile';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <br />
          <Link to="/SignUp">SignUp</Link>
          <br />
          <Link to="/SignIn">SignIn</Link>
          <br />
          <Link to="/Dashboard">Dashboard</Link>
          <br />
          <Link to="/List">List</Link>
          <br />
          <Link to="/Detail">Detail</Link>
          <br />
          <Link to="/Profile">Profile</Link>
        </nav>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/SignUp" component={SignUp} exact />
          <Route path="/SignIn" component={SignIn} exact />
          <Route path="/Dashboard" component={Dashboard} exact />
          <Route path="/List" component={List} exact />
          <Route path="/Detail" component={Detail} exact />
          <Route path="/Profile" component={Profile} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
