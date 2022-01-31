import Select from "react-select";
import { dayFormat } from "../../utils/dayFormat";
import { onItemChangesInColumn } from "../../utils/data";
import { onStop } from "../../utils/onStop";
import { getIndex, getColumnsName, getItems, getCategories } from "./utils";
import { actionTypes } from "../../customHooks/useReducer";
import "./ItemDetails.css";

function ItemDetails({ content, categories, items, columns, dispatch }) {
  const createdTime = content.time;
  const columnsName = getColumnsName(columns);
  const columnIndex = getIndex(columnsName, "value", content, "columnTag");

  // UPDATERS
  const onModalClosed = () => dispatch({ type: actionTypes.modalClosed });
  const onItemTitleChanges = (e) => {
    dispatch({
      type: actionTypes.itemsOnly,
      payload: getItems(e, items, content, "text")
    });
  };
  const onColumnChange = (e) => {
    const newValues = onItemChangesInColumn(
      e.value,
      content.id,
      content.category,
      items,
      categories
    );
    dispatch({
      type: actionTypes.bothNoModal,
      payload: { CATEGORIES: newValues[0], ITEMS: newValues[1] }
    });
  };
  const onItemDetailsChange = (e) => {
    items = getItems(e, items, content, "details");
    dispatch({ type: actionTypes.itemsOnly, payload: items });
  };
  const onDeleteItem = () => {
    const itemIndex = getIndex(items, "id", content, "id");
    items.splice(itemIndex, 1);
    categories = getCategories(categories, content);
    dispatch({
      type: actionTypes.bothModal,
      payload: { CATEGORIES: categories, ITEMS: items }
    });
  };

  return (
    <div onClick={onStop} className="itemDetails">
      <h3>{content.category}</h3>
      <div className="itemDetails__header">
        <input
          className="itemDetails__title"
          type="text"
          defaultValue={content.title}
          onChange={onItemTitleChanges}
        />
        <Select
          className="formContainer__select"
          defaultValue={columnsName[columnIndex]}
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          options={columnsName}
          onChange={onColumnChange}
        />
      </div>

      {content.details && (
        <textarea
          className="itemDetails__details"
          defaultValue={content.details}
          onChange={onItemDetailsChange}
        ></textarea>
      )}

      <div className="itemDetails__deeper">
        <div className="itemDetails__date-container date-container">
          <label htmlFor="dueDate" className="date-container__label">
            Due to
          </label>
          <input
            className="itemDetails__date date-cta date-container__input"
            type="date"
            id="createdDate"
            defaultValue={content.dueTo}
          />
        </div>
      </div>
      <footer className="itemDetails__footer">
        <p className="itemDetails__createdAt">
          Created at: <span>{dayFormat(createdTime)}</span>
        </p>

        <div className="container-buttons">
          <button onClick={onModalClosed}>Exit</button>
          <button
            type="button"
            className="cta-delete"
            onClick={onDeleteItem}
            // onClick={() =>
            //   onDeleteItem(content.id, content.category, items, categories)
            // }
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  );
}

export { ItemDetails };
