import { createPoints } from './map.ls'

const housingSelect = document.querySelector('#housing-type');
const priceSelect = document.querySelector('#housing-price');
const roomsSelect = document.querySelector('#housing-rooms');
const guestsSelect = document.querySelector('#housing-guests');
const featuresSelect = document.querySelector('#housing-features');
const SIMILAR_OFFER_COUNT = 10;
const filter = document.querySelector('.map__filters')




// ==============offer
// title: "Квартира студия в престижном районе", address: "Chiyoda-ku, Tōkyō-to 102-0091", price: 88000, … }
// ​​​
// address: "Chiyoda-ku, Tōkyō-to 102-0091"
// ​​​
// checkin: "7:00"
// ​​​
// checkout: "10:00"
// ​​​
// description: "Комната в трёхкомнатной квартире, подойдёт молодым путешественникам."
// ​​​
// features: Array(6) [ "wifi", "washer", "elevator", … ]
// ​​​
// guests: 5
// ​​​
// photos: Array(3) [ "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/cameron-venti-R64qgQ6rr_o.jpg", "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg", "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg" ]
// ​​​
// price: 88000
// ​​​
// rooms: 6
// ​​​
// title: "Квартира студия в престижном районе"
// ​
// type: "bungalow"
// =======================