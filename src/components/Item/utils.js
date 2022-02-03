import { actionTypes } from "../../customHooks/useReducer";
import { onItemChangesInColumn } from "../../utils/data";

export const getAnswer = (selectedItem) => {
  return {
    title: selectedItem.text,
    checked: false,
    id: selectedItem.id,
    category: selectedItem.category,
    details: selectedItem.details,
    time: selectedItem.createdTime,
    dueTo: selectedItem.dueTo,
    columnTag: selectedItem.columnTag
  };
};

export const getNewColumn = (e, startPoint, columnTag) => {
  const minimumShift = document.querySelector(".Item").offsetWidth / 2;

  let endPoint = e.clientX;
  let newColumn;
  if (endPoint > startPoint) {
    if(endPoint - startPoint > minimumShift){
      switch (columnTag) {
        case "Backlog":
          newColumn = "Progress";
          break;
        case "Progress":
          newColumn = "Done";
          break;
        default:
          newColumn = "Done";
      }
    }else{
      return false
    }
  } else if (endPoint < startPoint) {
    if(startPoint - endPoint > minimumShift){
      switch (columnTag) {
        case "Done":
          newColumn = "Progress";
          break;
        case "Progress":
          newColumn = "Backlog";
          break;
        default:
          newColumn = "Backlog";
      }
    }else{
      return false
    }
  }

  return newColumn;
};

export const onDetailModal = (items, id, dispatch) => {
  let selectedItem = items.find((item) => item.id === id);
  dispatch({
    type: actionTypes.modalOpened,
    payload: ["showItemDetail", getAnswer(selectedItem)]
  });
}

export const setEndPoint = (e, startPoint, columnTag, id, category, items, categories, dispatch) => {
  e.target.parentNode.classList.remove("draggedItem")
  let newColumn = getNewColumn(e, startPoint, columnTag);
  if(newColumn){
    let newValues = onItemChangesInColumn(
      newColumn,
      columnTag,
      id,
      category,
      items,
      categories
    );

    dispatch({
      type: actionTypes.bothNoModal,
      payload: { CATEGORIES: newValues[0], ITEMS: newValues[1] }
    });
  }
}