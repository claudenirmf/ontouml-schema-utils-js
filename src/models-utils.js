

module.exports = {

  MODEL: "Model",
  PACKAGE: "Package",
  CLASS: "Class",
  GENERALIZATION: "GeneralizationLink",
  GENERALIZATION_SET: "GeneralizationSet",
  PROPERTY: "Property",

  packages: {},
  classes: {},
  generalizations: {},
  generalizationSets: {},
  properties: {},

  getStructuralElements: function(package) {
    var current = package !== undefined ? package : this;
    var elements = current.structuralElements;

    current.structuralElements.forEach((e) => {
      if(e['@type'] === this.PACKAGE) {
        elements = [...elements, ...this.getStructuralElements(e)]
      }
    })

    return elements
  },

  resolveModel: function() {
    this.getStructuralElements().forEach((e) => {
      switch (e["@type"]) {
        case this.PACKAGE:
          this.packages[e.uri] = e;
          break;
        case this.CLASS:
          this.classes[e.uri] = e;
          break;
        case this.GENERALIZATION:
          this.generalizations[e.uri] = e;
          break;
        case this.GENERALIZATION_SET:
          this.generalizationSets[e.uri] = e;
          break;
        case this.PROPERTY:
          this.properties[e.uri] = e;
          break;
        default:
          console.log(`ERROR: 'resolveModel' method found a no match object: ${e}`);
      }
    })

    Object.values(this.generalizations).forEach(g => {
      g.tuple[0] = this.classes[g.tuple[0]];
      g.tuple[1] = this.classes[g.tuple[1]];
    });
    
    Object.values(this.generalizationSets).forEach(gs => {
      gs.tuple.forEach((uri,i) => {
        gs.tuple[i] = this.generalizations[uri]
      })
    });
  }


}
