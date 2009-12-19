(function($) {

  Sammy = Sammy || {};
  
  Sammy.Jubilator = function(app) {
    app.helpers({
      reset: function() {
        $("#description, #last_commit, #tree > ul, #contents").text("");
      },

      load_project: function(user, repo, callback) {
        var project = this.app.cache("project");
        if (!project || !project.same(user, repo)) {
          project = this.app.cache("project", $.github(user, repo));
          this.reset();

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
        }

        if (callback && project) { callback(project); }
      }
    });
  };
})(jQuery);

var app = $.sammy(function() {
  this.use(Sammy.Cache);
  this.use(Sammy.Jubilator);

  this.get("#/:user/:repo/blob/:sha/:path", function() {
    var tree_sha = this.params["sha"]
    var path = this.params["path"]
    this.load_project(this.params["user"], this.params["repo"], function(project) {
      project.open(tree_sha, path, function(data) {
        $("#contents").html(Mustache.to_html("{{raw}}", {raw: data.blob.data}));
        prettyPrint();
      });
    });
  });

  this.get("#/:user/:repo/tree/:sha", function() {
    var tree_sha = this.params["sha"]
    this.load_project(this.params["user"], this.params["repo"], function(project) {
      project.tree(tree_sha, function(tree_data) {
        var subtree = $("#" + tree_sha + " > ul");
        subtree.text("");
        new Jubilator.TreeView(project, tree_sha, tree_data.tree).render(subtree);
      });
    });
  });

  this.get('#/:user/:repo', function() {
    this.load_project(this.params["user"], this.params["repo"]);
  }); // get(#/user/repo)

});

$.extend(app, {
  
});

$.input_prompt = function(inputElement) {
  inputElement.focus(function() {
    var element = $(this);
    if (element.data("label") == undefined) { element.data("label", element.attr("defaultValue")); }
    if (element.data("label") == element.val()) { element.val(""); }
  });

  inputElement.blur(function() {
    var element = $(this);
    if (element.val().length == 0) { element.val(element.data("label")); }
  });
};

$(document).ready(function() {
  $("input.input_prompt, textarea.input_prompt").each(function(i) { $.input_prompt($(this)); })

  $("#jubilate").submit(function() {
    window.location = "#/" + $("#repo_url").val();
    return false;
  });

  app.run(); // Sammy!
});
