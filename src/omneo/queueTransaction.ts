import { Omneo } from '..'

async function queueTransaction (this: Omneo, body: any): Promise<{data: string}> {
  return this.call({
    method: 'post',
    endpoint: '/transactions/queue',
    body
  }).then((response) => {
    return response.data
  })
}

export default queueTransaction
