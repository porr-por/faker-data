import {faker, fakerTH} from "@faker-js/faker";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const hierarchyLevels = [
   { level: 'Executive', count: 1 },
   { level: 'Manager', count: 3 },
   { level: 'Staff', count: 7 }
];

const roles = {
   'Executive': ['CEO', 'CTO', 'CFO'],
   'Manager': ['Engineering Manager', 'Marketing Manager', 'Sales Manager'],
   'Staff': ['Software Engineer', 'Marketing Specialist', 'Sales Representative']
};

const generateEmployee = (level, role) => ({
   id: faker.string.uuid(),
   name: faker.person.fullName(),
   email: faker.internet.email(),
   phone: faker.phone.number(),
   role: role,
   level: level,
//    address: {
//       street: faker.location.streetAddress(),
//       city: faker.location.city(),
//       state: faker.location.state(),
//       zipCode: faker.location.zipCode(),
//       country: faker.location.country()
//    },
   subordinates: []
});

const generateHierarchicalData = (organizationName) => {
   const employees = [];
   let managers = [];

   hierarchyLevels.forEach((hierarchy) => {
      const { level, count } = hierarchy;
      const rolesForLevel = roles[level];

      for (let i = 0; i < count; i++) {
         const role = faker.helpers.arrayElement(rolesForLevel);
         const employee = generateEmployee(level, role);

         if (level !== 'Staff') {
            managers.push(employee);
         } else {
            const randomManager = faker.helpers.arrayElement(managers);
            randomManager.subordinates.push(employee);
         }

         employees.push(employee);
      }
   });

   return {
      organization: organizationName,
      employees: employees
   };
};

// Usage example
const organizationName = "Tech Innovators Inc.";
const hierarchicalData = generateHierarchicalData(organizationName);

console.log(JSON.stringify(hierarchicalData, null, 2));
