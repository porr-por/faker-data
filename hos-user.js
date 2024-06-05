import { fakerTH, faker } from "@faker-js/faker";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");

// Load and parse the JSON data
const rawData = fs.readFileSync('./organ.json');
const organizationData = JSON.parse(rawData);
const numberOfOrganizationData = organizationData.organization.length;
console.log(numberOfOrganizationData);
const empStartedNumberForTesting = 80000;

let gender = null;
let employeeIdCounter = 1; // Initialize the counter


// Generate an array of fake users
const users = Array.from({ length: numberOfOrganizationData }, (_, index) => {
  const sex = faker.helpers.arrayElement(["ชาย", "หญิง", "อื่นๆหรือไม่ระบุ"]);
  if(sex === "ชาย"){ gender = "male" }
  else if(sex === "หญิง"){ gender = "female" }
  else{ gender = "other"  }
  const firstName = fakerTH.person.firstName(gender);
  const lastName = fakerTH.person.lastName(gender);
  const empNo = empStartedNumberForTesting + (index+1);
  const email = `${empNo}@example.com`;

  return {
    employee_id: employeeIdCounter++, 
    employee_no: empNo, 
    firstname: firstName,
    lastname: lastName,
    birth_date: faker.date.birthdate({ min: 25, max: 60, mode: 'age' }).toISOString().split('T')[0],
    join_date: faker.date.past().toISOString().split('T')[0],
    email: email,
    sex: sex,
    phoneNumber: fakerTH.phone.number(),
    organization: organizationData.organization[index]
  };
});


console.log(users);

var obj = {
  users: users,
};
var json = JSON.stringify(obj);

fs.writeFile('user-data.json', json, function (err) {
  if (err) throw err;
  console.log('Saved!');
});