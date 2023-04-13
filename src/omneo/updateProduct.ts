import { Omneo } from '..'

async function updateProduct (this: Omneo, productID: string, body: any): Promise<any> {
  return this.call({
    method: 'put',
    endpoint: `/products/${productID}`,
    body
  }).then((response) => {
    return response.data
  })
}

export default updateProduct
