/**
 * View class for the whole filter page.
 */
hubbub.FilterView = Backbone.View.extend({

  selectedServiceClass: 'selectedService',

  /**
   * Events to handle in the filter page
   */
  events: {
    'vclick .serviceLogo': 'onServiceLogoClick',
    'vclick #executeFilter': 'onExecute'
  },

  /**
   * Additional parameters in options:
   * filterTemplate - a template for filter pages.
   * tagItemTemplate - a template for tag items.
   * tagItems - a collection of tag items.
   * services - a collection of services that data can be pulled from.
   * router - the router, whose method to call when going back to the Feed view
   */
  initialize: function(options) {
    this.template = _.template(options.filterTemplate.html());
    this.tagItemTemplate = options.tagItemTemplate;
    this.tagItems = options.tagItems;
    this.services = options.services;
    this.router = options.router;
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
  },

  /*
   * Build a filter from all inputs to the form.
   */
  buildFilter: function() {
    var allItems = this.get('router').get('feedItems');
    var selectedServices = this.get('services').where({selected: true});
    var filters = selectedServices.map(function(service) {
      return new hubbub.SourceFilter({
        name: service.get('name'),
        source: service.get('name')
      }); 
    });

    var searchText = $('#filterSearch input').val();
    if (searchText.trim().length > 0) {
      filters.push(new hubbub.ContainsTextFilter({
        name: 'ContainsText',
        test: searchText
      }));
    }
    
  },

  /**
   * Callback fired when the user tries to execute a filter.
   * Builds a filter from the form and executes it.
   */
  onExecute: function(event) {
    var filter = this.buildFilter();
  }
});