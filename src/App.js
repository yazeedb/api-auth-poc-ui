import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/protected">Protected</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/protected">
              <h1>Protected</h1>
            </Route>

            <Route path="/">
              <h1>Home</h1>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
