import {faker, fakerTH} from "@faker-js/faker";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");

// Load and parse the JSON data
const rawData = fs.readFileSync('./school-structure.json');
const organizationChartData = JSON.parse(rawData);
//const numberOfSchoolStructureData = schoolStructureData.organization.length;
//console.log(numberOfOrganizationData);

// Function to generate random teachers for a department
function generateTeachers(count, position) {
  const teachers = [];
  for (let i = 0; i < count; i++) {
    teachers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      position: `${position} ${i + 1}`,
    });
  }
  return teachers;
}

// Function to generate departments recursively
function generateDepartments(departmentData) {
  const department = {
    position: departmentData.position,
    teachers: [],
    subdepartments: [],
  };

  // Generate teachers for the department
  if (departmentData.reports && departmentData.reports.length > 0) {
    departmentData.reports.forEach((report) => {
      if (!report.reports) {
        // If the report has no sub-reports, it's a teacher
        department.teachers = department.teachers.concat(generateTeachers(1, report.position));
      } else {
        // If the report has sub-reports, it's a sub-department
        const subDepartment = generateDepartments(report);
        if (department.subdepartments) {
          department.subdepartments.push(subDepartment);
        } else {
          department.subdepartments = [subDepartment];
        }
      }
    });
  }

  return department;
}



// Generate the school structure with random teacher data
const schoolStructure = generateDepartments(organizationChartData);

console.log(JSON.stringify(schoolStructure, null, 2));