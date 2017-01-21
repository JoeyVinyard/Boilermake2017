function createMap(center){
	map = new google.maps.Map(document.getElementById("map"), {
		center
	});
}

function addMarker(location, name, priceLevel){
	var marker = new google.maps.Marker({
		position: location,
		map,
		title: name
	});
	marker.addListener("click", function(){
		new google.maps.InfoWindow({
			content: "<p>" + name + "</p><p>Price: " + Array(Math.ceil(priceLevel)+1).join("$") + "</p>"
		}).open(map, marker);
	});
}

$(document).ready(function() {
    var socket = io("http://localhost:3000");

    socket.on("create-map", function(loc) {
        createMap(loc);
    });

    socket.on("add-marker", function(marker) {
        addMarker(marker.location, marker.name, marker.price);
    });
});
