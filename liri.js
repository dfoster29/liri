require("dotenv").config();

var keys = require("./keys");
//-----------------------------------------
// spotify
if (process.argv[2] === "spotify-this-song") {
  var nodeArgs = process.argv;

  var trackName = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      trackName = trackName + "+" + nodeArgs[i];
    } else {
      trackName += nodeArgs[i];
    }
  }

  var Spotify = require("node-spotify-api");

  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: trackName }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    } else {
      // var artist = .artists.name;
      // var songName = ;
      // var preview = ;
      // var album = .name;
      // console.log("===========================================");
      // console.log("Artist: " + artist + );
      // console.log("===========================================");
    }

    console.log(data.tracks.album.artists.name);
  });


} else if (process.argv[2] === "movie-this") {
  //-----------------------------------------
  // require
  var nodeArgs = process.argv;
  // Create an empty variable for holding the movie name
  var movieName = "";
  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
    }
  }

  var request = require("request");

  var omdb = process.env.OMDB_API_KEY
  
  request(
    "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + omdb,
    function(error, response, body) {
      if (error) {
        console.log("error:", error); // Print the error if one occurred
      } else if (!error && response.statusCode === 200) {
        var title = JSON.parse(body).Title;
        var date = JSON.parse(body).Released;
        var imdbRating = JSON.parse(body).imdbRating;
        var rtRating = "";
        if (JSON.parse(body).Ratings === undefined) {
          rtRating = "no rating";
        } else {
          rtRating = JSON.parse(body).Ratings[1].Value;
        };
        var country = JSON.parse(body).Country;
        var language = JSON.parse(body).Language;
        var plot = JSON.parse(body).Plot;
        var actors = JSON.parse(body).Actors;

        console.log("===========================================");

        console.log(
          "Movie Title: " +
            title +
            "\nRelease Date: " +
            date +
            "\nIMDB Rating: " +
            imdbRating +
            "\nRotten Tomatoes Rating: " +
            rtRating +
            "\nCountry of Origin: " +
            country +
            "\nLanguage: " +
            language +
            "\nPlot: " +
            plot +
            "\nActors: " +
            actors
        );

        console.log("===========================================");
      }
    }
  );
} else if (process.argv[2] === "my-tweets") {
  //-----------------------------------------
  // twitter
  var Twitter = require("twitter");

  var client = new Twitter(keys.twitter);

  var params = { screen_name: "RogueNASA" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {

      console.log("===========================================");

      var myTweets = JSON.parse(tweets[0]).text;

      console.log(myTweets);
    }
  });
}

//-----------------------------------------
// do what it says
if (process.argv[2] === "do-what-it-says") {
}
