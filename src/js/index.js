const stopwatchElement = document.querySelector("#stopwatch");
const time = stopwatchElement.querySelector(".time"); // 시간을 표시할 요소
const startBtn = stopwatchElement.querySelector(".start_btn"); // 시작 버튼
const stopBtn = stopwatchElement.querySelector(".stop_btn"); // 정지 버튼
const resetBtn = stopwatchElement.querySelector(".reset_btn"); // 초기화 버튼
const firstCard = stopwatchElement.querySelector(".first_card .card_img"); // 첫번째 카드
const secondCard = stopwatchElement.querySelector(".second_card .card_img"); // 두번째 카드

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timer;
let startTime;
let pauseTime;
let nowTime;
let newTime;
let isPaused = false;
let first;
let second;

startBtn.onclick = function () {
  if (!isPaused && startTime) {
    return;
  }

  isPaused = false;

  if (startTime) {
    startTime += Date.now() - pauseTime; // 재시작할 때
  } else {
    startTime = Date.now(); // 처음 시작할 때
  }

  clearInterval(timer);
  timer = setInterval(startTimer, 10);
  console.log(typeof(milliseconds));
};

stopBtn.onclick = function () {
  if (isPaused) {
    return;
  }

  isPaused = true;
  clearInterval(timer);
  pauseTime = Date.now();
  
  first = milliseconds.toString().charAt(0);
  second = milliseconds.toString().charAt(1);
  
  firstCard.src = `./src/img/img_card${first}.png`;
  secondCard.src = `./src/img/img_card${second}.png`;
};

resetBtn.onclick = function () {
  clearInterval(timer);

  minutes = "00'";
  seconds = "00";
  milliseconds = "00";
  timer = null;
  startTime = null;

  time.innerHTML = `<span class="number">00</span> : <span class="number">00</span> : <span class="number">00</span>`;
  firstCard.src = "./src/img/img_card_back.png";
  secondCard.src = "./src/img/img_card_back.png";
};

function startTimer() {
  nowTime = new Date().getTime();
  newTime = new Date(nowTime - startTime);

  minutes = addZero(newTime.getMinutes()); // 분
  seconds = addZero(newTime.getSeconds()); // 초
  milliseconds = addZero(Math.floor(newTime.getMilliseconds() / 10)); // 밀리초

  time.innerHTML = `<span class="number">${minutes}</span> : <span class="number">${seconds}</span> : <span class="number">${milliseconds}</span>`;
}

function addZero(num) {
  return num < 10 ? "0" + num : "" + num;
}