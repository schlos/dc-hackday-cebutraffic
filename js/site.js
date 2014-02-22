$(function (){

	//Mapping
	var map = L.mapbox.map('map', 'djohnson.map-m9l4eaq3', { zoomControl: false })
		.setView([10.3156992, 123.88543], 14);
	map._layersMinZoom = 2
	map._layersMaxZoom = 19
	heat = L.heatLayer([],  {radius: 35,max: 1.0}).addTo(map);
	var clusterGroup = new L.MarkerClusterGroup();

	$.getJSON('accidents.json', function(data) {
		$.each(data, function (i,d){
			var layer = L.mapbox.featureLayer({
				type: 'Feature',
				geometry: {
					type: 'Point',
					// coordinates here are in longitude, latitude order because
					// x, y is the standard for GeoJSON and many formats
					coordinates: [d.locationLon, d.locationLat]
				},
				properties: {
					title: d.title,
					description: d.description,
					'marker-color': '#f0a'
				}
			});

			layer.eachLayer(function(l) {
			heat.addLatLng(l.getLatLng());
				clusterGroup.addLayer(layer);
			});
			map.addLayer(clusterGroup);

		});
	});
});