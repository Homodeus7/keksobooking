const selectorType = document.querySelector(`#type`);
const inputPrise = document.querySelector(`#price`);

selectorType.addEventListener('change', (evt) => {
    const item = evt.target.value;

    switch (item) {
        case `bungalow`: inputPrise.min = 0;
            break
        case `flat`: inputPrise.min = 1000;
            break
        case `houtel`: inputPrise.min = 3000;
            break
        case `house`: inputPrise.min = 5000;
            break
        case `palace`: inputPrise.min = 10000;
            break
    }
    console.log(inputPrise.min)
})






// bungalow">Бунгало</option>
//             <option value="flat" selected>Квартира</option>
//             <option value="house">Дом</option>
//             <option value="palace