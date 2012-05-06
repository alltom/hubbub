/**
 * Make some fake feed items for testing, before we write code to pull real
 * ones from the Web
 */
hubbub.stubFeedItems = function() {
  return new hubbub.FeedItemCollection([]);
};

hubbub.stubTagItems = function() {
  return new hubbub.TagItemCollection([
    new hubbub.TagItem({
      tagname: 'Important'
    }),
    new hubbub.TagItem({
      tagname: 'Fun'
    }),
    new hubbub.TagItem({
      tagname: 'codeStuff'
    }),
    new hubbub.TagItem({
      tagname: 'sillyPics'
    })
  ]);
};

hubbub.stubServices = function() {
  return new hubbub.ServiceCollection([
    new hubbub.Service({
      name: 'Twitter'
    }),
    new hubbub.Service({
      name: 'Facebook'
    }),
    new hubbub.Service({
      name: 'Imgur'
    }),
    new hubbub.Service({
      name: 'Gmail'
    })
  ]);
};
