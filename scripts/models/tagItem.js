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
hubbub.TagItem = Backbone.Model.extend({

  urlRoot: '../tag-items',

});

/**
 * Collection of feed items
 */
hubbub.TagItemCollection = Backbone.Collection.extend({

  model: hubbub.TagItem

});
