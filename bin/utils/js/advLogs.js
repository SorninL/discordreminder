const packageData = require('../../../package.json');

let noLogParam = () => {
    superLogs('error', 'No parameters provided in superLogs function. OR no text provided, please verify.');
};
let badLogType = () => {
    superLogs('error', 'Incorrect log type. Correct logs types are info, success, warning, error');
};
let superLogs = (prType, prText) => {
    let d = new Date();
    let dH = d.getHours();
    let dM = d.getMinutes();
    let dS = d.getSeconds();
    let fTime = dH + ":" + dM + ":" + dS;
    if (prType && prText) {
        switch (prType) {
            case 'info':
                console.log('['+fTime+'] - INFO - '+prText);
                break;
            case 'success':
                console.log('['+fTime+'] - SUCCESS - '+prText);
                break;
            case 'warning':
                console.log('['+fTime+'] - WARNING - '+prText);
                break;
            case 'error':
                console.log('['+fTime+'] - ERROR - '+prText);
                break;
            case 'dev':
                console.log('['+fTime+'] - DEV - '+prText);
                break;
            default:
                badLogType();
                break;
          }
      } else {
        noLogParam();
    }
};

let startLogs = () => {
    superLogs('info', packageData.name + ' is starting in version ' + packageData.version + '...');
    superLogs('info', 'This bot has been written by ' + packageData.author + '.');
    superLogs('info', "Now you will just have to wait until you see the DONE log to perform commands.");
};

module.exports = {noLogParam, superLogs, badLogType, startLogs};
