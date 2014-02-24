$(function (){

	//Mapping
	var map = L.mapbox.map('map', 'djohnson.map-m9l4eaq3', { zoomControl: false })
		.setView([14.596992, 121.014207], 12);
	map._layersMinZoom = 2
	map._layersMaxZoom = 19
	var heat = L.heatLayer([],  {radius: 35,max: 1.0});
	map.addLayer(heat);
	var clusterGroup = new L.MarkerClusterGroup();

    $('.day-button').click(function(e) {  
	$.getJSON("data/"+e.target.id+".json", function(data) {
		
		if(e.target.id == "sundays" || e.target.id == "mondays")
		{		
			map.setView([14.596992, 121.014207], 12);
			console.log("manilla zoom");
		}
		else if(e.target.id == "cebu-sundays" || e.target.id == "cebu-mondays") 
		{
			map.setView([10.309306, 123.895864], 13, "animate");
			console.log("cebu zoom");
		}
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