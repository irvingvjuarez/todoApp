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
  let endPoint = e.clientX;
  let newColumn;
  if (endPoint > startPoint) {
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
  } else if (endPoint < startPoint) {
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
  }

  return newColumn;
};
