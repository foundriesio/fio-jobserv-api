/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response.js';
import JobServ from './jobserv.js';

class LegacyDevices extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/lmp/devices/';
  }
}

/**
 * Find all devices.
 */
LegacyDevices.prototype.find = async function ({ query, options }) {
  return createResponse(this.get({ query, options }));
};

/**
 * Find a device by its name.
 */
LegacyDevices.prototype.findByName = async function ({
  device,
  query,
  options,
}) {
  return createResponse(this.get({ path: `${device}/`, query, options }));
};

/**
 * Retrieve all updates of a device.
 * @param {Object} user
 * @param {String} deviceName
 * @param {Object} query
 */
LegacyDevices.prototype.updates = async function ({ device, query, options }) {
  return createResponse(
    this.get({ path: `${device}/updates/`, query, options })
  );
};

LegacyDevices.prototype.requestUpdate = async function ({
  device,
  stream,
  hash,
  options,
}) {
  return createResponse(
    this.put({
      path: `/${device}`,
      body: { image: { hash } },
      query: { stream },
      options,
    })
  );
};

LegacyDevices.prototype.remove = async function ({ device, stream, options }) {
  return createResponse(
    this.delete({ path: `${device}/`, query: { stream }, options })
  );
};

/**
 * Update a device.
 * @param {Object} data
 * @param {String} data.device - The device name.
 * @param {String} data.stream - The stream name.
 * @param {(String|Buffer)} data.data - The data to send (aliased as body).
 * @param {(String|Buffer)} [data.body] - The data to send.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
LegacyDevices.prototype.update = async function ({
  device,
  stream,
  data,
  body,
  options,
}) {
  return createResponse(
    this.patch({
      path: `${device}/`,
      body: data || body,
      query: { stream },
      options,
    })
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
