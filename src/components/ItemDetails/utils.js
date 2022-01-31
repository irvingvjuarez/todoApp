export const getColumnsName = (columns) => {
  return columns.map((column) => ({
    value: column.name,
    label: column.name
  }));
};

export const getIndex = (arr, id, content, contentId) => {
  return arr.findIndex((item) => item[id] === content[contentId]);
  // items.findIndex((item) => item.id === content.id)
};

export const getItems = (e, items, content, section) => {
  return items.map((item) => {
    if (item.id === content.id) {
      item[section] = e.target.value;
    }
    return item;
  });
};

export const getCategories = (categories, content) => {
  return categories.map((category) => {
    if (category.label === content.category) {
      category.tasks -= 1;

      let categoryItemIndex = category.arr.findIndex(
        (item) => item.id === content.id
      );
      if (category.arr[categoryItemIndex].columnTag === "Done") {
        category.completed -= 1;
      }
      category.arr.splice(categoryItemIndex, 1);
    }
    return category;
  });
};
