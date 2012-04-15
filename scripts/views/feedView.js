/**
 * View class for the whole feed page. Uses the template feedPageTemplate.
 */
hubbub.FeedPageView = Backbone.View.extend({
  /**
   * Views take constructor parameters as named arguments inside the options
   * dictionary.
   * This view expects two additional parameters:
   * pageTemplate - a template for the feed page
   * feedItemTemplates - an object whose keys are item sources (Gmail, Twitter,
   *                     etc) and values are templates for individual items
   */
  initialize: function(options) {
    this.feedItemTemplates = options.feedItemTemplates;
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
      feedItemTemplates: this.feedItemTemplates
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
   * feedItemTemplates - the hash table of item templates (see FeedPageView)
   */
  initialize: function(options) {
    this.feedItemTemplates = options.feedItemTemplates;
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
        feedItemTemplate: this.feedItemTemplates[feedItem.get("source")] ||
            this.feedItemTemplates["generic"],
        collectionRef: this.model
      }).render().el;
      $(this.el).append(item);
    }, this);
    $('#feedList').listview('refresh');
    return this;
  }
});

/**
 * View class for a single feed item.
 */
hubbub.FeedItemView = Backbone.View.extend({

  events: {
    'click input': 'onButtonClick'
  },

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
    $(this.el).addClass(this.model.get("source").toLowerCase());
    $(this.el).html(this.template(_.defaults(this.model.toJSON(), { body: "Template Missing" })));
    $('.hubbub-feeditem-tag-button',this.el)
      .attr('href',"#tag/"+this.collectionRef.indexOf(this.model));
    return this;
  },

  onButtonClick: function(event) {
    var button = $(event.currentTarget);
    if(button.attr('value') === 'Save') {
      this.onSaveButtonClick(button); 
    }
  },

  onSaveButtonClick: function(button) {
    // We can't simply write
    // button.attr('value', 'Saved!');
    // because jQuery Mobile hides the <input> element and actually displays
    // nested <span>s. Change the span for the button text instead.
    button.parent().find('.ui-btn-text').text('Saved!');
  }
});