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
  },

  /**
   * Initialize the router. Start off with some stub feed items.
   * This happens when the application starts.
   */
  initialize: function() {
    this.feedItems = hubbub.stubFeedItems();    
    this.tagItems = hubbub.stubTagItems();
    this.filters = new hubbub.FilterCollection([]);
    this.firstPage = true;
    this.currentFilter = new hubbub.AndFilter({
      filters: new hubbub.FilterCollection([
        new hubbub.AllPassFilter({name: 'AllPass'})
      ])
    });

    // Eagerly load all templates, since changePage gets rid of them
    this.feedPageTemplate = $('#feedPageTemplate');
    this.feedItemTemplate = $('#genericFeedItemTemplate');
    this.gmailItemTemplate = $('#gmailItemTemplate');
    this.twitterItemTemplate = $('#twitterItemTemplate');
    this.imgurItemTemplate = $('#imgurItemTemplate');
    this.facebookItemTemplate = $('#facebookItemTemplate');
    this.filterTemplate = $('#filterTemplate');
    this.saveFilterTemplate = $('#saveFilterTemplate');
    this.savedFilterTemplate = $('#savedFilterTemplate');
    this.tagPageTemplate = $('#tagPageTemplate');
    this.tagItemTemplate = $('#tagItemTemplate');
  },

  addFilter: function(filter) {
    this.filters.push(filter);
  },

  /**
   * Show the news feed, filterd by this.currentFilter
   */
  listFeedItems: function() {
    var feedItems = this.currentFilter.apply(this.feedItems);
    this.changePage(new hubbub.FeedPageView({
      model: feedItems,
      pageTemplate: this.feedPageTemplate,
      feedItemTemplates: {
        Gmail: this.gmailItemTemplate,
        Twitter: this.twitterItemTemplate,
        Imgur: this.imgurItemTemplate,
        Facebook: this.facebookItemTemplate,
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
      savedFilterTemplate: this.savedFilterTemplate,
      tagItems: this.tagItems,
      tagItemTemplate: this.tagItemTemplate,
      services: hubbub.stubServices(),
      filters: this.filters,
      router: this
    }));
  },

  saveFilter: function(filter) {
    this.changePage(new hubbub.SaveFilterView({
      saveFilterTemplate: this.saveFilterTemplate,
      filter: filter,
      router: this
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
