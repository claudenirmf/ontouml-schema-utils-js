const modelUtils = require('./model-utils');

function loadPackageUtilities(package,containerModel) {
  // additional fields
  package.model = containerModel;

  // hash utilities

  // support methods
  package.isPackage = isPackage;
  package.getAllStructuralElements = getAllStructuralElements;
}

function getAllStructuralElements() {
  var elements = this.structuralElements;

  this.structuralElements.forEach((e) => {
    if(e.isPackage()) {
      elements.push(...(e.getAllStructuralElements(e)));
    }
  })

  return elements;
}

function isPackage() {
  if(e['@type'] === modelUtils.PACKAGE) {
    return true;
  }
  else {
    return false;
  }
}

module.exports = loadPackageUtilities;
