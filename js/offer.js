import { autors, offers } from './data.js'

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardList = document.querySelector('.map__canvas');


const renderOffer = ({ title, address, price, type, rooms, guests, checkin, checkout, features, description, photos }) => {
    const offerCard = cardTemplate.cloneNode(true);

    offerCard.querySelector('.popup__title').textContent = title;
    offerCard.querySelector('.popup__text--address').textContent = address;
    offerCard.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
    offerCard.querySelector('.popup__type').textContent = type;
    offerCard.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`
    offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`
    offerCard.querySelector('.popup__features').textContent = features.length;
    offerCard.querySelector('.popup__description').textContent = description;
    offerCard.querySelector('.popup__photos').src = photos;

    return offerCard;
};

const renderOffers = () => {
    let cardListFragment = document.createDocumentFragment();

    offers.forEach((card) => {
        cardListFragment.appendChild(renderOffer(card));
    });

    cardList.appendChild(cardListFragment);
};


const renderAutor = ({ avatar }) => {
    const autorsCard = cardTemplate.cloneNode(true);

    autorsCard.querySelector('.popup__avatar').src = avatar;

    return autorsCard
}

const renderAutors = () => {
    let cardListFragment = document.createDocumentFragment();

    autors.forEach((autor) => {
        cardListFragment.appendChild(renderAutor(autor));
    });

    cardList.appendChild(cardListFragment);
};

export { renderOffers, renderAutors };