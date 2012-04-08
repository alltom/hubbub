/**
 * Main router for the application. We may want to split it
 * up later if it gets too bloated.
 */
hubbub.Router = Backbone.Router.extend({

  routes: {
    "feed-items": "feedItems"
  },

  /**
   * Initialize the router. Start off with some stub feed items.
   */
  initialize: function() {
    this.feedItems = hubbub.stubFeedItems();    
  }

});
