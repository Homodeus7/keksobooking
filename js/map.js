// Создадим карту. Для этого воспользуемся методами глобального объекта L, сокращение от Leaflet.
// Мы передали L элемент, в который просим отрисовать карту, а также центр карты и масштаб.


// Подписка на события карты.load или по-русски «инициализация», и когда карта будет готова, выведем сообщение об этом в консоль.
// Похожим образом можно подписаться почти на все события с картой: перемещение, изменение масштаба или размеров, добавление и удаление метки и так далее.

const map = L.map('map-canvas')
    .on('load', () => {
        console.log('Карта инициализирована')
    })
    .setView({
        lat: 35.65631,
        lng: 139.78042,
    }, 12);

// Воспользуемся open source изображениями карт от OpenStreetMap, добавив их как слой на нашу созданную карту. 

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
).addTo(map);

const mainPinIcon = L.icon({
    iconUrl: '/leaflet/img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
});

// Добавление маркера. 
// Параметр draggable означает, что маркер можно передвигать по карте.

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
    console.log(evt.target.getLatLng());
});