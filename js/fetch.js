const Urls = {
    GET: 'https://23.javascript.pages.academy/keksobooking/data',
    post: 'https://23.javascript.pages.academy/keksobooking',
}

const getData = (onSuccess) => {
    fetch(Urls.GET)
        .then((response) => response.json())
        .then((response) => {
            onSuccess(response)
        })
        .catch((err) => {
            console.log(`Ошибка загрузки данных ${err}`);
        })
}

export { getData }