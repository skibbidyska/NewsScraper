
$.getJSON("/articles", function(data) {
  // for (var i = 0; i < data.length; i++) {
  //   // Display the apropos information on the page
  //   $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  // }

  for (var i = 0; i < data.length; i++) {
    var title = $("<a>");
    var titleText = $("<h1>");
    var link = data[i].link;
    var snippet = $("<p>");

    titleText.text(data[i].title);
    snippet.text(data[i].snippet);
    title.append(titleText);
    title.append(snippet);
    title.attr({
      "data-id": data[i]._id,
      "href": link
    });

    $("#articles").append(title);
  }
});