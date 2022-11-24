
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

const onSuccess = (points) => {
    arrayOffers = points.slice()
    createPoints(points);

}

const onError = () => {
    showError('Ошибка размещения объявления, попробуйте еще раз', 'Закрыть')
}

request(onSuccess, onError, 'GET')


