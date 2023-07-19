import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

btnStart.addEventListener('click', onBtnStart);

btnStart.disabled = true;
input.disabled = false;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] >= options.defaultDate) {
      btnStart.disabled = false;
    } else {
      Notiflix.Notify.failure("Please choose a date in the future");
      btnStart.disabled = true;
    };
  },
};

flatpickr(input, options);

function onBtnStart() {
  
    intervalId = setInterval(() => {
    const selectedDate = new Date(input.value);
    const countdown = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(countdown);

    second.textContent = addLeadingZero(seconds);
    minute.textContent = addLeadingZero(minutes);
    hour.textContent = addLeadingZero(hours);
    day.textContent = addLeadingZero(days);
      
    if (countdown < 1000) {
      clearInterval(intervalId);
      btnStart.disabled = true;
      input.disabled = false;
      Notiflix.Notify.success('It`s time!');
      };

    }, 1000);
  
  btnStart.disabled = true;
  input.disabled = true;

};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};