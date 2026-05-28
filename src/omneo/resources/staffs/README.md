### List Staff

To retrieve staff records, use the `list` method:

```javascript

const handle = 'team-handle'
omneoClient.staffs.list(handle)
	.then((staff) => {
		console.log(staff)
	})
	.catch((error) => {
		console.error(error)
	})
```

### Create Staff

To create a new staff record, use the `create` method:

```javascript
const payload = {
	first_name: 'Jane',
	last_name: 'Doe',
	email: 'jane.doe@example.com'
}

omneoClient.staffs.create(payload)
	.then((staff) => {
		console.log(staff)
	})
	.catch((error) => {
		console.error(error)
	})
```

### Update Staff

To update a specific staff record, use the `update` method:

```javascript
const payload = {
	first_name: 'Janet'
}

omneoClient.staffs.update(123, payload)
	.then((staff) => {
		console.log(staff)
	})
	.catch((error) => {
		console.error(error)
	})
```

### Delete Staff

To delete a staff record, use the `delete` method:

```javascript
omneoClient.staffs.delete(123)
	.then(() => {
		console.log('Staff deleted successfully')
	})
	.catch((error) => {
		console.error(error)
	})
```
