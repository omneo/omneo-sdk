import { CreateCustomFieldInput, CustomField, CustomFieldResponse, RequestParams, UpdateCustomFieldInput } from '@types'
import Resource from '../../resource.js'

export default class TransactionCustomFields extends Resource {
  list (transactionId: number, params?: RequestParams): Promise<CustomFieldResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/transactions/${transactionId}/custom-fields`,
      params
    }).then((response) => {
      return response
    })
  }

  get (transactionId: number, namespace: string, handle: string): Promise<CustomField> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'GET',
      endpoint: `/transactions/${transactionId}/custom-fields/${attribute}`
    }).then((response) => {
      return response.data
    })
  }

  create (transactionId: number, body: CreateCustomFieldInput): Promise<CustomField> {
    return this.client.call({
      method: 'POST',
      endpoint: `/transactions/${transactionId}/custom-fields`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (transactionId: number, namespace: string, handle: string, body: UpdateCustomFieldInput): Promise<CustomField> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'PUT',
      endpoint: `/transactions/${transactionId}/custom-fields/${attribute}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  destroy (transactionId: number, namespace: string, handle: string): Promise<void> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'DELETE',
      endpoint: `/transactions/${transactionId}/custom-fields/${attribute}`
    }).then((response) => {
      return response
    })
  }

  versions (namespace: string, handle: string): Promise<CustomField[]> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'GET',
      endpoint: `/transactions/custom-fields/${attribute}/versions`
    }).then((response) => {
      return response.data
    })
  }
}
