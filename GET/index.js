
const { json } = require('express');
var express = require('express');
var request = require('request');
var router = express.Router();
/* GET users listing. */
var server = {};
request({
    url: 'https://eshop-deve.herokuapp.com/api/v2/orders', //URL to hit
    method: 'GET', // specify the request type
    headers: { // speciyfy the headers
        'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ'
   },
    body: '' //Set the body as a string
}, function(error, response, body){
    if(error) {
        console.log(error);
        server = {'status':'error',
                   'datos': [] };
    } else {
        console.log(response.statusCode);
   
        server = {'status':'ok',
                   'datos': JSON.parse(body) 
                 }
    }
});


router.post('/', function (req, res, next) {
        res.send(server);

});

module.exports = router;
