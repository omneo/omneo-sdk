
### List Currencies

To retrieve a list of currencies, use the `list` method:

```javascript
import { CurrencyResponse, RequestParams } from '../../../types';
import Resource from '../resource.js';

export default class Currencies extends Resource {
    list(params?: RequestParams): Promise<CurrencyResponse> {
        return this.client.call({
            method: 'get',
            endpoint: '/currencies',
            params
        });
    }
}

// Usage example
const params = { /* your request parameters */ };
omneoClient.currencies.list(params)
    .then((currencies) => {
        console.log(currencies);
    })
    .catch((error) => {
        console.error(error);
    });
```

