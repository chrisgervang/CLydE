
var calendar = {
	"summary": "chrisgervang@gmail.com",
	"items": [
	{
		"location": "CoHo, Lagunita Drive, Stanford, CA, United States",
		"start": {
			"dateTime": "2014-01-27T09:00:00-08:00"
		}
	}
	]
}

//First five characters of event
var eventName = calendar.summary;
var eventNameAbbrev = eventName.substring(0, 5);
var address = calendar.location;
var time = calendar.dateTime.substring(11, 15



var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = "Greenwich, England";
var destinationA = "Stockholm, Sweden";
var destinationB = new google.maps.LatLng(50.087692, 14.421150);

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: UnitSystem,
    durationInTraffic: Boolean,
    avoidHighways: false,
    avoidTolls: false
  }, callback);

function callback(response, status) {
  if (status == google.maps.DistanceMatrixStatus.OK) {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }
}