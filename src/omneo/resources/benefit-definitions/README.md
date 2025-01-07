# Benefit Definitions

This document provides examples of how to use the `BenefitDefinitions` class to manage benefit definitions in your application.

## Get Benefit Definition

To retrieve a specific benefit definition, use the `get` method:

```javascript
omneoClient.benefitDefinitions.get(1423)
    .then((benefitDefinition) => {
        console.log(benefitDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

## Get Benefit Definition by handle

To retrieve a specific benefit definition by its handle, use the `getByHandle` method:

```javascript
omneoClient.benefitDefinitions.getByHandle('my-benefit')
    .then((benefitDefinition) => {
        console.log(benefitDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

## List Benefit Definitions

To retrieve a list of benefit definitions, use the `list` method:

```javascript
omneoClient.benefitDefinitions.list()
    .then((benefitDefinitions) => {
        console.log(benefitDefinitions)
    })
    .catch((error) => {
        console.error(error)
    })
```

## Create Benefit Definition

To create a new benefit definition, use the `create` method:

```javascript
const payload = {
    name: 'Test Benefit',
    handle: 'test-benefit',
    value: 10,
    period: 30,
    period_type: 'days',
    type: 'spend',
    is_assignable: true,
    is_published: true
}

omneoClient.benefitDefinitions.create(payload)
    .then((benefitDefinition) => {
        console.log(benefitDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

## Update Benefit Definition

To update a specific benefit definition, use the `update` method:

```javascript
const payload = {
    name: 'Test Benefit 2'
}

omneoClient.benefitDefinitions.update(1342, payload)
    .then((benefitDefinition) => {
        console.log(benefitDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

## Delete Benefit Definition

To delete a benefit definition, use the `delete` method:

```javascript
omneoClient.benefitDefinitions.delete(1342)
    .then(() => {
        console.log('Benefit definition deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```

## Clone Benefit Definition

To create a copy a specific benefit definition, use the `clone` method:
The handle is required, but you can also add additional parameters to be applied to the newly created definition

```javascript
const payload = {
    name: 'Test Benefit 2', // The clone will have use this name
    handle: 'my-newly-cloned-benefit-definition' // Required
    // Other benefit definition parameters here
}

omneoClient.benefitDefinitions.clone(1342, payload)
    .then((benefitDefinition) => {
        console.log(benefitDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```