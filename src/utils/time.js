export function getDHM(timestamp) {
  let time = new Date(timestamp);
  let year = time.getFullYear();
  const month = (time.getMonth() + 1).toString().padStart(2, "0");
  const date = time.getDate().toString().padStart(2, "0");
  const hours = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");
  const second = time.getSeconds().toString().padStart(2, "0");

  let nowTime = new Date();
  const nowMonth = (nowTime.getMonth() + 1).toString().padStart(2, "0");
  const nowDate = nowTime.getDate().toString().padStart(2, "0");
  if (nowMonth == month && nowDate == date) {
    return hours + ":" + minute;
  }
  return month + "-" + date + " " + hours + ":" + minute;
}
