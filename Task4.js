const faker = require('faker');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const randomInt = require('random-int');
const randomItem = require('random-item');

function generateCountryName (region) {
    if(region === 'uk'){
        return randomItem(['Uk', 'uk', 'Ukraine', 'ukraine'])
    }
    if(region === 'ru'){
        return randomItem(['Ru', 'ru', 'Russia', 'russia'])
    }
    if(region === 'en'){
        return randomItem(['Us', 'us', 'USA', 'United States'])
    }
    return 0
}

function GetUser(region) {
    return{
        country: generateCountryName (region),
        name: faker.name.findName() + " " + faker.name.middleName(),
        city: faker.address.cityName(),
        zipCode: faker.address.zipCode(),
        street: faker.address.streetName() + " " + randomInt(1, 100),
        phone: faker.phone.phoneNumber()
    }
}

function GenerateDate(numberUsers, region) {

    faker.locale = region
    const csvStringifier = createCsvStringifier({
        header: [
            {id: 'country', title: 'COUNTRY'},
            {id: 'name', title: 'NAME'},
            {id: 'city', title: 'CITY'},
            {id: 'zipCode', title: 'ZIPCODE'},
            {id: 'street', title: 'STREET'},
            {id: 'phone', title: 'PHONE'}
        ],
        fieldDelimiter: ';'
    });

    for (let i = 0; i < numberUsers; i++) {
        let records = [GetUser(region)];
        process.stdout.write(csvStringifier.stringifyRecords(records));
    }
}

GenerateDate(process.argv[2], process.argv[3]);




