import { Omneo } from '..'
import { RequestParams } from '../types'

async function getTenantCustomFields (this: Omneo, params: RequestParams): Promise<any> {
  return this.call({
    method: 'get',
    endpoint: '/tenants/custom-fields',
    params
  }).then((response) => {
    return response.data
  })
}

export default getTenantCustomFields
