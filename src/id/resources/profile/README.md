# Profile Class

This class represents a profile resource in the ID SDK.

## Functions

### `me()`

Get the current authenticated profile

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.get().then((profile) => {
    console.log(profile)
})
```


### `purge()`

Deletes the current authenticated profile compliant with GDPR
Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.purge();
```

### `getAggregations(params?: RequestParams): Promise<Aggregations>`

Retrieves the aggregations for the current authenticated profile

Parameters:
- `params` (optional): Additional request parameters.

Returns a promise that resolves to the aggregations data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getAggregations().then((aggregations) => {
    console.log(aggregations);
});
```

### `calculateAggregations(params?: RequestParams): Promise<Aggregations>`

Calculates the aggregations for the current authenticated profile

Parameters:
- `params` (optional): Additional request parameters.

Returns a promise that resolves to the calculated aggregations data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.calculateAggregations().then((aggregations) => {
    console.log(aggregations);
});
```

### `getBalances(params: object): Promise<ProfileBalances>`

Retrieves the balances for the current authenticated profile

Parameters:
- `params`: Additional request parameters.

Returns a promise that resolves to the profile balances data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getBalances({}).then((balances) => {
    console.log(balances);
});
```

### `findTransactions(filter: { field: TransactionFilters, value: string })`

Finds transactions for the profile based on the specified filter.

Parameters:
- `filter`: An object containing the filter field and value.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.findTransactions({ field: 'status', value: 'completed' }).then((transactions) => {
    console.log(transactions);
});
```

### `getGroupedTransactions(params?: { pageSize?: number, pageNumber?: number }): Promise<GroupedTransactionsResponse>`

Retrieves the grouped transactions for the current authenticated profile

Parameters:
- `params` (optional): Additional request parameters.

Returns a promise that resolves to the grouped transactions data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getGroupedTransactions().then((groupedTransactions) => {
    console.log(groupedTransactions);
});
```

### `createIdentity(body: IdentityRequest)`

Creates a new identity for the current authenticated profile

Parameters:
- `body`: The identity request body.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.createIdentity({ name: 'John Doe', email: 'john.doe@example.com' });
```

### `getIdentities()`

Retrieves the identities associated with the current authenticated profile

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getIdentities().then((identities) => {
    console.log(identities);
});
```

### `getIdentityById(identityID: string)`

Retrieves an identity by its ID.

Parameters:
- `identityID`: The ID of the identity.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getIdentityById('12345').then((identity) => {
    console.log(identity);
});
```

### `updateIdentity(identityID: string, body: any)`

Updates an identity with the specified ID.

Parameters:
- `identityID`: The ID of the identity.
- `body`: The updated identity data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.updateIdentity('12345', { name: 'John Doe' });
```

### `deleteIdentity(identityID: string)`

Deletes an identity with the specified ID.

Parameters:
- `identityID`: The ID of the identity.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.deleteIdentity('12345');
```

### `getLedgers(): Promise<(TransactionLedger | OrderLedger)[]>`

Retrieves the ledgers associated with the current authenticated profile

Returns a promise that resolves to an array of transaction and order ledgers.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getLedgers().then((ledgers) => {
    console.log(ledgers);
});
```

### `getLedgerById(id: string): Promise<(TransactionLedger | OrderLedger)>`

Retrieves a ledger by its ID.

Parameters:
- `id`: The ID of the ledger.

Returns a promise that resolves to the ledger data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getLedgerById('12345').then((ledger) => {
    console.log(ledger);
});
```

### `getRegions(): Promise<Region[] | []>`

Retrieves the regions associated with the current authenticated profile

Returns a promise that resolves to an array of regions.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getRegions().then((regions) => {
    console.log(regions);
});
```

### `resync()`

Resynchronizes the current authenticated profile

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.resync();
```

### `getRewards(): Promise<Reward[] | []>`

Retrieves the rewards associated with the current authenticated profile

Returns a promise that resolves to an array of rewards.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getRewards().then((rewards) => {
    console.log(rewards);
});
```

### `getTiers(): Promise<Tier[] | []>`

Retrieves the tiers associated with the current authenticated profile

Returns a promise that resolves to an array of tiers.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getTiers().then((tiers) => {
    console.log(tiers);
});
```

### `calculateTiers(): Promise<TierProgress>`

Calculates the tier progress for the current authenticated profile

Returns a promise that resolves to the tier progress data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.calculateTiers().then((tierProgress) => {
    console.log(tierProgress);
});
```

### `assignTier(tierDefinitionHandle: string): Promise<TierProgress>`

Assigns a tier to the current authenticated profile

Parameters:
- `tierDefinitionHandle`: The handle of the tier definition.

Returns a promise that resolves to the updated tier progress data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.assignTier('gold').then((tierProgress) => {
    console.log(tierProgress);
});
```

### `getTransactions(): Promise<Transaction[] | []>`

Retrieves the transactions associated with the current authenticated profile

Returns a promise that resolves to an array of transactions.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getTransactions().then((transactions) => {
    console.log(transactions);
});
```

### `getTransactionByID(id: string): Promise<Transaction>`

Retrieves a transaction by its ID.

Parameters:
- `id`: The ID of the transaction.

Returns a promise that resolves to the transaction data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getTransactionByID('12345').then((transaction) => {
    console.log(transaction);
});
```

