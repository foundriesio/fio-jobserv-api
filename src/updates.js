/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import JobServ from './jobserv';

class Updates extends JobServ {
  constructor(uri, cache) {
    super(uri, cache);
  }
}

/**
 * Retrieve all builds of a project.
 * @param {Object} data
 * @param {Object} data.user
 * @param {Object} data.query
 */
Updates.prototype.list = async function ({ user, query }) {
  return this.find({
    path: '/updates/',
    user,
    query,
  });
};

export default Updates;
