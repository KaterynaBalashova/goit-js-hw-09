import throttle from "lodash.throttle";

const selectors = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
}
let intervalId = null;

selectors.btnStart.addEventListener('click', onClickStart);
selectors.btnStop.addEventListener('click', onClickStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function onClickStart() {
intervalId = setInterval(() => {
    selectors.body.style.backgroundColor = getRandomHexColor();
}, 1000);
  selectors.btnStart.setAttribute('disabled', true);
  selectors.btnStop.removeAttribute('disabled', false);
};

function onClickStop() {
  clearInterval(intervalId);

  selectors.btnStart.removeAttribute('disabled', false);
  selectors.btnStop.setAttribute('disabled', true);
}
