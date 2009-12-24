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

          project.show_repo(function(data) {
            $('#description').text(data.repository.description);
          });

          project.last_commit(function(data) {
            var tree_sha = data.tree;
            $('#last_commit').text(data.message);
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
    var req = this;
    var tree_sha = req.params["sha"]
    var path = req.params["path"]
    this.load_project(this.params["user"], this.params["repo"], function(project) {
      $("#tabs li.selected").removeClass("selected")
      var tab = $("#tabs li[data-sha='" + req.path + "']");
      if (tab.length > 0) {
        $("#contents").html(tab.data("html"));
        tab.addClass("selected");
        prettyPrint();
      } else {
        project.open_blob(tree_sha, path, function(data) {
          var raw_html = Mustache.to_html("{{raw}}", {raw: data.blob.data})
          tab = $("<li>");
          tab.attr("data-sha", req.path).data("html", raw_html).text(path).click(function() {
            window.location = req.path;
          });
          $("#tabs > ul").append(tab);
          $("#contents").html(raw_html);
          tab.addClass("selected");
          prettyPrint();
        });
      }
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
  });

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

  var random_noun = function() {
    return [
      "h4x0rz", "drama queens", "monks", "cheerios", "animal crackers", "heretics", "heroes",
      "space ghosts", "javascript engines"
    ][Math.floor(Math.random() * 100 % 10)];
  }
  $("#random_noun").text(random_noun()).click(function() { $(this).text(random_noun()); });

  var container = $('body'), west = $('body .west'), center = $('body .center');
  function layout() {
    container.layout();
  }
  // west.resizable({ handles: 'e', helper: 'ui-resizable-helper-west', minWidth: 100 });
  layout();
  $(window).resize(layout);

  app.run(); // Sammy!
});
