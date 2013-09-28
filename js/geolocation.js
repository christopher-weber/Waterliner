// Warten bis die Geräte API Libraries geladen sind
document.addEventListener("deviceready", onDeviceReady, false);
			
			
// Geräte APIs sind verfügbar
function onDeviceReady() {
	var track_id = '';      // Name/ID of the exercise
	var watch_id = null;    // ID of the geolocation
	var tracking_data = []; // Array containing GPS position objects
	alert("Device Ready");
	
	// Klick auf MAP-Button
	$( ".start_map" ).click(function() {
		// Als erstes wird das Popup "welcome" gestartet. Dabei wird der Benutzer um das Einverständnis zur Verwendung von Standortinformationen gefragt.
		//$("#welcome").popup("open", {positionTo: "window"});
		
		// Benutzer erlaubt die Verwendung von Standortinformationen
		//$( ".geook" ).click(function() {
			navigator.geolocation.getCurrentPosition(onSuccess, onError,{maximumAge:0, timeout:5000, enableHighAccuracy: true});
			//$("#welcome").popup("close");
		//});
		
		// Benutzer verneint die Verwendung von Standortinformationen
		//$( "#geofalse" ).click(function() {
		//	no_pos_info();
		//	$("#welcome").popup("close");
		//});
	});
	
	
	// Klick auf START-Button
	$( ".start_tracking" ).click(function() {
	alert("Start Tracking...");
	// Start tracking the User
    watch_id = navigator.geolocation.watchPosition(
    	// Success
        function(position){
			alert("watchGeolocation succeed!");
            tracking_data.push(position);
			$('#watchposition').html('Latitude: '           + position.coords.latitude              + '<br />' +
				'Longitude: '          + position.coords.longitude             + '<br />' +
				'Altitude: '           + position.coords.altitude              + '<br />' +
				'Accuracy: '           + position.coords.accuracy              + '<br />' +
				'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
				'Heading: '            + position.coords.heading               + '<br />' +
				'Speed: '              + position.coords.speed                 + '<br />' +
				'Timestamp: '          + position.timestamp                    + '<br />');
        },
        
        // Error
        function(error){
			alert("watchGeolocation error!");
            console.log(error);
        },
        
        // Settings
        { frequency: 3000, enableHighAccuracy: true });
    
	});	
	
	// Klick auf STOP-Button
	$( ".stop_tracking" ).click(function() {
	alert("Stop Tracking...");
	// Stop tracking the user
	navigator.geolocation.clearWatch(watch_id);
	alert("Tracking stopped!");
	});	
}



// Die aktuelle Position konnte mittels Phonegap Geolocation ermittelt werden
function onSuccess(position) {
	alert("getPosition success");
	// Die ermittelten Standortinformationen werden auf Seite 2 des Navigators angezeigt, wenn der "div"-Container mit der ID "geolocation" nicht auskommentiert ist.
	$('#getposition').html('Latitude: '           + position.coords.latitude              + '<br />' +
		'Longitude: '          + position.coords.longitude             + '<br />' +
		'Altitude: '           + position.coords.altitude              + '<br />' +
		'Accuracy: '           + position.coords.accuracy              + '<br />' +
		'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
		'Heading: '            + position.coords.heading               + '<br />' +
		'Speed: '              + position.coords.speed                 + '<br />' +
		'Timestamp: '          + position.timestamp                    + '<br />');
	
	
	meineLongitude = position.coords.longitude;
	meineLatitude = position.coords.latitude;
	var Latlng_position = new google.maps.LatLng(meineLatitude, meineLongitude); // Schreibt aktuelle Positions-Koordinaten in Koordinaten-Variable von Google Maps

	var mapOptions = {	// Definition der Anzeige-Optionen der Google-Maps Karte
			zoom: 17,	// Zoom-Stufe der Karte
			center: Latlng_position,	// Definition des Mittelspunktes nach dem die Karte ausgerichtet wird
			mapTypeId: google.maps.MapTypeId.ROADMAP,	// Definiert den Anzeige-Typ der Goole Maps Karte
			panControl: false,			// panControl-Button wird deaktiviert
			zoomControl: true,			// ZoomControl-Button wird aktiviert
			mapTypeControl: true,		// Auswahlmöglichkeit für Kartentyp wird aktiviert
			scaleControl: false,		// scaleControl wird deaktiviert
			streetViewControl: false,	// StreetViewControl-Button wird deaktiviert
	};

	create_map(mapOptions);// Google-Maps Karte wird erstellt
	set_position(Latlng_position, map);	// Der Pin der den aktuellen Standort des Nutzers anzeigt wird auf die Karte gesetzt
	set_markers(map);	// Pins die besondere Gebäude oder Plätze kennzeichnen werden auf die Karte gesetzt
	alert("Map accomplished!");	
}

		
	// Der Benutzer verneint die Nutzung seiner Standortinformationen oder die aktuelle Position konnte nicht ermittelt werden.
	function onError(error) {
		alert("aktuelle Position konnte nicht ermittelt werden");
		//$("#nopos").popup("open", {positionTo: "window"});// Popup mit Fehlermeldung wird angezeigt
		no_pos_info;	// Karte wird ohne Standortinformationen erstellt
	}
  
  
	// Erstellen der Google-Maps Karte ohne Standortinformationen
	function no_pos_info(){
		var Latlng_center = new google.maps.LatLng(49.013625,8.390161);	// Erstellt Koordinaten-Variable mit der Position nach der die Karte zentriert werden soll
		var mapOptions = {// Definition der Anzeige-Optionen der Google-Maps Karte
			zoom: 15,	// Zoom-Stufe der Karte
			center: Latlng_center,		// Definition des Mittelspunktes nach dem die Karte ausgerichtet wird
			mapTypeId: google.maps.MapTypeId.ROADMAP,	// Definiert den Anzeige-Typ der Goole Maps Karte
			panControl: false,			// panControl-Button wird deaktiviert
			zoomControl: true,			// ZoomControl-Button wird aktiviert
			mapTypeControl: true,		// Auswahlmöglichkeit für Kartentyp wird aktiviert
			scaleControl: false,		// scaleControl wird deaktiviert
			streetViewControl: false,	// StreetViewControl-Button wird deaktiviert
		};
		// Google Map erzeugen
		create_map(mapOptions);			// Google-Maps Karte wird erstellt
		set_markers(map);// Pins die besondere Gebäude oder Plätze kennzeichnen werden auf die Karte gesetzt 	
	}
			
  		
	// Google Map KArte wird den übermittelten "mapOptions" erstellt und im DIC-Container "map-canvas" eingefügt
	function create_map(options){
		map = new google.maps.Map(document.getElementById('map-canvas'), options);
	}

			
	// Der Pin der den aktuellen Standort des Nutzers anzeigt wird auf die Karte gesetzt
	function set_position(myPosition, map){
		// Marker für aktuellen Standort einfügen
		var marker = new google.maps.Marker({
			position: myPosition,
			map: map,
			title: 'Mein Standort',
			icon: 'bilder/navigation/position.png'
		});
	}
