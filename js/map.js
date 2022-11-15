const adForm = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = document.querySelectorAll('.map__filter');
const inputAdress = document.querySelector('#address');

// Отрисовка карты

const map = L.map('map-canvas')
    .on('load', () => {
    })
    .setView({
        lat: 35.65631,
        lng: 139.78042,
    }, 12);

    // Проверка инициализации

if (map === undefined) {
    adForm.classList.add(`ad-form--disabled`);
    mapFilters.classList.add(`map__filters--disabled`);

    for (let i = 0; i < adFormElement.length; i++) {
        adFormElement[i].disabled = true;
    }

    for (let i = 0; i < mapFilter.length; i++) {
        mapFilter[i].disabled = true;
    }
} else {
    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
    ).addTo(map);
}

// Реализуйте с помощью API карт выбор адреса путём перемещения главной метки. Ручное редактирование поля запрещено, однако поле должно быть доступно, чтобы значение отправлялось на сервер с формой.

const mainPinIcon = L.icon({
    iconUrl: '/leaflet/img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
    {
        lat: 35.65631,
        lng: 139.78042,
    },
    {
        draggable: true,
        icon: mainPinIcon,
    },
);

mainPinMarker.addTo(map);

//О бработчик события moveend означает,что пользователь закончил передвигать маркер, и выведем в консоль новые координаты метки.
// Обратите внимание, что как и у обычного события, у события карты есть target, только методы у объекта события свои, нужные для карты. 
// Метод getLatLng() возвращает объект с новыми координатами.

mainPinMarker.on('moveend', (evt) => {
    inputAdress.value = evt.target.getLatLng();
});

// Содержимым балуна должен быть наш HTML, а не просто текст
// функция createCustomPopup по получению DOM-элемента из разметки

const createCustomPopup = (point) => {
    const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
    const popupElement = cardTemplate.cloneNode(true);

    popupElement.querySelector('.popup__avatar').src = point.author.avatar;
    popupElement.querySelector('.popup__title').textContent = point.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = point.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = point.offer.price;
    popupElement.querySelector('.popup__type').textContent = point.offer.type;
    popupElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
    popupElement.querySelector('.popup__features').textContent = point.offer.features;
    popupElement.querySelector('.popup__description').textContent = point.description;
    popupElement.querySelector('.popup__photos').textContent = point.photos;

    return popupElement;
};

// А дальше в проходке forEach по циклу насоздаём маркеров и понадобавляем их на карту.

const createPoints = (points) => {

    points.forEach((point) => {
            const { lat, lng } = point.location;

            const icon = L.icon({
                iconUrl: '/leaflet/img/pin.svg',
                iconSize: [40, 40],
                iconAnchor: [20, 40],
            });

            const marker = L.marker(
                {
                    lat,
                    lng,
                },
                {
                    icon,
                },
            );

            //keepInView, чтобы карта автоматичски переместилась, если балун вылезает за границы. Кликните по самой верхей метке, чтобы увидеть это в действии.

            marker
                .addTo(map)
                .bindPopup(
                    createCustomPopup(point),
                    {
                        keepInView: true,
                    },
                );
        });
}

export { createPoints }