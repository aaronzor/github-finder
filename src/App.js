import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, Fragment } from 'react';
import Alert from './Components/Layout/Alert';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import About from './Components/Pages/About';
import User from './Components/Users/User';
import axios from 'axios';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // Search Github Users
    const searchUsers = async (text) => {
        setLoading({ loading: true });

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUsers(res.data.items);
        setLoading(false);
    };

    // Get single Github user
    const getUser = async (username) => {
        setLoading({ loading: true });

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUser(res.data);
        setLoading(false);
    };

    // Get users repos
    const getUserRepos = async (username) => {
        setLoading({ loading: true });

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setRepos(res.data);
        setLoading({ loading: true });
    };

    // Clear users from state
    const clearUsers = () => {
        setUsers([]);
        setLoading({ loading: true });
    };

    const setAlertAndTimeout = (msg, type) => {
        setAlert({ msg, type });
        setTimeout(() => setAlert({ alert: null }), 5000);
    };

    return (
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
                                    <Search
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={users.length > 0}
                                        setAlert={setAlertAndTimeout}
                                    />
                                    <Users loading={loading} users={users} />
                                </Fragment>
                            )}
                        />
                        <Route exact path='/about' component={About} />
                        <Route
                            exact
                            path='/user/:login'
                            render={(props) => (
                                <User
                                    {...props}
                                    getUser={getUser}
                                    getUserRepos={getUserRepos}
                                    user={user}
                                    repos={repos}
                                    loading={loading}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
