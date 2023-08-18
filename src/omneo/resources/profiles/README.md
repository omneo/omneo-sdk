### Create

<details>
<summary>How to create an Profile</summary>
<br />

```javascript
  const payload = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com'
  }
  const newProfile = await omneoClient.profiles.create(payload)
```
ℹ️ Check our API reference for more information on how to [create an Profile](https://omneo.readme.io/reference/createprofile).
</details>

### Get

<details>
<summary>How to find an Profile</summary>
<br />

```javascript
  // Find a profile by ID
  const myProfileById = await omneoClient.profiles.get('9911a027-1099-4f4d-b919-d803b003335d') // This is an example profile ID
  // Find by Email
  const myProfileByEmail = await omneoClient.profiles.findByEmail('johndoe@example.com')
  // Find by attribute
  const  myProfileByFirstName = await omneoClient.profiles.list({ 'filter[first_name]': 'John' })
  // List all Profiles
  const allProfiles = await omneoClient.profiles.list({ 'page[size]': 10 })
  // Find by Identity
  const profileByIdentity = await omneoClient.profiles.findByIdentity('1234', 'shopify')

```
ℹ️ Check our API reference for more information on how to [get a Profile](https://omneo.readme.io/reference/indexprofile).
</details>

### Update

<details>
<summary>How to update an Profile</summary>
<br />

```javascript
  const payload = {
    first_name: 'Jane',
  }

  // Find a profile ID, then update the first_name
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')
  if (myProfile) {
    await omneoclient.profiles.update(payload)
  }
```
ℹ️ Check our API reference for more information on how to [update an Profile](https://omneo.readme.io/reference/updateprofile).
</details>

### Delete

<details>
<summary>How to delete a Profile</summary>
<br />

```javascript
  // Find a profile ID, then delete
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')
  if (myProfile) {
    await omneoclient.profiles.delete(myProfile.id)
  }
```
ℹ️ Check our API reference for more information on how to [delete a Profile](https://omneo.readme.io/reference/deleteprofile).
</details>

### Check Availability

<details>
<summary>How to check a profile is available</summary>
<br />

```javascript
  // Check availability by Mobile
  const existingByMobile = await omneoClient.profiles.checkAvailability({ mobile_phone: '0404113331'})
    // Check availability by Email
  const existingByEmail = await omneoClient.profiles.checkAvailability({ email: 'johndoe@example.com'})
```
</details>

### Resync

<details>
<summary>How to resync a Profile</summary>
<br />

```javascript
  // Find a profile ID, then delete
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')
  if (myProfile) {
    await omneoclient.profiles.resync(myProfile.id)
  }
```
</details>

## Identities

### Create, Update And Delete

<details>
<summary>How to handle a profile identity</summary>
<br />

```javascript
  // Find a profile ID, then add an identity to it
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')
  if (!myProfile) return

  const myIdentity = await omneoClient.profiles.createIdentity(myProfile.id, { handle: 'shopify', is_ative: true, identifier: '12441'})
  
  // Update the identity with a different value
  const updatedIdentity = await omneoClient.profiles.updateIdentity(myProfile.id, myIdentity.id, { identifier: '3213'})

  // Delete the identity
  await omneoClient.profiles.deleteIdentity(myIdentity.id)
```
</details>

## Interactions

### Create

<details>
<summary>How to create a profile interaction</summary>
<br />

```javascript
  // Find a profile ID, then add an interaction to it
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')
  if (!myProfile) return

  const myInteraction = await omneoClient.profiles.createInteraction({
    profile_id: myProfile.id, action: 'broadcast', channel: 'email', signal: 1
  })
```
</details>


## Addresses

### Create, Update Delete

<details>
<summary>How to handle profile addresses</summary>
<br />

```javascript
  // Find a profile ID, then add an interaction to it
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')
  if (!myProfile) return

  const addressPayload = {
    city: 'Melbourne',
    state: 'Victoria',
    iso_state: 'VIC',
    iso: 'AU',
    country: 'Australia',
    address_line_1: '1 Test st',
    postcode: '3000'
  }
  // Create the address
  const myAddress = await omneoClient.profiles.createAddress(myProfile.id, addressPayload)

  // Update the address
  const updatedAddress = omneoClient.profiles.updateAddress(myProfile.id, myAddress.id, { address_line_1: '2 Test st '})

  // Delete the address
  await omneoClient.profiles.deleteAddress(myProfile.id, myAddress.id)
```
</details>


## Rewards

<details>
<summary>Get rewards</summary>
<br />

```javascript
  // Find a profile ID, then add an interaction to it
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')
  await omneoClient.profiles.getRewards(myProfile.id)
```
</details>

## Rewards, Points and Balances

<details>
<summary>Get rewards, points or balances</summary>
<br />

```javascript
  // Find a profile ID, then add an interaction to it
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')
  const rewards = await omneoClient.profiles.getRewards(myProfile.id)
  const points = await omneoClient.profiles.getPoints(myProfile.id)
  const balances = await omneoClient.profiles.getBalances(myProfile.id)

```
</details>

## Appearance and Comms

<details>
<summary>get Appearances or Comms</summary>
<br />

```javascript
  // Find a profile ID, then add an interaction to it
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')
  const appearances = omneoClient.profiles.getAppearances(myProfile.id)
  const comms = omneoClient.profiles.getComms(myProfile.id)
```
</details>

## Subscribe, or Unsubscribe a profile

<details>
<summary>Quickly Subscribe or Unsubscribe a profile</summary>
<br />

```javascript
  // Find a profile ID, then add an interaction to it
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')

  const { attributes: { comms }} = myProfile

  // isSubscribed/isUnsubscribed opposites and can be used in whichever way is easier to read in context

  // The quick way to check subscription to a platform
  const isSubscribedToEmail = await omneoClient.profiles.isSubscribed(comms, 'email')
  // The quick way to check if the profile is unsubscribed from a platform
  const isUnsubscribedFromEmail = await omneoClient.profiles.isUnsubscribed(comms, 'email')

  // The quick way to subscribe a profile to a platform
  await omneoClient.profiles.subscribe(myProfile.id, 'email')

  // The quick way to unsubscribe a profile to a platform (without triggering email_optout)
    await omneoClient.profiles.unsubscribe(myProfile.id, 'email')
  // The above can also be unsubscribed using the heavy handed master opt_out flag `[platform]_optout`
  await omneoClient.profiles.unsubscribe(myProfile.id, 'email', { toggleOptOut: true })
```
</details>

## Profile Lists

<details>
<summary>Get profile lists</summary>
<br />

```javascript
  // Find a profile ID, then add an interaction to it
  const myProfile = await omneoClient.profiles.findByEmail('johndoe@example.com')
  const profileLists = omneoClient.profiles.getLists(myProfile.id)
```
</details>