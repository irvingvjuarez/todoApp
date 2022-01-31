export const colorChange = (e, categories, name) => {
  return categories.map((category) => {
    if (category.label === name) {
      category.color = e.hex;
    }
    return category;
  });
};

export const newCategories = (e, name, categories) => {
  return categories.map((category) => {
    if (category.label === name) {
      category.label = e.target.value;
      category.value = e.target.value;
    }
    return category;
  });
};

export const newItems = (e, name, items) => {
  return items.map((item) => {
    if (item.category === name) {
      item.category = e.target.value;
    }
    return item;
  });
};
