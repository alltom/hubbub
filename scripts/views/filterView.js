/**
 * Uncheck a jQuery-enhanced checkbox.
 */
hubbub.uncheckBox = function(input) {
  input.attr('checked', false);
  var label = input.parent().find('label');
  label.attr('checked', false);
  label.removeClass('ui-btn-active').removeClass('ui-checkbox-on').
      addClass('ui-checkbox-off');
  label.find('span.ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
  label.find('span.ui-icon-checkbox-on').removeClass('ui-icon-checkbox-on');
};

/**
 * View class for a single saved filter
 */
hubbub.SavedFilterView = Backbone.View.extend({
  initialize: function(options) {
    this.template = _.template(options.savedFilterTemplate.html());
    this.model = options.model;
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
  }
});

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
    'vclick #executeFilter': 'onExecute',
    'vclick #resetFilter': 'onReset',
    'vclick #saveFilter': 'onSaveFilter'
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
    this.savedFilterTemplate = options.savedFilterTemplate;
    this.tagItemTemplate = options.tagItemTemplate;
    this.tagItems = options.tagItems;
    this.services = options.services;
    this.filters = options.filters;
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
      name: 'ToBeGiven',
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

    this.router.setFilter(filter);
    // tom: this next line was this.router.listFeedItems(); but that didn't update the URL
    this.router.navigate("#", true);
  },

  /**
   * Callback fired when the user hits reset.
   * Clears the form.
   */
  onReset: function(event) {
    event.preventDefault();

    this.services.each(function(service) {
      service.unselect();
    });
    var selectedServiceClass = this.selectedServiceClass;
    $('.serviceLogo').each(function(index) {
      $(this).removeClass(selectedServiceClass);
    });

    $('#filterSearch input').val('');

    this.listView.$el.find('input').each(function(index) {
      hubbub.uncheckBox($(this));
    });

    hubbub.uncheckBox($('#hasHyperlink'));

    $('#savedFilters').find('input').each(function(index) {
      hubbub.uncheckBox($(this));
    });
    
    // tom: apply immediately
    this.router.resetFilter();
    this.router.navigate("#", true);
  },

  /**
   * Callback fired when the user hits "Save Filter"
   * Right now, it does save them to a model class that the router
   * has a reference to, but saved filters are not in the HTML.
   */
  onSaveFilter: function(event) {
    event.preventDefault(); 
    var filter = this.buildFilter();
    this.router.saveFilter(filter);
  }
});

/**
 * View class for the Save Filter page, which prompts the user for a name.
 */
hubbub.SaveFilterView = Backbone.View.extend({

  events: {
    'vclick #doSaveFilter': 'onSaveFilter',
    'vclick #cancelSaveFilter': 'onCancelSaveFilter'
  },

  /**
   * Arguments in options:
   * template - the template for the save filter page
   * filter - the filter being saved
   * router - the router, with callbacks
   */
  initialize: function(options) {
    this.template = _.template(options.saveFilterTemplate.html());
    this.filter = options.filter;
    this.router = options.router;
  },

  /**
   * Render the save filter page
   */
  render: function() {
    $(this.el).html(this.template());
  },

  /**
   * Called whe the save filter button is clicked. Not fully implemeneted.
   */
  onSaveFilter: function(event) {
    event.preventDefault();
    var input = $('#filterToSave');
    var name = input.val().trim();
    if (name === '') {
      alert('Please input a name for the filter');
    }

    this.filter.set('name', name);
    this.router.addFilter(this.filter);

    this.router.filter();
  },

  /**
   * Called when the user cancels the save. Returns to the filter page.
   */
  onCancelSaveFilter: function(event) {
    this.router.filter();
  }
});