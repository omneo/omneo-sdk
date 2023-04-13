import { Omneo } from '..'

async function createProduct (this: Omneo, body: any): Promise<any> {
  return this.call({
    method: 'post',
    endpoint: '/products',
    body
  }).then((response) => {
    return response.data
  })
}

export default createProduct
