/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import fs from 'fs';
import util from 'util';

import log from '@foundriesio/log';

import config from '../config';
import Remote from '../remote';

/* eslint-disable security/detect-non-literal-fs-filename */
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);
/* eslint-enable security/detect-non-literal-fs-filename */

const cfg = config();

const caCertPath = cfg.get('secrets').caCertPath;
const apiTokenPath = cfg.get('secrets').apiTokenPath;
const serverPath = cfg.get('secrets').serverPath;
const cachePrefix = cfg.get('secrets').cachePrefix;
// const expiresIn = 60 * 10;
const expiresIn = cfg.get('secrets').expiresIn;

class RemoteSecrets extends Remote {
  constructor(uri, cache) {
    super(uri);
    this.cache = cache;
    this.watchedSecrets = {
      ca: {},
      token: {},
    };

    this.watch();
  }
}

RemoteSecrets.prototype.watch = function () {
  // eslint-disable-next-line no-unused-vars
  async function updateCaCert(_eventType, _fileName) {
    try {
      const newStat = await stat(caCertPath);
      if (newStat.mtime > this.watchedSecrets.token.stat.mtime) {
        this.watchedSecrets.ca.value = await readFile(caCertPath, 'utf8');
        this.watchedSecrets.ca.stat = newStat;
      }
    } catch (err) {
      log.error(`Error reading internal CA file ${caCertPath}`);
      log.error(err);
    }
  }

  // eslint-disable-next-line no-unused-vars
  async function updateBearerToken(_eventType, _fileName) {
    try {
      const newStat = await stat(apiTokenPath);
      if (newStat.mtime > this.watchedSecrets.token.stat.mtime) {
        this.watchedSecrets.token.value = await readFile(apiTokenPath, 'utf8');
        this.watchedSecrets.token.stat = newStat;
      }
    } catch (err) {
      log.error(`Error reading internal token file ${apiTokenPath}`);
      log.error(err);
    }
  }

  /* eslint-disable security/detect-non-literal-fs-filename */
  this.watchedSecrets.ca.value = fs.readFileSync(caCertPath, 'utf8');
  this.watchedSecrets.ca.stat = fs.statSync(caCertPath);
  this.watchedSecrets.token.value = fs.readFileSync(apiTokenPath, 'utf8');
  this.watchedSecrets.token.stat = fs.statSync(apiTokenPath);

  fs.watch(caCertPath, updateCaCert.bind(this));
  fs.watch(apiTokenPath, updateBearerToken.bind(this));
  /* eslint-enable security/detect-non-literal-fs-filename */
};

RemoteSecrets.prototype.decode = function (data) {
  return data;
};

/**
 * Calculate expiration time for the provided data.
 * @param  {Number} expiresIn Number of seconds to add.
 * @return {Date} The date in milliseconds UNIX timestamp when the data should expire.
 */
RemoteSecrets.prototype.calculateExpiration = function (expiresIn = 600) {
  return Date.now() + expiresIn * 1000;
};

RemoteSecrets.prototype.fromCache = async function (key) {
  if (this.cache) {
    const cached = await this.cache.getallh(key);

    if (cached && Date.now() < cached._expires) {
      return cached;
    }

    this.cache.del(key);
  }

  return null;
};

RemoteSecrets.prototype.setCache = function (key, data, expires) {
  if (this.cache) {
    setImmediate(this.cache.seth.bind(this.cache), key, data, expires);
  }
};

RemoteSecrets.prototype.retrieve = async function (secretName, namespace) {
  const key = `${cachePrefix}:${namespace}:${secretName}`;

  const cached = await this.fromCache(key);
  if (cached) {
    return cached;
  }

  const path = `${serverPath}/${namespace}/secrets/${secretName}/`;
  const options = {
    headers: {
      Authorization: `Bearer ${this.watchedSecrets.token.value}`,
    },
    ca: this.watchedSecrets.ca.value,
  };

  const response = await this.get(path, null, options);

  const decoded = this.decode(JSON.parse(response.body));

  decoded._expires = this.calculateExpiration(expiresIn);

  this.setCache(key, decoded, expiresIn);

  return decoded;
};

export default RemoteSecrets;
