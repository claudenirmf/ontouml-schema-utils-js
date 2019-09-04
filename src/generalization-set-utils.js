// const modelUtils = require('./model-utils');

function loadGeneralizationSetUtilities(generalizationSet,containerModel) {
  // additional fields
  generalizationSet.model = containerModel;

  // hash utilities

  // support methods
  generalizationSet.isGeneralizationSet = isGeneralizationSet;
  generalizationSet.getGeneralizations = getGeneralizations;
  generalizationSet.getType = getType;
}

function isGeneralizationSet() {
  if(e['@type'] === this.model.GENERALIZATION_SET) {
    return true;
  }
  else {
    return false;
  }
}

function getGeneralizations() {
  return [ ...this.tuple ];
}

function getType() {
  return this["@type"];
}

module.exports = loadGeneralizationSetUtilities;
