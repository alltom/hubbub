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

  addSourceFilters: function(filters) {
    var selectedServices = this.services.where({selected: true});
    var servicesFilters = [];
    _(selectedServices).each(function(service) {
      servicesFilters.push(new hubbub.SourceFilter({
        name: service.get('name'),
        source: service.get('name')
      }));
    });
    if (servicesFilters.length > 0) {
      var collection = new hubbub.FilterCollection(servicesFilters);
      filters.push(new hubbub.OrFilter({
        name: 'ServiceOrFilter',
        filters: collection
      }));
    }
  },

  addSearchFilter: function(filters) {
    var searchText = $('#filterSearch input').val();
    if (searchText.trim().length > 0) {
      filters.push(new hubbub.ContainsTextFilter({
        name: 'ContainsText',
        test: searchText
      }));
    }
  },

  addTagFilters: function(filters) {
    var tags = this.listView.$el.find('input');
    var checkedTags = $(tags).filter(function(index) {
      return $(this).attr('checked') === 'checked';
    });
    var tagFilters = [];
    $(checkedTags).each(function(index) {
      var name = $(this).attr('name');
      tagFilters.push(new hubbub.HasTagFilter({
        name: 'HasTag' + name,
        tag: name
      }));
    });

    if (tagFilters.length > 0) {
      var collection = new hubbub.FilterCollection(tagFilters);
      filters.push(new hubbub.OrFilter({
        name: 'TagOrFilter',
        filters: collection
      }));
    }
  },

  addHyperlinkFilter: function(filters) {
    if ($('#hasHyperlink').attr('checked') === 'checked') {
      filters.push(new hubbub.HasHyperlinkFilter({
        name: 'HasHyperlink'
      }));
    }
  },

  addSelectedFilters: function(filters) {
    $('#savedFilters').find('input').each(function(index) {
      if ($(this).attr('checked') === 'checked') {
        // TODO Implement adding of saved filters 
      }
    });
  },

  /*
   * Build a filter from all inputs to the form.
   */
  buildFilter: function() {
    var filters = [];
    this.addSourceFilters(filters);
    this.addSearchFilter(filters);
    this.addTagFilters(filters);
    this.addHyperlinkFilter(filters);
    this.addSelectedFilters(filters);

    if (filters.length === 0) {
      filters.push(new hubbub.AllPassFilter({
        name: 'AllPassFilter'
      }));
    }

    return new hubbub.AndFilter({
      filters: new hubbub.FilterCollection(filters)
    });
  },

  /**
   * Callback fired when the user tries to execute a filter.
   * Builds a filter from the form and executes it.
   */
  onExecute: function(event) {
    event.preventDefault();
    var allItems = this.router.feedItems;
    var filter = this.buildFilter();

    this.router.currentFilter = filter;
    this.router.listFeedItems();
  }
});