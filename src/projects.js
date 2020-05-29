/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import JobServ from './jobserv';

class Projects extends JobServ {
  constructor(uri, cache) {
    super(uri, cache);
  }
}

/**
 * Retrieve all builds of a project.
 * @param {Object} user
 * @param {String} projectName
 * @param {Object} query
 */
Projects.prototype.findBuilds = async function ({ user, projectName, query }) {
  return this.find({
    user: user,
    path: `${projectName}/builds/`,
    query: query,
  });
};

/**
 * Retrieve a project build.
 * @param {Object} user
 * @param {String} projectName
 * @param {String} build
 * @param {Object} query
 */
Projects.prototype.findBuildById = async function ({
  user,
  projectName,
  build,
  query,
}) {
  return this.find({
    user: user,
    path: `${projectName}/builds/${build}/`,
    query: query,
  });
};

/**
 * Retrieve all runs of a project build.
 * @param {Object} user
 * @param {String} projectName
 * @param {String} build
 * @param {Object} query
 */
Projects.prototype.findRuns = async function ({
  user,
  projectName,
  build,
  query,
}) {
  return this.find({
    user: user,
    path: `${projectName}/builds/${build}/runs/`,
    query: query,
  });
};

/**
 * Retrieve a run of a project build.
 * @param {Object} user
 * @param {String} projectName
 * @param {String} build
 * @param {String} runName
 * @param {Object} query
 */
Projects.prototype.findRunByName = async function ({
  user,
  projectName,
  build,
  runName,
  query,
}) {
  return this.find({
    user: user,
    path: `${projectName}/builds/${build}/runs/${runName}/`,
    query: query,
  });
};

/**
 * Retrieve all tests of a project build run.
 * @param {Object} user
 * @param {String} build
 * @param {String} projectName
 * @param {String} runName
 * @param {Object} query
 */
Projects.prototype.findTests = async function ({
  user,
  projectName,
  build,
  runName,
  query,
}) {
  return this.find({
    user: user,
    path: `${projectName}/builds/${build}/runs/${runName}/tests/`,
    query: query,
  });
};

/**
 * Retrieve all tests of a project build run.
 * @param {Object} user
 * @param {String} build
 * @param {String} projectName
 * @param {String} runName
 * @param {String} testName
 * @param {Object} query
 */
Projects.prototype.findTestByName = async function ({
  user,
  projectName,
  build,
  runName,
  testName,
  query,
}) {
  return this.find({
    user: user,
    path: `${projectName}/builds/${build}/runs/${runName}/tests/${testName}/`,
    query: query,
  });
};

export default Projects;
