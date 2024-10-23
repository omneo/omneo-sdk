## get
```typescript
get(id: string): Promise<any>
```
Retrieves a specific product by its ID.

Example usage:
```typescript
const product = await omneoClient.products.get('12345');
console.log(product);
```

## getProductVariant
```typescript
getProductVariant(productID: string, variantID: string, params: RequestParams)
```
Retrieves a specific variant of a product.

Example usage:
```typescript
const variant = await omneoClient.products.getProductVariant('12345', '67890', { sort: 'price' });
console.log(variant);
```

## deleteProductVariant
```typescript
deleteProductVariant(productID: string, variantID: string)
```
Deletes a specific variant of a product.

Example usage:
```typescript
await omneoClient.products.deleteProductVariant('12345', '67890');
console.log('Variant deleted successfully');
```

## updateProductVariant
```typescript
omneoClient.products.updateProductVariant(productID: string, variantID: string, body: any)
```
Updates a specific variant of a product.

Example usage:
```typescript
const updatedVariant = await omneoClient.products.updateProductVariant('12345', '67890', { price: 19.99 });
console.log(updatedVariant);
```

## listProductVariants
```typescript
omneoClient.products.listProductVariants(productID: string, params: RequestParams)
```
Lists all variants of a specific product.

Example usage:
```typescript
const variants = await omneoClient.products.listProductVariants('12345', { sort: 'name' });
console.log(variants);
```

## listVariants
```typescript
omneoClient.products.listVariants(params: RequestParams)
```
Lists all variants of all omneoClient.products.

Example usage:
```typescript
const variants = await omneoClient.products.listVariants({ sort: 'price' });
console.log(variants);
```

## update
```typescript
omneoClient.products.update(id: string, body: any): Promise<any>
```
Updates a specific product by its ID.

Example usage:
```typescript
const updatedProduct = await omneoClient.products.update('12345', { name: 'New Product' });
console.log(updatedProduct);
```

## delete
```typescript
omneoClient.products.delete(id: string): Promise<any>
```
Deletes a specific product by its ID.

Example usage:
```typescript
await omneoClient.products.delete('12345');
console.log('Product deleted successfully');
```

## list
```typescript
omneoClient.products.list(params?: RequestParams): Promise<any>
```
Lists all omneoClient.products.

Example usage:
```typescript
const productList = await omneoClient.products.list({ sort: 'name' });
console.log(productList);
```

## create
```typescript
omneoClient.products.create(body: any): Promise<any>
```
Creates a new product.

Example usage:
```typescript
const newProduct = await omneoClient.products.create({ name: 'New Product', price: 9.99 });
console.log(newProduct);
```

## queue
```typescript
omneoClient.products.queue(body: any): Promise<{data: string}>
```
Queues a product for processing.

Example usage:
```typescript
const queueResponse = await omneoClient.products.queue({ productID: '12345' });
console.log(queueResponse.data);
```
