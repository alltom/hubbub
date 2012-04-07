/*
 * We need to flip some settings to make jQueryMobile work with backbone.js
 * In particular, disable jQueryMobile's routing and use backbone's.
 *
 * See
 * http://coenraets.org/blog/2012/03/using-backbone-js-with-jquery-mobile/
 * for details
 */

// Modification: on has superseded bind and live
$(document).on('mobileinit', function() {
  $.mobile.ajaxEnabled = false;
  $.mobile.linkBindingEnabled = false;
  $.mobile.hashListeningEnabled = false;
  $.mobile.pushStateEnabled = false;
}

$(document).on('pagehide', 'div[data-role="page"]', function(event, ui) {
  $(event.currentTarget).remove();
}
