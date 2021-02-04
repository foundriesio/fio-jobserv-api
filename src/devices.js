/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response.js';
import JobServ from './jobserv.js';

class Devices extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/devices/';
  }
}

/**
 * Find a device by its name.
 * @param {Object} data
 * @param {String} data.device - The name of the device.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Devices.prototype.findByName = async function ({ device, query, options }) {
  return this.find({ path: `${device}/`, query, options });
};

/**
 * Remove a device.
 * @param {Object} data
 * @param {String} data.device - The name of the device.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Devices.prototype.remove = async function ({ device, query, options }) {
  return createResponse(this.delete({ path: `${device}/`, query, options }));
};

/**
 * Update a device name.
 * @param {Object} data
 * @param {String} data.device - The name of the device.
 * @param {(Object|String|Buffer)} data.data - The data to send (aliased as body). If an object, it will be serialized as json.
 * @param {(Object|String|Buffer)} [data.body] - The data to send.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Devices.prototype.update = async function ({
  device,
  data,
  body,
  query,
  options,
}) {
  return createResponse(
    this.patch({
      path: `${device}/`,
      body: data || body,
      query,
      options,
    })
  );
};

/**
 * Retrieve all updates of a device.
 * @param {Object} data
 * @param {String} data.device - The name of the device.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Devices.prototype.getUpdates = async function ({ device, query, options }) {
  return this.find({
    path: `${device}/updates/`,
    query,
    options,
  });
};

/**
 * Retrieve events that took place during the update.
 * @param {Object} data
 * @param {String} data.device - The name of the device.
 * @param {String} data.correlationId - The update/correlation id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Devices.prototype.getUpdateEvents = async function ({
  device,
  correlationId,
  query,
  options,
}) {
  return this.find({
    path: `${device}/updates/${correlationId}/`,
    query,
    options,
  });
};

/**
 * Retrieve the list of config settings defined for a device.
 * @param {Object} data
 * @param {String} data.device - The name of the device.
 * @param {String} data.update - The update name/id.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Devices.prototype.getUpdateById = async function ({
  device,
  update,
  query,
  options,
}) {
  return this.find({
    path: `${device}/updates/${update}/`,
    query,
    options,
  });
};

/**
 * Retrieve the list of config settings defined for a device.
 * @param {Object} data
 * @param {String} data.device - The name of the device.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Devices.prototype.createConfig = async function ({ device, query, options }) {
  return this.find({
    path: `${device}/config/`,
    query,
    options,
  });
};

/**
 * Retrieve the list of config settings defined for a device.
 * @param {Object} data
 * @param {String} data.device - The name of the device.
 * @param {String} data.factory - The name of the factory.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Devices.prototype.getConfig = async function ({
  device,
  factory,
  query,
  options,
}) {
  return this.find({
    path: `${device}/config/`,
    factory,
    query,
    options,
  });
};

/**
 * Update the device configuration with new content.
 * @param {Object} data
 * @param {String} data.device - The name of the device.
 * @param {(Object|String|Buffer)} data.data - The data to send (aliased as body). If an object, it will be serialized as json.
 * @param {(Object|String|Buffer)} [data.body] - The data to send.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Devices.prototype.updateConfig = async function ({
  device,
  data,
  body,
  query,
  options,
}) {
  return createResponse(
    this.patch({
      path: `${device}/config/`,
      body: data || body,
      query,
      options,
    })
  );
};

/**
 * Remove the config file from the configuration.
 * @param {Object} data
 * @param {String} data.device - The name of the device.
 * @param {String} data.config - The name of the config to remove.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Devices.prototype.removeConfig = async function ({
  device,
  config,
  query,
  options,
}) {
  return createResponse(
    this.delete({
      path: `${device}/config/${config}/`,
      query,
      options,
    })
  );
};

export default Devices;
