import {faker, fakerTH} from "@faker-js/faker";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const schema = require('./schema.json');
const RandExp = require('randexp');
const thaiId = require('thaiid');
//const fakerTH = require('@faker-js/faker/locale/th');
//import {schema} from "./schema.json";
/*nst faker = require('faker');
const schema = require('./schema.json');
const RandExp = require('randexp');
const thaiId = require('thaiid')
*/

var fakeGender = null;
var fakeName = null;
var fakeLastname = null;
var fakeNameTh = null;
var fakeLastnameTh = null;
var fakeNumber = null;
//thaiId: thaiId.random()



function generateDataFromSchema(schema) {
    const data = {};
  
    for (const property in schema.properties) 
    {
      if (schema.properties.hasOwnProperty(property)) {
        const propertySchema = schema.properties[property];
        switch (propertySchema.type) 
        {
            case 'string':
                if (propertySchema.format === 'email') 
                {
                    data[property] = faker.internet.email();
                }
                else if(propertySchema.pattern != null)
                {
                    data[property] = new RandExp(propertySchema.pattern).gen();
                }
                else if(propertySchema.enum != null)
                {
                    fakeGender = faker.helpers.arrayElement(propertySchema.enum);
                    data[property] = fakeGender;
                }
                else if(propertySchema.locale != null && (propertySchema.locale == 'th' || propertySchema.locale == 'TH'))
                {
                    data[property] = fakerTH.person.lastName(fakeGender) + " " + fakerTH.person.firstName(fakeGender);
                }
                else if(propertySchema.locale != null)
                {
                    data[property] = faker.person.firstName(fakeGender) + " " + faker.person.lastName(fakeGender);
                }
                else
                {
                    //data[property] = faker.lorem.words();
                    
                }
            break;
            case 'integer':
                if((propertySchema.min != null) || (propertySchema.max != null))
                {
                    data[property] = faker.datatype.number({ min: propertySchema.min, max: propertySchema.max });
                }
                else
                {
                    fakeNumber = faker.datatype.number();
                    console.log(fakeNumber);
                    data[property] = fakeNumber;
                }
            break;
            case 'object':
                data[property] = generateDataFromSchema(propertySchema);
            break;
          // Handle other data types as needed
        }
      }
    }
    return data;
}


const createFakeData = (schema, count) => {
    const fakeDataArray = [];
    for (var counter = 0; counter < count; counter++) {
        fakeDataArray.push(generateDataFromSchema(schema));
    }
    return fakeDataArray;
};


const randomData = createFakeData(schema, 10);
console.log(randomData);





