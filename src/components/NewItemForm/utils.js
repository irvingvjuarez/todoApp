export const getNewColor = (categories, selectValue) => {
  return categories.find((item) => item.label === selectValue);
};

export const getNewItem = (
  items,
  taskTitle,
  selectValue,
  columnTag,
  details,
  categoryColor,
  dueTo
) => ({
  id: items.length,
  text: taskTitle,
  category: selectValue,
  columnTag: columnTag,
  details: details,
  color: categoryColor.color,
  createdTime: new Date(),
  dueTo: dueTo
});

export const getNewCategories = (
  categories,
  selectValue,
  newItem,
  columnTag
) => {
  return categories.map((category) => {
    if (category.label === selectValue) {
      category.arr.push(newItem);
      category.tasks += 1;
      if (columnTag === "Done") {
        category.completed += 1;
      }
    }
    return category;
  });
};

export const getNeoCategories = (categories) => {
  return categories.map((item) => ({
    value: item.label,
    label: item.label
  }));
};
