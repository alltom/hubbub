/**
 * View class for the whole tag page.
 */
hubbub.TagView = Backbone.View.extend({
  /**
   * Additional parameters in options:
   * tagTemplate - a template for tag pages.
   */
   events: {
     'click .hubbub-tag-ok-button': 'updateTags'
   },
   
  initialize: function(options) {
    this.template = _.template(options.tagTemplate.html());
  },

  /*
  This function creates the tag view, and makes sure any previously selected
  tags are populated as checked
  */
  render: function(eventName) {
    $(this.el).html(this.template());
	if(this.model.has("tags")){
	  var tags= this.model.get("tags");
	  for(var i = 0; i < tags.length; i++){
	    var tag = tags[i];
	    $('.hubbub-user-defined-tag',this.el)
			.filter(function(index) {
			  return $(this).attr("name") === tag})
			.prop("checked",true);
	  }
	}
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
	this.model.set("tags",tags);
  }
});
