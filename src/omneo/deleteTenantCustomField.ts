import { Omneo } from '..'

async function deleteTenantCustomField (this: Omneo, namespace: string, handle: string): Promise<any> {
  return this.call({
    method: 'delete',
    endpoint: `/tenants/custom-fields/${namespace}:${handle}`
  }).then((response) => {
    return response.data
  })
}

export default deleteTenantCustomField
