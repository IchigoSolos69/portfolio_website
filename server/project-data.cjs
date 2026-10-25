// Static JSON requires work in Node and are inlined by the Pages Functions bundler.
module.exports = {
  repositories: require('../data/repositories.json'),
  snapshot: require('../data/project-activity.json'),
};
