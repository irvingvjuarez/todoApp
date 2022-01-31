import React from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { onItemChangesInColumn } from "../../utils/data";
import { getAnswer, getNewColumn } from "./utils";
import { actionTypes } from "../../customHooks/useReducer";
import "./Item.css";

function Item({ id, title, category, items, columnTag, categories, dispatch }) {
  const [startPoint, setStartPoint] = React.useState(undefined);

  // UPDATERS
  const handleItemDetailModal = () => {
    let selectedItem = items.find((item) => item.id === id);
    dispatch({
      type: actionTypes.modalOpened,
      payload: ["showItemDetail", getAnswer(selectedItem)]
    });
  };
  const onDragStart = (e) => {
    setStartPoint(e.clientX);
  };
  const onDragStop = (e) => {
    let newColumn = getNewColumn(e, startPoint, columnTag);
    let newValues = onItemChangesInColumn(
      newColumn,
      id,
      category,
      items,
      categories
    );
    dispatch({
      type: actionTypes.bothNoModal,
      payload: { CATEGORIES: newValues[0], ITEMS: newValues[1] }
    });
  };

  return (
    <Draggable
      handle="svg"
      bounds=".todoList__board"
      onStart={onDragStart}
      onStop={onDragStop}
    >
      <div className="Item" onClick={handleItemDetailModal}>
        <h3>{title}</h3>

        <div className="Item__footer">{category}</div>

        <FontAwesomeIcon
          icon={faGripVertical}
          color="var(--secondary-color)"
          size="lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </Draggable>
  );
}

export { Item };
