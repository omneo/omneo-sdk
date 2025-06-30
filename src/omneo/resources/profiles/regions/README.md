## Regions

Profile regions management functionality.
This allows customers to retrieve information about regions associated with their profile.

### List Profile Regions

Retrieves a list of regions for the current profile.

```javascript
const profileId = 'profile123';
omneoClient.profiles.regions.list(profileId)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Create Profile Region

Create profile region for the current profile.
```javascript
const profileId = 'profile123';
const params = {
  "region_id": 3,
  "country": "USA",
  "state": "NY"
}
omneoClient.profiles.regions.create(profileId, params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

### Update Profile Region

Update the region for the current profile.
```javascript
const profileId = 'profile123';
const regionId = 1
const params = {
  "region_id": 3,
  "country": "USA",
  "state": "NY"
}
omneoClient.profiles.regions.update(profileId, regionId, params)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```
### Delete Profile Region

Delete the specific region by it's id for the current profile.
```javascript
const profileId = 'profile123';
const regionId = 1
omneoClient.profiles.regions.delete(profileId, regionId)
  .then((data) => {
    // handle response data
    console.log('Response data:', data)
  })
  .catch((error) => {
    // handle error
    console.error('Error:', error)
  })
```

