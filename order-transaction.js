import { fakerTH, faker } from "@faker-js/faker";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");

// สร้างข้อมูลสินค้า
const products = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  name: fakerTH.commerce.productName(),
  price: faker.commerce.price(),
  category: faker.commerce.department(),
}));


// สร้างข้อมูลการซื้อขาย
const transactions = Array.from({ length: 2 }, () => ({
  productId: faker.helpers.arrayElement(products).id,
  productName: faker.helpers.arrayElement(products).name,
  quantity: faker.number.int({ min: 1, max: 5 }),
  totalPrice: faker.number.int({ min: 50, max: 2000 }),
  customerName: fakerTH.person.fullName(),
  email: faker.internet.email(),
  address: fakerTH.location.streetAddress(),
  date: faker.date.recent(),
}));

console.log(products);
console.log(transactions);


//---------------------------
var obj = {
  transactions: transactions,
};

var objProduct = {
  products: products,
};

var json = JSON.stringify(obj);
var jsonProduct = JSON.stringify(objProduct);

fs.writeFile('transaction-data.json', json, function (err) {
  if (err) throw err;
  console.log('Transaction saved!');
});

fs.writeFile('product-data.json', jsonProduct, function (err) {
  if (err) throw err;
  console.log('Product data saved!');
});