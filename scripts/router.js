/**
 * Main router for the application. We may want to split it
 * up later if it gets too bloated.
 */
hubbub.Router = Backbone.Router.extend({

  routes: {
    "feed-items": "feedItems"
  },

  initialize: function() {
    this.feedItems = hubbub.stubFeedItems();    
  }

});
