require("dotenv").config();

var keys = require("./keys");
//-----------------------------------------
// spotify 

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});


//-----------------------------------------
// require


var request = require('request');
request("http://www.omdbapi.com/?t=" + movie +  "apikey=" + keys.omdb, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred

  if (!error && response.statusCode === 200) {
    
    var title = JSON.parse(body).Title;
    var date = JSON.parse(body).Released;
    var imdbRating = JSON.parse(body).imdbRating;
    var rtRating = JSON.parse(body).Ratings[1];
    var country = JSON.parse(body).Country;
    var language = JSON.parse(body).Language;
    var plot = JSON.parse(body).Plot;
    var actors = JSON.parse(body).Actors;

    console.log(
      "Movie Title: " + title +
      "\nRelease Date: " + date +
      "\nIMDB Rating: " + imdbRating + 
      "\nRotten Tomatoes Rating: " + rtRating + 
      "\nCountry of Origin: " + country + 
      "\nLanguage: " + language + 
      "\nPlot: " + plot + 
      "\nActors: " + actors + 
    )
  }
});


//-----------------------------------------
// twitter


var Twitter = require('twitter');
 
var client = new Twitter(keys.twitter);
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});