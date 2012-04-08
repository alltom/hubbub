/**
 * Entry point for the application.
 */
$(function() {
  hubbub.templates.loadTemplates([], function() {
    var router = new hubbub.Router(); 
    Backbone.history.start();
  });
});
