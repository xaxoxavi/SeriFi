const VERIFY_RESPONSE = {
    SUCCESS: 'success',
    ERROR: 'error',
    INSERT: 'insert'
}

// Connection with nfc arduino port
// In Linux the port would look similar to this --> '/dev/ttyACM0'
const lcdPort = '/dev/ttyACM1';

// Connection with lcd arduino port
// In Linux the port would look similar to this --> '/dev/ttyACM0'
const nfcPort = '/dev/ttyACM0';

exports.VERIFY_RESPONSE = VERIFY_RESPONSE;
exports.nfcPort = nfcPort;
exports.lcdPort = lcdPort;
