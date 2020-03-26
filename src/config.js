/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import convict from 'convict';

const { NODE_ENV } = process.env;

if (NODE_ENV !== 'production') {
  require('dotenv').config();
}

let cfg;

export function config() {
  if (!cfg) {
    cfg = convict({
      config: {
        format: String,
        default: '',
        env: 'FIO_CONFIG_FILE',
      },
      secrets: {
        caCertPath: {
          format: String,
          default: '',
          env: 'FIO_SCRT_CA_CERT_PATH',
        },
        apiTokenPath: {
          format: String,
          default: '',
          env: 'FIO_SCRT_API_TOKEN_PATH',
        },
        serverPath: {
          format: String,
          // TODO: set empty
          // default: 'api/v1/namespaces',
          default: '',
          env: 'FIO_SCRT_SERVER_PATH',
        },
        cachePrefix: {
          format: String,
          // TODO: set empty
          // default: 'ogscrt',
          default: 'pre',
          env: 'FIO_SCRT_CACHE_PREFIX',
        },
        name: {
          format: String,
          default: '',
          env: 'FIO_SCRT_NAME',
        },
        namespace: {
          format: String,
          default: '',
          env: 'FIO_SCRT_NAMESPACE',
        },
        signKey: {
          format: String,
          default: '',
          env: 'FIO_SCRT_SIGN_KEY',
        },
        remoteUrl: {
          format: String,
          default: '',
          env: 'FIO_SCRT_REMOTE_URL',
        },
        expiresIn: {
          doc: 'Secret expiration time in seconds',
          format: 'int',
          default: 60,
          env: 'FIO_SCRT_EXPIRES_IN',
        },
      },
      jwt: {
        validAtKey: {
          format: String,
          default: '',
          env: 'FIO_JWT_VALID_AT_KEY',
        },
        key: {
          format: String,
          default: '',
          env: 'FIO_JWT_KEY',
        },
        prevKey: {
          format: String,
          default: '',
          env: 'FIO_JWT_PREV_KEY',
        },
        expiresIn: {
          doc: 'JWT token expiration time in seconds',
          format: 'int',
          default: 60,
          env: 'FIO_JWT_EXPIRES_IN',
        },
      },
    });

    const configFile = cfg.get('config');
    if (configFile) {
      cfg.loadFile(configFile);
    }
  }

  return cfg;
}

export default config;
