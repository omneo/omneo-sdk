import { CreateCustomFieldInput, CustomField, CustomFieldResponse, RequestParams, UpdateCustomFieldInput } from '@types'
import Resource from '../../resource.js'

export default class LocationCustomFields extends Resource {
  list (locationId: number, params?: RequestParams): Promise<CustomFieldResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/locations/${locationId}/custom-fields`,
      params
    }).then((response) => {
      return response
    })
  }

  get (locationId: number, customField: string): Promise<CustomField> {
    return this.client.call({
      method: 'GET',
      endpoint: `/locations/${locationId}/custom-fields/${customField}`
    }).then((response) => {
      return response.data
    })
  }

  create (locationId: number, body: CreateCustomFieldInput): Promise<CustomField> {
    return this.client.call({
      method: 'POST',
      endpoint: `/locations/${locationId}/custom-fields`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (locationId: number, customField: string, body: UpdateCustomFieldInput): Promise<CustomField> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/locations/${locationId}/custom-fields/${customField}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (locationId: number, customField: string): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/locations/${locationId}/custom-fields/${customField}`
    }).then((response) => {
      return response
    })
  }
}
