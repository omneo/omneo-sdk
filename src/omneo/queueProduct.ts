import { Omneo } from '..'

async function queueProduct (this: Omneo, body: any): Promise<{data: string}> {
  return this.call({
    method: 'post',
    endpoint: '/products/queue',
    body
  }).then((response) => {
    return response.data
  })
}

export default queueProduct
