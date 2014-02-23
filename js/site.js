$(function (){

	//Mapping
	var map = L.mapbox.map('map', 'djohnson.map-m9l4eaq3', { zoomControl: false })
		.setView([14.641192105473298, 121.04684829711913], 12);
	map._layersMinZoom = 2
	map._layersMaxZoom = 19
	var heat = L.heatLayer([],  {radius: 35,max: 1.0});
	map.addLayer(heat);
	var clusterGroup = new L.MarkerClusterGroup();

    $('.day-button').click(function(e) {  
	$.getJSON(e.target.id+".json", function(data) {
		clusterGroup.clearLayers();
		heat.setLatLngs([]);
		$.each(data, function (i,d){
		if(d.locationLon && d.locationLat)
		{
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
		}
		});
	});
});
});