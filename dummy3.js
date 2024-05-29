import {faker, fakerTH} from "@faker-js/faker";
import { count } from "console";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require('./sitest.json');

function extractAgencies(data) {
   let agencies = [];
 
   function traverse(node) {
     if (node.agency) {
      node.agency.forEach(agency => agencies.push(agency.name));
     }
     if (node.workgroup) {
       node.workgroup.forEach(traverse);
     }
     if (node.division) {
       node.division.forEach(traverse);
     }
     if (node.departments) {
       node.departments.forEach(traverse);
     }
   }
 
   traverse(data.field);
   return agencies;
 }
 
 const agencies = extractAgencies(data);
 console.log(agencies);