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
"<location>BECKMAN ST, PLYMPTON</location>"+
"<location>BIRDWOOD TCE, NORTH PLYMPTON</location>"+
"<location>BOWKER ST, SOMERTON PARK</location>"+
"<location>BRADLEY GR, MITCHELL PARK</location>"+
"<location>BRIGHTON RD, SEACLIFF PARK</location>"+
"<location>DOUGLAS ST, LOCKLEYS</location>"+
"<location>EAST PWY, COLONEL LIGHT GARDENS</location>"+
"<location>EASTERN PDE, GILLMAN</location>"+
"<location>FULHAM PARK DR, LOCKLEYS</location>"+
"<location>GRAY TCE, ROSEWATER</location>"+
"<location>HARTLEY RD, FLINDERS PARK</location>"+
"<location>HENLEY BEACH RD, HENLEY BEACH</location>"+
"<location>KING GEORGE AV, SOMERTON PARK</location>"+
"<location>MAY TCE, BROOKLYN PARK</location>"+
"<location>MILITARY RD, HENLEY BEACH</location>"+
"<location>MILLER ST, SEACOMBE GARDENS</location>"+
"<location>PROSPECT RD, BLAIR ATHOL</location>"+
"<location>RAGLAN AV, SOUTH PLYMPTON</location>"+
"<location>SEACOMBE RD, SEACLIFF PARK</location>"+
"<location>SIR DONALD BRADMAN DR, BROOKLYN PARK</location>"+
"<location>SPRINGBANK RD, COLONEL LIGHT GARDENS</location>"+
"<location>STONEHOUSE AV, CAMDEN PARK</location>"+
"<location>STURT RD, SEACOMBE GARDENS</location>"+
"<location>TAPLEYS HILL RD, GLENELG NORTH</location>"+
"<location>TRIMMER PDE, SEATON</location>"+
"<location>WEBB ST, QUEENSTOWN</location>"+
"</mobile>";

var mobileCameras = {};

// dict[key(obj2)] = obj2;
document.getElementById("start-btn").onclick = function()
{
    readMobileCameras()
    startFunction()
}

function readMobileCameras(){

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

function geocodeLatLng(geocoder,_lat,_lng) {
    const latlng = {
      lat: _lat,
      lng: _lng,
    };
    geocoder.geocode({ location: latlng }, (results) => {
        document.getElementById("street").innerHTML = "Current Street: " +
        results[0].address_components[1].long_name + "," +results[0].address_components[2].long_name;
    });
  }

app.initialize();

