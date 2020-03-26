/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

const assert = require('assert');

const { createResponse } = require('../../dist/main.js');

describe('Test the createResponse factory function', function () {
  it('should be a function', () => {
    assert.strictEqual(typeof createResponse, 'function');
  });

  it('should populate the response object', async () => {
    const request = new Promise((resolve) => {
      resolve({});
    });

    const response = await createResponse(request);

    assert.strictEqual(typeof response, 'object');
    assert.strictEqual(typeof response.raw, 'object');
  });

  it('should expose the correct status', async () => {
    const request = new Promise((resolve) => {
      resolve({
        statusCode: 200,
      });
    });

    const response = await createResponse(request);

    assert.strictEqual(response.status, 200);
  });
});
