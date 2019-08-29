const modelUtils = require('./model-utils');

function loadPropertyUtilities(property,container) {
  // additional fields
  property.container = container;

  // hash utilities

  // support methods
  property.isProperty = isProperty;
}

function isProperty() {
  if(e['@type'] === modelUtils.PROPERTY) {
    return true;
  }
  else {
    return false;
  }
}

module.exports = loadPropertyUtilities;
