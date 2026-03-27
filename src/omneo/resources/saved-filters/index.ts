import { CreateSavedFilterInput, RequestParams, SavedFilter, SavedFilterResponse, UpdateSavedFilterInput } from '@types'
import Resource from '../resource.js'

export default class SavedFilters extends Resource {
  list (modelType: string, params?: RequestParams): Promise<SavedFilterResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/${modelType}/savedfilter`,
      params
    }).then((response) => {
      return response
    })
  }

  create (modelType: string, body: CreateSavedFilterInput): Promise<SavedFilter> {
    return this.client.call({
      method: 'POST',
      endpoint: `/${modelType}/savedfilter`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (modelType: string, savedFilterId: number, body: UpdateSavedFilterInput): Promise<SavedFilter> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/${modelType}/savedfilter/${savedFilterId}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  destroy (modelType: string, savedFilterId: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/${modelType}/savedfilter/${savedFilterId}`
    }).then((response) => {
      return response
    })
  }
}
