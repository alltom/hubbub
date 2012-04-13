/**
 * View class for the whole tag page.
 */
hubbub.TagView = Backbone.View.extend({
  /**
   * Additional parameters in options:
   * tagTemplate - a template for tag pages.
   */
  initialize: function(options) {
    this.template = _.template(options.tagTemplate.html());
  },

  render: function(eventName) {
    $(this.el).html(this.template());
    return this;
  }
});
