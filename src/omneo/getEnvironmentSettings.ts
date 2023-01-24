import { Omneo } from '..'
import { RequestParams } from '../types'

async function getEnvironmentSettings (this: Omneo, params: RequestParams): Promise<any> {
  return this.call({
    method: 'get',
    endpoint: '/settings/environment',
    params
  }).then((response) => {
    return response.data
  })
}

export default getEnvironmentSettings
