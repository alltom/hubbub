/**
 * View class for the whole feed page. Uses the template feedPageTemplate.
 */
hubbub.FeedPageView = Backbone.View.extend({
  /**
   * Views take constructor parameters as named arguments inside the options
   * dictionary.
   * This view expects two additional parameters:
   * pageTemplate - a template for the feed page
   * feedItemTemplate - a template for a single feed item.
   */
  initialize: function(options) {
    this.feedItemTemplate = options.feedItemTemplate;
    this.template = _.template(options.pageTemplate.html());
  },

  /*
   * Renders a header div, and a content div which is handled by FeedListView.
   */
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    this.listView = new hubbub.FeedListView({
      el: $('#feedList', this.el),
      model: this.model,
      feedItemTemplate: this.feedItemTemplate
    });
    this.listView.render();
    return this;
  }
});

/**
 * View class for a list of feed items.
 */
hubbub.FeedListView = Backbone.View.extend({
  /**
   * Additional parameters in options:
   * feedItemTemplate - a template for feed items
   */
  initialize: function(options) {
    this.feedItemTemplate = options.feedItemTemplate;
    this.model.bind('reset', this.render, this);
  },

  /*
   * Creates a FeedItemView for each item in the model, and has it
   * render that item.
   */
  render: function(eventName) {
    $(this.el).empty();
    this.model.each(function(feedItem) {
      var item = new hubbub.FeedItemView({
        model: feedItem,
        feedItemTemplate: this.feedItemTemplate,
		collectionRef: this.model
      }).render().el 
      $(this.el).append(item)
    }, this);
    $('#feedList').listview('refresh');
    return this;
  }
});

/**
 * View class for a single feed item.
 */
hubbub.FeedItemView = Backbone.View.extend({

  tagName: 'div',
  className: 'feedItem',

  /**
   * Additional parameters in options:
   * feedItemTemplate - the template to use.
   */
  initialize: function(options) {
    this.template = _.template(options.feedItemTemplate.html());
	this.collectionRef = options.collectionRef; //reference to the feed list
  },

  /*
  this render function updates the tag button's link to pass the index for
  this particular feed item in the feed list
  */
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
	$('.hubbub-feeditem-tag-button',this.el)
	  .attr('href',"#tag/"+this.collectionRef.indexOf(this.model));
    return this;
  }
})
