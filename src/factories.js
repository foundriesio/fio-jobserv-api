/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import JobServ from './jobserv.js';

class Targets extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';
  }
}

/**
 * Create the correct target name to be retrieved.
 * Right now it's `[target]-lmp-[build]`.
 * @param {Object} data
 * @param {Object} data.target - The target name.
 * @param {Object} data.build - The build name/id.
 * @returns {String}
 */
Targets.prototype.createTargetName = function ({ target, build }) {
  return `${target}-lmp-${build}`;
};

/**
 * List all targets of a factory.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Targets.prototype.list = async function ({ factory, query, options }) {
  return this.find({ path: `${factory}/targets/`, query, options });
};

/**
 * Get a target of a factory.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {String} data.target - The name of the target.
 * @param {String} data.build - The name/id of the build.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Targets.prototype.retrieve = async function ({
  factory,
  target,
  build,
  query,
  options,
}) {
  return this.find({
    path: `${factory}/targets/${this.createTargetName({ target, build })}/`,
    query,
    options,
  });
};

class Factories extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';

    this.Targets = new Targets(address);
  }
}

/**
 * Retrieve a factory status.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Factories.prototype.status = async function ({ factory, query, options }) {
  return this.find({ path: `${factory}/status/`, query, options });
};

export default Factories;
