### `get(id: string, params?: RequestParams): Promise<Profile>`

Retrieves a profile by its ID.

Parameters:
- `id` (string): The ID of the profile to retrieve.
- `params` (optional): Additional request parameters.

Returns:
- A Promise that resolves to the retrieved profile.

Example usage:

```javascript
const profile = await omneoClient.omneoClient.profiles.get('profile_id');
console.log(profile);
```

### `findByIdentity(identifier: string, handle: string): Promise<Profile>`

Finds a profile by its identity.

Parameters:
- `identifier` (string): The identifier of the identity.
- `handle` (string): The handle of the identity.

Returns:
- A Promise that resolves to the found profile.

Example usage:

```javascript
const profile = await omneoClient.omneoClient.profiles.findByIdentity('identifier', 'handle');
console.log(profile);
```

### `findByEmail(email: string, params?: RequestParams): Promise<Profile>`

Finds a profile by its email.

Parameters:
- `email` (string): The email of the profile.
- `params` (optional): Additional request parameters.

Returns:
- A Promise that resolves to the found profile.

Example usage:

```javascript
const profile = await omneoClient.omneoClient.profiles.findByEmail('email@example.com');
console.log(profile);
```

### `list(params?: RequestParams): Promise<Profile[]>`

Lists all omneoClient.profiles.

Parameters:
- `params` (optional): Additional request parameters.

Returns:
- A Promise that resolves to an array of omneoClient.profiles.

Example usage:

```javascript
const profiles = await omneoClient.profiles.list();
console.log(profiles);
```

### `update(id: string, body: any, options: { retryMobileSecondary?: Boolean } = {}): Promise<Profile>`

Updates a profile.

Parameters:
- `id` (string): The ID of the profile to update.
- `body` (any): The updated profile data.
- `options` (optional): Additional options for the update.

Returns:
- A Promise that resolves to the updated profile.

Example usage:

```javascript
const updatedProfile = await omneoClient.profiles.update('profile_id', { name: 'John Doe' });
console.log(updatedProfile);
```

### `delete(id: string)`

Deletes a profile.

Parameters:
- `id` (string): The ID of the profile to delete.

Example usage:

```javascript
await omneoClient.profiles.delete('profile_id');
```

### `purge(id: string)`

Purges a profile.

Parameters:
- `id` (string): The ID of the profile to purge.

Example usage:

```javascript
await omneoClient.profiles.purge('profile_id');
```

### `resync(id: string): Promise<Profile>`

Resynchronizes a profile.

Parameters:
- `id` (string): The ID of the profile to resync.

Returns:
- A Promise that resolves to the resynchronized profile.

Example usage:

```javascript
const resyncedProfile = await omneoClient.profiles.resync('profile_id');
console.log(resyncedProfile);
```

### `checkAvailability(body: { mobile_phone?: string, email?: string })`

Checks the availability of a mobile phone number or email.

Parameters:
- `body` (object): The body of the request containing the mobile phone number or email.

Example usage:

```javascript
await omneoClient.profiles.checkAvailability({ mobile_phone: '1234567890' });
```

### `create(body: any, options: { retryMobileSecondary?: Boolean } = {})`

Creates a new profile.

Parameters:
- `body` (any): The data for the new profile.
- `options` (optional): Additional options for the creation.

Example usage:

```javascript
await omneoClient.profiles.create({ name: 'John Doe', email: 'john.doe@example.com' });
```

### `createByDelegation(body: any, delegation: DelegationData, options: { retryMobileSecondary?: Boolean } = {})`

Creates a new profile by delegation.

Parameters:
- `body` (any): The data for the new profile.
- `delegation` (DelegationData): The delegation data.
- `options` (optional): Additional options for the creation.

Example usage:

```javascript
await omneoClient.profiles.createByDelegation({ name: 'John Doe' }, delegationData);
```

### `createIdentity(profileID: string, body: IdentityRequest)`

Creates a new identity for a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `body` (IdentityRequest): The data for the new identity.

Example usage:

```javascript
await omneoClient.profiles.createIdentity('profile_id', { type: 'email', identifier: 'john.doe@example.com' });
```

### `getIdentities(profileID: string, params: RequestParams): Promise<any>`

