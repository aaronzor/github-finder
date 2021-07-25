import React, { Component } from "react";
import UserItem from "./UserItem";


class Users extends Component {
  state = {
    users: [
      {
        id: "1",
        login: "aaronzor",
        avatar_url: "https://avatars.githubusercontent.com/u/9366459?v=4",
        html_url: "https://github.com/aaronzor",
      },
      {
        id: "2",
        login: "aaronzor2",
        avatar_url: "https://avatars.githubusercontent.com/u/9366459?v=4",
        html_url: "https://github.com/aaronzor",
      },
      {
        id: "3",
        login: "aaronzor3",
        avatar_url: "https://avatars.githubusercontent.com/u/9366459?v=4",
        html_url: "https://github.com/aaronzor",
      },
    ],
  };

  render() {
    return (
      <div style={userStyle}>
        {this.state.users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default Users;