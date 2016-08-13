var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App running on port", port);
});


// MARK: - API Endpoints

app.get('/scrape', function(req, res){
  url = 'https://sandiego.craigslist.org/search/apa?sort=date&bathrooms=2&amp;bedrooms=3&amp;housing_type=1&amp;housing_type=2&amp;housing_type=6&amp;housing_type=9&amp;postal=92161&amp;search_distance=3';

  request(url, function(error, response, html) {
    console.log("LOG: requested");
    if(error) {
      handleError(res, err.message, "Can't connect");
      return;
    }
    // TODO: - What is this?
    $ = cheerio.load(html);
    console.log("LOG: cheerio loaded");

    var rows = [];
    console.log("LOG: entering loop");
    $('rows').each(function(index, element) {
      console.log("LOG: in loop");
      rows[index] = $(this).serializeArray();
      console.log(index+"----"+rows[index]);
    });


    // Define what data to extract and store in a listingJSON
    var title, datePosted, price, bedrooms, size, location;
    var listingJSON = { title: "", datePosted: "", price: "", bedrooms: "", size: "", location: "" };
  });
});


// MARK: - API Endpoint Helper Functions

// Generic error handler for endpoints
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).jspon({"error": message});
}
