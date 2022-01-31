import React from "react";
import Select from "react-select";
import { getFormatTime } from "../../utils/getFormatTime";
import { actionTypes } from "../../customHooks/useReducer";
import { onStop } from "../../utils/onStop";
import {
  getNeoCategories,
  getNewCategories,
  getNewColor,
  getNewItem
} from "./utils";
import "./NewItemForm.css";

function NewItemForm({ columnTag, categories, items, dispatch }) {
  const neoCategories = getNeoCategories(categories);
  const [selectValue, setSelectValue] = React.useState(neoCategories[0].value);
  const [taskTitle, setTaskTitle] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [dueTo, setDueTo] = React.useState(getFormatTime());
  const [abled, setAbled] = React.useState(false);

  // UPDATERS
  const handleChange = (e) => setDueTo(e.target.value);
  const handleSelectChange = (e) => setSelectValue(e.value);
  const onModalClosed = () => dispatch({ type: actionTypes.modalClosed });
  const onChangeTaskTitle = (e) => {
    let val = e.target.value ? true : false;
    setAbled(val);
    setTaskTitle(e.target.value);
  };
  const onAddNewItem = () => {
    const categoryColor = getNewColor(categories, selectValue);
    const newItem = getNewItem(
      items,
      taskTitle,
      selectValue,
      columnTag,
      details,
      categoryColor,
      dueTo
    );
    categories = getNewCategories(categories, selectValue, newItem, columnTag);
    const newItems = items.length ? [...items, newItem] : [newItem];
    dispatch({
      type: actionTypes.bothModal,
      payload: { CATEGORIES: categories, ITEMS: newItems }
    });
  };

  return (
    <div onClick={onStop} className="addFormContainer newItemForm">
      <form>
        <input
          className="addFormContainer__mainInput"
          onChange={onChangeTaskTitle}
          type="text"
          placeholder="Add a new task"
        />
        <textarea
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Add additional information (optional)"
        ></textarea>
        <Select
          className="formContainer__select"
          defaultValue={neoCategories[0]}
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          options={neoCategories}
          onChange={handleSelectChange}
        />

        <div className="date-container">
          <label className="date-container__label" htmlFor="createdDate">
            Due to
          </label>
          <input
            onChange={handleChange}
            className="itemDetails__date date-container__input"
            type="date"
            id="createdDate"
            defaultValue={dueTo}
          />
        </div>

        <div className="formContainer__buttons container-buttons">
          <button onClick={onModalClosed}>Cancel</button>
          <button
            disabled={!abled && true}
            className={`a ${abled && "cta"}`}
            type="button"
            onClick={onAddNewItem}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export { NewItemForm };
