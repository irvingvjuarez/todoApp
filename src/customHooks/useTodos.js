import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {
  const authName = localStorage.getItem("TODO_NAME");
  const authNickName = localStorage.getItem("TODO_NICKNAME");

  const [items, setItems] = useLocalStorage("TODO_ITEMS");
  const [columns, setColumns] = useLocalStorage("TODO_COLUMNS");
  const [todoCategories, setTodoCategories] = useLocalStorage(
    "TODO_CATEGORIES"
  );
  const [search, setSearch] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [color4Picker, setColor4Picker] = React.useState("#0569ff");
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [categoriesVisible, setCategoriesVisible] = React.useState(true);

  return {
    authNickName,
    authName,
    search,
    openModal,
    setOpenModal,
    color4Picker,
    setColor4Picker,
    deleteModal,
    setDeleteModal,
    categoriesVisible,
    setCategoriesVisible,
    items,
    setItems,
    columns,
    setColumns,
    todoCategories,
    setTodoCategories
  };
}

export { useTodos };
