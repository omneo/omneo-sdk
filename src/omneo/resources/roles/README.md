### `get(id: number): Promise<Role>`

Retrieves a role by its ID.

Parameters:
- `id` (rule): The ID of the profile to retrieve.

Returns:
- A Promise that resolves to the retrieved role.

Example usage:

```javascript
const role = await omneoClient.roles.get(1);
console.log(role);
```

### `list(): Promise<Role>`

Retrieves paginated roles

Returns:
- A Promise that resolves a paginated list of roles.

Example usage:

```javascript
const roles = await omneoClient.roles.list();
console.log(roles.data);
```
