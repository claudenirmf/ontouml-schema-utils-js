const packageUtils = require('./package-utils');
const classUtils = require('./class-utils');
const generalizationLinkUtils = require('./generalization-link-utils');
const generalizationSetUtils = require('./generalization-set-utils');
// const propertyUtils = require('./property-utils');

function loadModelUtilities(model) {
  model.MODEL = "Model";
  model.PACKAGE = "Package";
  model.CLASS = "Class";
  model.GENERALIZATION_LINK = "GeneralizationLink";
  model.GENERALIZATION_SET = "GeneralizationSet";
  model.PROPERTY = "Property",

  model.packages = {};
  model.classes = {};
  model.generalizationLinks = {};
  model.generalizationSets = {};
  model.properties = {};

  model.unknownUri = []

  model.getAllStructuralElements = getAllStructuralElements;
  model.resolveModel = resolveModel;
  model.replacegeneralizationLinksReferences = replacegeneralizationLinksReferences;
  model.replaceGeneralizationSetsReferences = replaceGeneralizationSetsReferences;

  model.resolveModel();
}

function getAllStructuralElements(package) {
  var current = package !== undefined ? package : this;
  var elements = current.structuralElements ? current.structuralElements : [];

  if(current.structuralElements) {
    current.structuralElements.forEach((e) => {
      if(e['@type'] === this.PACKAGE) {
        elements = [...elements, ...this.getAllStructuralElements(e)]
      }
    })
  }

  return elements
}

function resolveModel() {
  this.getAllStructuralElements().forEach((e) => {
    switch (e["@type"]) {
      case this.PACKAGE:
        packageUtils(e,this);
        this.packages[e.uri] = e;
        break;
      case this.CLASS:
        classUtils(e,this);
        this.classes[e.uri] = e;
        break;
      case this.GENERALIZATION_LINK:
        generalizationLinkUtils(e,this);
        this.generalizationLinks[e.uri] = e;
        break;
      case this.GENERALIZATION_SET:
        generalizationSetUtils(e,this);
        this.generalizationSets[e.uri] = e;
        break;
      // case this.PROPERTY:
      //   propertyUtils.loadPropertyUtilities(e);
      //   this.properties[e.uri] = e;
      //   break;
      default:
        throw {
          message: `ERROR: 'resolveModel' method found a no match object: ${e}`,
          source: e
        };
    }
  })

  Object.values(this.generalizationLinks).forEach(gen => {
    this.replacegeneralizationLinksReferences(gen)
  });

  Object.values(this.generalizationSets).forEach(genset => {
    this.replaceGeneralizationSetsReferences(genset)
  });
}

function replacegeneralizationLinksReferences(generalizationLink) {
  const generalUri = generalizationLink.tuple[0];
  const general = this.classes[generalUri]; // TODO: include relation types
  const specificUri = generalizationLink.tuple[1];
  const specific = this.classes[specificUri];

  if (general) {
    generalizationLink.tuple[0] = general;
  } else {
    this.unknownUri.push(generalUri);
  }

  if (specific) {
    generalizationLink.tuple[1] = specific;
  } else {
    this.unknownUri.push(specificUri);
  }
}

function replaceGeneralizationSetsReferences(generalizationSet) {
  generalizationSet.tuple.forEach((generalizationLinkUri,i) => {
    let generalizationLink = this.generalizationLinks[generalizationLinkUri];

    if (generalizationLink) {
      generalizationSet.tuple[i] = generalizationLink;
    } else {
      this.unknownUri = generalizationLinkUri;
    }
  });
}

module.exports = {
  MODEL: "Model",
  PACKAGE: "Package",
  CLASS: "Class",
  GENERALIZATION_LINK: "GeneralizationLink",
  GENERALIZATION_SET: "GeneralizationSet",
  PROPERTY: "Property",

  loadModelUtilities: loadModelUtilities
}
