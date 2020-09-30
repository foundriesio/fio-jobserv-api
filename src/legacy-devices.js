/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response';
import JobServ from './jobserv';

class LegacyDevices extends JobServ {
  constructor(uri, cache) {
    super(uri, cache);
    this.path = '/lmp/devices';
  }
}

/**
 * Find all devices.
 */
LegacyDevices.prototype.find = async function ({ user, query }) {
  return createResponse(this.get(this.path, query, await this.prepare(user)));
};

/**
 * Find a device by its name.
 */
LegacyDevices.prototype.findByName = async function ({
  user,
  deviceName,
  query,
}) {
  return this.findById({ user, id: `${this.path}/${deviceName}`, query });
};

/**
 * Retrieve all updates of a device.
 * @param {Object} user
 * @param {String} deviceName
 * @param {Object} query
 */
LegacyDevices.prototype.updates = async function ({ user, deviceName, query }) {
  return createResponse(
    this.get(
      `${this.path}/${deviceName}/updates/`,
      query,
      await this.prepare(user)
    )
  );
};

LegacyDevices.prototype.requestUpdate = async function ({
  user,
  deviceName,
  stream,
  hash,
}) {
  return createResponse(
    this.put(
      { image: { hash } },
      `${this.path}/${deviceName}`,
      { stream },
      await this.prepare(user, true)
    )
  );
};

LegacyDevices.prototype.remove = async function ({ user, deviceName, stream }) {
  return createResponse(
    this.delete(
      `${this.path}/${deviceName}`,
      { stream },
      await this.prepare(user)
    )
  );
};

LegacyDevices.prototype.update = async function ({
  user,
  deviceName,
  stream,
  data,
}) {
  return createResponse(
    this.patch(
      data,
      `${this.path}/${deviceName}`,
      { stream },
      await this.prepare(user, true)
    )
  );
};

function offline(device) {
  let lastSeen = device['last-seen'];
  // one hour in milliseconds = 1000 * 60 * 60 = 36000000
  if (lastSeen && new Date() - Date.parse(lastSeen) < 36000000) {
    return false;
  }
  return true;
}

function offlineDevice(device) {
  device.offline = offline(device);
  return device;
}

LegacyDevices.prototype.offline = function (devices) {
  return devices.map(offlineDevice);
};

LegacyDevices.prototype.isOffline = function (device) {
  return offline(device);
};

export default LegacyDevices;
