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

        app.pluginInitialize();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

        
};
app.initialize();

var cameraTextXML = "<mobile>"+
"<location>ANGLE VALE RD, ANGLE VALE</location>"+
"<location>BULL CREEK RD, BULL CREEK</location>"+
"<location>CAVAN RD, DRY CREEK</location>"+
"<location>COVENTRY RD, DAVOREN PARK</location>"+
"<location>ESPLANADE, PORT NOARLUNGA SOUTH</location>"+
"<location>GALLOWAY RD, CHRISTIES BEACH</location>"+
"<location>GULFVIEW RD, CHRISTIES BEACH</location>"+
"<location>HALSEY RD, ELIZABETH EAST</location>"+
"<location>HAMBLYNN RD, ELIZABETH DOWNS</location>"+
"<location>HAYDOWN RD, ELIZABETH GROVE</location>"+
"<location>KENIHANS RD, HAPPY VALLEY</location>"+
"<location>MAIN SOUTH RD, OLD NOARLUNGA</location>"+
"<location>MAIN SOUTH RD, O'HALLORAN HILL</location>"+
"<location>MAJORS RD, O'HALLORAN HILL</location>"+
"<location>MIDWAY RD, ELIZABETH PARK</location>"+
"<location>OLD SOUTH RD, OLD REYNELLA</location>"+
"<location>PARIS CREEK RD, PARIS CREEK</location>"+
"<location>PEACHEY RD, DAVOREN PARK</location>"+
"<location>PHILIP HWY, ELIZABETH SOUTH</location>"+
"<location>RIVER RD, PORT NOARLUNGA</location>"+
"<location>SALISBURY HWY, SALISBURY</location>"+
"<location>STATES RD, MORPHETT VALE</location>"+
"<location>WATERLOO CORNER RD, BURTON</location>"+
"<location>WHITES RD, PARALOWIE</location>"+
"<location>WHITES RD, GRAND JUNCTION</location>"+
"<location>PROSPECT RD, PROSPECT</location>"+
"<location>MAIN NORTH RD, PROSPECT</location>"+
"<location>MAIN NORTH RD, ENFIELD</location>"+
"<location>MAIN NORTH RD, MEDINDIE GARDENS</location>"+
"<location>STEPHEN TERRACE, GILBERTON GARDENS</location>"+
"<location>TORRENS RD, WOODVILLE</location>"+ 
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
        document.getElementById("street").innerHTML = "Current Street: "
        
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
    var changed = false
    for (let i = 0; i < mobileCameras.length; i++) {
        cameraRoad = mobileCameras[i].split(", ")

        if(road.toUpperCase() == cameraRoad[0] || suburb.toUpperCase() == cameraRoad[1]){
            document.getElementById("statusID").innerHTML = "STATUS: " + "MOBILE CAMERA ON THIS ROAD!!!!!!"
            cordova.plugins.notification.local.schedule({
                title: 'ALERTTT',
                text: 'CAMERA ON THIS ROAD CAREFUL!',
            });
            changed = true
        }
    }
    if(!changed)
    {
        document.getElementById("statusID").innerHTML = "STATUS: " + "SHOULD BE GOOD"
    }
}

