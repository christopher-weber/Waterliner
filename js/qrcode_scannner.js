
$(document).ready(function(){
		var qrcode_length = 11;											// Definition der String-Länge der QR-Codes. Wird zur Kontrolle der gescannten QR-Codes verwendet.

		// Start des Barcode-Scanner Plugins durch Klick auf SCAN-Button
		$( ".scan" ).click(function() {
			var scanner = cordova.require("cordova/plugin/BarcodeScanner");
			scanner.scan(
			
			  function (result) {
				// Gibt Fehlermeldung aus
				  /*alert("We got a barcode\n" +
						"Result: " + result.text + "\n" +
						"Format: " + result.format + "\n" +
						"Cancelled: " + result.cancelled);*/
						
				// Kontrolle ob Scan nicht abgebrochen wurde
				if(result.cancelled == false){
				
					// Kontrolle ob der gescannte Barcode ein QR-Code ist
					if(result.format == 'QR_CODE'){			
					
						// Kontrolle ob der gescannte QR-Code die richtige String-Länge aufweist
						if(result.text.length == qrcode_length){
							stCode = result.text;
							
							// JSON Datei mit den gültigen QR-Codes und den jeweiligen Standortinformationen wird geöffnet
							$.getJSON('daten/qrcodes.json', function(json) {
								f_validcode=false;														// Kontroll-Flag wird definiert.
								
								//Jede Zeile der JSON-Datei wird mit dem gescannten QR-Code verglichen
								$.each(json, function(code,data) {
								
									// Gescannter QR-Code stimmt mit einem QR-Code aus der JSON-Datei überein
									if(code == stCode){
										f_validcode = true;												// Kontroll-Flag wird gesetzt
										
										// Text und Bild mit den Standortinformationen passend zum gescannten QR-Code werden in den DIV-Container des Popups geschrieben.
										$('#positiontext').html('<center><h3>' + data.name + '</h3></center><p><table><tr><td><b>Etage:</b></td><td>' + data.etage + '</td></tr><tr><td><b>Gebäude:</b></td><td>' + data.bau + '</td></tr></table><table><tr><td><i>Der blaue Pin kennzeichnet deine aktuelle Position</i></td></tr><tr><td><center><img src="bilder/navigation/' + code + '.png" style="max-width:80%;" alt="Gebäude ' + data.bau + ', ' + data.etage + '"></center></tr></table></p>');
										$("#position").popup("open", {positionTo: "window"});			// Popup mit den Standortinformationen wird angezeigt.
									};
								});
								
								//Kontroll-Flag ist nicht gesetzt
								if(f_validcode==false){
									$("#invalidqr2").popup("open", {positionTo: "window"});				// Ausgabe einer Fehlermeldung via Popup
								}
							});	
						}
						// QR-Code weist nicht die gültige String-Länge auf
						else{
							$("#invalidqr1").popup("open", {positionTo: "window"});						// Ausgabe einer Fehlermeldung via Popup
						}				
					}
					// QR-Code weist nicht die gültige String-Länge auf
					else{
						$("#noqr").popup("open", {positionTo: "window"});								// Ausgabe einer Fehlermeldung via Popup
					}		
				};		
			  },
			  // Scan konnte nicht durchgeführt werden
			  function (error) {
				$("#error").popup("open", {positionTo: "window"});										// Ausgabe einer Fehlermeldung via Popup
			  }
			);
		});
	});
	
