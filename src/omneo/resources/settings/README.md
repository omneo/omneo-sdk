### `list(params?: RequestParams): Promise<Setting[]>`

Retrieves a list of settings.

Parameters:
- `params` (optional): Query parameters to filter the settings.

Returns:
- A Promise that resolves to an array of settings.

Example usage:

```javascript
const settings = await omneoClient.settings.list();
console.log(settings);
```

### `get(handle: string): Promise<Setting>`

Retrieves a setting by its handle.

Parameters:
- `handle`: The handle of the setting to retrieve.

Returns:
- A Promise that resolves to the retrieved setting.

Example usage:

```javascript
const setting = await omneoClient.settings.get('example-handle');
console.log(setting);
```

### `update(handle: string, body: SettingInput): Promise<Setting>`

Updates a setting by its handle.

Parameters:
- `handle`: The handle of the setting to update.
- `body`: The new data for the setting.

Returns:
- A Promise that resolves to the updated setting.

Example usage:

```javascript
const updatedSetting = await omneoClient.settings.update('example-handle', { key: 'value' });
console.log(updatedSetting);
```

### `getEnvironment(params?: RequestParams): Promise<{ handle: string, value: any }[]>`

Retrieves environment settings.

Parameters:
- `params` (optional): Query parameters to filter the environment settings.

Returns:
- A Promise that resolves to an array of environment settings.

Example usage:

```javascript
const environmentSettings = await omneoClient.settings.getEnvironment();
console.log(environmentSettings);
```
