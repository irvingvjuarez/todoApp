export const getNewCategory = (categories, categoryName, color4Picker) => ({
  id: categories.length,
  label: categoryName,
  tasks: 0,
  completed: 0,
  color: color4Picker,
  arr: []
});
