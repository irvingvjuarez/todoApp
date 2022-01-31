function dayFormat(date) {
  const regex = /[A-z\s]{6,9}[\d]{2}/;
  const neoDate = String(new Date(date));
  const result = regex.exec(neoDate);
  return result;
}

export { dayFormat };
