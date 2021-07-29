import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import Alert from './Components/Layout/Alert';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import About from './Components/Pages/About';
import User from './Components/Users/User';

import GithubState from './Context/github/GithubState';
import AlertState from './Context/alert/AlertState';

const App = () => {
    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className='App'>
                        <Navbar />
                        <div className='container'>
                            <Alert />
                            <Switch>
                                <Route
                                    exact
                                    path='/'
                                    render={() => (
                                        <Fragment>
                                            <Search />
                                            <Users />
                                        </Fragment>
                                    )}
                                />
                                <Route exact path='/about' component={About} />
                                <Route
                                    exact
                                    path='/user/:login'
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
