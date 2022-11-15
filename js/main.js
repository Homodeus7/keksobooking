
import './map.js';
import './form.js';
import './filter.js';

import { request } from './fetch.js';
import { showError } from './message.js';
import { createPoints } from './map.js'

const onSuccess = (points) => {
    console.log(points)
    createPoints(points);
}

const onError = () => {
    showError('Ошибка размещения объявления, попробуйте еще раз', 'Закрыть')
}

request(onSuccess, onError, 'GET')
