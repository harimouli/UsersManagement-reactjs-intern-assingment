import React from "react";

const SortDropdown = ({ onSort }) => {
  const handleChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="asc">Sort by Name (A-Z)</option>
      <option value="desc">Sort by Name (Z-A)</option>
    </select>
  );
};

export default SortDropdown;
