//Send http request to verify signin
const constants = require('./constants');

module.exports.verifyRFID = async function (rfid) {

    return constants.VERIFY_RESPONSE.SUCCESS;
}