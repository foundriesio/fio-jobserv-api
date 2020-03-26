/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import JobServ from './jobserv';

class Devices extends JobServ {
  constructor(uri, cache) {
    super(uri, cache);
  }
}

/**
 * Find a device by its name.
 */
Devices.prototype.findByName = async function ({ user, deviceName, query }) {
  return this.findById({ user, deviceName, query });
};

/**
 * Retrieve all updates of a device.
 * @param {Object} user
 * @param {String} deviceName
 * @param {Object} query
 */
Devices.prototype.updates = async function ({ user, deviceName, query }) {
  return this.find({
    user: user,
    path: `${deviceName}/updates/`,
    query: query,
  });
};

/**
 * Retrieve a single device update.
 * @param {Object} user
 * @param {String} deviceName
 * @param {String} updateId
 * @param {Object} query
 */
Devices.prototype.findUpdateById = async function ({
  user,
  deviceName,
  updateId,
  query,
}) {
  return this.find({
    user: user,
    query: query,
    path: `${deviceName}/updates/${updateId}/`,
  });
};

export default Devices;
