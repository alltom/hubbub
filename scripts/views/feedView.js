/**
 * View class for the whole feed page. Uses the template feedPageTemplate.
 */
hubbub.FeedPageView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template($('#feedPageTemplate').html());
  },

  /*
   * Renders a header div, and a content div which is handled by FeedListView.
   */
  render: function(eventName) {
    $('#welcome').remove();
    $(this.el).html(this.template(this.model.toJSON()));
    this.listView = new hubbub.FeedListView({
      el: $('#feedList', this.el),
      model: this.model
    });
    this.listView.render();
    return this;
  }
});

/**
 * View class for a list of feed items.
 */
hubbub.FeedListView = Backbone.View.extend({
  initialize: function() {
    this.model.bind('reset', this.render, this);
  },

  /*
   * Creates a FeedItemView for each item in the model, and has it
   * render that item.
   */
  render: function(eventName) {
    $(this.el).empty();
    this.model.each(function(feedItem) {
      var item = new hubbub.FeedItemView({model: feedItem}).render().el 
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

  initialize: function() {
    this.template = _.template($('#feedItemTemplate').html());
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
})
