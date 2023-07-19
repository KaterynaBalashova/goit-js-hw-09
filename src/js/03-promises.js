import Notiflix from 'notiflix';

const form = document.querySelector('form');
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmound = document.querySelector('[name="amount"]');

let delay = inputDelay.value;
const stepValue = inputStep.value;
const amountValue = inputAmound.value;

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  for (let position = 1; position <= amountValue; position += 1){
  createPromise({ position, delay })
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += stepValue;
  };
};

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
};

