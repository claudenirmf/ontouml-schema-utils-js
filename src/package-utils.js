// const modelUtils = require('./model-utils');

function loadPackageUtilities(package,containerModel) {
  // additional fields
  package.model = containerModel;

  // hash utilities

  // support methods
  package.isPackage = isPackage;
  package.getAllStructuralElements = getAllStructuralElements;
  package.getType = getType;
}

function getAllStructuralElements() {
  var elements = this.structuralElements;

  this.structuralElements.forEach((e) => {
    if(e.isPackage()) {
      elements = [ ...elements, ...e.getAllStructuralElements(e) ];
    }
  })

  return elements;
}

function isPackage() {
  if(e['@type'] === this.model.PACKAGE) {
    return true;
  }
  else {
    return false;
  }
}

function getType() {
  return this["@type"];
}

module.exports = loadPackageUtilities;
