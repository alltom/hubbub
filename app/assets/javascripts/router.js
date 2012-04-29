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
    this.resetFilter();

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
   * Sets the filter used in the feed view.
   */
  setFilter: function(filter) {
    this.currentFilter = filter;
    this.isCustomFilter = true;
  },
  
  resetFilter: function() {
    this.setFilter(new hubbub.AndFilter({
      filters: new hubbub.FilterCollection([
        new hubbub.AllPassFilter({name: 'AllPass'})
      ])
    }));
    this.isCustomFilter = false;
  },

  /**
   * Show the news feed, filterd by this.currentFilter
   */
  listFeedItems: function() {
    var feedItems = this.currentFilter.apply(this.feedItems);
    this.changePage(new hubbub.FeedPageView({
      // wrap the page in a fluid container
      el: $('<div>', {'class': 'container-fluid'}),
      model: feedItems,
      pageTemplate: this.feedPageTemplate,
      feedItemTemplates: {
        Gmail: this.gmailItemTemplate,
        Twitter: this.twitterItemTemplate,
        Imgur: this.imgurItemTemplate,
        Facebook: this.facebookItemTemplate,
        generic: this.feedItemTemplate
      },
      router: this
    }));
  },

  /**
   * Show the filter page.
   */
  filter: function() {
    console.log('filter router');
    this.changePage(new hubbub.FilterView({
      el: $('<div>', {'class': 'container-fluid'}),
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
   * 2. Empties <body>
   * 2. appends that view's element to the <body> element
   */
  changePage: function(pageView) {
    pageView.render();
    $('body').empty().append(pageView.$el);
  }
});
