;(function($) {

  GitHub = function(user, repo) {
    this.user = user;
    this.repo = repo;
  }

  GitHub.prototype = $.extend({}, {
    _github: function(path, callback) {
      path = Mustache.to_html(path, this); // :)
      $.getJSON("http://github.com/api/v2/json/" + path + "?callback=?", callback);
    },

    // Repos API

    show_repo: function(callback) { this._github("repos/show/{{user}}/{{repo}}", callback); },

    // Commits API

    last_commit: function(callback) {
      this._github("commits/list/{{user}}/{{repo}}/master", function(data) {
        callback(data.commits[0]);
      });
    },

    // Tree API

    tree: function(sha, callback) { this._github("tree/show/{{user}}/{{repo}}/" + sha, callback); },

    // Blobs
    
    open: function(sha_path, callback) {
      console.log(arguments);
      this._github("blob/show/{{user}}/{{repo}}/" + sha_path, callback);
    }
  })

  // Initializer
  $.github = function(user, repo) {
    return new GitHub(user, repo);
  }
})(jQuery);
