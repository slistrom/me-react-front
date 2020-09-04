import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Me from './Me.js';
import Reports from './Reports.js';
import Login from './Login.js';
import Register from './Register.js';


import './App.css';

export default function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Me</Link>
                        </li>
                        <li>
                            <Link to="/reports/">Reports</Link>
                        </li>
                        <li>
                            <Link to="/login/">Login</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/" component={Me}/>
                    <Route path="/reports/" component={Reports}/>
                    <Route path="/login/" component={Login}/>
                    <Route path="/register/" component={Register}/>
                </Switch>
            </div>
        </Router>
    );
}
