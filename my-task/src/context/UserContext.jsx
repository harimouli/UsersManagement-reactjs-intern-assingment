import React, { Component, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export class UserProvider extends Component {
  state = {
    users: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        this.setState({ users: response.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
