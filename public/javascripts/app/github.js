;(function($) {

  GitHub = function(user, repo) {
    this.user = user;
    this.repo = repo;
  }

  GitHub.prototype = $.extend({}, {
    same: function(user, repo) {
      return (this.user == user && this.repo == repo);
    },

    _log: function(msg) {
      if (typeof console != 'undefined') { console.log(msg); }
    },

    _github: function(path, callback) {
      path = Mustache.to_html(path, this); // :)
      var url = "http://github.com/api/v2/json/" + path
      this._log("GitHub: " + url);
      $.getJSON(url + "?callback=?", callback);
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
    
    open_blob: function(sha, path, callback) {
      this._github("blob/show/{{user}}/{{repo}}/" + sha + "/" + path, callback);
    }
  })

  // Initializer
  $.github = function(user, repo) {
    return new GitHub(user, repo);
  }
})(jQuery);
