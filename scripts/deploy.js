ghpages = require('gh-pages');

ghpages.publish('build', (err) => {
  if (err)
    console.error(err);

  console.log('Your gh-pages branch successfully updated!');
})