## get
```typescript
get(id: string): Promise<any>
```
Retrieves a specific product by its ID.

Example usage:
```typescript
const product = await omneoClient.products.get('12345');
console.log(product);
```

## getProductVariant
```typescript
getProductVariant(productID: string, variantID: string, params: RequestParams)
```
Retrieves a specific variant of a product.

Example usage:
```typescript
const variant = await omneoClient.products.getProductVariant('12345', '67890', { sort: 'price' });
console.log(variant);
```

## deleteProductVariant
```typescript
deleteProductVariant(productID: string, variantID: string)
```
Deletes a specific variant of a product.

Example usage:
```typescript
await omneoClient.products.deleteProductVariant('12345', '67890');
console.log('Variant deleted successfully');
```

## updateProductVariant
```typescript
omneoClient.products.updateProductVariant(productID: string, variantID: string, body: any)
```
Updates a specific variant of a product.

Example usage:
```typescript
const updatedVariant = await omneoClient.products.updateProductVariant('12345', '67890', { price: 19.99 });
console.log(updatedVariant);
```

## listProductVariants
```typescript
omneoClient.products.listProductVariants(productID: string, params: RequestParams)
```
Lists all variants of a specific product.

Example usage:
```typescript
const variants = await omneoClient.products.listProductVariants('12345', { sort: 'name' });
console.log(variants);
```

## listVariants
```typescript
omneoClient.products.listVariants(params: RequestParams)
```
Lists all variants of all omneoClient.products.

Example usage:
```typescript
const variants = await omneoClient.products.listVariants({ sort: 'price' });
console.log(variants);
```

## update
```typescript
omneoClient.products.update(id: string, body: any): Promise<any>
```
Updates a specific product by its ID.

Example usage:
```typescript
const updatedProduct = await omneoClient.products.update('12345', { name: 'New Product' });
console.log(updatedProduct);
```

## delete
```typescript
omneoClient.products.delete(id: string): Promise<any>
```
Deletes a specific product by its ID.

Example usage:
```typescript
await omneoClient.products.delete('12345');
console.log('Product deleted successfully');
```

## list
```typescript
omneoClient.products.list(params?: RequestParams): Promise<any>
```
Lists all omneoClient.products.

Example usage:
```typescript
const productList = await omneoClient.products.list({ sort: 'name' });
console.log(productList);
```

## create
```typescript
omneoClient.products.create(body: any): Promise<any>
```
Creates a new product.

Example usage:
```typescript
const newProduct = await omneoClient.products.create({ name: 'New Product', price: 9.99 });
console.log(newProduct);
```

## queue
```typescript
omneoClient.products.queue(body: any): Promise<{data: string}>
```
Queues a product for processing.

Example usage:
```typescript
const queueResponse = await omneoClient.products.queue({ productID: '12345' });
console.log(queueResponse.data);
```
## get
```typescript
get(): Promise<ProfileType>
```
Retrieves the profile of the current user.

Example usage:
```typescript
const profile = await omneoClient.profile.get();
console.log(profile);
```

## update
```typescript
update(body: Profile): Promise<ProfileType>
```
Updates the profile of the current user.

Example usage:
```typescript
const updatedProfile = await omneoClient.profile.update({ name: 'New Name' });
console.log(updatedProfile);
```

## delete
```typescript
delete(): Promise<ProfileType>
```
Deletes the profile of the current user.

Example usage:
```typescript
await omneoClient.profile.delete();
console.log('Profile deleted successfully');
```

## purge
```typescript
purge(): Promise<void>
```
Permanently deletes the profile of the current user.

Example usage:
```typescript
await omneoClient.profile.purge();
console.log('Profile purged successfully');
```

## getInteractions
```typescript
getInteractions(params?: object): Promise<Interaction[]>
```
Retrieves interactions of the current user.

Example usage:
```typescript
const interactions = await omneoClient.profile.getInteractions({ type: 'purchase' });
console.log(interactions);
```

## getInteractionById
```typescript
getInteractionById(id: string): Promise<Interaction>
```
Retrieves a specific interaction by its ID.

Example usage:
```typescript
const interaction = await omneoClient.profile.getInteractionById('12345');
console.log(interaction);
```

## updateInteraction
```typescript
updateInteraction(id: string): Promise<Interaction>
```
Updates a specific interaction by its ID.

Example usage:
```typescript
const updatedInteraction = await omneoClient.profile.updateInteraction('12345');
console.log(updatedInteraction);
```

