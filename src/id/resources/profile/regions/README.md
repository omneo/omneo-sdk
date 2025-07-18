## Regions

Profile regions management functionality.
This allows customers to retrieve information about regions associated with their profile.

### List Regions

Retrieves a list of regions for the current profile.
```javascript
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.regions.list()
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```
### Create Region

Create profile region for the current profile.
```javascript
const params = {
  "region_id": 3,
  "country": "USA",
  "state": "NY"
}
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.regions.create(params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Update Region

Update the region for the current profile.
```javascript
const regionId = 1
const params = {
  "region_id": 3,
  "country": "USA",
  "state": "NY"
}
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.regions.update(regionId, params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```
### Delete Region

Delete the specific region by it's id for the current profile.
```javascript
const regionId = 1
const IDClient = new ID({ tenant: 'your-tenant', IDToken: 'your-id-token', config: {} })
IDClient.profile.regions.delete(regionId)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```