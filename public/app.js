$.getJSON("/articles", function (data) {
  // for (var i = 0; i < data.length; i++) {
  //   // Display the apropos information on the page
  //   $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  // }

  for (var i = 0; i < data.length; i++) {
    var card = "" +
      "<div class='card mt-3'>" +
      "<h5 class='card-header'>" + data[i].title+ "</h5>" +
      "<div class='card-body'>" +
      "<p class='card-text'>" + data[i].snippet + "</p>" +
      "</div>" +
      "<div class='card-footer'>" +
      "<button type='submit' class='btn btn-primary' data-id=" + data[i]._id + ">Save Article</button>" +
      "</div>" +
      "</div>"

    $("#articles").prepend(card);

  };

});