import { actionTypes } from "../../customHooks/useReducer";
import "./TodoCategories.css";

function TodoCategories({ children, dispatch }) {
  const handleAddCategoryModal = () => {
    dispatch({ type: actionTypes.modalOpened, payload: "AddCategory" });
  };

  return (
    <section className="categories">
      <div className="addCta-container">
        <h2 className="subtitle">CATEGORIES</h2>
        <span onClick={handleAddCategoryModal} className="addCta">
          +
        </span>
      </div>
      <div className="categories__container--minimized">{children}</div>
    </section>
  );
}

export default TodoCategories;
