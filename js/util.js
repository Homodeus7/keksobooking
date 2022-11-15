// Случайное число от min до (max+1)
const Keys = {
    ESC: 'Esc',
    ESCAPE: 'Escape',
}

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

// Случайное число от min до (max+1), количество знаков после запятой
const randomInRange = (min, max, precision) => {
    return Math.round(Math.random() * Math.pow(10, precision)) /
        Math.pow(10, precision) * (max - min) + min;
}


const getRandomArrayElement = (elements) => {
    return elements[randomInteger(0, elements.length - 1)];
};

const checkEsc = (evt) => {
    return evt.key === Keys.ESC || evt.key === Keys.ESCAPE;
}

// таймаут запроса
const DEBOUNCE_INTERVAL = 500

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

export { randomInteger, randomInRange, getRandomArrayElement, checkEsc, debounce }