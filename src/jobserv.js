/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response';
import getSecrets from './secrets';
import Remote from './remote';

export class JobServ extends Remote {
  constructor(uri, cache) {
    super(uri);
    this.follows = true;
    this.secrets = getSecrets(cache);
  }
}

/**
 * Serialize the data to be sent.
 * It uses JSON.stringify() to serialize the data.
 *
 * @param {Object} data The data to be sent.
 * @returns {String} Serialized data as a string.
 */
JobServ.prototype.serialize = function (data) {
  return JSON.stringify(data);
};

/**
 * Prepare the request options.
 *
 * @param {Object} user The user performing the request.
 * @param {Boolean} hasData If the request has data to be sent, default to false.
 * @returns {Promise} Resolves to an Object.
 */
JobServ.prototype.prepare = async function (user, hasData = false) {
  const options = {
    rejectUnauthorized: false,
    followRedirects: this.follows,
    secureProtocol: 'TLSv1_2_method',
    headers: {},
  };

  if (user) {
    let orgs = [];

    if (Array.isArray(user.orgs)) {
      orgs = user.orgs.map((o) => o.name.toLowerCase());
    }

    const data = {
      teams: orgs,
      orgs: orgs,
      subscriber: user.subscriber,
      id: user._id,
      source: 'internal',
    };

    const jwt = await this.secrets.jwt(data, user._id);
    if (jwt) {
      options.headers.Authorization = `JWT-Bearer ${jwt}`;
    }
  }

  if (hasData) {
    options.headers['Content-Type'] = this.contentType;
  }

  return options;
};

/**
 * Perform a find() search on the resource.
 *
 * @param {Object} user The user performing the action.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise}
 */
JobServ.prototype.find = async function ({ user, path, query }) {
  return createResponse(this.get(path, query, await this.prepare(user)));
};

/**
 * Perform a findById() search on the resource.
 *
 * @param {Object} user The user performing the action.
 * @param {String} id The ID of the resource to search.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise}
 */
JobServ.prototype.findById = async function ({ user, id, query }) {
  return createResponse(this.get(id, query, await this.prepare(user)));
};

/**
 * Create a resource on the server.
 *
 * @param {Object} user The user performing the action.
 * @param {Object} data The data to send.
 * @param {String} path The path on the server where to perform the action.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise}
 */
JobServ.prototype.create = async function ({ user, data, path, query }) {
  return createResponse(
    this.post(data, path, query, await this.prepare(user, true))
  );
};

/**
 * Update a resource on the server.
 *
 * @param {Object} user The user performing the action.
 * @param {Object} data The data to send.
 * @param {String} path The path on the server where to perform the action.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise}
 */
JobServ.prototype.update = async function ({ user, data, path, query }) {
  return createResponse(
    this.patch(data, path, query, await this.prepare(user, true))
  );
};

/**
 * Remove a resource on the server.
 *
 * @param {Object} user The user performing the action.
 * @param {String} path The path on the server where to perform the action.
 * @param {Object} query Query/Search parameters.
 * @returns {Promise}
 */
JobServ.prototype.remove = async function ({ user, path, query }) {
  return createResponse(this.delete(path, query, await this.prepare(user)));
};

export default JobServ;
