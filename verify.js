//Send http request to verify signin
//const axios = require('axios');
// Destructured constants
const {
    verificationServer: {
        urlVerificationServer
    },
    VERIFY_RESPONSE: {
        SUCCESS, ERROR
    }
} = require('./constants');
const fetch = require('node-fetch');

module.exports.verifyRFID = async function (rfid) {
    
    try {
        const response = await fetch(urlVerificationServer, {
            method: 'POST',
            body: JSON.stringify(rfid),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Since we will get a boolean and a message, we just want the boolean to check if it succeeded
        const {success} = await response.json();

        return success ? SUCCESS : ERROR;
    } catch (error) {
        console.log(error);
    };
}