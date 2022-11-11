import { checkEsc } from './util.js';

const main = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content;
const errorFragment = document.createDocumentFragment();
const successTemplate = document.querySelector('#success').content;

const successFragment = document.createDocumentFragment();

const onAlertEscKeydown = (evt) => {
    if (checkEsc(evt)) {
        removeAllert('.success');
        removeAllert('.error');
    }
}

function removeAllert(name) {
    document.querySelector(name).remove();
    document.removeEventListener('keydown', onAlertEscKeydown);
};

const showError = (text, button) => {
    const errorElement = errorTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = text;
    errorElement.querySelector('.error__button').textContent = button;

    const errorButton = errorElement.querySelector('.error__button');

    document.addEventListener('click', (evt) => {
        let element = document.querySelector('.error');
        if (!element.contains(evt.target)) {
            removeAllert('.error')
        }
    });

    errorButton.addEventListener('click', () => {
        removeAllert('.error');
    })

    document.addEventListener('keydown', onAlertEscKeydown);

    errorFragment.appendChild(errorElement);
    main.appendChild(errorFragment);
};

const showSuccess = (text) => {
    const successElement = successTemplate.cloneNode(true);

    successElement.querySelector('.success__message').textContent = text;

    document.addEventListener('click', function (evt) {
        let element = document.querySelector('.success');
        if (element.contains(evt.target)) {
            removeAllert('.success')
        }
    });

    document.addEventListener('keydown', onAlertEscKeydown);

    successFragment.appendChild(successElement);
    main.appendChild(successFragment);
}

export { showError, showSuccess, onAlertEscKeydown };