## createInteraction
```typescript
createInteraction(body: InteractionInput): Promise<Interaction>
```
Creates a new interaction.

Example usage:
```typescript
const newInteraction = await omneoClient.profile.createInteraction({ type: 'purchase', details: '...' });
console.log(newInteraction);
```

## deleteInteraction
```typescript
deleteInteraction(id: string): Promise<void>
```
Deletes a specific interaction by its ID.

Example usage:
```typescript
await omneoClient.profile.deleteInteraction('12345');
console.log('Interaction deleted successfully');
```

## getAggregations
```typescript
getAggregations(params?: RequestParams): Promise<Aggregations>
```
Retrieves aggregations for the current user.

Example usage:
```typescript
const aggregations = await omneoClient.profile.getAggregations({ type: 'purchase' });
console.log(aggregations);
```

## calculateAggregations
```typescript
calculateAggregations(params?: RequestParams): Promise<Aggregations>
```
Calculates aggregations for the current user.

Example usage:
```typescript
const calculatedAggregations = await omneoClient.profile.calculateAggregations({ type: 'purchase' });
console.log(calculatedAggregations);
```

## getBalances
```typescript
getBalances(params?: object): Promise<ProfileBalances>
```
Retrieves balances for the current user.

Example usage:
```typescript
const balances = await omneoClient.profile.getBalances();
console.log(balances);
```

## findTransactions
```typescript
findTransactions(filter: { field: TransactionFilters, value: string }): Promise<Transaction | null>
```
Finds transactions based on a filter.

Example usage:
```typescript
const transaction = await omneoClient.profile.findTransactions({ field: 'status', value: 'completed' });
console.log(transaction);
```

## getGroupedTransactions
```typescript
getGroupedTransactions(params?: { pageSize?: number, pageNumber?: number }): Promise<GroupedTransactionsResponse>
```
Retrieves grouped transactions for the current user.

Example usage:
```typescript
const groupedTransactions = await omneoClient.profile.getGroupedTransactions({ pageSize: 10, pageNumber: 1 });
console.log(groupedTransactions);
```

## createIdentity
```typescript
createIdentity(body: IdentityRequest): Promise<void>
```
Creates a new identity for the current user.

Example usage:
```typescript
await omneoClient.profile.createIdentity({ type: 'email', value: 'user@example.com' });
console.log('Identity created successfully');
```

## getIdentities
```typescript
getIdentities(): Promise<Identity[]>
```
Retrieves identities for the current user.

Example usage:
```typescript
const identities = await omneoClient.profile.getIdentities();
console.log(identities);
```

## getIdentityById
```typescript
getIdentityById(identityID: string): Promise<Identity>
```
Retrieves a specific identity by its ID.

Example usage:
```typescript
const identity = await omneoClient.profile.getIdentityById('12345');
console.log(identity);
```

## updateIdentity
```typescript
updateIdentity(identityID: string, body: any): Promise<Identity>
```
Updates a specific identity by its ID.

Example usage:
```typescript
const updatedIdentity = await omneoClient.profile.updateIdentity('12345', { value: 'new@example.com' });
console.log(updatedIdentity);
```

## deleteIdentity
```typescript
deleteIdentity(identityID: string): Promise<void>
```
Deletes a specific identity by its ID.

Example usage:
```typescript
await omneoClient.profile.deleteIdentity('12345');
console.log('Identity deleted successfully');
```

## getLedgers
```typescript
getLedgers(): Promise<(TransactionLedger | OrderLedger)[]>
```
Retrieves ledgers for the current user.

Example usage:
```typescript
const ledgers = await omneoClient.profile.getLedgers();
console.log(ledgers);
```

## getLedgerById
```typescript
getLedgerById(id: string): Promise<(TransactionLedger | OrderLedger)>
```
Retrieves a specific ledger by its ID.

Example usage:
```typescript
const ledger = await omneoClient.profile.getLedgerById('12345');
console.log(ledger);
```

## getRegions
```typescript
getRegions(): Promise<Region[]>
```
Retrieves regions for the current user.

Example usage:
```typescript
const regions = await omneoClient.profile.getRegions();
console.log(regions);
```

## resync
```typescript
resync(): Promise<void>
```
Resyncs the profile of the current user.

Example usage:
```typescript
await omneoClient.profile.resync();
console.log('Profile resynced successfully');
```

## getRewards
```typescript
getRewards(params?: object): Promise<Reward[]>
```
Retrieves rewards for the current user.

Example