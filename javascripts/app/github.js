/*
  http://github.com/api/v2/json/...
  repos/show/:user/:repo
  commits/list/:user_id/:repository/:branch
  tree/show/:user/:repo/:sha
*/

;(function($) {

  GitHub = function(user, repo) {
    this.user = user;
    this.repo = repo;
  }

  GitHub.prototype = $.extend({}, {
    // Repos API

    show_repo: function(callback) {
      $.getJSON("http://github.com/api/v2/json/repos/show/" + this.user + "/" + this.repo + "?callback=?", callback);
    },

    // Commits API

    last_commit: function(callback) {
      $.getJSON("http://github.com/api/v2/json/commits/list/" + this.user + "/" + this.repo + "/master?callback=?", function(data) {
        console.log(data);
        callback(data.commits[0]);
      });
    },

    // Tree API

    tree: function(sha, callback) {
      $.getJSON("http://github.com/api/v2/json/tree/show/" + this.user + "/" + this.repo + "/" + sha + "?callback=?", callback);
    }
  })

  // Initializer
  $.github = function(user, repo) {
    return new GitHub(user, repo);
  }
})(jQuery);
