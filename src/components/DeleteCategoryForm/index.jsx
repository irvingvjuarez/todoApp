import { actionTypes } from "../../customHooks/useReducer";
import "./DeleteCategoryForm.css";

function DeleteCategoryForm({ name, categories, items, dispatch }) {
  const onCloseModal = () => {
    dispatch({ type: actionTypes.modalClosed });
  };
  const onDeleteCategory = () => {
    let index = categories.findIndex((category) => category.label === name);
    categories.splice(index, 1);
    items = items.filter((item) => item.category !== name);
    dispatch({
      type: actionTypes.bothModal,
      payload: { CATEGORIES: categories, ITEMS: items }
    });
  };

  return (
    <div className="deleteCategory">
      <h2>Are you sure you want to delete the category "{name}"</h2>

      <div className="container-buttons">
        <button onClick={onCloseModal} type="button">
          Close
        </button>
        <button
          onClick={() => onDeleteCategory(name, categories, items)}
          className="cta-delete"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export { DeleteCategoryForm };
