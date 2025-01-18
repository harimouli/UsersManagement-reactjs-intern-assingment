import { Component } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useParams } from "react-router-dom";

class UserDetail extends Component {
  static contextType = UserContext;

  render() {
    const { id } = this.props.params;
    const { users } = this.context;
    const user = users.find((u) => u.id === parseInt(id));

    if (!user) return <p>User not found.</p>;

    return (
      <div>
        <h1>{user.name}</h1>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Company: {user.company.name}</p>
        <p>Website: {user.website}</p>
        <Link to="/">Go Back</Link>
      </div>
    );
  }
}

export default (props) => <UserDetail {...props} params={useParams()} />;
