
import './map.js';
import './form.js';
import { request } from './fetch.js';
import { showError } from './message.js';
import { createPoints } from './map.js'
import { debounce } from './util.js';

const filter = document.querySelector('.map__filters')
let arrayOffers = []

const filters = {
    'housing-type': (value) => {
        if (value === 'any') {
            createPoints(arrayOffers)
        } else {
            createPoints(arrayOffers.filter(p => p.offer.type === value))
        }

    },
    'housing-price': (value) => {
        if (value === 'any') {
            createPoints(arrayOffers)
        } else if (value === 'middle') {
            createPoints(arrayOffers.filter(p => p.offer.price >= 10000 && p.offer.price <= 50000))
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
    console.log(arrayOffers)
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
        filters[evt.target.id](evt.target.value)
    }
}

filter.addEventListener('change', onFilterClick)


