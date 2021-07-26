import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/Users/Users';
import axios from 'axios';
import Search from './Components/Users/Search';

class App extends Component {
    state = {
        users: [],
        loading: false,
    };

    // Search Github Users
    searchUsers = async (text) => {
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ users: res.data.items, loading: false });
        console.log(res.data);
    };

    // Clear users from state
    clearUsers = () => {
        this.setState({ users: [], loading: false });
    };

    render() {
        const { users, loading } = this.state;
        return (
            <div className='App'>
                <Navbar />
                <div className='container'>
                    <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0}
                    />
                    <Users loading={loading} users={users} />
                </div>
            </div>
        );
    }
}

export default App;
