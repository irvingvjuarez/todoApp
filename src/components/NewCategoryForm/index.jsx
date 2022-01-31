import React from "react";
import { ChromePicker } from "react-color";
import { actionTypes } from "../../customHooks/useReducer";
import { useTodos } from "../../customHooks/useTodos";
import { onStop } from "../../utils/onStop";
import "./NewCategoryForm.css";
import { getNewCategory } from "./utils";

function NewCategoryForm({ categories, dispatch }) {
  const { color4Picker, setColor4Picker } = useTodos();
  const [nameCategory, setNameCategory] = React.useState("");

  // UPDATERS
  const handleChange = (e) => setColor4Picker(e.hex);
  const onCancel = () => {
    dispatch({ type: actionTypes.modalClosed });
  };
  const handleAddCategory = () => {
    let newCategory = getNewCategory(categories, nameCategory, color4Picker);
    const newCategories = [...categories];
    newCategories.push(newCategory);
    dispatch({ type: actionTypes.addingCategory, payload: newCategories });
  };

  return (
    <div onClick={onStop} className="addFormContainer">
      <form>
        <input
          className="addFormContainer__mainInput"
          type="text"
          placeholder="Name of the category"
          onChange={(e) => setNameCategory(e.target.value)}
        />

        <label>Tag the category with a color</label>
        <section className="colorPicker">
          <div
            style={{ backgroundColor: `${color4Picker}` }}
            className="colorPicker__template"
          ></div>
          <div className="colorPicker__picker">
            <ChromePicker onChange={handleChange} color={color4Picker} />
          </div>
        </section>

        <div className="container-buttons">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleAddCategory} className="cta">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export { NewCategoryForm };
