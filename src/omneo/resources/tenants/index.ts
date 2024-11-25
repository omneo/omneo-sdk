import { RequestParams } from '../../../types'
import { TenantCustomFieldRequest } from '../../../types/tenant.js'
import Resource from '../resource.js'

export default class Tenants extends Resource {
  getCustomFields (params?: RequestParams): Promise<any> {
    return this.client.call({
      method: 'get',
      endpoint: '/tenants/custom-fields',
      params
    }).then((response) => {
      return response.data
    })
  }

  createCustomField (body: TenantCustomFieldRequest): Promise<any> {
    return this.client.call({
      method: 'post',
      endpoint: '/tenants/custom-fields',
      body
    }).then((response) => {
      return response.data
    })
  }

  deleteCustomField (namespace: string, handle: string): Promise<any> {
    return this.client.call({
      method: 'delete',
      endpoint: `/tenants/custom-fields/${namespace}:${handle}`
    }).then((response) => {
      return response.data
    })
  }

  updateCustomField (namespace: string, handle: string, body: { value: any }): Promise<any> {
    return this.client.call({
      method: 'put',
      endpoint: `/tenants/custom-fields/${namespace}:${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
