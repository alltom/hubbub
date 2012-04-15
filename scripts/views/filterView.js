/**
 * View class for the whole filter page.
 */
hubbub.FilterView = Backbone.View.extend({

  /**
   * Events to handle in the filter page
   */
  events: {
    'click .serviceLogo': 'selectService'
  },

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
  },

  /**
   * Callback fired when one of the service logo images is cliced.
   * event is the event object, and event.currentTarget is the clicked element.
   * Here, event.currentTarget is a <span> wrapping the <img>.
   */
  selectService: function(event) {
    $(event.currentTarget).addClass('selectedService');
  }
});
