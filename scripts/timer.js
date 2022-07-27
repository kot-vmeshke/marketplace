const countdown = () => {
  let countDate = new Date("Jul 28, 2022 00:00:00").getTime();
  const now = new Date().getTime();
  let remainingTime = countDate - now;
  if (remainingTime < 0) {
    countDate = new Date("Aug 1, 2022 00:00:00").getTime();
    remainingTime = countDate - now;
    if (remainingTime < 0) {
      countDate = new Date("Aug 6, 2022 00:00:00").getTime();
      remainingTime = countDate - now;
    }
  }

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(remainingTime / day);
  const textHour = Math.floor((remainingTime % day) / hour);
  const textMinute = Math.floor((remainingTime % hour) / minute);
  const textSecond = Math.floor((remainingTime % minute) / second);

  document.querySelector(".days").innerText = textDay > 0 ? textDay : 0;
  document.querySelector(".hours").innerText = textHour > 0 ? textHour : 0;
  document.querySelector(".minutes").innerText = textMinute > 0 ? textMinute : 0;
  document.querySelector(".seconds").innerText = textSecond > 0 ? textSecond : 0;
};

setInterval(countdown, 500);