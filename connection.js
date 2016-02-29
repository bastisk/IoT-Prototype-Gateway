/* Module for Azure IoT Connection
 * Define your IoTHub Credentials in the variables hubname and hubSuffix
 */
var device = require('azure-iot-device');

var hubName = "<hubname>";
var hubSuffix = "azure-devices.net";

function connection(deviceId, SharedAccessKey) {
    this.deviceId = deviceId;
    this.SharedAccessKey = SharedAccessKey;
    this.connectionString = "HostName=" + hubName + "." + hubSuffix + ";CredentialScope=Device;DeviceId=" + deviceId + ";SharedAccessKey=" + SharedAccessKey;
    this.iotclient = new device.Client(this.connectionString, new device.Https());
}
module.exports = connection;