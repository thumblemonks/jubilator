var app = $.sammy(function() {
  var project = null;

  this.get(/^\#\/blob\/(.*)/, function() {
    project.open(this.params["splat"], function(data) {
      $("#contents").html(Mustache.to_html("{{raw}}", {raw: data.blob.data}));
    });
  });

  this.get("#/tree/:sha", function() {
    var tree_sha = this.params["sha"]
    project.tree(tree_sha, function(tree_data) {
      var subtree = $("#" + tree_sha + " > ul");
      subtree.text("");
      new Jubilator.TreeView(project, tree_sha, tree_data.tree).render(subtree);
    });
  });

  this.get('#/:user/:repo', function() {
    var user = this.params["user"];
    var repo = this.params["repo"];
    project = $.github(user, repo);
    project.show_repo(function(data) { $('#description').text(data.repository.description); });

    project.last_commit(function(data) {
      var tree_sha = data.tree;
      $('#last_commit').text(tree_sha);
      project.tree(tree_sha, function(tree_data) {
        var root_tree = $("#tree > ul");
        root_tree.text("");
        new Jubilator.TreeView(project, tree_sha, tree_data.tree).render(root_tree);
      });
    }); // project.last_commit

  }); // get(#/user/repo)

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
