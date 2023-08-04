export function now_date_to_unix() {
  let currentDate = new Date();
  return Math.floor(currentDate.getTime() / 1000);
}

export function unix_to_date(unixTimestamp) {
  let date = new Date(unixTimestamp * 1000);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return day + "/" + month + "/" + year;
}
