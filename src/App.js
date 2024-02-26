import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import DataTable from './dataTable';
import IntTable from './intTable';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/dataTable">Data Table 1</Link>
                        </li>
                        <li>
                            <Link to="/intTable">Data Table 2</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/dataTable">
                        <DataTable />
                    </Route>
                    <Route path="/intTable">
                        <IntTable />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
