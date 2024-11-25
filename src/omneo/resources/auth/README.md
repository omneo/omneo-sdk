### createAPIToken(body: APITokenInput): Promise<any>

This method creates an API token.

- `body`: An object of type `APITokenInput` containing the necessary information to create the API token.

Returns a promise that resolves to the response from the server.

## Usage

Here's an example of how to use the `createAPIToken` method:

```javascript
const token = await omneoClient.auth.createAPIToken('test-token', ['read-profiles', 'write-profiles'])
```

