
import './map.js';
import './form.js';
import { getData } from './fetch.js';
import { addMainPinMarker } from './map.js'
import { debounce } from './util.js';
import { onFilterClick } from './filter.js';

// const onError = () => {
//     showError('Ошибка размещения объявления, попробуйте еще раз', 'Закрыть')
// }

const renderPoints = (points) => {
    onFilterClick(points)
}

getData((points) => renderPoints(points));

addMainPinMarker()

