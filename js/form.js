
import { showError, showSuccess, } from './message.js';
import { request } from './fetch.js';
import { renderPhoto } from './pictures.js';

const IMG_WIDTH = 70;
const IMG_HEIGHT = 70;
const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MAX_PRICE = 1000000;
const COORDINATE_ROUNDING = 5;

const MIN_PRICE_OF_TYPE = {
    bungalow: '0',
    flat: '1000',
    hotel: '3000',
    house: '5000',
    palace: '10000',
};

const adForm = document.querySelector('.ad-form');

const titleInput = adForm.querySelector('#title');
const selectorType = adForm.querySelector(`#type`);
const inputPrise = adForm.querySelector(`#price`);
const selectorTimeIn = adForm.querySelector(`#timein`);
const selectorTimeOut = adForm.querySelector(`#timeout`);
const selectorRoomNumber = adForm.querySelector('#room_number');
const selectorRoomCapacity = adForm.querySelector('#capacity');
const selectorAdress = adForm.querySelector('#adress');
// Для фотографий
const adFormAvatar = document.querySelector('.ad-form-header__preview');
const adFormPhoto = document.querySelector('.ad-form__photo');
const avatarPreview = adFormAvatar.querySelector('img').cloneNode(true);
const avatarChooser = adForm.querySelector('#avatar');
const photoChooser = adForm.querySelector('#images');

// Извещения-балуны о вводе допустимого кол-ва символов в поле «Заголовок объявления»
const onTitleValueInput = () => {
    const valueLength = titleInput.value.length;
    if (valueLength < MIN_LENGTH) {
        titleInput.style.borderColor = 'red';
        titleInput.setCustomValidity(`Ещё ${MIN_LENGTH - valueLength} символов`);
    } else if (valueLength > MAX_LENGTH) {
        titleInput.style.borderColor = 'red';
        titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_LENGTH} символов`);
    } else {
        titleInput.style.borderColor = 'white';
        titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
};

titleInput.addEventListener('input', onTitleValueInput);

// Извещения-балуны об указании допустимой цены в поле «Цена за ночь»
const onPriceValueInput = () => {
    const valuePrice = inputPrise.value;
    if (valuePrice < MIN_PRICE_OF_TYPE[selectorType.value]) {
        inputPrise.style.borderColor = 'red';
    } else if (valuePrice > MAX_PRICE) {
        inputPrise.style.borderColor = 'red';
        inputPrise.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE}.`);
    } else {
        inputPrise.style.borderColor = 'white';
        inputPrise.setCustomValidity('');
    }
    inputPrise.reportValidity();
};

inputPrise.addEventListener('input', onPriceValueInput);

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const onTypeChange = () => {
    inputPrise.placeholder = MIN_PRICE_OF_TYPE[selectorType.value];
    inputPrise.min = MIN_PRICE_OF_TYPE[selectorType.value];
};

selectorType.addEventListener('change', onTypeChange);

// Поле «Время заезда» синхронизированно изменят значение «Время выезда»
const onTimeInChange = () => {
    selectorTimeOut.value = selectorTimeIn.value;
};

selectorTimeIn.addEventListener('change', onTimeInChange);

// Поле «Время выезда» синхронизированно изменят значение «Время заезда»
const onTimeOutChange = () => {
    selectorTimeIn.value = selectorTimeOut.value;
};

selectorTimeOut.addEventListener('change', onTimeOutChange);

// Поле «Количество комнат» вводит ограничения на количество гостей в поле «Количество мест»
const onRoomsChange = () => {
    if (selectorRoomNumber.value === '1' && selectorRoomCapacity.value !== '1') {
        selectorRoomCapacity.style.borderColor = 'red';
        selectorRoomCapacity.setCustomValidity('В 1 комнате можно разместить только 1 гостя');
    } else if (selectorRoomNumber.value === '2' && selectorRoomCapacity.value !== '1' && selectorRoomCapacity.value !== '2') {
        selectorRoomCapacity.style.borderColor = 'red';
        selectorRoomCapacity.setCustomValidity('В 2 комнатах можно разместить только от 1 до 2 гостей');
    } else if (selectorRoomNumber.value === '3' && selectorRoomCapacity.value === '0') {
        selectorRoomCapacity.style.borderColor = 'red';
        selectorRoomCapacity.setCustomValidity('В 3 комнатах можно разместить только от 1 до 3 гостей');
    } else if (selectorRoomNumber.value === '100' && selectorRoomCapacity.value !== '0') {
        selectorRoomCapacity.style.borderColor = 'red';
        selectorRoomCapacity.setCustomValidity('100 комнат не для гостей');
    } else {
        selectorRoomCapacity.style.borderColor = 'white';
        selectorRoomCapacity.setCustomValidity('');
    }
    selectorRoomCapacity.reportValidity();
};

selectorRoomNumber.addEventListener('change', onRoomsChange);
selectorRoomCapacity.addEventListener('change', onRoomsChange);

// Создать превью аватара (Ваша фотография)
const getAvatar = (result) => {
    const fragment = document.createDocumentFragment();
    avatarPreview.src = result;
    fragment.appendChild(avatarPreview);
    adFormAvatar.innerHTML = '';
    adFormAvatar.appendChild(fragment);
};

// Создать превью фотографии жилья
const getPhoto = (result) => {
    adFormPhoto.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const element = document.createElement('img');
    element.src = result;
    element.alt = 'Фото жилья';
    element.width = IMG_WIDTH;
    element.height = IMG_HEIGHT;
    fragment.appendChild(element);
    adFormPhoto.appendChild(fragment);
};

const getAvatarPreview = () => renderPhoto(avatarChooser, getAvatar);
const getPhotoPreview = () => renderPhoto(photoChooser, getPhoto);

getAvatarPreview();
getPhotoPreview();

// Неактивное состояние страницы: формы "Ваше объявление" и фильтра для карты
const disablePage = () => {
    adForm.classList.add('ad-form--disabled');
    for (const elem of adFormList) {
        elem.setAttribute('disabled', 'disabled');
    }
    mapFilters.classList.add('map__filters--disabled');
    for (const elem of mapFiltersList) {
        elem.setAttribute('disabled', 'disabled');
    }
};

// Активное состояние формы "Ваше объявление"
const activateAd = () => {
    adForm.classList.remove('ad-form--disabled');
    for (const elem of adFormList) {
        elem.removeAttribute('disabled');
    }
};

// Отправка формы

const onSuccess = () => {
    showSuccess()
    adForm.reset();
}

const onError = () => {
    showError();
}

adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    request(onSuccess, onError, 'POST', formData)
})

// Нажатие на кнопку "очистить" (reset-форма)
const onButtonReset = (cb) => {
    adFormReset.addEventListener('click', (evt) => {
        evt.preventDefault();
        cb();
    });
};

export { disablePage, activateAd, onButtonReset }