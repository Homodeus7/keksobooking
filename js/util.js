// Случайное число от min до (max+1)
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

export { randomInteger, randomInRange, getRandomArrayElement }