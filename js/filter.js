import { removePoints } from './map.js';


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
    features: (elements, values) => {
        if (elements) {
            const isAvailable = (feature) => elements.includes(feature)
            return values.every(v => isAvailable(v)) ? elements : ''
        } else return !elements
    },
}

const onFilterClick = (offers) => {
    removePoints();
    const features = Array.from(featuresChexboxs).map(ch => ch.checked ? ch.value : '').filter(ch => ch)
    const result = arrayOffers.filter(offer =>
        filters.type(offer.offer.type, housingSelect.value)
        && filters.price(offer.offer.price, priceSelect.value)
        && filters.rooms(offer.offer.rooms.toString(), roomsSelect.value)
        && filters.guests(offer.offer.guests.toString(), guestsSelect.value)
        && filters.features(offer.offer.features, features)
    )
    createPoints(result)
}

filter.addEventListener('change', onFilterClick)

export { onFilterClick }