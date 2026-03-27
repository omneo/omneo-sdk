import { CreateCustomFieldInput, CustomField, CustomFieldResponse, RequestParams, UpdateCustomFieldInput } from '@types'
import Resource from '../../resource.js'

export default class TenantCustomFields extends Resource {
  list (params?: RequestParams): Promise<CustomFieldResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/tenants/custom-fields',
      params
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

  create (body: CreateCustomFieldInput): Promise<CustomField> {
    return this.client.call({
      method: 'POST',
      endpoint: '/tenants/custom-fields',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (namespace: string, handle: string, body: UpdateCustomFieldInput): Promise<CustomField> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'PUT',
      endpoint: `/tenants/custom-fields/${attribute}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  destroy (namespace: string, handle: string): Promise<void> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'DELETE',
      endpoint: `/tenants/custom-fields/${attribute}`
    }).then((response) => {
      return response
    })
  }

  versions (namespace: string, handle: string): Promise<CustomField[]> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'GET',
      endpoint: `/tenants/custom-fields/${attribute}/versions`
    }).then((response) => {
      return response.data
    })
  }
}
