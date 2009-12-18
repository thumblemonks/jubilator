/*
  http://github.com/api/v2/json/...
  repos/show/:user/:repo
  tree/show/:user/:repo/:sha
*/



var app = $.sammy(function() {

  this.get('#/:user/:repo', function() {
    var user = this.params["user"];
    var repo = this.params["repo"];
    $.github.repo(user, repo, function(data) {
        console.log("hello %o", data);
        $('#description').text(data.repository.description);
        // $('#tree').text(data.repository.description);
      }
    );
  });

});

$.input_prompt = function(inputElement) {
  inputElement.focus(function() {
    var element = $(this);
    if (element.data("label") == undefined) { element.data("label", element.val()); }
    if (element.data("label") == element.val()) { element.val(""); }
  });

  inputElement.blur(function() {
    var element = $(this);
    if (element.val().length == 0) { element.val(element.data("label")); }
  });
};

$(document).ready(function() {
  $("input.input_prompt, textarea.input_prompt").each(function(i) { $.input_prompt($(this)); })

  $("#jubilate").click(function() {
    window.location = "#/" + $("#repo_url").val();
  });

  app.run(); // Sammy!
});
