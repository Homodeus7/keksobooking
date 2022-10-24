const randomInteger = (min, max) => {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};


const randomInRange = (min, max, precision) => {
    return Math.round(Math.random() * Math.pow(10, precision)) /
        Math.pow(10, precision) * (max - min) + min;
}

export { randomInteger, randomInRange }