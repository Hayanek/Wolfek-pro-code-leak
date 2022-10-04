require('dotenv').config()
const querystring = require('query-string');
const r2 = require('r2');
module.exports = async (user, type) => {
    let header

    if(type === "Cat") header = { 'X-API-KEY': process.env.API_CAT }
    if(type === "Dog") header = { 'X-API-KEY': process.env.API_DOG }

    const queryParams = {
        'mime_types':'jpg,png',
        'size':'med',  
        'sub_id': user, 
        'limit' : 1
    }

    let queryString = querystring.stringify(queryParams);

    try {
        global.response

        if(type === "Cat") response = await r2.get(`https://api.thecatapi.com/v1/images/search?${queryString}`, { header }).json
        if(type === "Dog") response = await r2.get(`https://api.thedogapi.com/v1/images/search?${queryString}`, { header }).json
        
    } catch (e) { console.log(e) }
    return response;
}