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
    //
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
document.getElementById("start-btn").onclick = function()
{
    startFunction()
}
    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    var onSuccess = function(position) {
        // console.log('Latitude: '          + position.coords.latitude          + '\n' +
        //       'Longitude: '         + position.coords.longitude         + '\n');

        const geocoder = new google.maps.Geocoder();

        console.log(geocodeLatLng(geocoder,position.coords.latitude, position.coords.longitude))
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
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
  
function geocodeLatLng(geocoder,_lat,_lng) {
    const latlng = {
      lat: _lat,
      lng: _lng,
    };
    geocoder.geocode({ location: latlng }, (results) => {
        document.getElementById("street").innerHTML = "Current Street: " +
        results[0].formatted_address;
    });
  }

app.initialize();