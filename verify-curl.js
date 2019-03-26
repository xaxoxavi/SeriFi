//Send http request to verify signin
const constants = require('./constants');
const exec = require('exec');

module.exports.verifyRFID = async function (message) {

    // INSERTAR CRIDAD CURL

    var jsonToSend = {
        rfid: message.rfid,
        data: message.date,
        aula: message.idMachine
    };


   var comanda =  'curl -X POST  http://ec2-54-194-41-48.eu-west-1.compute.amazonaws.com:7080/ -H \'Content-Type: application/json\' -d ';
   comanda +=  "'" + JSON.stringify(jsonToSend) +  "'";

    var dir = exec(comanda, function(err, stdout, stderr) {
        if (err) {
          // should have err.code here?  
        }
        console.log(stdout);
      });
      
      /*dir.on('exit', function (code) {
        // exit code is code
      });*/
      
    return constants.VERIFY_RESPONSE.SUCCESS;
}
