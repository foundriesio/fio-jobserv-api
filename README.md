An interface to interact with api.foundries.io remote resources.

## How to use it

```JavaScript
import { generateFioApiResources } from '@foundriesio/jobserv-api';

const FioApi = generateFioApiResources(address);

await FioApi.Projects.find(...args);
```
