/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import JobServ from './jobserv';

class Factories extends JobServ {
  constructor(uri, cache) {
    super(uri, cache);
  }
}

/**
 * Retrieve a factory status.
 * @param {Object} data
 * @param {Object} data.user
 * @param {string} data.factoryName
 * @param {Object} data.query
 */
Factories.prototype.status = async function ({ user, factoryName, query }) {
  return this.findById({ user, id: `${factoryName}/status/`, query });
};

export default Factories;
