const year = new Date().getFullYear();
const targetDate = new Date(year, 5, 20).getTime(); // June is month 5 (0-indexed)

// countdown
let timer = setInterval(function() {

  // get today's date
  const today = new Date().getTime();

  // get the difference
  let diff;
  if (today > targetDate) {
    const nextYear = year + 1;
    diff = new Date(nextYear, 5, 20).getTime() - today; // June is month 5 (0-indexed)
  } else {
    diff = targetDate - today;
  }

  // math
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // display
  document.getElementById("timer").innerHTML =
    `<div class="days"> \
      <div class="numbers">${days}</div>days</div> \
    <div class="hours"> \
      <div class="numbers">${hours}</div>hours</div> \
    <div class="minutes"> \
      <div class="numbers">${minutes}</div>minutes</div> \
    <div class="seconds"> \
      <div class="numbers">${seconds}</div>seconds</div> \
    </div>`;

}, 1000);
