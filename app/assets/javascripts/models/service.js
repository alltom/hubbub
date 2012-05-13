/**
 * Model class representing services listed on the Filter page.
 * Keeps track of whether it is selected in a given filter being constructed.
 */
hubbub.Service = Backbone.Model.extend({

  initialize: function (options) {
  	this.name = options.name; // Imgur, Facebook, Gmail, Twitter, ...
    this.selected = options.selected || false;
  },

  select: function() {
  	this.set('selected', true);
  },

  unselect: function() {
  	this.set('selected', false);
  }
});

hubbub.ServiceCollection = Backbone.Collection.extend({
  model: hubbub.Service	
});
