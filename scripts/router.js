/**
 * Main router for the application. We may want to split it
 * up later if it gets too bloated.
 */
hubbub.Router = Backbone.Router.extend({

  routes: {
    '': 'listFeedItems',
    'feed-items': 'listFeedItems',
    'filter': 'filter'
  },

  /**
   * Initialize the router. Start off with some stub feed items.
   */
  initialize: function() {
    this.feedItems = hubbub.stubFeedItems();    
    this.firstPage = true;

    // Load all templates, since changePage gets rid of them
    this.feedPageTemplate = $('#feedPageTemplate');
    this.feedItemTemplate = $('#feedItemTemplate');
    this.filterTemplate = $('#filterTemplate');
  },

  listFeedItems: function() {
    this.changePage(new hubbub.FeedPageView({
      model: this.feedItems,
      pageTemplate: this.feedPageTemplate,
      feedItemTemplate: this.feedItemTemplate
    }));
  },

  filter: function() {
    this.changePage(new hubbub.FilterView());
  },

  /**
   * Change the page displayed.
   * Given a View, calls render() on that view, then appends that view's
   * element to the <body> element.
   */
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
