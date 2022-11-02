const selectorType = document.querySelector(`#type`)
const inputPrise = document.querySelector(`#price`)
const selectorTimeIn = document.querySelector(`#timein`)
const selectorTimeOut = document.querySelector(`#timeout`)

selectorType.addEventListener('change', (evt) => {
    const item = evt.target.value;

    switch (item) {
        case `bungalow`: inputPrise.min = `0`;
            break
        case `flat`: inputPrise.min = `1000`;
            break
        case `houel`: inputPrise.min = `3000`;
            break
        case `house`: inputPrise.min = `5000`;
            break
        case `palace`: inputPrise.min = `10000`;
            break
    }
})

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
})






// bungalow">Бунгало</option>
//             <option value="flat" selected>Квартира</option>
//             <option value="house">Дом</option>
//             <option value="palace