/**
 * Entry point for the application.
 */
$(function() {
  hubbub.templates.loadTemplates(['feed-item'], function() {
    var router = new hubbub.Router(); 
    Backbone.history.start();
  });
});
