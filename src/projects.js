/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response.js';
import JobServ from './jobserv.js';

class Projects extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/projects/';
  }
}

/**
 * Retrieve all builds of a project.
 * @param {Object} data
 * @param {String} data.project - The name of the project.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Projects.prototype.findBuilds = async function ({ project, query, options }) {
  return this.find({
    path: `${project}/builds/`,
    query,
    options,
  });
};

/**
 * Retrieve a project build.
 * @param {Object} data
 * @param {String} data.project - The project name.
 * @param {String} data.build - The build name/id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Projects.prototype.findBuildById = async function ({
  project,
  build,
  query,
  options,
}) {
  return this.find({
    path: `${project}/builds/${build}/`,
    query,
    options,
  });
};

/**
 * Retrieve all runs of a project build.
 * @param {Object} data
 * @param {String} data.project - The project name.
 * @param {String} data.build - The build name/id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Projects.prototype.findRuns = async function ({
  project,
  build,
  query,
  options,
}) {
  return this.find({
    path: `${project}/builds/${build}/runs/`,
    query,
    options,
  });
};

/**
 * Retrieve a run of a project build.
 * @param {Object} data
 * @param {String} data.project - The project name.
 * @param {String} data.build - The build name/id.
 * @param {String} data.run - The run name/id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Projects.prototype.findRunByName = async function ({
  project,
  build,
  run,
  query,
  options,
}) {
  return this.find({
    path: `${project}/builds/${build}/runs/${run}/`,
    query,
    options,
  });
};

/**
 * Stop/Cancel a running run.
 * @param {Object} data
 * @param {String} data.project - The project name.
 * @param {String} data.build - The build name/id.
 * @param {String} data.run - The run name/id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Projects.prototype.cancelRun = async function ({
  project,
  build,
  run,
  query,
  options,
}) {
  return createResponse(
    this.post({
      path: `${project}/builds/${build}/runs/${run}/cancel`,
      query,
      options,
    })
  );
};

/**
 * Run again a previously ran run.
 * @param {Object} data
 * @param {String} data.project - The project name.
 * @param {String} data.build - The build name/id.
 * @param {String} data.run - The run name/id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Projects.prototype.runAgain = async function ({
  project,
  build,
  run,
  query,
  options,
}) {
  return createResponse(
    this.post({
      path: `${project}/builds/${build}/runs/${run}/rerun`,
      query,
      options,
    })
  );
};

/**
 * Retrieve the .simulate.sh script for a run.
 * @param {Object} data
 * @param {String} data.project - The project name.
 * @param {String} data.build - The build name/id.
 * @param {String} data.run - The run name/id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Projects.prototype.retrieveSimulator = async function ({
  project,
  build,
  run,
  query,
  options,
}) {
  return this.find({
    path: `${project}/builds/${build}/runs/${run}/.simulate.sh`,
    query,
    options,
  });
};

/**
 * Retrieve history for run of a project.
 * @param {Object} data
 * @param {String} data.project - The project name.
 * @param {String} data.build - The build name/id.
 * @param {String} data.run - The run name/id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Projects.prototype.findRunHistory = async function ({
  project,
  run,
  query,
  options,
}) {
  return this.find({
    path: `${project}/history/${run}/`,
    query,
    options,
  });
};

/**
 * Retrieve all tests of a project build run.
 * @param {Object} data
 * @param {String} data.project - The project name.
 * @param {String} data.build - The build name/id.
 * @param {String} data.run - The run name/id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Projects.prototype.findTests = async function ({
  project,
  build,
  run,
  query,
  options,
}) {
  return this.find({
    path: `${project}/builds/${build}/runs/${run}/tests/`,
    query,
    options,
  });
};

/**
 * Retrieve all tests of a project build run.
 * @param {Object} data
 * @param {String} data.project - The project name.
 * @param {String} data.build - The build name/id.
 * @param {String} data.run - The run name/id.
 * @param {String} data.test - The test name/id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Projects.prototype.findTestByName = async function ({
  project,
  build,
  run,
  test,
  query,
  options,
}) {
  return this.find({
    path: `${project}/builds/${build}/runs/${run}/tests/${test}/`,
    query,
    options,
  });
};

export default Projects;
