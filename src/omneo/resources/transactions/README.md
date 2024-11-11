### `get(id: string, params: RequestParams): Promise<Transaction>`

Retrieves a transaction by its ID.

Example usage:

```typescript
const transactionId = '12345'
const params = { includeDetails: true }

omneoClient.transactions.get(transactionId, params)
    .then((transaction) => {
        console.log(transaction)
    })
    .catch((error) => {
        console.error(error)
    })
```

### `getByExternalID(externalID: string, params: RequestParams): Promise<Transaction>`

Retrieves a transaction by its external ID.

Example usage:

```typescript
const externalId = 'ext-12345'
const params = { includeDetails: true }

omneoClient.transactions.getByExternalID(externalId, params)
    .then((transaction) => {
        console.log(transaction)
    })
    .catch((error) => {
        console.error(error)
    })
```

### `create(body: any): Promise<Transaction>`

Creates a new transaction.

Example usage:

```typescript
const transactionData = { amount: 100, currency: 'USD' }

omneoClient.transactions.create(transactionData)
    .then((transaction) => {
        console.log(transaction)
    })
    .catch((error) => {
        console.error(error)
    })
```

### `delete(id: string): Promise<Transaction>`

Deletes a transaction by its ID.

Example usage:

```typescript
const transactionId = '12345'

omneoClient.transactions.delete(transactionId)
    .then((transaction) => {
        console.log(transaction)
    })
    .catch((error) => {
        console.error(error)
    })
```

### `list(params: RequestParams): Promise<{data: Array<Transaction>, links: any, meta: any}>`

Lists all omneoClient.transactions.

Example usage:

```typescript
const params = { limit: 10, offset: 0 }

omneoClient.transactions.list(params)
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.error(error)
    })
```

### `update(id: string, body: any): Promise<Transaction>`

Updates a transaction by its ID.

Example usage:

```typescript
const transactionId = '12345'
const updatedData = { amount: 200 }

omneoClient.transactions.update(transactionId, updatedData)
    .then((transaction) => {
        console.log(transaction)
    })
    .catch((error) => {
        console.error(error)
    })
```

### `queue(body: any): Promise<{data: string}>`

Queues a transaction for processing.

Example usage:

```typescript
const transactionData = { amount: 100, currency: 'USD' }

omneoClient.transactions.queue(transactionData)
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.error(error)
    })
```

### `resend(id: string)`

Resends a transaction.

Example usage:

```typescript
const transactionId = '12345'

omneoClient.transactions.resend(transactionId)
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.error(error)
    })
```

### `resendItem(transactionItemID: string)`

Resends a specific transaction item.

Example usage:

```typescript
const transactionItemId = 'item-12345'

omneoClient.transactions.resendItem(transactionItemId)
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.error(error)
    })
```
