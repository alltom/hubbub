hubbub.FeedPageView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(hubbub.feedPageTemplate);
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

// FIXME Load these templates from an external file!
hubbub.feedPageTemplate = '<div data-role="header">\n' +
    '<h1>Hubbub</h1>\n' +
  '</div>\n' +

  '<div data-role="content">\n' +
    '<ul data-role="listview" id="feedList"></ul>\n' +
  '</div>\n';

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
    this.template = _.template(hubbub.feedItemTemplate);
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
})

// Ditto for this template
hubbub.feedItemTemplate = '<p><%= source %></p>\n' +
  '<p><%= body %></p>\n';
