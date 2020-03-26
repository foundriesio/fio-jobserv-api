An interface to interact with api.foundries.io remote resources.

## How to use it

```JavaScript
import cache from '@foundriesio/redis-cache';
import { Factories } from '@foundriesio/jobserv-api';

return new Factories(uri, cache);
```

## Configuration

Via a JSON file with the following structure:

```JSON
{
  "secrets": {
    "caCertPath": "Path to the CA cert on the system",
    "apiTokenPath": "Path to the API token on the system",
    "serverPath": "Server path where the CA cart/token are stored",
    "cachePrefix": "Prefix to store the secret in cache",
    "name": "The name of the secret",
    "namespace": "The namespace where the secret is stored",
    "signKey": "The signing key",
    "remoteUrl": "The remote URL of the server where the secrets are stored",
    "expiresIn": "Expiration time in seconds of the secret",
  },
  "jwt": {
    "validAtKey": "JWT internal key for valid date",
    "key": "The JWT actual key",
    "prevKey": "The JWT previous key",
    "expiresIn": "JWT token expiration time in seconds"
  }
}
```

The JSON file can be defined using the `FIO_CONFIG_FILE` environment variable:

```bash
export FIO_CONFIG_FILE="/path/to/config.json"
```

Or using the following environment variable:

- `FIO_SCRT_CA_CERT_PATH`: Path to the CA cert on the system.
- `FIO_SCRT_API_TOKEN_PATH`: Path to the API token on the system.
- `FIO_SCRT_SERVER_PATH`: Server path where the CA cart/token are stored.
- `FIO_SCRT_CACHE_PREFIX`: Prefix to store the secret in cache.
- `FIO_SCRT_NAME`: The name of the secret.
- `FIO_SCRT_NAMESPACE`: The namespace where the secret is stored.
- `FIO_SCRT_SIGN_KEY`: The signing key.
- `FIO_SCRT_REMOTE_URL`: The remote URL of the server where the secrets are stored.
- `FIO_SCRT_EXPIRES_IN`: Expiration time in seconds of the secret.
- `FIO_JWT_PREV_KEY`: JWT internal key for valid date.
- `FIO_JWT_KEY`: The JWT actual key.
- `FIO_JWT_VALID_AT_KEY`: The JWT previous key.
- `FIO_JWT_EXPIRES_IN`: JWT token expiration time in seconds.
