Jubilator = {};

Jubilator.TreeView = function(project, sha, root) {
  this.project = project;
  this.tree_sha = sha;
  this.root = root;
};

Jubilator.TreeView.prototype = $.extend({}, {
  _blob_template: "<li class='leaf' id='{{sha}}'><a href='#/{{user}}/{{repo}}/blob/{{tree_sha}}/{{path}}'>{{name}}</a></li>",
  _tree_template: "<li class='tree' id='{{sha}}'><a href='#/{{user}}/{{repo}}/tree/{{sha}}'>{{name}}</a><ul></ul></li>",

  render: function(to_element) {
    var that = this;
    $(that.root).each(function(i) {
      var leaf = this;
      var view = {
        user: that.project.user, repo: that.project.repo,
        name: leaf.name, path: leaf.name, tree_sha: that.tree_sha, sha: leaf.sha
      }
      if (leaf.type == "blob") {
        to_element.append(Mustache.to_html(that._blob_template, view));
      } else if (leaf.type == "tree") {
        to_element.append(Mustache.to_html(that._tree_template, view));
      }
    });
  }
});
