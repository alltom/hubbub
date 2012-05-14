/**
 * Entry point for the application.
 */
$(function() {

  // HACK: After authenticating ourselves to Facebook, Facebook calls us
  // back with a '#_=_' appended to the URL, because we left redirect_uri
  // blank in the initial request.
  // http://stackoverflow.com/questions/8100043/facebook-invalid-redirect-uri-but-the-url-looks-fine-to-me
  //
  // The library we're using for OAuth doesn't appear to have a way to set
  // redirect_uri, but if you can figure one out, that would be very nice.
  //
  // For now, we just remove it after the fact so the router doesn't get
  // confused.
  if (window.location.hash === '#_=_') {
    // we are coming here after a redirect from /auth/facebook/callback
    window.location.hash = '';
  }
  
  // the number of items to show per page
  hubbub.perPageLimit = 15;

  hubbub.router = new hubbub.Router();
  Backbone.history.start();
});