Retrieves the identities associated with a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `params` (RequestParams): Additional request parameters.

Returns:
- A Promise that resolves to the retrieved identities.

Example usage:

```javascript
const identities = await omneoClient.profiles.getIdentities('profile_id');
console.log(identities);
```

### `getIdentityById(profileID: string, identityID: string)`

Retrieves an identity by its ID.

Parameters:
- `profileID` (string): The ID of the profile.
- `identityID` (string): The ID of the identity.

Example usage:

```javascript
const identity = await omneoClient.profiles.getIdentityById('profile_id', 'identity_id');
console.log(identity);
```

### `updateIdentity(profileID: string, identityID: string, body: any)`

Updates an identity.

Parameters:
- `profileID` (string): The ID of the profile.
- `identityID` (string): The ID of the identity.
- `body` (any): The updated identity data.

Example usage:

```javascript
await omneoClient.profiles.updateIdentity('profile_id', 'identity_id', { type: 'email', identifier: 'new.email@example.com' });
```

### `deleteIdentity(profileID: string, identityID: string)`

Deletes an identity.

Parameters:
- `profileID` (string): The ID of the profile.
- `identityID` (string): The ID of the identity.

Example usage:

```javascript
await omneoClient.profiles.deleteIdentity('profile_id', 'identity_id');
```

### `createInteraction(body: InteractionRequest)`

Creates a new interaction.

Parameters:
- `body` (InteractionRequest): The data for the new interaction.

Example usage:

```javascript
await omneoClient.profiles.createInteraction({ type: 'click', timestamp: '2022-01-01T00:00:00Z' });
```

### `createAddress(profileID: string, body: AddressRequest): Promise<Address>`

Creates a new address for a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `body` (AddressRequest): The data for the new address.

Returns:
- A Promise that resolves to the created address.

Example usage:

```javascript
const address = await omneoClient.profiles.createAddress('profile_id', { street: '123 Main St', city: 'New York' });
console.log(address);
```

### `deleteAddress(profileID: string, addressID: string): Promise<Address>`

Deletes an address from a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `addressID` (string): The ID of the address.

Returns:
- A Promise that resolves to the deleted address.

Example usage:

```javascript
const deletedAddress = await omneoClient.profiles.deleteAddress('profile_id', 'address_id');
console.log(deletedAddress);
```

### `updateAddress(profileID: string, addressID: string, body: AddressUpdateRequest): Promise<Address>`

Updates an address.

Parameters:
- `profileID` (string): The ID of the profile.
- `addressID` (string): The ID of the address.
- `body` (AddressUpdateRequest): The updated address data.

Returns:
- A Promise that resolves to the updated address.

Example usage:

```javascript
const updatedAddress = await omneoClient.profiles.updateAddress('profile_id', 'address_id', { city: 'San Francisco' });
console.log(updatedAddress);
```

### `findIdentityInProfile(profile: Profile, options: { handle?: string, identifier?: string, findLatest?: boolean }): Identity|undefined`

Finds an identity in a profile.

Parameters:
- `profile` (Profile): The profile to search in.
- `options` (object): Additional options for the search.

Returns:
- The found identity or `undefined` if not found.

Example usage:

```javascript
const identity = omneoClient.profiles.findIdentityInProfile(profile, { handle: 'email', identifier: 'john.doe@example.com' });
console.log(identity);
```

### `getRewards(profileID: string, params: object): Promise<Reward[] | []>`

Retrieves the rewards associated with a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `params` (object): Additional request parameters.

Returns:
- A Promise that resolves to an array of rewards or an empty array.

Example usage:

```javascript
const rewards = await omneoClient.profiles.getRewards('profile_id');
console.log(rewards);
```

### `getPoints(profileID: string, params: object): Promise<any>`

Retrieves the points associated with a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `params` (object): Additional request parameters.

Returns:
- A Promise that resolves to the retrieved points.

Example usage:

```javascript
const points = await omneoClient.profiles.getPoints('profile_id');
console.log(points);
```

### `getInteractions(profileID: string, params: object): Promise<Interaction[]>`

Retrieves the interactions associated with a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `params` (object): Additional request parameters.

