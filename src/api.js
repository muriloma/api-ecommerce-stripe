const axios = require('axios')
require('dotenv').config();


const instanciaAxios = axios.create({
    baseURL: 'https://api.stripe.com/v1',
    headers: {
        authorization: `Bearer ${process.env.API_KEY}`,
        'Content-type': 'application/x-www-form-urlencoded'
    }
})

module.exports = instanciaAxios