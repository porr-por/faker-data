import { fakerTH, faker } from "@faker-js/faker";
import { createRequire } from "module";
const require = createRequire(import.meta.url);


faker.seed(3);

const firstRandom = faker.number.int();
console.log(firstRandom);

// Setting the seed again resets the sequence.
faker.seed(3);

const secondRandom = faker.number.int();
console.log(secondRandom);

console.log(firstRandom === secondRandom);

var a = Date.now.toString();
console.log(a);