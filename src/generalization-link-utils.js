// const modelUtils = require('./model-utils');

function loadGeneralizationLinkUtilities(generalizationLink,containerModel) {
  // additional fields
  generalizationLink.model = containerModel;

  // hash utilities
  generalizationLink.generalizationSets = undefined;

  // support methods
  generalizationLink.isGeneralizationLink = isGeneralizationLink;
  generalizationLink.getGeneral = getGeneral;
  generalizationLink.setGeneral = setGeneral;
  generalizationLink.getSpecific = getSpecific;
  generalizationLink.setSpecific = setSpecific;
  generalizationLink.getGeneralizationSets = getGeneralizationSets;
  generalizationLink.getType = getType;
}

function isGeneralizationLink() {
  if(e['@type'] === this.model.GENERALIZATION_LINK) {
    return true;
  }
  else {
    return false;
  }
}

function getGeneral() {
  return this.tuple[0];
}

function setGeneral(general) {
  this.tuple[0] = general;
}

function getSpecific() {
  return this.tuple[1];
}

function setSpecific(specific) {
  this.tuple[1] = specific;
}

function getGeneralizationSets() {
  if(this.generalizationSets===undefined) {
    this.generalizationSets = [];
    Object.values(this.model.generalizationSets).forEach(genset => {
      if(genset.tuple.indexOf(this)!==-1) {
        this.generalizationSets.push(genset);
      }
    });
  }

  return this.generalizationSets;
}

function getType() {
  return this["@type"];
}

module.exports = loadGeneralizationLinkUtilities;
