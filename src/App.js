import React from 'react';
import { Switch, BrowserRouter, Route, Redirect, Link } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';
import { GamePage } from './pages/GamePage';
import Storage from './components/Storage';
import 'materialize-css';

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className="blue accent-1">
          <div className="nav-wrapper">
            <Link to="/">
              <h1>Minesweeper</h1>
            </Link>
            <ul className="right">
              <li>
                <Link to="/">Game</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="main">
        <Switch>
          <Route path="/" exact>
            <GamePage />
          </Route>
          <Route path="/settings" exact>
            <SettingsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>

      <footer className="page-footer blue accent-1">
        <div className="container">
          <a
            className="grey-text text-lighten-4"
            href="https://github.com/KrohNic"
          >
            Kroh Nickolay
          </a>
          2021
          <a className="grey-text text-lighten-4" href="https://rs.school/js/">
            <img
              src="https://rs.school/images/rs_school_js.svg"
              alt="rs school logo"
              className="rss_logo"
            />
          </a>
        </div>
      </footer>
      <Storage />
    </BrowserRouter>
  );
}

export default App;
