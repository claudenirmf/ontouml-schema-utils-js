const validator = require('ontouml-schema');
const fs = require('fs');

let object = JSON.parse(fs.readFileSync("examples/m1.example.json", 'utf8'));
var asd = validator.getValidator()
let isValid = asd({});

if(isValid)
  console.log("Model M1 is VALID!");
else {
  console.log("Model M1 is INVALID!");
  console.log(asd.errors);
}

object = { ...object, ...require('./../src/models-utils') };
object.resolveModel();
//console.log(object);

Object.values(object.generalizations).forEach(gen => {
  console.log('---------------------------');
  console.log(`Generalization ${gen.uri} has superclass ${gen.tuple[0].uri} and subclass ${gen.tuple[1].uri}`);
})

Object.values(object.generalizationSets).forEach(gs => {
  console.log('---------------------------');
  console.log(`Generalization Set ${gs.uri} includes:`);
  gs.tuple.forEach(gen => console.log(` - Generalization ${gen.uri}.`) )
})
