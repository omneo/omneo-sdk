# Achievement Definitions

This document provides examples of how to use the `AchievementDefinitions` class to manage achievement definitions in your application.

## Get Achievement Definition

To retrieve a specific achievement definition, use the `get` method:

```javascript
omneoClient.achievementDefinitions.get(2)
    .then((achievementDefinition) => {
        console.log(achievementDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

## List Achievement Definitions

To retrieve a list of achievement definitions, use the `list` method:

```javascript
omneoClient.achievementDefinitions.list()
    .then((achievementDefinitions) => {
        console.log(achievementDefinitions)
    })
    .catch((error) => {
        console.error(error)
    })
```

## Create Achievement Definition

To create a new achievement definition, use the `create` method:

```javascript
const payload = {
    "name": "Monthly Spend Test",
    "handle": "monthly-spend-test",
    "description": "Tracks monthly spend for monthly rewards",
    "is_published": true,
    "display_level": true,
    "display_option": "visible",
    "short_description": "Your Spend Progress",
    "levels": [
        {
            "name": "0100-01-01 00:00:00",
            "achievement_definition_id": 2,
            "display_number": 1,
            "trigger": 100,
            "repeats": false,
            "allow_multiple_earn": true,
            "meta": {
                "unlocks": [
                    {
                        "type": "reward_definition",
                        "id_type": "handle"
                    }
                ]
            }
        },
        {
            "name": "0250-01-01 00:00:00",
            "achievement_definition_id": 2,
            "display_number": 2,
            "trigger": 250,
            "repeats": false,
            "meta": {
                "unlocks": [
                    {
                        "type": "reward_definition",
                        "id_type": "handle"
                    }
                ]
            }
        },
    ],
    "tags": [],
    "meta": {
        "period": "monthly",
        "timezone": "Australia/Melbourne",
        "include_shop_count": true
    },
    "enable_annual_earn_cycle": false
}

omneoClient.achievementDefinitions.create(payload)
    .then((achievementDefinition) => {
        console.log(achievementDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

## Update Achievement Definition

To update a specific achievement definition, use the `update` method:

```javascript
const payload = {
    name: 'Test Achievement 2'
}

omneoClient.achievementDefinitions.update(2, payload)
    .then((achievementDefinition) => {
        console.log(achievementDefinition)
    })
    .catch((error) => {
        console.error(error)
    })
```

## Delete Achievement Definition

To delete a achievement definition, use the `delete` method:

```javascript
omneoClient.achievementDefinitions.delete(2)
    .then(() => {
        console.log('Achievement definition deleted successfully')
    })
    .catch((error) => {
        console.error(error)
    })
```
