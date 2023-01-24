import { Omneo } from '..'
import { TenantCustomFieldRequest } from '../types'

async function createTenantCustomField (this: Omneo, body: TenantCustomFieldRequest): Promise<any> {
  return this.call({
    method: 'post',
    endpoint: '/tenants/custom-fields',
    body
  }).then((response) => {
    return response.data
  })
}

export default createTenantCustomField
