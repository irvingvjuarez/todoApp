import { saveValue } from "./saveValue";
import { useLocalStorage } from "../useLocalStorage";

const InitialState = () => ({
  authName: localStorage.getItem("TODO_NAME"),
  authNickName: localStorage.getItem("TODO_NICKNAME"),
  items: useLocalStorage("TODO_ITEMS"),
  columns: useLocalStorage("TODO_COLUMNS"),
  categories: useLocalStorage("TODO_CATEGORIES"),
  openModal: false,
  color4Picker: "#0569ff",
  deleteModal: false,
  categoriesVisible: true,
  searched: ""
});

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.bothNoModal:
      saveValue("TODO_ITEMS", payload.ITEMS);
      saveValue("TODO_CATEGORIES", payload.CATEGORIES);
      return {
        ...state,
        items: payload.ITEMS,
        categories: payload.CATEGORIES
      };
    case actionTypes.bothModal:
      saveValue("TODO_CATEGORIES", payload.CATEGORIES);
      saveValue("TODO_ITEMS", payload.ITEMS);
      return {
        ...state,
        categories: payload.CATEGORIES,
        items: payload.ITEMS,
        openModal: false
      };
    case actionTypes.categoryColorChange:
      saveValue("TODO_CATEGORIES", payload.CATEGORIES);
      return {
        ...state,
        categories: payload.CATEGORIES
      };
    case actionTypes.addingCategory:
      saveValue("TODO_CATEGORIES", payload);
      return {
        ...state,
        openModal: false,
        categories: payload
      };
    case actionTypes.itemsOnly:
      saveValue("TODO_ITEMS", payload);
      return {
        ...state,
        items: payload
      };
    case actionTypes.modalOpened:
      return {
        ...state,
        openModal: payload
      };
    case actionTypes.modalClosed:
      return {
        ...state,
        openModal: false
      };
    case actionTypes.searched:
      return {
        ...state,
        searched: payload
      }
    default:
      return {
        ...state
      };
  }
};

const actionTypes = {
  categoryColorChange: "CATEGORY_COLOR_CHANGE",
  modalClosed: "MODAL_CLOSED",
  addingCategory: "ADDING_CATEGORY",
  bothNoModal: "BOTH_NO_MODAL",
  bothModal: "BOTH_MODAL",
  itemsOnly: "ITEMS_ONLY",
  modalOpened: "MODAL_OPENED",
  searched: "SEARCHED_ON"
};

export { InitialState, reducer, actionTypes };
