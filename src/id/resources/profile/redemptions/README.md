## Redemptions

Profile redemption functionality for the current authenticated profile (`/profiles/me`).

### Get Redemption

Retrieves a redemption by ID.

```javascript
const redemptionId = 123

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.redemptions.get(redemptionId)
  .then((response) => {
    console.log('Redemption:', response)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```

### List Redemptions

Retrieves redemptions for the current profile.

```javascript
const params = {
  'page[size]': 20,
  'page[number]': 1
}

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.redemptions.list(params)
  .then((response) => {
    // paginated response
    console.log('Redemptions:', response)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```

### Count Redemptions

Retrieves redemption count for a given type/id pair.

```javascript
const redemptionType = 'benefit' // RedemptionType
const id = 1

const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.redemptions.count(redemptionType, id)
  .then((response) => {
    // { count: number }
    console.log('Redemption count:', response.count)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```