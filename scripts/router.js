/**
 * Main router for the application. We may want to split it
 * up later if it gets too bloated.
 */
hubbub.Router = Backbone.Router.extend({

  routes: {
    '': 'listFeedItems',
    'feed-items': 'listFeedItems'
  },

  /**
   * Initialize the router. Start off with some stub feed items.
   */
  initialize: function() {
    this.feedItems = hubbub.stubFeedItems();    
    this.firstPage = true;
  },

  listFeedItems: function() {
    this.changePage(new hubbub.FeedPageView({model: this.feedItems}));
  },

  changePage: function(page) {
    $(page.el).attr('data-role', 'page');
    page.render();
    $('body').append($(page.el));
    var transition = $.mobile.defaultPageTransition;
    // Don't transition for the first page
    if (this.firstPage) {
      transition = 'none';
      this.firstPage = false;
    }
    $.mobile.changePage($(page.el), {
      changeHash: false,
      transition: transition
    });
  }
});
