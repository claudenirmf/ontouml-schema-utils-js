//
// const validator = require('validator')
//
// console.log(validator);
// console.log(validator.getSchema());

const ontoumlSchema = require('ontouml-schema');

const MODEL = "Model";
const PACKAGE = "Package";
const CLASS = "Class";
const GENERALIZATION = "GeneralizationLink";
const GENERALIZATION_SET = "GeneralizationSet";
const PROPERTY = "Property";

console.log(ontoumlSchema.getSchema());

module.exports = {

  /**
  * Receives a valid model object under OntoUML Schema and resolves all URIs into references.
  *
  * @param {object} Model object under OntoUML Schema
  * @returns {object} Resolved model object
  */
  resolveModel : function(model) {
    model.packages = {};
    model.classes = {};
    model.generalizations = {};
    model.generalizationSets = {};
    model.properties = {};

    model.structuralElements.flat(Infinity).forEach((e) => {
      switch (e["@type"]) {
        case PACKAGE:
          model.packages[e.uri] = e;
          break;
        case CLASS:
          model.classes[e.uri] = e;
          break;
        case GENERALIZATION:
          model.generalizations[e.uri] = e;
          break;
        case GENERALIZATION_SET:
          model.generalizationSets[e.uri] = e;
          break;
        case PROPERTY:
          model.properties[e.uri] = e;
          break;
        default:
      }
    })
  }


}
