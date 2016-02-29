# IoTPrototype - Protocol Gateway
This repository contains an application for adapting MQTT messages to Azure IoTHub. It uses [Mosca](https://github.com/mcollina/mosca) as MQTT broker and the [Azure IoT Node.JS SDK](https://github.com/Azure/azure-iot-sdks/blob/master/node/device/core/readme.md) to send messages to IoTHub.

NOTE: Azure IoTHub now supports MQTT natively (take a look at the [article](https://azure.microsoft.com/en-us/documentation/articles/iot-hub-mqtt-support/)).

This application currently only supports device to cloud messages.

# Installation
Clone the repository, then run
<pre>npm install</pre>
to install all needed packages.

# Configuration
In <code>connection.js</code> change the contents of variable "hubName" to your IoTHub name.

Configure the following client fields on your MQTT client:
* <code>password=DeviceKey</code>
* <code>username=DeviceId</code>
* <code>topic=DeviceId/Topic</code>

The application will then forward this information to the devicespecific endpoint at Azure IoTHub.

You can optain the information on DeviceKey and DeviceId by using [Device Explorer](https://github.com/Azure/azure-iot-sdks/blob/master/tools/DeviceExplorer/doc/how_to_use_device_explorer.md).

# Running
To run the application execute
<pre>node app.js</pre>

# Test / Preview
To test or preview the functionality you can edit the file <code>client.js</code> and enter your IoTHub credentials. The script will send 100 Messages to IoTHub (one message per second). You can see the incoming messages by using [Device Explorer](https://github.com/Azure/azure-iot-sdks/blob/master/tools/DeviceExplorer/doc/how_to_use_device_explorer.md).

To run this script execute
<pre>node client.js</pre> 
on the same system that runs the main protocol gateway application.


