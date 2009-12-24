Jubilator = {};

Jubilator.TreeView = function(project, sha, root) {
  this.project = project;
  this.tree_sha = sha;
  this.root = root;
};

Jubilator.TreeView.prototype = $.extend({}, {
  _blob_template: "<li class='leaf' data-sha='{{sha}}' data-href='#/{{user}}/{{repo}}/blob/{{tree_sha}}/{{path}}'><div class='name'>{{name}}</div></li>",

  _tree_template: "<li class='tree' data-sha='{{sha}}' data-href='#/{{user}}/{{repo}}/tree/{{sha}}'><div class='name'>{{name}}</div><ul></ul></li>",

  make_blob: function(view) {
    var li = $(Mustache.to_html(this._blob_template, view));
    li.children('.name').click(function() {
      window.location = li.attr('data-href');
    });
    return li;
  },

  make_tree: function(view) {
    var li = $(Mustache.to_html(this._tree_template, view));
    li.children('.name').click(function() {
      var name = $(this);
      if (!name.data('loaded')) {
        window.location = li.attr('data-href');
        name.data('loaded', true);
      } else {
        li.children('ul').toggle();
      }
      li.toggleClass('opened');
    });
    return li;
  },

  render: function(to_element) {
    var that = this;
    $(that.root).each(function(i) {
      var leaf = this;
      var view = {
        user: that.project.user, repo: that.project.repo,
        name: leaf.name, path: leaf.name, tree_sha: that.tree_sha, sha: leaf.sha
      }
      if (leaf.type == "blob") {
        to_element.append(that.make_blob(view));
      } else if (leaf.type == "tree") {
        to_element.append(that.make_tree(view));
      }
    });
  }
});
