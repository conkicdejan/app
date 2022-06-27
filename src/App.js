import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AppCars from './pages/AppCars';


function App() {
  return (
    <div>
      <Router>
        <Link to='/cars'>Cars</Link>
        <Route path='/cars'>
         <AppCars />
        </Route>
      </Router>
    </div>
  );
}

export default App;
