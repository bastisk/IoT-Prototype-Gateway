var mqtt = require('mqtt');
var client = mqtt.createClient(1883, "localhost", { username: "<DeviceId>", password: "<DeviceKey>" });
var device = require('azure-iot-device');
var sleep = require('sleep');

client.on('connect', function () {
    client.subscribe('<DeviceId>/VolumeSensor');
    for (var i = 0; i < 100; i++) {
        var number = Math.round(Math.random() * 1000) + 1;
        var message = JSON.stringify(number);
        client.publish('<DeviceId>/VolumeSensor', message);
        console.log(message);
        sleep.sleep(1);
    }
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    client.end();
});
