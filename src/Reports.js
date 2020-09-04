import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Report from "./Report";
import ReportEdit from "./ReportEdit";


class Reports extends Component {

    render() {
        return (
            <main>
                <Router>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/reports/week/1">Kmom 1</Link>
                                </li>
                                <li>
                                    <Link to="/reports/week/2">Kmom 2</Link>
                                </li>
                                <li>
                                    <Link to="/reports/week/3">Kmom 3</Link>
                                </li>
                                <li>
                                    <Link to="/reports/week/4">Kmom 4</Link>
                                </li>
                                <li>
                                    <Link to="/reports/week/5">Kmom 5</Link>
                                </li>
                                <li>
                                    <Link to="/reports/week/6">Kmom 6</Link>
                                </li>
                                <li>
                                    <Link to="/reports/week/10">Kmom 10</Link>
                                </li>
                            </ul>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/reports/week/:number" component={Report}/>
                            <Route path="/reports/edit/:number" component={ReportEdit}/>
                        </Switch>
                </Router>
            </main>
        );
    }
}

export default Reports;
