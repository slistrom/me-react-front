import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Me from './Me.js';
import Report from './Report.js';

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
                            <Link to="/reports/week/1">Reports</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/" component={Me}/>
                    <Route path="/reports/week/1" component={Report}/>
                </Switch>
            </div>
        </Router>
    );
}