Returns:
- A Promise that resolves to an array of interactions.

Example usage:

```javascript
const interactions = await omneoClient.profiles.getInteractions('profile_id');
console.log(interactions);
```

### `getComms(id: string, params?: RequestParams): Promise<ProfileComms>`

Retrieves the communication preferences of a profile.

Parameters:
- `id` (string): The ID of the profile.
- `params` (optional): Additional request parameters.

Returns:
- A Promise that resolves to the communication preferences.

Example usage:

```javascript
const comms = await omneoClient.profiles.getComms('profile_id');
console.log(comms);
```

### `getBalances(profileID: string, params: object): Promise<ProfileBalances>`

Retrieves the balances associated with a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `params` (object): Additional request parameters.

Returns:
- A Promise that resolves to the retrieved balances.

Example usage:

```javascript
const balances = await omneoClient.profiles.getBalances('profile_id');
console.log(balances);
```

### `getAppearances(id: string, params?: RequestParams): Promise<ProfileAppearance>`

Retrieves the appearance attributes of a profile.

Parameters:
- `id` (string): The ID of the profile.
- `params` (optional): Additional request parameters.

Returns:
- A Promise that resolves to the appearance attributes.

Example usage:

```javascript
const appearances = await omneoClient.profiles.getAppearances('profile_id');
console.log(appearances);
```

### `getAggregations(id: string, params?: RequestParams): Promise<Aggregations>`

Retrieves the aggregations associated with a profile.

Parameters:
- `id` (string): The ID of the profile.
- `params` (optional): Additional request parameters.

Returns:
- A Promise that resolves to the retrieved aggregations.

Example usage:

```javascript
const aggregations = await omneoClient.profiles.getAggregations('profile_id');
console.log(aggregations);
```

### `calculateAggregations(id: string, params?: RequestParams): Promise<Aggregations>`

Calculates the aggregations associated with a profile.

Parameters:
- `id` (string): The ID of the profile.
- `params` (optional): Additional request parameters.

Returns:
- A Promise that resolves to the calculated aggregations.

Example usage:

```javascript
const aggregations = await omneoClient.profiles.calculateAggregations('profile_id');
console.log(aggregations);
```

### `isSubscribed(comms: ProfileComms, prefix: 'email' | 'sms' | 'post' | 'push' | 'phone'): Boolean`

Checks if a profile is subscribed to a communication channel.

Parameters:
- `comms` (ProfileComms): The communication preferences of the profile.
- `prefix` ('email' | 'sms' | 'post' | 'push' | 'phone'): The communication channel prefix.

Returns:
- `true` if the profile is subscribed, `false` otherwise.

Example usage:

```javascript
const isSubscribed = omneoClient.profiles.isSubscribed(comms, 'email');
console.log(isSubscribed);
```

### `isUnsubscribed(comms: ProfileComms, prefix: 'email' | 'sms' | 'post' | 'push' | 'phone'): Boolean`

Checks if a profile is unsubscribed from a communication channel.

Parameters:
- `comms` (ProfileComms): The communication preferences of the profile.
- `prefix` ('email' | 'sms' | 'post' | 'push' | 'phone'): The communication channel prefix.

Returns:
- `true` if the profile is unsubscribed, `false` otherwise.

Example usage:

```javascript
const isUnsubscribed = omneoClient.profiles.isUnsubscribed(comms, 'email');
console.log(isUnsubscribed);
```

### `subscribe(profileID: string, channel: CommsChannel): Promise<ProfileComms>`

Subscribes a profile to a communication channel.

Parameters:
- `profileID` (string): The ID of the profile.
- `channel` (CommsChannel): The communication channel.

Returns:
- A Promise that resolves to the updated communication preferences.

Example usage:

```javascript
const updatedComms = await omneoClient.profiles.subscribe('profile_id', 'email');
console.log(updatedComms);
```

### `unsubscribe(profileID: string, channel: CommsChannel, options: {toggleOptOut: boolean}): Promise<ProfileComms>`

Unsubscribes a profile from a communication channel.

Parameters:
- `profileID` (string): The ID of the profile.
- `channel` (CommsChannel): The communication channel.
- `options` (object): Additional options for the unsubscribe.

