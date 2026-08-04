### createAPIToken(body: APITokenInput): Promise<any>

This method creates an API token.

- `body`: An object of type `APITokenInput` containing the necessary information to create the API token.

Returns a promise that resolves to the response from the server.

## Usage

Here's an example of how to use the `createAPIToken` method:

```javascript
const token = await omneoClient.auth.createAPIToken('test-token', ['read-profiles', 'write-profiles'])
```

### getAPITokens(params?: RequestParams): Promise<APITokenResponse>

This method lists the tenant's API tokens.

- `params`: Optional query parameters, for example `type` (`current` / `expired`), `filter[name]` and `page[size]` / `page[number]`.

The endpoint is paginated, so this returns the full envelope (`data`, `links`, `meta`) rather than a bare array.

```javascript
    omneoClient.auth.getAPITokens({ type: 'current', 'filter[name]': 'test-token' })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
```

