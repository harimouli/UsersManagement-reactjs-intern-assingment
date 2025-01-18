import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => (
  <div className="user-card">
    <h3>{user.name}</h3>
    <p>Email: {user.email}</p>
    <p>City: {user.address.city}</p>
    <Link to={`/user/${user.id}`}>View Details</Link>
  </div>
);

export default UserCard;
