
hubbub.ServiceConnectView = Backbone.View.extend({
  /*
   */
  initialize: function(options) {
    this.template = _.template(hubbub.templates.connectionsTemplate);
  },
  
  /*
   */
  render: function(eventName) {
    $(this.el).html(this.template());
    return this;
  },
});
