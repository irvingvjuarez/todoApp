export const columns = [
  {
    id: 0,
    name: "Backlog"
  },
  {
    id: 1,
    name: "Progress"
  },
  {
    id: 3,
    name: "Done"
  }
];

export const categoryOptions = [
  {
    value: "Personal",
    label: "Personal",
    color: "#0569ff",
    isFixed: true,
    tasks: 0,
    completed: 0,
    arr: [],
    id: 0
  },
  {
    value: "Work",
    label: "Work",
    color: "#0052CC",
    tasks: 0,
    completed: 0,
    arr: []
  },
  {
    value: "Homework",
    label: "Homework",
    color: "#5243AA",
    tasks: 0,
    completed: 0,
    arr: []
  },
  {
    value: "School",
    label: "School",
    color: "#FF5630",
    tasks: 0,
    completed: 0,
    arr: []
  },
  {
    value: "Business",
    label: "Business",
    color: "#FF8B00",
    tasks: 0,
    completed: 0,
    arr: []
  },
  {
    value: "Sports",
    label: "Sports",
    color: "#FFC400",
    tasks: 0,
    completed: 0,
    arr: []
  }
];

export const items = [
  {
    id: 0,
    text: "Daily meeting with team",
    category: "business",
    checked: false,
    details: "Normal daily meetings",
    color: "#0569ff",
    createdTime: new Date()
  },
  {
    id: 1,
    text: "Date with Agus",
    category: "personal",
    checked: false,
    details: "Have sux with my gf",
    color: "#ff4602",
    createdTime: new Date()
  },
  {
    id: 2,
    text: "Appointment with investor of Softbank",
    category: "business",
    checked: false,
    details: "Pull off as much money as you can",
    color: "#0569ff",
    createdTime: new Date()
  },
  {
    id: 3,
    text: "Meditation with my cats",
    category: "personal",
    checked: false,
    details: "My cats need this more than me",
    color: "#ff4602",
    createdTime: new Date()
  },
  {
    id: 4,
    text: "Going to running and to the gym",
    category: "personal",
    checked: false,
    details: "It is good for my healthy",
    color: "#ff4602",
    createdTime: new Date()
  },
  {
    id: 5,
    text: "Finish Big-O notation tutorial",
    category: "business",
    checked: false,
    details: "So as to get a well-paid job",
    color: "#0569ff",
    createdTime: new Date()
  },
  {
    id: 6,
    text: "Make the supermarket",
    category: "personal",
    checked: false,
    details: "Cons to live alone. I will create a robot able to do this",
    color: "#ff4602",
    createdTime: new Date()
  }
];

let categoryList = [];

export function addCategory(id, name, color) {
  categoryList.push(name);
  return {
    id: id,
    name: name,
    tasks: 1,
    completed: 0,
    color: color
  };
}

export let categories = [];
for (let i = 0; i < items.length; i++) {
  if (!categories.length) {
    categories.push(addCategory(i, items[i].category, "#0569ff"));
    if (items[i].checked) {
      categories[i].completed++;
    }
  } else {
    for (let j = 0; j < categories.length; j++) {
      if (categoryList.includes(items[i].category)) {
        if (categories[j].name === items[i].category) {
          categories[j].tasks++;
          if (items[i].checked) {
            categories[j].completed++;
          }
          break;
        }
      } else {
        categories.push(addCategory(i, items[i].category, "#ff4602"));
        if (items[i].checked) {
          categories[categories.length - 1].completed++;
        }
        break;
      }
    }
  }
}

categories.forEach(
  (category) =>
    (category.arr = items.filter((item) => item.category === category.name))
);

export const onItemChangesInColumn = (
  newColumnVal,
  itemId,
  itemCategory,
  items,
  categories
) => {
  items = items.map((item) => {
    if (item.id === itemId) {
      item.columnTag = newColumnVal;
    }
    return item;
  });
  categories = categories.map((category) => {
    if (category.label === itemCategory) {
      let itemIndex = category.arr.findIndex((item) => item.id === itemId);
      let itemColumnTag = category.arr[itemIndex].columnTag;

      if (newColumnVal === "Done") {
        category.completed += 1;
      } else if (itemColumnTag === "Done") {
        category.completed -= 1;
      }

      category.arr[itemIndex].columnTag = newColumnVal;
    }
    return category;
  });

  return [categories, items];
};

export const onColorPickerClick = (isPickerHidden, setIsPickerHidden) => {
  if (isPickerHidden === "hidden") {
    setIsPickerHidden("a");
  } else {
    setIsPickerHidden("hidden");
  }
};

export const onCategoryColorChange = (
  e,
  setCurrentColor,
  name,
  categories,
  setCategories
) => {
  categories = categories.map((category) => {
    if (category.label === name) {
      category.color = e.hex;
    }
    return category;
  });
  setCategories(categories);
  setCurrentColor(e.hex);
};

export const onCategoryNameChange = (
  e,
  name,
  categories,
  setCategories,
  items,
  setItems
) => {
  categories = categories.map((category) => {
    if (category.label === name) {
      category.label = e.target.value;
      category.value = e.target.value;
    }
    return category;
  });
  items = items.map((item) => {
    if (item.category === name) {
      item.category = e.target.value;
    }
    return item;
  });
  setItems(items);
  setCategories(categories);
};
