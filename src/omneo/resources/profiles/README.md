# Table of Contents

- [Addresses](./addresses/README.md)
- [Aggregations](./aggregations/README.md)
- [Balances](./balances/README.md)
- [Connections](./connections/README.md)
- [Identities](./identities/README.md)
- [Interactions](./interactions/README.md)
- [Ledgers](./ledgers/README.md)
- [Points](./points/README.md)
- [Regions](./regions/README.md)
- [Rewards](./rewards/README.md)
- [Tiers](./tiers/README.md)
- [Transactions](./transactions/README.md)

- Attributes
    - [Apperance](./attributes/APPEARANCE.md)
    - [Comms](./attributes/COMMS.md)
    - [Custom](./attributes/CUSTOM.md)
    - [Dates](./attributes/DATES.md)
- Lists
    - [List](./lists/LIST.md)
    - [Items](./lists/ITEMS.md)
## get
```typescript
get(id: string, params?: RequestParams): Promise<Profile>
```
Retrieves a specific profile by its ID.

Example usage:
```typescript
const profile = await omneoClient.profiles.get('12345');
console.log(profile);
```

## list
```typescript
list(params?: RequestParams): Promise<ProfileResponse>
```
Lists all profiles.

Example usage:
```typescript
const profiles = await omneoClient.profiles.list({ sort: 'name' });
console.log(profiles);
```

## update
```typescript
update(id: string, body: any, options?: { retryMobileSecondary?: Boolean }): Promise<Profile>
```
Updates a specific profile by its ID.

Example usage:
```typescript
const updatedProfile = await omneoClient.profiles.update('12345', { name: 'New Name' });
console.log(updatedProfile);
```

## delete
```typescript
delete(id: string): Promise<any>
```
Deletes a specific profile by its ID.

Example usage:
```typescript
await omneoClient.profiles.delete('12345');
console.log('Profile deleted successfully');
```

## purge
```typescript
purge(id: string): Promise<void>
```
Permanently deletes a specific profile by its ID.

Example usage:
```typescript
await omneoClient.profiles.purge('12345');
console.log('Profile purged successfully');
```

## create
```typescript
create(body: any, options?: { retryMobileSecondary?: Boolean }): Promise<Profile>
```
Creates a new profile.

Example usage:
```typescript
const newProfile = await omneoClient.profiles.create({ name: 'New Profile' });
console.log(newProfile);
```

## resync
```typescript
resync(id: string): Promise<Profile>
```
Resyncs a specific profile by its ID.

Example usage:
```typescript
const resyncedProfile = await omneoClient.profiles.resync('12345');
console.log(resyncedProfile);
```

## sync
```typescript
sync(updatedAt?: string): Promise<{ message: string }>
```
Syncs profiles updated since a specific date.

Example usage:
```typescript
const syncResponse = await omneoClient.profiles.sync('2023-01-01');
console.log(syncResponse);
```

## findByIdentity
```typescript
findByIdentity(identifier: string, handle: string): Promise<Profile>
```
Finds a profile by its identity.

Example usage:
```typescript
const profile = await omneoClient.profiles.findByIdentity('identifier', 'handle');
console.log(profile);
```

## findByEmail
```typescript
findByEmail(email: string, params?: RequestParams): Promise<Profile>
```
Finds a profile by its email.

Example usage:
```typescript
const profile = await omneoClient.profiles.findByEmail('user@example.com');
console.log(profile);
```

## checkAvailability
```typescript
checkAvailability(body: { mobile_phone?: string, email?: string }): Promise<any>
```
Checks the availability of a profile by mobile phone or email.

Example usage:
```typescript
const availability = await omneoClient.profiles.checkAvailability({ email: 'user@example.com' });
console.log(availability);
```

## createByDelegation
```typescript
createByDelegation(body: any, delegation: DelegationData, options?: { retryMobileSecondary?: Boolean }): Promise<Profile>
```
Creates a profile by delegation.

Example usage:
```typescript
const newProfile = await omneoClient.profiles.createByDelegation({ name: 'New Profile' }, delegationData);
console.log(newProfile);
```

## isSubscribed
```typescript
isSubscribed(comms: ProfileComms, prefix: 'email' | 'sms' | 'post' | 'push' | 'phone'): Boolean
```
Checks if a profile is subscribed to a communication channel.

Example usage:
```typescript
const subscribed = omneoClient.profiles.isSubscribed(profileComms, 'email');
console.log(subscribed);
```

## isUnsubscribed
```typescript
isUnsubscribed(comms: ProfileComms, prefix: 'email' | 'sms' | 'post' | 'push' | 'phone'): Boolean
```
Checks if a profile is unsubscribed from a communication channel.

Example usage:
```typescript
const unsubscribed = omneoClient.profiles.isUnsubscribed(profileComms, 'email');
console.log(unsubscribed);
```

## subscribe
```typescript
subscribe(profileID: string, channel: CommsChannel): Promise<ProfileComms>
```
Subscribes a profile to a communication channel.

Example usage:
```typescript
const updatedComms = await omneoClient.profiles.subscribe('12345', 'email');
console.log(updatedComms);
```

## unsubscribe
```typescript
unsubscribe(profileID: string, channel: CommsChannel, options: { toggleOptOut: boolean }): Promise<ProfileComms>
```
Unsubscribes a profile from a communication channel.

Example usage:
```typescript
const updatedComms = await omneoClient.profiles.unsubscribe('12345', 'email', { toggleOptOut: true });
console.log(updatedComms);
```

## redeem
```typescript
redeem(profileID: string, amount: number): Promise<Redeem>
```
Redeems a specific amount for a profile.

Example usage:
```typescript
const redeemResponse = await omneoClient.profiles.redeem('12345', 100);
console.log(redeemResponse);
```

## merge
```typescript
merge(sourceProfileID: string, destinationProfileId: string): Promise<Profile>
```
Merges two profiles.

Example usage:
```typescript
const mergedProfile = await omneoClient.profiles.merge('sourceID', 'destinationID');
console.log(mergedProfile);
```

## updateType
```typescript
updateType(profileID: string, type: ProfileType): Promise<Profile>
```
Updates the type of a profile.

Example usage:
```typescript
const updatedProfile = await omneoClient.profiles.updateType('12345', 'newType');
console.log(updatedProfile);
```

## batch
```typescript
batch(matchCriteria: ProfileBatchMatchCriteria, profiles: Partial<ProfileInput>[]): Promise<any>
```
Batches multiple profile updates.

Example usage:
```typescript
const batchResponse = await omneoClient.profiles.batch(matchCriteria, profiles);
console.log(batchResponse);
```
