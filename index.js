const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const moment = require('moment');
const verify = require('./verify-mock');
const constants = require('./constants');

let insertMode = false;

// Response Object
function Response(rfid, date, hour, weekDay, idMachine) {
    this.rfid = rfid;
    this.date = date;
    this.hour = hour;
    this.weekDay = weekDay;
    this.idMachine = idMachine;
}

const portNfc = new SerialPort(constants.nfcPort, {
    baudRate: 9600
});

const parserNfc = portNfc.pipe(new Readline({
    delimiter: '\n'
}));

const portLcd = new SerialPort(constants.lcdPort, {
    baudRate: 9600
});

// Reading the port data:
portNfc.on('open', () => {
    console.log('[serialport] Serial Port NFC Opening' .cyan);
});

portLcd.on('open', () => {
    console.log('[serialport] Serial Port LCD Opening' .cyan);
});

// Read the data of the rfid:
parserNfc.on('data', async function (rfid) {

    rfid = rfid.trim();

    moment.locale('es');

    const date = moment().format("YYYY-DD-MM");
    const hour = moment().format("HH:mm:ss");
    const weekDay = moment().format("dddd");

    const responseObj = new Response(rfid, date, hour, weekDay, idMachine);

    console.log(responseObj);

    const verificationCode = await verify.verifyRFID(responseObj);
   
    sendToArduino(verificationCode,rfid);
    
    console.log(JSON.stringify(responseObj));

});

function handleCode(rfid, code, mode) {
    // If it's insert mode we write what we have to write
    portNfc.write(code);
    portLcd.write(mode);
    if (insertMode) {
        io.emit('rfid', rfid);
        
    }
}

const modes = {
    "0": handleCode,
    "1": handleCode,
    "2": (rfid) => {
        insertMode = !insertMode;
        const mode = insertMode ? rfid+"-Mode insercio" : "Fi Mode insercio";
        handleCode('2', mode, rfid)
    }
}

function sendToArduino(verificationCode,rfid) {
    const mode = insertMode ? rfid + "-Mode insercio" : rfid;
    modes[verificationCode](rfid, verificationCode, mode);
   
    /** //Si esta en mode inserció enviam el codi rfid a la vista
    if (insertMode && verificationCode != 2) {
        portNfc.write('1');
        portLcd.write(rfid+"-Mode insercio");
        io.emit('rfid', rfid);

    //Activam el mode insercio amb la targeta "admin"
    } else if (!insertMode && verificationCode == 2) {
        insertMode = true;
        portNfc.write('2');
        portLcd.write(rfid+"-Mode insercio");

    //Desactivam mode insercio amb la targeta "admin"
    } else if (insertMode && verificationCode == 2) {
        insertMode = false;
        portNfc.write('2');
        portLcd.write("Fi Mode insercio");
 
    //Si el mode insercio esta desactivat i reb una targeta normal
    //s'efectuara el fichatge normal
    } else {
        if (verificationCode == 1) {
            portNfc.write('1');
        } else {
            portNfc.write('0');
        }
        portLcd.write(rfid);

    } */
    console.log('[serialport] Sending info out of the serial port' .cyan);
}