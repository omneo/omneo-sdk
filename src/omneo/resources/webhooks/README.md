# Webhooks Resource

This module provides methods to interact with the webhooks API. It allows you to get, list, create, update, and delete webhooks.

## Importing

```javascript
import { RequestParams, Webhook, WebhookResponse } from '../../../types';
import Resource from '../resource.js';
```

## Class: `Webhooks`

### Methods

#### `get(id: number, params?: RequestParams): Promise<Webhook>`

Fetches a webhook by its ID.

- **Parameters:**
    - `id` (number): The ID of the webhook.
    - `params` (RequestParams, optional): Additional request parameters.

- **Returns:** `Promise<Webhook>`

#### `list(params?: RequestParams): Promise<WebhookResponse>`

Lists all webhooks.

- **Parameters:**
    - `params` (RequestParams, optional): Additional request parameters.

- **Returns:** `Promise<WebhookResponse>`

#### `create(body: any): Promise<Webhook>`

Creates a new webhook.

- **Parameters:**
    - `body` (any): The request body containing webhook details.

- **Returns:** `Promise<Webhook>`

#### `update(id: number, body: any): Promise<Webhook>`

Updates an existing webhook by its ID.

- **Parameters:**
    - `id` (number): The ID of the webhook.
    - `body` (any): The request body containing updated webhook details.

- **Returns:** `Promise<Webhook>`

#### `delete(id: number): Promise<void>`

Deletes a webhook by its ID.

- **Parameters:**
    - `id` (number): The ID of the webhook.

- **Returns:** `Promise<void>`

## Example Usage

```javascript
const webhooks = new Webhooks(client);

// Get a webhook
webhooks.get(1).then(webhook => console.log(webhook));

// List all webhooks
webhooks.list().then(response => console.log(response));

// Create a new webhook
webhooks.create({ url: 'https://example.com/webhook' }).then(webhook => console.log(webhook));

// Update a webhook
webhooks.update(1, { url: 'https://example.com/updated-webhook' }).then(webhook => console.log(webhook));

// Delete a webhook
webhooks.delete(1).then(() => console.log('Webhook deleted'));
```