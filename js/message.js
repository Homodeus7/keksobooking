import { checkEsc } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorTemplateMessage = errorTemplate.querySelector('.error__mwssage');
const errorTemplateButton = errorTemplate.querySelector('.error__button')

const showSuccess = () => {
    document.body.appendChild(successTemplate);
    const keydownHandler = (evt) => {
        if (isEscEvent(evt)) {
            evt.preventDefault();
            successPopup.remove();
            document.removeEventListener('keydown', keydownHandler);
        }
    };
    document.addEventListener('keydown', keydownHandler);
    successTemplate.addEventListener('click', () => {
        successTemplate.remove();
        document.removeEventListener('keydown', keydownHandler);
    })
};

const showError = () => {
    errorTemplateMessage.textContent = 'Ошибка загрузки';
    document.body.appendChild(errorTemplate);
    const keydownHandler = (evt) => {
        if (checkEsc(evt)) {
            evt.preventDeafault();
            errorTemplate.remove();
            document.removeEventListener('keydown', keydownHandler);
        }
    };
    document.addEventListener('keydown', keydownHandler);
    errorTemplateButton.addEventListener('click', () => {
        errorTemplate.remove();
        document.removeEventListener('keydown', keydownHandler);
    });
    errorTemplate.addEventListener('click', () => {
        errorTemplate.remove();
        document.removeEventListener('keydown', keydownHandler);
    });
};

export { showError, showSuccess };