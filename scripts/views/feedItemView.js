hubbub.FeedItemView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(templates.get('feed-item'));
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
})
