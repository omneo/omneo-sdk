
# Users Resource Documentation

## Get User

To retrieve a specific user, use the `get` method:

```javascript
omneoClient.users.get(1423)
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.error(error);
    });
```

## List Users

To retrieve a list of users, use the `list` method:

```javascript
omneoClient.users.list()
    .then((users) => {
        console.log(users);
    })
    .catch((error) => {
        console.error(error);
    });
```

## Create User

To create a new user, use the `create` method:

```javascript
const newUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'mypassword123123123',
    password_confirmation: 'mypassword123123123'
    // other properties
};

omneoClient.users.create(newUser)
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.error(error);
    });
```

## Update User

To update an existing user, use the `update` method:

```javascript
const updatedUser = {
    name: 'Jane Doe',
    // other properties
};

omneoClient.users.update(1423, updatedUser)
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.error(error);
    });
```

## Delete User

To delete a user, use the `delete` method:

```javascript
omneoClient.users.delete(1432)
    .then(() => {
        console.log('User deleted successfully');
    })
    .catch((error) => {
        console.error(error);
    });
```