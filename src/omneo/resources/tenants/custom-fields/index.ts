import { CustomField, CustomFieldResponse, RequestQueryCustomField } from '@types'
import Resource from '../../resource.js'

export default class TenantCustomFields extends Resource {
  list (params?: RequestQueryCustomField): Promise<CustomFieldResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/tenants/custom-fields',
      params,
      flattenParams: true
    }).then((response) => {
      return response
    })
  }

  get (namespace: string, handle: string): Promise<CustomField> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'GET',
      endpoint: `/tenants/custom-fields/${attribute}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: CustomField): Promise<CustomField> {
    return this.client.call({
      method: 'POST',
      endpoint: '/tenants/custom-fields',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (namespace: string, handle: string, body: CustomField): Promise<CustomField> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'PUT',
      endpoint: `/tenants/custom-fields/${attribute}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (namespace: string, handle: string): Promise<void> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'DELETE',
      endpoint: `/tenants/custom-fields/${attribute}`
    }).then((response) => {
      return response
    })
  }

  versions (namespace: string, handle: string): Promise<CustomFieldResponse> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'GET',
      endpoint: `/tenants/custom-fields/${attribute}/versions`
    }).then((response) => {
      return response
    })
  }
}
