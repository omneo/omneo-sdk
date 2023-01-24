import { Omneo } from '..'

async function updateTenantCustomField (this: Omneo, namespace: string, handle: string, body: { value: any }): Promise<any> {
  return this.call({
    method: 'put',
    endpoint: `/tenants/custom-fields/${namespace}:${handle}`,
    body
  }).then((response) => {
    return response.data
  })
}

export default updateTenantCustomField
