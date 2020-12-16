/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import JobServ from './jobserv.js';

/**
 * Create the correct target name to be retrieved.
 * Right now it's `[target]-lmp-[build]`.
 * @param {Object} data
 * @param {Object} data.run - The run name.
 * @param {Object} data.target - The build name/id (the target).
 * @returns {String}
 */
function createTargetName(run, target) {
  if (run.indexOf(`lmp-${target}`) !== -1) {
    return run;
  }
  return `${run}-lmp-${target}`;
}

class ComposeApps extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';
  }
}

/**
 * List all compose apps for a target.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {String} data.target - The name/id name of the build.
 * @param {String} data.run - The run name.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
ComposeApps.prototype.list = async function ({
  factory,
  target,
  run,
  query,
  options,
}) {
  return this.find({
    path: `${factory}/targets/${createTargetName(run, target)}/compose-apps/`,
    query,
    options,
  });
};

/**
 * Retrieve a compose app details.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {String} data.target - The name/id of the build.
 * @param {String} data.run - The run name.
 * @param {String} data.app - The name of the app.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
ComposeApps.prototype.retrieve = async function ({
  factory,
  target,
  run,
  app,
  query,
  options,
}) {
  return this.find({
    path: `${factory}/targets/${createTargetName(
      run,
      target
    )}/compose-apps/${app}/`,
    query,
    options,
  });
};

class Targets extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';

    this.ComposeApps = new ComposeApps(address);
  }
}

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
 * @param {String} data.target - The name/id of the build.
 * @param {String} data.run - The run name.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Targets.prototype.retrieve = async function ({
  factory,
  target,
  run,
  query,
  options,
}) {
  return this.find({
    path: `${factory}/targets/${createTargetName(run, target)}/`,
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