### `getComms(): Promise<ProfileComms>`

Retrieves the communication preferences for the current authenticated profile

Returns a promise that resolves to the profile communication data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getComms().then((comms) => {
    console.log(comms);
});
```

### `getAppearances(): Promise<ProfileAppearance>`

Retrieves the appearance attributes for the current authenticated profile

Returns a promise that resolves to the profile appearance data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getAppearances().then((appearances) => {
    console.log(appearances);
});
```

### `getCustomAttribute(namespace: string, handle: string): Promise<CustomAttribute>`

Retrieves a custom attribute by its namespace and handle.

Parameters:
- `namespace`: The namespace of the custom attribute.
- `handle`: The handle of the custom attribute.

Returns a promise that resolves to the custom attribute data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getCustomAttribute('namespace', 'handle').then((customAttribute) => {
    console.log(customAttribute);
});
```

### `getCustomAttributes(): Promise<CustomAttribute>`

Retrieves all custom attributes for the current authenticated profile

Returns a promise that resolves to the custom attributes data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.getCustomAttributes().then((customAttributes) => {
    console.log(customAttributes);
});
```

### `updateCustomAttribute(namespace: string, handle: string, body: { value?: any, type: string }): Promise<CustomAttribute>`

Updates a custom attribute with the specified namespace and handle.

Parameters:
- `namespace`: The namespace of the custom attribute.
- `handle`: The handle of the custom attribute.
- `body`: The updated custom attribute data.

Returns a promise that resolves to the updated custom attribute data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {}})
IDClient.profile.updateCustomAttribute('namespace', 'handle', { value: 'new value', type: 'string' }).then((customAttribute) => {
    console.log(customAttribute);

### `getInteractions(): Promise<Interaction[]>`

Retrieves the interactions associated with the current authenticated profile.

Returns a promise that resolves to an array of interactions.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.getInteractions().then((interactions) => {
    console.log(interactions);
});
```

### `getInteractionById(id: string): Promise<Interaction>`

Retrieves an interaction by its ID.

Parameters:
- `id`: The ID of the interaction.

Returns a promise that resolves to the interaction data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.getInteractionById('12345').then((interaction) => {
    console.log(interaction);
});
```

### `updateInteraction(id: string): Promise<Interaction>`

Updates an interaction with the specified ID.

Parameters:
- `id`: The ID of the interaction.

Returns a promise that resolves to the updated interaction data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.updateInteraction('12345').then((interaction) => {
    console.log(interaction);
});
```

### `createInteraction(): Promise<Interaction>`

Creates a new interaction for the current authenticated profile.

Returns a promise that resolves to the created interaction data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.createInteraction().then((interaction) => {
    console.log(interaction);
});
```

### `deleteInteraction(id: string): Promise<Interaction>`

Deletes an interaction with the specified ID.

Parameters:
- `id`: The ID of the interaction.

Returns a promise that resolves to the deleted interaction data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.deleteInteraction('12345').then((interaction) => {
    console.log(interaction);
});
```

### `Connection(connectionID: number): Profile`

Creates a new instance of the `Profile` class with a specific connection ID.
This will be similar to new Profile() but all the requests, instead of requesting /profiles/me/*,
They will instead request /profile/connection/{connectionID}/*

Parameters:
- `connectionID`: The ID of the connection.

Returns a new `Profile` instance with the specified connection ID.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
const connectionProfile = new IDClient.profile.Connection(12345);
const profileData = await connectionProfile.get()
await connectionProfile.update({ first_name: 'New_First_Name' })
```

### `getConnections(): Promise<Connection[]>`

Retrieves the connections associated with the current authenticated profile.

Returns a promise that resolves to an array of connections.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.getConnections().then((connections) => {
    console.log(connections);
});
```

### `getConnectionByID(connectionID: string): Promise<Connection>`

Retrieves a connection by its ID.

Parameters:
- `connectionID`: The ID of the connection.

Returns a promise that resolves to the connection data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.getConnectionByID('12345').then((connection) => {
    console.log(connection);
});
```

### `updateConnection(connectionID: string): Promise<Connection>`

Updates a connection with the specified ID.

Parameters:
- `connectionID`: The ID of the connection.

Returns a promise that resolves to the updated connection data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.updateConnection('12345').then((connection) => {
    console.log(connection);
});
```

### `deleteConnection(connectionID: string): Promise<Connection>`

Deletes a connection with the specified ID.

Parameters:
- `connectionID`: The ID of the connection.

Returns a promise that resolves to the deleted connection data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.deleteConnection('12345').then((connection) => {
    console.log(connection);
});
```

### `updateType(type: ProfileType): Promise<Profile>`

Updates the profile type of the current user.

Parameters:
- `type`: The new profile type to be set.

Returns a promise that resolves to the updated profile data.

Example usage:

```javascript
const IDClient = new ID({ tenant: 'your-tenant', omneoAPIToken: 'your-token', config: {} })
IDClient.profile.updateType('active').then((profile) => {
    console.log(profile);
});
```