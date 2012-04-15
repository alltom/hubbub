java -jar compiler.jar \
  --js lib/underscore-min.js \
  --js lib/backbone-min.js \
  --js scripts/hubbub.js \
  --js scripts/models/feedItem.js \
  --js scripts/models/tagItem.js \
  --js scripts/models/service.js \
  --js scripts/stubs.js \
  --js scripts/views/feedView.js \
  --js scripts/views/tagView.js \
  --js scripts/views/filterView.js \
  --js scripts/views/tagPageView.js \
  --js scripts/router.js \
  --js scripts/main.js \
  --js_output_file hubbub_compiled.js