
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const selectorType = document.querySelector(`#type`);
const inputPrise = document.querySelector(`#price`);
const selectorTimeIn = document.querySelector(`#timein`);
const selectorTimeOut = document.querySelector(`#timeout`);
const titleInput = document.querySelector('#title');
const selectorRoomNumber = document.querySelector('#room_number');
const selectorRoomCapacity = document.querySelector('#capacity');
const optionCapacity = selectorRoomCapacity.querySelectorAll('option');

selectorType.addEventListener('change', (evt) => {
    const item = evt.target.value;

    switch (item) {
        case `bungalow`:
            inputPrise.min = 0;
            inputPrise.placeholder = 0;
            break
        case `flat`:
            inputPrise.min = 1000;
            inputPrise.placeholder = 1000;
            break
        case `house`:
            inputPrise.min = 5000;
            inputPrise.placeholder = 5000;
            break
        case `palace`:
            inputPrise.min = 10000;
            inputPrise.placeholder = 10000;
            break
    }
});

selectorTimeIn.addEventListener('change', (evt) => {
    const item = evt.target.value

    switch (item) {
        case `12:00`: selectorTimeOut.value = `12:00`;
            break
        case `13:00`: selectorTimeOut.value = `13:00`;
            break
        case `14:00`: selectorTimeOut.value = `14:00`;
            break
    }
});

selectorRoomNumber.addEventListener('change', (evt) => {
    const item = evt.target.value;

    switch (item) {
        case `1`: {
            optionCapacity[0].disabled = true;
            optionCapacity[1].disabled = true;
            optionCapacity[2].disabled = false;
            optionCapacity[3].disabled = true;
            break
        }
        case `2`: {
            optionCapacity[0].disabled = true;
            optionCapacity[1].disabled = false;
            optionCapacity[2].disabled = false;
            optionCapacity[3].disabled = true;
            break
        }
        case `3`: {
            optionCapacity[0].disabled = false;
            optionCapacity[1].disabled = false;
            optionCapacity[2].disabled = false;
            optionCapacity[3].disabled = true;
            break
        }
        case `100`: {
            optionCapacity[0].disabled = true;
            optionCapacity[1].disabled = true;
            optionCapacity[2].disabled = true;
            optionCapacity[3].disabled = false;
            break
        }
    }
});

titleInput.addEventListener('invalid', () => {
    if (titleInput.validity.tooShort) {
        titleInput.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
    } else if (titleInput.validity.tooLong) {
        titleInput.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
        titleInput.setCustomValidity('Обязательное поле');
    } else {
        titleInput.setCustomValidity('');
    }
});

titleInput.addEventListener('input', () => {
    const valueLength = titleInput.value.length;
    if (valueLength < MIN_NAME_LENGTH) {
        titleInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
        titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
        titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
});