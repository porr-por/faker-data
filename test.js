const faker = require('faker', 'faker.locale', 'th', 'fakerTH');

// Import Faker with Thai locale

// Custom function to generate fake data based on schema
const generateFakeData = (schema) => {
    const fakeData = {};

    // Loop through properties in schema
    Object.keys(schema.properties).forEach(key => {
        const property = schema.properties[key];

        // Generate fake data based on property type
        switch (property.type) {
            case 'string':
                // Check for locale-specific rules
                if (property.locale === 'th') {
                    fakeData[key] = faker.fake(property.fakerPattern);
                } else {
                    // Generate data using default Faker behavior
                    fakeData[key] = faker.fake('{{' + key + '}}');
                }
                break;
            // Handle other data types if needed
            default:
                // Handle other types accordingly
                break;
        }
    });

    return fakeData;
};

// Example usage:
const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "locale": "th",
            "fakerPattern": "{{name.lastName}}{{name.firstName}}",
            "pattern": "^[\u0E00-\u0E7F]+$"
        },
        // Define other properties in your schema
    },
    "required": ["name"]
};

// Generate fake data based on schema
const fakeData = generateFakeData(schema);
console.log(fakeData);

