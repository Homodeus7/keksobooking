
import './map.js';
import './form.js';
import { request } from './fetch.js';
import { showError } from './message.js';
import { createPoints } from './map.js'
import { debounce } from './util.js';

const SIMILAR_OFFER_COUNT = 10;
const housingSelect = document.querySelector('#housing-type');
const priceSelect = document.querySelector('#housing-price');
const roomsSelect = document.querySelector('#housing-rooms');
const guestsSelect = document.querySelector('#housing-guests');
const featuresSelect = document.querySelector('#housing-features');
const filter = document.querySelector('.map__filters')
let arrayOffers = []
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

const filters = {
    'housing-type': (element, value) => {
        if (value === 'any') {
            return element
        } else {
            return element === value ? element : ''
        }
    },
    'housing-price': (element, value) => {
        if (value === 'any') {
            return element
        } else if (value === 'middle') {
            return element >= 10000 && element <= 50000
        } else if (value === 'low') {
            return element <= 10000
        } else if (value === 'high') {
            return element >= 50000
        }
    },
    'housing-rooms': (element, value) => {
        if (value === 'any') {
            return element
        } else {
            return element === value ? element : ''
        }
    },
    'housing-guests': (element, value) => {
        if (value === 'any') {
            return element
        } else {
            return element === value ? element : ''
        }
    },
}




// const results = people.filter(element => {
//     return element.age === 30 && element.name === 'Carl';
//   });

const removePoints = () => {
    const images = document.querySelectorAll('.leaflet-marker-icon ');
    if (images) {
        images.forEach(element => {
            element.remove();
        });
    }
}

const onSuccess = (points) => {
    arrayOffers = points.slice()
    //console.log(arrayOffers)
    createPoints(points);
    //console.log(points)
}

const onError = () => {
    showError('Ошибка размещения объявления, попробуйте еще раз', 'Закрыть')
}

request(onSuccess, onError, 'GET')

const onFilterClick = (evt) => {
    if (evt.target.classList.contains('map__filter')) {
        console.log(evt.target.value)
        removePoints();
        //   filters[evt.target.id](evt.target.value)
        const result = arrayOffers.filter(offer =>
            filters['housing-type'](offer.offer.type, housingSelect.value)
            && filters['housing-price'](offer.offer.price, priceSelect.value)
            && filters['housing-rooms'](offer.offer.rooms.toString(), roomsSelect.value)
            && filters['housing-guests'](offer.offer.guests.toString(), guestsSelect.value)
        )
        console.log(result)
        createPoints(result)
    }
}

filter.addEventListener('change', onFilterClick)