Returns:
- A Promise that resolves to the updated communication preferences.

Example usage:

```javascript
const updatedComms = await omneoClient.profiles.unsubscribe('profile_id', 'email', { toggleOptOut: true });
console.log(updatedComms);
```

### `redeem(profileID: string, amount: number): Promise<Redeem>`

Redeems points for a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `amount` (number): The amount of points to redeem.

Returns:
- A Promise that resolves to the redemption details.

Example usage:

```javascript
const redemption = await omneoClient.profiles.redeem('profile_id', 100);
console.log(redemption);
```

### `getConnections(profileID: string): Promise<Connection>`

Retrieves the connections associated with a profile.

Parameters:
- `profileID` (string): The ID of the profile.

Returns:
- A Promise that resolves to the retrieved connections.

Example usage:

```javascript
const connections = await omneoClient.profiles.getConnections('profile_id');
console.log(connections);
```

### `getConnectionByID(profileID: string, connectionID: number): Promise<Connection>`

Retrieves a connection by its ID.

Parameters:
- `profileID` (string): The ID of the profile.
- `connectionID` (number): The ID of the connection.

Returns:
- A Promise that resolves to the retrieved connection.

Example usage:

```javascript
const connection = await omneoClient.profiles.getConnectionByID('profile_id', 123);
console.log(connection);
```

### `getConnectionProfileInfo(profileID: string, connectionID: number): Promise<Partial<Profile>>`

Retrieves the profile information associated with a connection.

Parameters:
- `profileID` (string): The ID of the profile.
- `connectionID` (number): The ID of the connection.

Returns:
- A Promise that resolves to the retrieved profile information.

Example usage:

```javascript
const profileInfo = await omneoClient.profiles.getConnectionProfileInfo('profile_id', 123);
console.log(profileInfo);
```

### `getCustomAttribute(profileID: string, namespace: string, handle: string): Promise<CustomAttribute>`

Retrieves a custom attribute of a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `namespace` (string): The namespace of the custom attribute.
- `handle` (string): The handle of the custom attribute.

Returns:
- A Promise that resolves to the retrieved custom attribute.

Example usage:

```javascript
const customAttribute = await omneoClient.profiles.getCustomAttribute('profile_id', 'namespace', 'handle');
console.log(customAttribute);
```

### `getCustomAttributes(id: string): Promise<CustomAttribute>`

Retrieves all custom attributes of a profile.

Parameters:
- `id` (string): The ID of the profile.

Returns:
- A Promise that resolves to the retrieved custom attributes.

Example usage:

```javascript
const customAttributes = await omneoClient.profiles.getCustomAttributes('profile_id');
console.log(customAttributes);
```

### `updateCustomAttribute(profileID: string, namespace: string, handle: string, body: { value?: any, type: string }): Promise<CustomAttribute>`

Updates a custom attribute of a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `namespace` (string): The namespace of the custom attribute.
- `handle` (string): The handle of the custom attribute.
- `body` (object): The updated custom attribute data.

Returns:
- A Promise that resolves to the updated custom attribute.

Example usage:

```javascript
const updatedAttribute = await omneoClient.profiles.updateCustomAttribute('profile_id', 'namespace', 'handle', { value: 'new value', type: 'string' });
console.log(updatedAttribute);
```

### `getProfileDates(profileID: string): Promise<any>`

Retrieves the date attributes of a profile.

Parameters:
- `profileID` (string): The ID of the profile.

Returns:
- A Promise that resolves to the retrieved date attributes.

Example usage:

```javascript
const profileDates = await omneoClient.profiles.getProfileDates('profile_id');
console.log(profileDates);
```

### `getTransactions(profileID: string, params: object): Promise<Array<Transaction> | []>`

Retrieves the transactions associated with a profile.

Parameters:
- `profileID` (string): The ID of the profile.
- `params` (object): Additional request parameters.

Returns:
- A Promise that resolves to an array of transactions or an empty array.

Example usage:

```javascript
const transactions = await omneoClient.profiles.getTransactions('profile_id');
console.log(transactions);
```

### `getTransactionByID(profileID: string, transactionID: string): Promise<Transaction>`
