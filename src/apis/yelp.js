import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses/',
    headers: {
        Authorization: 'Bearer _PnPOgHSHv81AF3ewoQMQcdohT_WL6WCGT3b6cQrjvygJO1GgUonK0j4Ja7jbb0DfBn4DmB8rzaiJPdiZB8FEBZAl0ueLFjp2YY36xRmqsAFXa1EYDQE1hllDg1eXXYx'
    }
})