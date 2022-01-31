function useLocalStorage(itemName, initial = "") {
  let parsedItem;
  if (!localStorage.getItem(itemName)) {
    localStorage.setItem(itemName, JSON.stringify(initial));
    parsedItem = initial;
  } else {
    parsedItem = JSON.parse(localStorage.getItem(itemName));
  }

  return parsedItem;
}

export { useLocalStorage };
