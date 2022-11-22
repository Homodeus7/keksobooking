
import './map.js';
import './form.js';
import { request } from './fetch.js';
import { showError } from './message.js';
import { createPoints } from './map.js'
import { debounce } from './util.js';

const SIMILAR_OFFER_COUNT = 10;
const filter = document.querySelector('.map__filters')
const housingSelect = document.querySelector('#housing-type');
const priceSelect = document.querySelector('#housing-price');
const roomsSelect = document.querySelector('#housing-rooms');
const guestsSelect = document.querySelector('#housing-guests');
const featuresChexboxs = document.querySelectorAll('.map__checkbox');
let arrayOffers = [];

const filters = {
    type: (element, value) => {
        if (value === 'any') {
            return element
        } else {
            return element === value ? element : ''
        }
    },
    price: (element, value) => {
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
    rooms: (element, value) => {
        if (value === 'any') {
            return element
        } else {
            return element === value ? element : ''
        }
    },
    guests: (element, value) => {
        if (value === 'any') {
            return element
        } else {
            return element === value ? element : ''
        }
    },
    features: (element, value) => {
        if (value === '') {
            return element
        } else {
            return element === value ? element : ''
        }
    },
}


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
    createPoints(points);
    console.log(points)
}

const onError = () => {
    showError('Ошибка размещения объявления, попробуйте еще раз', 'Закрыть')
}

request(onSuccess, onError, 'GET')

const onFilterClick = () => {
    console.log('hello')
    removePoints();

    const result = arrayOffers.filter(offer =>
        filters.type(offer.offer.type, housingSelect.value)
        && filters.price(offer.offer.price, priceSelect.value)
        && filters.rooms(offer.offer.rooms.toString(), roomsSelect.value)
        && filters.guests(offer.offer.guests.toString(), guestsSelect.value)
        //&& filters.features(offer.offer.features, featuresChexboxs.value)
    )
    createPoints(result)
}
// const onCheck = () => { Array.from(featuresChexboxs).map(ch => console.log(ch.checked)) }
// featuresChexboxs.addEventListener('change', onCheck)

filter.addEventListener('change', onFilterClick)


