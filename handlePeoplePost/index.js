'use strict';

const dynamoose = require('dynamoose');

// create schema
const personSchema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

// create model
const personModel = dynamoose.model('people', personSchema);

exports.handler = async (event) => {
  let { id, name, phone } = event.queryStringParameters;
  let person = { id, name, phone };

  let response = { statusCode: null, body: null };

  try {
    let newPerson = await personModel.create(person);
    response.statusCode = 200;
    response.body = JSON.stringify(newPerson);
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }

  return response;
};
