import React from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { onDetailModal, setEndPoint } from "./utils";
import "./Item.css";

function Item({ id, title, category, items, columnTag, categories, dispatch, draggable }) {
  const [startPoint, setStartPoint] = React.useState(undefined);
  const position = {x: 0, y: 0}
  const onDragStart = (e) => setStartPoint(e.clientX);
  const handleItemDetailModal = () => onDetailModal(items, id, dispatch);
  const onDragStop = (e) => setEndPoint(e, startPoint, columnTag, id, category, items, categories, dispatch);
  
  return (
    <React.Fragment>
      {draggable ? (
        <Draggable
          handle="svg"
          bounds=".todoList__board"
          onStart={onDragStart}
          onStop={onDragStop}
          axis="x"
          position={position}
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
      ) : (
        <div className="Item" onClick={handleItemDetailModal}>
          <h3>{title}</h3>
          <div className="Item__footer">{category}</div>
        </div>
      )}
    </React.Fragment>
  );
}

export { Item };
