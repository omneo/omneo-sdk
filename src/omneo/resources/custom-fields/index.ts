import { CreateCustomFieldInput, RequestParams } from '@types'
import Resource from '../resource.js'
import { CustomField, CustomFieldBatchDeleteInput, CustomFieldResponse } from '@/types/custom-field.js'

export default class CustomFields extends Resource {
  list (model: string, id: number, params?: RequestParams): Promise<CustomFieldResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/custom-fields/${model}/${id}`,
      params
    }).then((response) => {
      return response
    })
  }

  create (model: string, id: number, body: CreateCustomFieldInput): Promise<CustomField> {
    return this.client.call({
      method: 'POST',
      endpoint: `/custom-fields/${model}/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  search (params: RequestParams): Promise<CustomFieldResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/custom-fields/search',
      params
    }).then((response) => {
      return response
    })
  }

  delete (model: string, id: number, customField: string): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/custom-fields/${model}/${id}/${customField}`
    }).then((response) => {
      return response
    })
  }

  deleteBatch (model: string, id: number, body: CustomFieldBatchDeleteInput): Promise<{deleted: number}> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/custom-fields/${model}/${id}/batchJsonDelete`,
      body
    }).then((response) => {
      return response
    })
  }
}
