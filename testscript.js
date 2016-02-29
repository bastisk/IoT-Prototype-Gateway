var mosca = require('mosca');
var mqtt = require('mqtt');
var client = mqtt.createClient(1883, "localhost", { username: "user", password: "pass" });

var moscaSettings = {
    port: 1883,
}

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function (client) {
    console.log(client);
});

server.on('published', function (packet, client) {
    console.log(client);
});

client.on('connect', function () {
    client.subscribe('stuff');
});

function setup() {
    server.authenticate = authenticate;
}

var authenticate = function (client, username, password, callback) {
    var connectiona = { test: "test" };
    client.connectiona = connectiona;
    client.user = username;
    authorized = true;
    callback(null, authorized);
}