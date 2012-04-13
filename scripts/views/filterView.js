/**
 * View class for the whole filter page.
 */
hubbub.FilterView = Backbone.View.extend({
  /**
   * Additional parameters in options:
   * filterTemplate - a template for filter pages.
   */
  initialize: function(options) {
    this.template = _.template(options.filterTemplate.html());
  },

  render: function(eventName) {
    $(this.el).html(this.template());
    return this;
  }
});
