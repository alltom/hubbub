/**
 * Main router for the application. We may want to split it
 * up later if it gets too bloated.
 */
hubbub.Router = Backbone.Router.extend({

  /* 
   * Routes for the application.
   * e.g. if we have an anchor with href="#filter", then the URL will change
   * to .../index.html#filter
   * On URL change, Backbone.js checks this object and fires the function
   * associated with the route (also named filter in this case)
   *
   * The first page to load (the '' route) is the feed item list.
   */
  routes: {
    '': 'listFeedItems',
    'feed-items': 'listFeedItems',
    'filter': 'filter',
    'tag/:feedItemIndex': 'listTagItems'
	//'tag/:feedItemIndex': 'tag'
  },

  /**
   * Initialize the router. Start off with some stub feed items.
   * This happens when the application starts.
   */
  initialize: function() {
    this.feedItems = hubbub.stubFeedItems();    
	this.tagItems = hubbub.stubTagItems();
    this.firstPage = true;

    // Eagerly load all templates, since changePage gets rid of them
    this.feedPageTemplate = $('#feedPageTemplate');
    this.feedItemTemplate = $('#feedItemTemplate');
    this.gmailItemTemplate = $('#gmailItemTemplate');
    this.twitterItemTemplate = $('#twitterItemTemplate');
    this.imgurItemTemplate = $('#imgurItemTemplate');
    this.filterTemplate = $('#filterTemplate');
    this.tagTemplate = $('#tagTemplate');
    this.tagPageTemplate = $('#tagPageTemplate');
    this.tagItemTemplate = $('#tagItemTemplate');
  },

  /**
   * Show the news feed.
   */
  listFeedItems: function() {
    this.changePage(new hubbub.FeedPageView({
      model: this.feedItems,
      pageTemplate: this.feedPageTemplate,
      feedItemTemplates: {
        Gmail: this.gmailItemTemplate,
        Twitter: this.twitterItemTemplate,
        Imgur: this.imgurItemTemplate,
        generic: this.feedItemTemplate
      }
    }));
  },

  /**
   * Show the filter page.
   */
  filter: function() {
    this.changePage(new hubbub.FilterView({
      filterTemplate: this.filterTemplate,
	  tagItems: this.tagItems,
	  tagItemTemplate: this.tagItemTemplate
    }));
  },

  /**
   * Show the tag page (maybe make it a dialog)
   */
  tag: function(feedItemIndex) {
    this.changePage(new hubbub.TagView({
	  model: this.feedItems.at(feedItemIndex),
      tagTemplate: this.tagTemplate
    }));
  },
  
  listTagItems: function(feedItemIndex) {
    this.changePage(new hubbub.TagPageView({
      model: this.tagItems,
      pageTemplate: this.tagPageTemplate,
      tagItemTemplate: this.tagItemTemplate,
	  feedItem: this.feedItems.at(feedItemIndex),
	  feedItemIndex: feedItemIndex
    }));
  },

  /**
   * Helper method to change the page displayed.
   * Given a View, 
   * 1. calls render() on that View
   * 2. appends that view's element to the <body> element
   * 3. calls $.mobile.changePage, passing in the new View's element, which
   *    removes the HTML for the previous page, and shows an animation on
   *    all page changes except the very first one.
   */
  changePage: function(pageView) {
    $(pageView.el).attr('data-role', 'page');
    pageView.render();
    $('body').append($(pageView.el));
    var transition = $.mobile.defaultPageTransition;
    // Don't transition for the first page
    if (this.firstPage) {
      transition = 'none';
      this.firstPage = false;
    }
    $.mobile.changePage($(pageView.el), {
      changeHash: false,
      transition: transition
    });
  }
});
