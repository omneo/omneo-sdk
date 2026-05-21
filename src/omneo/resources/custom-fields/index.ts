import { CustomField, CustomFieldResponse, RequestCustomFieldBatchDelete, CustomFieldBatchJsonDeleteResponse, RequestQueryCustomField } from '@types'
import Resource from '../resource.js'

export default class CustomFields extends Resource {
  list (model: string, id: number): Promise<CustomFieldResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/custom-fields/${model}/${id}`
    }).then((response) => {
      return response
    })
  }

  create (model: string, id: number, body: CustomField): Promise<CustomField> {
    return this.client.call({
      method: 'POST',
      endpoint: `/custom-fields/${model}/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  search (params: RequestQueryCustomField): Promise<CustomFieldResponse> {
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

  deleteBatch (model: string, id: number, body: RequestCustomFieldBatchDelete): Promise<CustomFieldBatchJsonDeleteResponse> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/custom-fields/${model}/${id}/batchJsonDelete`,
      body
    }).then((response) => {
      return response
    })
  }
}
