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
    this.tagItemTemplate = options.tagItemTemplate;
    this.tagItems = options.tagItems;
  },

  render: function(eventName) {
    $(this.el).html(this.template());
    this.listView = new hubbub.TagListView({
      el: $('#tagList', this.el),
      model: this.tagItems,
      tagItemTemplate: this.tagItemTemplate
    });
    this.listView.render();
    return this;
  }
});
