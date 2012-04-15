/**
 * View class for the whole filter page.
 */
hubbub.FilterView = Backbone.View.extend({

  selectedServiceClass: 'selectedService',

  /**
   * Events to handle in the filter page
   */
  events: {
    'vclick .serviceLogo': 'onServiceLogoClick'
  },

  /**
   * Additional parameters in options:
   * filterTemplate - a template for filter pages.
   * tagItemTemplate - a template for tag items.
   * tagItems - a collection of tag items.
   * services - a collection of services that data can be pulled from.
   */
  initialize: function(options) {
    this.template = _.template(options.filterTemplate.html());
    this.tagItemTemplate = options.tagItemTemplate;
    this.tagItems = options.tagItems;
    this.services = options.services;
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
  onServiceLogoClick: function(event) {
    // TODO detect how the HTML elements match up to models more elegantly.
    // Right now I'm using data-name, essentially hard-coding the relation.
    var target = $(event.currentTarget);
    var name = target.find('img').attr('data-name');
    var found = this.services.where({name: name});
    if (found.length !== 1) {
      throw new Error('There should only be one service with name ' + 
          name + ', but there were ' + service.length);
    }

    var service = found[0];
    if (service.get('selected')) {
      service.unselect(); 
      target.removeClass(this.selectedServiceClass);
    } else {
      service.select();
      target.addClass(this.selectedServiceClass);
    }
  }
});