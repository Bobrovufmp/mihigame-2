const startButton = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const gameTime = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = ["red", "blue", "azure", "green", "yellow", "silver"];
let time = 0;
let score = 0;
startButton.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  // cheatGame()
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let currentTime = --time;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }
    setTime(currentTime);
  }
}

function setTime(params) {
  gameTime.innerHTML = `00:${params}`;
}

function finishGame() {
  gameTime.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Score: <span>${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const { width, height } = board.getBoundingClientRect();
  const size = randomCircleAndPos(10, 60);
  const xPos = randomCircleAndPos(0, width - size);
  const yPos = randomCircleAndPos(0, height - size);
  const color = getRandomColor();
  circle.style.backgroundColor = color;
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${yPos}px`;
  circle.style.left = `${xPos}px`;
  board.append(circle);
  
}

function randomCircleAndPos(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

// function cheatGame() {
//   function kill() {
//     const cheat = document.querySelector(".circle");
//     if (cheat) {
//       cheat.click();
//     }
    
//   }
//   setInterval(kill, 1);
// }
