
hubbub.ServiceConnectView = Backbone.View.extend({
  events: {
    'click #connectionsBack': 'onBack'
  },

  /*
   */
  initialize: function(options) {
    this.template = _.template(hubbub.templates.connectionsTemplate);
    this.router = options.router;
  },
  
  /*
   */
  render: function(eventName) {
    $(this.el).html(this.template());
    return this;
  },

  onBack: function(event) {
    this.router.navigate('#', {trigger: true});
  }
});
