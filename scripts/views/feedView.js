hubbub.FeedPageView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(hubbub.feedPageTemplate);
  },

  render: function(eventName) {
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

'<div id="welcome">\n' +
  '<h2>Welcome to Hubbub!</h2>\n' +

  '<p>This app aggregates items from all your information sources.</p>\n' +
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
    _.each(this.model.models, function(feedItem) {
      var item = new hubbub.FeedItemView({model: feedItem}).render().el 
      $(this.el).append(item)
    }, this);
    $('#feedList').listview('refresh');
    return this;
  }
});

hubbub.FeedItemView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(hubbub.feedItemTemplate);
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
})

// Ditto for this template
hubbub.feedItemTemplate = '<div class="feedItem">\n' +
  '<p><%= source %></p>\n' +
  '<p><%= body %></p>\n' +
'</div>\n';
