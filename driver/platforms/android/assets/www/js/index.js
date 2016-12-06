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
    map:{},
    marker:{},
    myLatLng: {'lat': 20.6461844, 'lng': -100.3771275},
    initMap: function() {
      internalApp = this;
      //var myLatLng = {lat: 20.6461844, lng: -100.3771275};
      // Create a map object and specify the DOM element for display.
      internalApp.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 20.6461844, lng: -100.3771275},
        scrollwheel: false,
        zoom: 15
      });
      internalApp.marker = new google.maps.Marker({
        position: internalApp.myLatLng,
        /*map: internalApp.map,*/
        title: 'Hello World!'
      });
      internalApp.marker.setMap(internalApp.map);
    },

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
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/
        console.log('Device Ready');

        console.log('Received Event: ' + id);
        var watchID = navigator.geolocation.watchPosition(app.onSuccess, app.onError, { timeout: 1000 });
    },

    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    onSuccess: function(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Lat: '  + position.coords.latitude      + '<br />' +
                            'Lon: ' + position.coords.longitude     + '<br /><hr />' ;
                            //'<hr />'      + element.innerHTML;
        console.log('Latitude: '  + position.coords.latitude      + ' ' +
                    'Longitude: ' + position.coords.longitude );
        app.myLatLng.lat = position.coords.latitude;
        app.myLatLng.lng = position.coords.longitude;
        app.myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
        app.refreshMarker();
    },

    // onError Callback receives a PositionError object
    //
    onError: function(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    },

    refreshMarker: function(){
      console.log('refresh marker');
      app.marker.setPosition( new google.maps.LatLng( app.myLatLng.lat, app.myLatLng.lng ) );
      app.map.panTo( new google.maps.LatLng( app.myLatLng.lat, app.myLatLng.lng ) );
    },

    exitFromApp: function(){
      navigator.app.exitApp();
    },
};

app.initialize();
