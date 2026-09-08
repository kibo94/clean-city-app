// Generala zdanova 3
// 📍 Latitude: 44.8344
// 📍 Longitude: 20.4035

import axios from 'axios';
import { Alert } from 'react-native';


function isWithinRange(lat1, lat2, lng1, lng2, rangeKm) {
    const R = 6371; // kmr
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c) < rangeKm
}


const api = axios.create({
    baseURL: 'https://termini-qa-api-eegtcpc8hsegera6.centralus-01.azurewebsites.net/api',

    // baseURL: 'http://192.168.0.9:5055/api'

});


const setAuthToken = (token) => {

    if (token) {

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}


export { isWithinRange, api, setAuthToken }