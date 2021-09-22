'use strict'

const Client = require('../src/models/client.js');

describe('creates client', () => {
  it('Can create a new client', () => {
    var client = new Client({
      name: 'Bob',
      emailAddress: 'bob@bob.com',
      newsletter: 'true',
      phoneNumber: '123-456-7890',
      trainingType: ''
    });
    expect(client.name).toBe('Bob')
  });
});
