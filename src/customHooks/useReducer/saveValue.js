function saveValue(itemName, newValue) {
  localStorage.setItem(itemName, JSON.stringify(newValue));
}

export { saveValue };
