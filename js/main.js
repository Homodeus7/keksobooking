const randomInteger = (min, max) => {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};


const randomInRange = (min, max, precision) => {
    return Math.round(Math.random() * Math.pow(10, precision)) /
        Math.pow(10, precision) * (max - min) + min;
}

let autors = [];

let offer = [];

const OFFER = 10;

const TYPE = [
    'palace',
    'flat',
    'house',
    'bungalow',
];

const CHECKIN = [
    '12: 00',
    '13: 00',
    '14: 00',
];

const FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
];

const createAuthor = () => {
    for (let i = 1; i <= OFFER; i++) {
        autors.push({
            avatar: i < 10 ? `img/avatars/user0${i}.png` : `img/avatars/user${i}.png`,
        })
    }
};

const createOffer = () => {
    for (let i = 0; i < OFFER; i++) {
        const randomPrice = randomInteger(3000, 30000);
        const randomTypeIndex = randomInteger(0, TYPE.length - 1);
        const randomRooms = randomInteger(1, 10);
        const randomFeatures = randomInteger(0, FEATURES.length - 1);
        const getRandomArrayElement = (elements) => {
            return elements[(0, elements.length - 1)];
        };
        offer.push({
            title: TYPE[randomTypeIndex] + ' with ' + randomRooms + ' rooms, ' + 'features: ' + randomFeatures + '.',
            address: '35.' + randomInteger(1, 99) + '000' + ' ' + '139.' + randomInteger(1, 99) + '000',
            price: randomPrice,
            type: getRandomArrayElement(TYPE),
            rooms: randomRooms,
            guests: randomInteger(1, 10),
            checkin: getRandomArrayElement(CHECKIN),
            checkout: getRandomArrayElement(CHECKIN),
            features: getRandomArrayElement(FEATURES),
            description: TYPE[randomTypeIndex] + ' with ' + randomRooms + ' rooms, ' + 'features: ' + randomFeatures + '.',
            photos: 'http://o0.github.io/assets/images/tokyo/hotel' + randomInteger(1, 30) + '.jpg',
            location: ['x: ' + '35.' + randomInteger(1, 99) + '000', ' y: ' + '139.' + randomInteger(1, 99) + '000'],
        })
    }
};

createAuthor();
createOffer();
console.log(autors);
console.log(offer);