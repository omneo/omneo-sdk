## Class Functions

### requestAuthToken

The `requestAuthToken` function is used to request an authentication token from the server. It takes a `body` object as a parameter, which should contain the `id` and optionally the `id_handle`. The function returns a Promise that resolves to the response data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
const body = {
    id: 'example-id',
    id_handle: 'example-id-handle'
}

IDClient.auth.requestAuthToken(body)
    .then((data) => {
        // Handle the response data
    })
    .catch((error) => {
        // Handle any errors
    })
```

### isTokenExpired

The `isTokenExpired` function is used to check if the authentication token has expired. It returns `true` if the token has expired, and `false` otherwise.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})

if (IDClient.auth.isTokenExpired()) {
    // Token has expired
} else {
    // Token is still valid
}
```

### getProfileID

The `getProfileID` function is used to retrieve the profile ID from the authentication token. It parses the token and returns the profile ID.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})

const profileID = IDClient.auth.getProfileID()
// Use the profile ID as needed
```

That's it! You now know how to use the class functions in the `Auth` file. Happy coding!
