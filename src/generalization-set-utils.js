const modelUtils = require('./model-utils');

function loadGeneralizationSetUtilities(generalizationSet,containerModel) {
  // additional fields
  generalizationSet.model = containerModel;

  // hash utilities

  // support methods
  generalizationSet.isGeneralizationSet = isGeneralizationSet;
}

function isGeneralizationSet() {
  if(e['@type'] === modelUtils.GENERALIZATION_SET) {
    return true;
  }
  else {
    return false;
  }
}

module.exports = loadGeneralizationSetUtilities;
