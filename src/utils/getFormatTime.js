function getFormatTime(time = new Date()) {
  const year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  time = `${year}-${month}-${day}`;

  return time;
}

export { getFormatTime };
