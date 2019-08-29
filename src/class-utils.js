const modelUtils = require('./model-utils');

function loadClassUtilities(_class,containerModel) {
  // additional fields
  _class.model = containerModel;

  // hash utilities
  _class.generalizations = undefined;
  _class.specializations = undefined;
  _class.parents = undefined;
  _class.children = undefined;
  _class.ancestors = undefined;
  _class.descendents = undefined;

  // support methods
  _class.isClass = isClass;
  _class.getGeneralizations = getGeneralizations;
  _class.getSpecializations = getSpecializations;
  _class.getParents = getParents;
  _class.getChildren = getChildren;
  _class.getAncestors = getAncestors;
  _class.getDescendents = getDescendents;
}

function isClass() {
  if(e['@type'] === modelUtils.CLASS) {
    return true;
  }
  else {
    return false;
  }
}

function getGeneralizations() {
  if(this.generalizations === undefined) {
    this.generalizations = [];
    Object.values(this.model.generalizationLinks).forEach(gen => {
      if (gen.getSpecific() === this) {
        this.generalizations.push(gen);
      }
    });
  }

  return this.generalizations;
}

function getSpecializations() {
  if(this.specializations === undefined) {
    this.specializations = [];
    Object.values(this.model.generalizationLinks).forEach(gen => {
      if (gen.getGeneral() === this) {
        this.specializations.push(gen);
      }
    });
  }

  return this.specializations;
}

function getParents() {
  if(this.parents === undefined) {
    this.parents = [];
    this.getGeneralizations().forEach(
      gen => this.parents.push(gen.getGeneral())
    );
  }

  return this.parents;
}

function getChildren() {
  if(this.children === undefined) {
    this.children = [];
    this.getSpecializations().forEach(
      gen => this.children.push(gen.getSpecific())
    );
  }

  return this.children;
}

function getAncestors(visitedClasses) {
  if(this.ancestors !== undefined) { return this.ancestors; }

  if(!Array.isArray(visitedClasses)) { visitedClasses = [] }

  this.getParents().forEach(parent => {
    if(visitedClasses.indexOf(parent) === -1) {
      visitedClasses.push(parent)
      visitedClasses.push(...(parent.getAncestors(visitedClasses)));
    }
  });

  this.ancestors = [ ...visitedClasses ];

  return this.ancestors;
}

function getDescendents(visitedClasses) {
  if(this.descendents !== undefined) { return this.descendents; }

  if(!Array.isArray(visitedClasses)) { visitedClasses = [] }

  this.getChildren().forEach(child => {
    if(visitedClasses.indexOf(child) === -1) {
      visitedClasses.push(child)
      visitedClasses.push(...(child.getDescendents(visitedClasses)));
    }
  });

  this.descendents = [ ...visitedClasses ];

  return this.descendents;
}


module.exports = loadClassUtilities;
