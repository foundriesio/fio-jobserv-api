/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import crypto from 'crypto';

import Future from 'bluebird';
import jwt from 'jsonwebtoken';

import config from '../config';
import RemoteSecrets from './remote';

const cfg = config();

const jwtSecretValidAtKey = cfg.get('jwt').validAtKey;
const jwtSecretKey = cfg.get('jwt').key;
const jwtPrevSecretKey = cfg.get('jwt').prevKey;
const tokenExpiresIn = cfg.get('jwt').expiresIn;

const secretName = cfg.get('secrets').name;
const secretNamespace = cfg.get('secrets').namespace;
const signKey = cfg.get('secrets').signKey;
const remoteUrl = cfg.get('secrets').remoteUrl;

Future.promisifyAll(jwt);

function b64decode(data) {
  return Buffer.from(data, 'base64').toString('utf8');
}

function toMilliEpoch(date) {
  return Math.floor(date * 1000);
}

function toHash(data) {
  const hash = crypto.createHash('md5');
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
}

class Secrets extends RemoteSecrets {
  constructor(cache) {
    super(remoteUrl, cache);
    this.secret = secretName;
    this.namespace = secretNamespace;
    this.signKey = signKey;
  }
}

Secrets.prototype.decode = function (toDecode) {
  const decoded = {};
  for (let key in toDecode.data) {
    decoded[`${key}`] = b64decode(toDecode.data[`${key}`]);
  }
  return decoded;
};

Secrets.prototype.getKey = async function (key) {
  const secrets = await this.retrieve(this.secret, this.namespace);

  if (secrets) {
    return secrets[`${key}`];
  }

  return null;
};

Secrets.prototype.hmac = async function (data) {
  const secret = await this.getKey(this.signKey);

  if (secret) {
    const hmac = crypto.createHmac('sha1', secret);
    hmac.update(data);
    return hmac.digest('hex');
  }

  return null;
};

/**
 * Create a JWT token based on the provided data.
 *
 * @param {Object} data The data to create a JWT.
 * @param {String} uid The user ID.
 * @returns {Promise} A valid JWT token.
 */
Secrets.prototype.jwt = async function (data, uid) {
  let secretKey;

  const jwtKey = `${this.secret}:${this.namespace}:${uid}:${toHash(data)}`;

  const cached = await this.fromCache(jwtKey);
  if (cached) {
    return cached.jwt;
  }

  const secrets = await this.retrieve(this.secret, this.namespace);

  if (secrets) {
    if (Date.now() >= toMilliEpoch(secrets[`${jwtSecretValidAtKey}`])) {
      secretKey = secrets[`${jwtSecretKey}`];
    } else {
      secretKey = secrets[`${jwtPrevSecretKey}`];
    }

    const exp = this.calculateExpiration(tokenExpiresIn);

    const token = await jwt.signAsync(data, secretKey, {
      algorithm: 'HS256',
      expiresIn: tokenExpiresIn,
      issuer: 'heracles',
    });

    this.setCache(jwtKey, { jwt: token, _expires: exp }, tokenExpiresIn);

    return token;
  }

  return null;
};

export function getSecrets(cache) {
  return new Secrets(cache);
}

export default getSecrets;
