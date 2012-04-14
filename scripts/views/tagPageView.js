/**
 * View class for the whole feed page. Uses the template feedPageTemplate.
 */
hubbub.TagPageView = Backbone.View.extend({

  events: {
     'click #hubbub-tag-ok-button': 'updateTags',
	 //'submit #hubbub-tag-form': 'printInfo'
	 'click #hubbub-new-tag-submit': 'addTag'
   },
  /**
   * Views take constructor parameters as named arguments inside the options
   * dictionary.
   * This view expects two additional parameters:
   * pageTemplate - a template for the feed page
   * feedItemTemplate - a template for a single feed item.
   */
  initialize: function(options) {
    this.tagItemTemplate = options.tagItemTemplate;
    this.template = _.template(options.pageTemplate.html());
	this.feedItem = options.feedItem;
	this.feedItemIndex = options.feedItemIndex;
  },

  /*
   * Renders a header div, and a content div which is handled by FeedListView.
   */
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    this.listView = new hubbub.TagListView({
      el: $('#tagList', this.el),
      model: this.model,
      tagItemTemplate: this.tagItemTemplate,
	  feedItem: this.feedItem
    });
    this.listView.render();
	this.listViewRendered = true;
    return this;
  },

  /*
  this is the event handler that updates the tags for a feed item
  when the user hits the "ok" button on the tag page
  */
  updateTags: function() {
    var tags = [];
	$('.hubbub-user-defined-tag',this.el)
	  .each(function() {
	    //console.log("got here in updateTags");
		if($(this).attr("checked")) {
		  //console.log("found a checked tag in updateTags");
	      tags.push($(this).attr("name"));
		}
	  });
	this.feedItem.set("tags",tags);
  },
  
  addTag: function(){
    var newtagname = $('input#hubbub-new-tag-text').val();
	console.log("adding new tag: "+newtagname);
	var newTagItem = new hubbub.TagItem({tagname: newtagname});
	this.model.add(newTagItem);
	if(this.listViewRendered) {
	  var newTagItemView = new hubbub.TagItemView({
        model: newTagItem,
        tagItemTemplate: this.tagItemTemplate
      })
	  $(this.listView.el).append(newTagItemView.render().el);
	}
	return false;
  }
});

/**
 * View class for a list of feed items.
 */
hubbub.TagListView = Backbone.View.extend({
  /**
   * Additional parameters in options:
   * feedItemTemplate - a template for feed items
   */
  initialize: function(options) {
    this.tagItemTemplate = options.tagItemTemplate;
    this.model.bind('reset', this.render, this);
	//this.model.bind('add',this.render,this);
	this.feedItem = options.feedItem;
  },

  /*
   * Creates a FeedItemView for each item in the model, and has it
   * render that item.
   */
  render: function(eventName) {
    var tags = [];
	if(this.feedItem.has("tags")){
	  tags= this.feedItem.get("tags");
	}
    $(this.el).empty();
    this.model.each(function(tagItem) {
      var item = new hubbub.TagItemView({
        model: tagItem,
        tagItemTemplate: this.tagItemTemplate
      }).render().el
	  for(var i = 0; i < tags.length; i++){
		$('.hubbub-user-defined-tag',item)
		.filter(function(index){
		  return $(this).attr("name") === tags[i];
		}).prop("checked",true);
	  }
      $(this.el).append(item)
    }, this);
    $('#tagList').listview('refresh');
    return this;
  }
});

/**
 * View class for a single feed item.
 */
hubbub.TagItemView = Backbone.View.extend({

  tagName: 'label',
  className: 'tagItem',

  /**
   * Additional parameters in options:
   * feedItemTemplate - the template to use.
   */
  initialize: function(options) {
    this.template = _.template(options.tagItemTemplate.html());
  },

  /*
  this render function updates the tag button's link to pass the index for
  this particular feed item in the feed list
  */
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
	$('.hubbub-user-defined-tag',this.el).attr('name',this.model.get("tagname"));
    return this;
  }
})