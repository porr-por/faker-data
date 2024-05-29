import {faker, fakerTH} from "@faker-js/faker";
import { createRequire } from "module";
const require = createRequire(import.meta.url);


//pattern employee no > wlb-xxxx , auto-increment
const generateIncrementalId = (prefix, start, count, padding) => {
    const ids = [];
 
    for (let init = 0; init < count; i++) {
       const number = (start + i).toString().padStart(padding, '0');
       ids.push(`${prefix}${number}`);
    }
    return ids;
 };
 
 const generateEmployeeData = (organizationName, numEmployees) => {
    const employeeIds = generateIncrementalId('wlb-', 1, numEmployees, 4);
    const employees = [];
 
    for (let i = 0; i < numEmployees; i++) {
       const employee = {
          id: employeeIds[i],
        //   name: faker.name.findName(),
        //   email: faker.internet.email(),
        //   phone: faker.phone.phoneNumber(),
        //   department: faker.commerce.department(),
        //   jobTitle: faker.name.jobTitle(),
        //   address: {
        //      street: faker.address.streetAddress(),
        //      city: faker.address.city(),
        //      state: faker.address.state(),
        //      zipCode: faker.address.zipCode(),
        //      country: faker.address.country()
        //   },
          organization: organizationName
       };
 
       employees.push(employee);
    }
 
    return employees;
 };
 
 // Usage example
 const organizationName = "Tech Innovators Inc.";
 const numEmployees = 10; // Number of employees to generate
 const employeeData = generateEmployeeData(organizationName, numEmployees);
 
 console.log(employeeData);
 console.log("//==============================");



// //==============================
// const hierarchyLevels = [
//     { level: 'Executive', count: 1 },
//     { level: 'Manager', count: 3 },
//     { level: 'Staff', count: 10 }
//  ];
 
//  const roles = {
//     'Executive': ['CEO', 'CTO', 'CFO'],
//     'Manager': ['Engineering Manager', 'Marketing Manager', 'Sales Manager'],
//     'Staff': ['Software Engineer', 'Marketing Specialist', 'Sales Representative']
//  };
 
//  const generateEmployee = (level, role) => ({
//     // id: faker.datatype.uuid(),
//     // name: faker.name.findName(),
//     // email: faker.internet.email(),
//     // phone: faker.phone.phoneNumber(),
//     role: role,
//     level: level,
//     subordinates: []
//  });
 
//  const generateHierarchicalData = (organizationName) => {
//     const employees = [];
//     let managers = [];
 
//     hierarchyLevels.forEach((hierarchy) => {
//        const { level, count } = hierarchy;
//        const rolesForLevel = roles[level];
 
//        for (let i = 0; i < count; i++) {
//           const role = faker.helpers.arrayElement(rolesForLevel);
//           const employee = generateEmployee(level, role);
 
//           if (level !== 'Staff') {
//              managers.push(employee);
//           } else {
//              const randomManager = faker.helpers.arrayElement(managers);
//              randomManager.subordinates.push(employee);
//           }
 
//           employees.push(employee);
//        }
//     });
 
//     return {
//        organization: organizationName,
//        employees: employees
//     };
//  };
 
//  // Usage example
//  const organizationName2 = "Tech Innovators Inc.";
//  const hierarchicalData = generateHierarchicalData(organizationName2);
 
//  console.log(JSON.stringify(hierarchicalData, null, 2));