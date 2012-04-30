/**
 * View class for the whole feed page. Uses the template feedPageTemplate.
 */
hubbub.TagPageView = Backbone.View.extend({

  events: {
     'click #hubbub-tag-ok-button': 'updateTags',
     'click #hubbub-new-tag-submit': 'addTag',
     'click #hubbub-tag-cancel-button': 'cancelTagging'
   },
  /**
   * Views take constructor parameters as named arguments inside the options
   * dictionary.
   * This view expects two additional parameters:
   * pageTemplate - a template for the feed page
   * feedItemTemplate - a template for a single feed item.
   * router - the router (used to go back after the user is done with tagging)
   */
  initialize: function(options) {
    this.tagItemTemplate = options.tagItemTemplate;
    this.template = _.template(options.pageTemplate.html());
    this.feedItem = options.feedItem;
    this.feedItemIndex = options.feedItemIndex;
    this.router = options.router;
  },

  /*
   * Renders a header div, and a content div which is handled by FeedListView.
   */
  render: function(eventName) {
    $(this.el).html(this.template());
    this.listView = new hubbub.TagListView({
      el: $('#tagList', this.el),
      model: this.model,
      tagItemTemplate: this.tagItemTemplate,
      feedItem: this.feedItem
    });
    this.listView.render();
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
        if($(this).attr("checked")) {
          tags.push($(this).attr("name"));
        }
      });
    this.feedItem.set("tags",tags);
    this.router.navigate('#', {trigger: true});
  },
  
  addTag: function(){
    var newtagname = $('input#hubbub-new-tag-text').val();
    //console.log("adding new tag: "+newtagname);
    if(newtagname !== "") {
      if(this.model.filter(function(tagitem) {return tagitem.get("tagname") === newtagname;}).length == 0) {
        var newTagItem = new hubbub.TagItem({tagname: newtagname});
        this.model.add(newTagItem);
        this.listView.addTag(newTagItem);
        $('input#hubbub-new-tag-text').val("");
      } else {
        alert('Tag name "'+newtagname+'" already exists.');
      }
    }
    return false;
  },

  cancelTagging: function() {
    this.router.navigate('#', {trigger: true});
  }
});

/**
 * View class for a list of tag items.
 */
hubbub.TagListView = Backbone.View.extend({
  /**
   * Additional parameters in options:
   * tagItemTemplate - a template for tag items
   */
  initialize: function(options) {
    this.tagItemTemplate = options.tagItemTemplate;
    this.model.bind('reset', this.render, this);
    this.feedItem = options.feedItem;
  },
  
  renderNoFeedItem: function() {
    $(this.el).empty();
    this.model.each(function(tagItem) {
      var item = new hubbub.TagItemView({
        model: tagItem,
        tagItemTemplate: this.tagItemTemplate
      }).render().el;
      $(this.el).append(item);
    }, this);
    return this;
  },

  /*
   * Creates a tagItemView for each item in the model, and has it
   * render that item.
   */
  render: function(eventName) {
    if(!this.feedItem) {
      return this.renderNoFeedItem();
    }
    var tags = [];
    if(this.feedItem.has("tags")){
      tags= this.feedItem.get("tags");
    }
    $(this.el).empty();
    this.model.each(function(tagItem) {
      var item = new hubbub.TagItemView({
        model: tagItem,
        tagItemTemplate: this.tagItemTemplate
      }).render().el;
      for(var i = 0; i < tags.length; i++){
        $('.hubbub-user-defined-tag',item)
        .filter(function(index){
          return $(this).attr("name") === tags[i];
        }).prop("checked",true);
      }
      $(this.el).append(item);
    }, this);
    //$('#tagList').listview('refresh');
    return this;
  },
  
  addTag: function(newTagItem){
    var newTagItemView = new hubbub.TagItemView({
        model: newTagItem,
        tagItemTemplate: this.tagItemTemplate
    }).render().el;
    $(this.el).append(newTagItemView).trigger('create');
  }
});

/**
 * View class for a single tag item.
 */
hubbub.TagItemView = Backbone.View.extend({

  tagName: 'div',
  className: 'tagItem',

  /**
   * Additional parameters in options:
   * tagItemTemplate - the template to use.
   */
  initialize: function(options) {
    this.template = _.template(options.tagItemTemplate.html());
  },
  
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    $('.hubbub-user-defined-tag',this.el).attr('name',this.model.get("tagname"));
    return this;
  }
})
