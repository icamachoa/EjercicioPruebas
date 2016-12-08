function FullScreenControl(map) {
	var pantallaCompleta = '<i class="fa fa-lg fa-expand"></i> Pantalla completa';
	var salirPantallaCompleta = '<i class="fa fa-lg fa-compress"></i> Salir pantalla completa';
	var controlDiv = document.createElement('div');
	controlDiv.index = 1;
	controlDiv.style.padding = '9px';


	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.className = 'btnPantallaCompleta';
	controlUI.style.backgroundColor = '#FFF';
	controlUI.style.color = '#565656';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '1px';
	/*controlUI.style.borderColor = '#717b87';*/
	controlUI.style.borderColor = 'transparent';

	
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.style.borderBottomLeftRadius = '2px';
	controlUI.style.borderBottomRightRadius = '2px';
	controlUI.style.borderTopLeftRadius = '2px';
	controlUI.style.borderTopRightRadius = '2px';
	controlUI.style.boxShadow = '0 1px 4px -1px rgba(0, 0, 0, 0.3)';
	
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '11px';
	controlText.style.paddingTop = '8px';
	controlText.style.paddingBottom = '8px';
	controlText.style.paddingLeft = '8px';
	controlText.style.paddingRight = '8px';
	
	/*controlText.style.color = '#565656';*/
	controlText.innerHTML = pantallaCompleta;
	controlUI.appendChild(controlText);

	var fullScreen = false;
	var mapDiv = map.getDiv();
	var divStyle = mapDiv.style;
	if (mapDiv.runtimeStyle)
		divStyle = mapDiv.runtimeStyle;
	var originalPos = divStyle.position;
	var originalWidth = divStyle.width;
	var originalHeight = divStyle.height;
	
	// IE8 hack
	if (originalWidth == "")
		originalWidth = mapDiv.style.width;
	if (originalHeight == "")
		originalHeight = mapDiv.style.height;
	
	var originalTop = divStyle.top;
	var originalLeft = divStyle.left;
	var originalZIndex = divStyle.zIndex;

	var bodyStyle = document.body.style;
	if (document.body.runtimeStyle)
		bodyStyle = document.body.runtimeStyle;
	var originalOverflow = bodyStyle.overflow;
	
	// Setup the click event listener
	google.maps.event.addDomListener(controlUI, 'click', function() {
		var center = map.getCenter();
		if (!fullScreen) {
			mapDiv.style.position = "fixed";
			mapDiv.style.width = "100%";
			mapDiv.style.height = "100%";
			mapDiv.style.top = "0";
			mapDiv.style.left = "0";
			mapDiv.style.zIndex = "100";
			document.body.style.overflow = "hidden";
			controlText.innerHTML = salirPantallaCompleta;
		}
		else {
			if (originalPos == "")
				mapDiv.style.position = "relative";
			else
				mapDiv.style.position = originalPos;
			mapDiv.style.width = originalWidth;
			mapDiv.style.height = originalHeight;
			mapDiv.style.top = originalTop;
			mapDiv.style.left = originalLeft;
			mapDiv.style.zIndex = originalZIndex;
			document.body.style.overflow = originalOverflow;
			controlText.innerHTML = pantallaCompleta;
		}
		fullScreen = !fullScreen;
		google.maps.event.trigger(map, 'resize');
		map.setCenter(center);
	});
	
	return controlDiv;
}
