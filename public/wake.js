
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
var time = calendar.dateTime.substring(11, 15);