/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var cameraTextXML = "<mobile>"+
"<location>AIRPORT RD, BROOKLYN PARK</location>"+
"<location>ALEXANDRINA RD, MOUNT BARKER</location>"+
"<location>CARLTON PDE, TORRENSVILLE</location>"+
"<location>ECHUNGA RD, ECHUNGA</location>"+
"<location>HAWTHORN RD, MOUNT BARKER</location>"+
"<location>HURLING DR, MOUNT BARKER</location>"+
"<location>JUNCTION RD, BALHANNAH</location>"+
"<location>JUNCTION RD, LITTLEHAMPTON</location>"+
"<location>MAIN NORTH RD, GEPPS CROSS</location>"+
"<location>MARION RD, BROOKLYN PARK</location>"+
"<location>MILITARY RD, HENLEY BEACH</location>"+
"<location>MOUNT BARKER RD, HAHNDORF</location>"+
"<location>NAIRNE RD, WOODSIDE</location>"+
"<location>NORTH PDE, TORRENSVILLE</location>"+
"<location>ONKAPARINGA VALLEY RD, VERDUN</location>"+
"<location>SEAVIEW RD, HENLEY BEACH</location>"+
"<location>SHEOAK RD, CRAFERS WEST</location>"+
"<location>STRATHALBYN RD, MYLOR</location>"+
"<location>TAPLEYS HILL RD, GLENELG NORTH</location>"+
"<location>TRIMMER PDE, SEATON</location>"+
"<location>WAVERLEY RIDGE RD, CRAFERS WEST</location>"+
"<location>WEBB ST, QUEENSTOWN</location>"+
"<location>WOODSIDE RD, NAIRNE</location>"+
"</mobile>";

var mobileCameras = [];

// dict[key(obj2)] = obj2;
document.getElementById("start-btn").onclick = function()
{
    readMobileCameras()
    startFunction()
}

function readMobileCameras(){
    parser = new DOMParser();
    xmlText = parser.parseFromString(cameraTextXML,"text/xml");
    locations = xmlText.getElementsByTagName("location");

    for (let i = 0; i < locations.length; i++) {
        mobileCameras.push(locations[i].childNodes[0].nodeValue);
    }
}

var watchID
function startFunction(){
    el = document.getElementById("start-btn")
    if(el.innerHTML == "STOP") 
    {
        navigator.geolocation.clearWatch(watchID);
        el.innerHTML = "START" 
    } else {
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });
        el.innerHTML = "STOP"
    }
}
  
// onSuccess Callback
var onSuccess = function(position) {
    const geocoder = new google.maps.Geocoder();
    geocodeLatLng(geocoder,position.coords.latitude, position.coords.longitude)
};

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
}

var road = "";
var suburb = "";

function geocodeLatLng(geocoder,_lat,_lng) {
    const latlng = {
      lat: _lat,
      lng: _lng,
    };

    geocoder.geocode({ location: latlng }, (results) => {
        if(road != results[0].address_components[1].long_name || suburb != results[0].address_components[2].long_name)
        {
            road = results[0].address_components[1].long_name
            suburb = results[0].address_components[2].long_name
            checkIfCamera(road,suburb);
        }
        road = results[0].address_components[1].long_name
        suburb = results[0].address_components[2].long_name

        document.getElementById("street").innerHTML = "Current Street: " +
        road + "," + suburb;
    });
}

function checkIfCamera(road,suburb){

    // mobileCameras[0].str
    // document.getElementById("street").innerHTML
}

app.initialize();

