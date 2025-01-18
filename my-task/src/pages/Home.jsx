// src/pages/HomePage.js
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


class Home extends React.Component {
    state = {
      users: [],
      search: "",
      sortOrder: "asc",
      loading: true,
      error: null,
      currentPage: 1,
      usersPerPage: 5,
    };
  

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        this.setState({ users: response.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: "Failed to fetch users.", loading: false });
      });
  }

  handleSearch = (event) => {
    this.setState({ search: event.target.value, currentPage: 1 });
  };

  handleSort = (order) => {
    this.setState({ sortOrder: order });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const {
      users,
      search,
      sortOrder,
      loading,
      error,
      currentPage,
      usersPerPage,
    } = this.state;

    // Filter and sort users
    const filteredUsers = users
      .filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );

    // Calculate pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="homepage">
        <h2>User Directory</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={this.handleSearch}
        />
        <button onClick={() => this.handleSort("asc")}>Sort A-Z</button>
        <button onClick={() => this.handleSort("desc")}>Sort Z-A</button>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <ul className="user-list">
          {currentUsers.map((user) => (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.address.city}</p>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="pagination">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={currentPage === pageNumber ? "active" : ""}
              onClick={() => this.handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
