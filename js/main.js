
import './map.js';
import './form.js';

import { createPoints } from './map.js'


fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((objects) => objects.json())
    .then((points) => {
        console.log(points)
        createPoints(points);
    });

