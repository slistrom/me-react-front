import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Report from "./Report";

class Reports extends Component {

    render() {
        return (
            <Router>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/reports/week/1">week 1</Link>
                            </li>
                            <li>
                                <Link to="/reports/week/2">week 2</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/reports/week/:number" component={Report}/>
                    </Switch>
            </Router>
        );
    }
}

export default Reports;
