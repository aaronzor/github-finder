import React, { useContext, useState } from 'react';
import GithubContext from '../../Context/github/githubContext';
import AlertContext from '../../Context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('');

    // Destructuring
    const { users, clearUsers, searchUsers } = githubContext;
    const { setAlert } = alertContext;

    const onChange = (e) => setText(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please enter something', 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input
                    type='text'
                    name='text'
                    placeholder='Search Users...'
                    value={text}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value='Search'
                    className='btn btn-dark btn-block'
                />
            </form>
            {users.length > 0 && (
                <button
                    className='btn btn-light btn-block'
                    onClick={clearUsers}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default Search;
