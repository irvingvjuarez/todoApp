import { actionTypes } from "../../customHooks/useReducer";
import { Item } from "../Item";
import "./Column.css";

function Column({ name, items, categories, dispatch }) {
  const columnItems = items.length
    ? items.filter((item) => item.columnTag === name)
    : items;

  // UPDATERS
  const handleAddingItemModal = () => {
    dispatch({ type: actionTypes.modalOpened, payload: ["addItem", name] });
  };

  return (
    <article className="Column">
      <div className="Column__header">
        <h2 className="thirdtitle">{name}</h2>
      </div>
      {columnItems.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          title={item.text}
          category={item.category}
          items={items}
          columnTag={item.columnTag}
          categories={categories}
          dispatch={dispatch}
        />
      ))}
      <div onClick={handleAddingItemModal} className="Column__plusOneCta">
        + New
      </div>
    </article>
  );
}

export default Column;
