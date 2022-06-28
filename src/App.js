import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AppCars from './pages/AppCars';
import AddCar from './pages/AddCar';

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
          </ul>
        </nav>
        <Switch>
          <Route path="/cars">
            <AppCars />
          </Route>
          <Route path="/add">
            <AddCar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
