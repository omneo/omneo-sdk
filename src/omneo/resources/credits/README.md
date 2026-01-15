# Credits

This document provides examples of how to use the `Credits` class to manage credits in your application.

## Get Credit 

To retrieve a specific credit , use the `get` method:

```javascript
const creditId = 123
omneoClient.credits.get(creditId)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## List Credits

To retrieve a list of credits, use the `list` method:

```javascript

const params = {
  'filter[profile_id]': 'xxx'
}
omneoClient.credits.list(params)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## Create Credit 

To create a new credit , use the `create` method:

```javascript
const payload = {
    "credit_definition_id": 1,
    "credit_definition_handle": "gift-voucher",
    "profile_id": "xxx",
    "creator_profile_id": "xxx",
    "staff_id": "xxx",
    "name": "Gift Voucher",
    "timezone": "Australia/Melbourne",
    "issued_at": "2026-01-14 10:00:00",
    "expires_at": "2028-11-18 10:00:00",
    "released_at": "2026-01-14 10:00:00",
    "recipient_first_name": "example",
    "recipient_email": "example@arkade.com.au",
    "message": "Happy Message for you!",
    "value_initial": 100,
    "value_remaining": 100,
    "credit_number": "1000019219",
    "security_code": "1113"
}
omneoClient.credits.create(payload)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## Extend Credit 

To create extend some credits , use the `extend` method:

```javascript
const creditId1 = 521
const creditId2 = 522
const payload = {
    "profile_id": "xxx",
    "ids": [
        creditId1,
        creditId2
    ],
    "extend_days": 3
}
omneoClient.credits.extend(payload)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## Update Credit 

To update a specific credit , use the `update` method:

```javascript
const creditId = 123
const payload = {
    "name": "Gift Voucher for",
    "timezone": "Australia/Melbourne",
    "issued_at": "2026-01-14 12:00:00",
    "expires_at": "2028-11-18 12:00:00",
    "released_at": "2026-01-14 12:00:00",
    "recipient_first_name": "example2",
    "recipient_email": "example@arkade.com.au",
    "message": "Happy Credit for you updated!",
    "value_initial": 200,
    "value_remaining": 200,
    "credit_number": "1000019220",
    "security_code": "1113"
}

omneoClient.credits.update(creditId, payload)
    .then((data) => {
      // handle response data
      console.log('Response data:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```

## Delete Benefit 

To delete a credit , use the `delete` method:

```javascript
const creditId = 123
omneoClient.credits.delete(creditId)
    .then((data) => {
      // handle response
      console.log('Response:', data)
    })
    .catch((error) => {
      // handle error
      console.error('Error:', error)
    })
```
