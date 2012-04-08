hubbub.FeedPageView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template($('#feedPageTemplate').html());
  },

  render: function(eventName) {
    $('#welcome').remove();
    $(this.el).html(this.template(this.model.toJSON()));
    this.listView = new hubbub.FeedListView({
      el: $('ul', this.el),
      model: this.model
    });
    this.listView.render();
    return this;
  }
});

hubbub.FeedListView = Backbone.View.extend({
  initialize: function() {
    this.model.bind('reset', this.render, this);
  },

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

hubbub.FeedItemView = Backbone.View.extend({

  tagName: 'li',
  className: 'feedItem',

  initialize: function() {
    this.template = _.template($('#feedItemTemplate').html());
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
})
