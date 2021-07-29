import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, Fragment } from 'react';
import Alert from './Components/Layout/Alert';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import About from './Components/Pages/About';
import User from './Components/Users/User';

import GithubState from './Context/github/GithubState';

const App = () => {
    const [alert, setAlert] = useState(null);

    const setAlertAndTimeout = (msg, type) => {
        setAlert({ msg, type });
        setTimeout(() => setAlert({ alert: null }), 5000);
    };

    return (
        <GithubState>
            <Router>
                <div className='App'>
                    <Navbar />
                    <div className='container'>
                        <Alert alert={alert} />
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={() => (
                                    <Fragment>
                                        <Search setAlert={setAlertAndTimeout} />
                                        <Users />
                                    </Fragment>
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/user/:login' component={User} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>
    );
};

export default App;
