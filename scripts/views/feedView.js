hubbub.FeedView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(templates.get('feed'))
  },

  render: function() {
    //$(this.el).html(this.template(this.model.toJSON()));
    $(this.el).empty();
    _.each(this.model.models, function(feedItem) {
      var item = new hubbub.FeedItemView({model: feedItem}).render().el 
      $(this.el).append(item)
    }, this);
    return this;
  }
});
