$(function (){

	//Mapping
	var map = L.mapbox.map('map', 'djohnson.map-m9l4eaq3', { zoomControl: false })
		.setView([10.3156992, 123.88543], 13);
	map._layersMinZoom = 2
	map._layersMaxZoom = 19

});