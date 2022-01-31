import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faFillDrip } from "@fortawesome/free-solid-svg-icons";
import { ChromePicker } from "react-color";
import { actionTypes } from "../../customHooks/useReducer/index";
import { colorChange, newCategories, newItems } from "./utils";

import "./TodoCategoryItem.css";

function TodoCategoryItem({
  name,
  tasks,
  completed,
  color,
  arr,
  categories,
  items,
  dispatch
}) {
  const [currentColor, setCurrentColor] = React.useState(color);
  const [isPickerHidden, setIsPickerHidden] = React.useState("hidden");

  // Updaters
  const onCategoryNameChange = (e) => {
    dispatch({
      type: actionTypes.bothNoModal,
      payload: {
        ITEMS: newItems(e, name, items),
        CATEGORIES: newCategories(e, name, categories)
      }
    });
  };
  const onDeleteCategory = () => {
    dispatch({
      type: actionTypes.modalOpened,
      payload: ["DeleteCategory", name]
    });
  };
  const onCategoryColorChange = (e) => {
    setCurrentColor(e.hex);
    dispatch({
      type: actionTypes.categoryColorChange,
      payload: { CATEGORIES: colorChange(e, categories, name) }
    });
  };
  const onColorPickerClick = () => {
    let result = isPickerHidden === "hidden" ? "a" : "hidden";
    setIsPickerHidden(result);
  };

  return (
    <div className="category__item">
      <div className="category__item-header">
        <input
          onChange={onCategoryNameChange}
          type="text"
          defaultValue={name}
        />
      </div>
      <div className="category__stats">
        <div className="category__bars">
          <div className="category__bars--bg"></div>

          <div
            className="category__bars--progress"
            style={{
              width: `${arr.length && (completed * 100) / tasks}%`,
              backgroundColor: `${color}`
            }}
          ></div>
        </div>

        <div className="category__itemFooter">
          <div className="category__itemFooter-settings">
            <button
              className="deteleButton"
              type="button"
              onClick={onDeleteCategory}
            >
              <FontAwesomeIcon icon={faMinusCircle} size="lg" />
            </button>

            <button className="category__colorTheme" type="button">
              <FontAwesomeIcon
                onClick={onColorPickerClick}
                icon={faFillDrip}
                size="lg"
                color={currentColor}
              />
              <ChromePicker
                className={isPickerHidden}
                color={currentColor}
                onChangeComplete={onCategoryColorChange}
              />
            </button>
          </div>

          <span>
            {arr.length
              ? `${Math.round((completed * 100) / tasks)}%`
              : `No tasks`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TodoCategoryItem;
