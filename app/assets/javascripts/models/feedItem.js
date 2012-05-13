/**
 * Model representing a single item in the Hubbub news feed.
 * Currently, this is just a stub, feel free to update it.
 * Fields:
 *   body: The body text (could be HTML).
 *   source: The website that the item came from.
 * Question: Should we use inheritance for the different sources?
 * Should we try to define a structure, or just throw everything into body?
 * Right now I'm throwing everything into body to keep it simple. We may
 * want to create a heirarchy later.
 */
hubbub.FeedItem = Backbone.Model.extend({
  updateRead: function(newread) {
    this.set({read: newread});
    this.save();
  },
  updateTags: function(newtagarr) {
    this.set({tags: newtagarr});
    this.save();
  },
});

hubbub.FacebookPost = hubbub.FeedItem.extend({
  initialize: function() {
    this.set("source", "facebook");
  },
});

hubbub.GmailMessage = hubbub.FeedItem.extend({
  initialize: function() {
    this.set("source", "gmail");
  },
});

hubbub.ImgurImage = hubbub.FeedItem.extend({
  initialize: function() {
    this.set("source", "imgur");
  },
});

hubbub.Tweet = hubbub.FeedItem.extend({
  initialize: function() {
    this.set("source", "twitter");
  },
});

/**
 * Collection of feed items
 */
hubbub.FeedItemCollection = Backbone.Collection.extend({
  
  url: "/items",
  
  model: function(attributes) {
    if(attributes.type == "facebook") return new hubbub.FacebookPost(attributes);
    if(attributes.type == "gmail") return new hubbub.GmailMessage(attributes);
    if(attributes.type == "imgur") return new hubbub.ImgurImage(attributes);
    if(attributes.type == "tweet") return new hubbub.Tweet(attributes);
    throw new Error("unrecognized feed item");
  },
});
