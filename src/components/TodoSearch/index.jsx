import React from "react";
import { actionTypes } from "../../customHooks/useReducer";
import "./TodoSearch.css";

function TodoSearch({ dispatch }) {
  const handleChange = (e) => {
    dispatch({ type: actionTypes.searched, payload: e.target.value })
  }

  return (
    <input
      onChange={handleChange}
      defaultValue=""
      className="todoSearch"
      type="text"
      placeholder="Search a task..."
    />
  );
}

export default TodoSearch;
