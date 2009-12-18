;(function($) {

  $.github = {
    repo: function(user, repo, callback) {
      $.getJSON("http://github.com/api/v2/json/repos/show/" + user + "/" + repo + "?callback=?", callback);
    },

    tree: function(user_repo, callback) {
      $.getJSON("http://github.com/api/v2/json/repos/show/" + user + "/" + repo + "?callback=?", callback);
    }
  };

})(jQuery);
