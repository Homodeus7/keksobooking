import { randomInteger, getRandomArrayElement } from './util.js'

let autors = [];
let offers = [];
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

        offers.push({
            title: TYPE[randomTypeIndex] + ' with ' + randomRooms + ' rooms, ' + 'features: ' + randomFeatures + '.',
            address: '35.' + randomInteger(1, 99) + '000' + ' ' + '139.' + randomInteger(1, 99) + '000',
            price: randomPrice,
            type: getRandomArrayElement(TYPE),
            rooms: randomRooms,
            guests: randomInteger(1, 10),
            checkin: getRandomArrayElement(CHECKIN),
            checkout: getRandomArrayElement(CHECKIN),
            features: FEATURES.slice(0, randomInteger(1, FEATURES.length - 1)),
            description: TYPE[randomTypeIndex] + ' with ' + randomRooms + ' rooms, ' + 'features: ' + randomFeatures + '.',
            photos: 'http://o0.github.io/assets/images/tokyo/hotel' + randomInteger(1, 30) + '.jpg',
            lat: `35.${randomInteger(1, 99)}000`,
            lng: `139.${randomInteger(1, 99)}000`,
        })
    }
};

createAuthor();
createOffer()

export { autors, offers };