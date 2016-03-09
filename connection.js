/* Module for Azure IoT Connection
 * Define your IoTHub Credentials in the variables hubname and hubSuffix
 */
//var device = require('azure-iot-device');
var mqttdevice = require('azure-iot-device-mqtt').clientFromConnectionString;

var hubName = "MIPPrototype";
var hubSuffix = "azure-devices.net";

function connection(deviceId, SharedAccessKey) {
    this.deviceId = deviceId;
    this.SharedAccessKey = SharedAccessKey;
    this.connectionString = "HostName=" + hubName + "." + hubSuffix + ";CredentialScope=Device;DeviceId=" + deviceId + ";SharedAccessKey=" + SharedAccessKey;
    //this.iotclient = new device.Client(this.connectionString, new device.Https());
    this.iotclient = mqttdevice(this.connectionString);
}
module.exports = connection;
