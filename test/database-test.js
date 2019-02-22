'use strict';

const Sequelize = require('sequelize');
const password = require('./../config.js');
const expect = require('chai').expect;

const sequelize = new Sequelize('zillow', 'postgres', password, {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

xdescribe('Database Seeding', () => {
  it('Should have 100 records in the house table', () => {
    sequelize.query('select count(*) from houses;', { type: sequelize.QueryTypes.SELECT })
      .then(count => {
        expect(count[0].count).to.equal('100');
      })
      .done()
  });

  it('Should have 100 records in the prices table', () => {
    sequelize.query('select count(*) from prices;', { type: sequelize.QueryTypes.SELECT })
      .then(count => {
        expect(count[0].count).to.equal('100');
      })
      .done()
  });
})

describe('House Database', () => {

  let house;

  before(async () => {
    await sequelize.query('select * from houses limit 1;', { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        house = data;
      })
  });

  it('Should have records with correct columns in the house table', () => {
    expect(Object.keys(house[0])).to.deep.equal(['id', 'street', 'city', 'state', 'zipcode', 'description']);
  });

  it('Should have a valid datatypes for each column', () => {
    expect(house[0].id).to.be.a('number');
    expect(house[0].street).to.be.a('string');
    expect(house[0].city).to.be.a('string');
    expect(house[0].state).to.be.a('string');
    expect(house[0].zipcode).to.be.a('string');
    expect(house[0].description).to.be.a('string');
  });
});

describe('Price Database', () => {

  let price;

  before(async () => {
    await sequelize.query('select * from prices limit 1;', { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        price = data;
      })
  });

  it('Should have records with correct columns in the price table', () => {
    expect(Object.keys(price[0])).to.deep.equal(['id', 'price']);
  });

  it('Should have a valid datatypes for each column', () => {
    expect(price[0].price).to.be.a('number');
    expect(price[0].id).to.be.a('number');
  });

  after(() => {
    sequelize.close();
  })

});
