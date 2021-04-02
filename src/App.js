import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProducts from './Components/AddProducts/AddProducts';
import Home from './Components/Home/Home';
import Order from './Components/Order/Order';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import Booking from './Components/Booking/Booking';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div>
          <nav className="sticky-top nav-style">
            <ul className="nav nav-tabs justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
              <li className="nav-item">
                {loggedInUser.email ? <Link className="nav-link" to="/login">Sign out</Link> : <Link className="nav-link" to="/login">Login</Link>}
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path="/booking/:id">
              <Booking></Booking>
            </PrivateRoute>
            <PrivateRoute path="/orders">
              <Order></Order>
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <AddProducts></AddProducts>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
          </Switch>
        </div>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
