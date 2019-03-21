//Send http request to verify signin
const axios = require('axios');
const verificationServer = require('./constants');
const fetch = require('node-fetch');


module.exports.verifyRFID = async function (rfid) {

    fetch(verificationServer.urlVerificationServer, {
         method: 'POST',
          body: JSON.stringify(rfid),
          headers: {
                'Content-Type': 'application/json' 
          }
        })
    .then(response => {
        console.log(response);
        //TODO: aillar la part del servei groc amb 
        // l'enumerat.
        return response
    })
    .catch(error => {
        console.log(error);
    });
}