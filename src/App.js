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

    render() {
        return (
            <div className='App'>
                <Navbar />
                <div className='container'>
                    <Search searchUsers={this.searchUsers} />
                    <Users
                        loading={this.state.loading}
                        users={this.state.users}
                    />
                </div>
            </div>
        );
    }
}

export default App;
