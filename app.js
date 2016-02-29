/* Azure IoT Protocol Gateway - the Node.JS way
 * solution created by Sebastian Kiepsch (http://basti-sk.com) */

var mosca = require('mosca');
var mqtt = require('mqtt');
var winston = require('winston');
var device = require('azure-iot-device');
var deviceconnection = require('./connection.js');

var logger = new (winston.Logger)({transports: [new (winston.transports.Console)({ 'timestamp': true })]});

var moscaSettings = { port: 1883 };

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function (client) {
});

server.on('published', function (packet, client) {
    logger.info("pub to topic: " + packet.topic.toString());

    var devices_id = packet.topic.toString().split('/', 1).toString();
    var topic = packet.topic.toString().split('/')[1].toString();
    var data = JSON.stringify({ "payload": packet.payload.toString(), "topic": topic, "DeviceId": devices_id, "TimeStamp": Date() });
    var message = new device.Message(data);
    if (client)
        client.connectiona.iotclient.sendEvent(message, printResultFor('send'));
    else logger.info("no client element found. skipping");
    //iotclient.sendEvent(message, printResultFor('send'));

});

function setup() {
    logger.info('Mosca server is up and running');
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
    //iotclient.sendEvent(new device.Message(JSON.stringify(deviceMetaData)), printResultFor('send'));
}

var authenticate = function (client, username, password, callback) {
    var connection = new deviceconnection(username, password.toString());
    client.connectiona = connection;
    client.user = username;
    authorized = true;
    callback(null, authorized);
}

var authorizePublish = function (client, topic, payload, callback) {
    callback(null, true);
}

var authorizeSubscribe = function (client, topic, callback) {
    callback(null, true);
}

function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log('IOT: ' + op + ' error: ' + err.toString());
        if (res && (res.statusCode !== 204)) console.log('IOT: ' + op + ' status: ' + res.statusCode + ' ' + res.statusMessage);
    };
}
