import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AppCars from './pages/AppCars';
import AddCar from './pages/AddCar';
import Login from './pages/Login';
import Logout from './pages/Logout';

function App() {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/cars">Cars</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/cars">
            <AppCars />
          </Route>
          <Route exact path="/add">
            <AddCar />
          </Route>
          <Route exact path="/edit/:id">
            <AddCar />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
