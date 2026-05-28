import { RequestCreateSavedFilter, RequestUpdateSavedFilter, SavedFilter, SavedFilterResponse } from '@types'
import Resource from '../resource.js'

export default class SavedFilters extends Resource {
  list (modelType: string): Promise<SavedFilterResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/${modelType}/savedfilter`
    }).then((response) => {
      return response
    })
  }

  create (modelType: string, body: RequestCreateSavedFilter): Promise<SavedFilter> {
    return this.client.call({
      method: 'POST',
      endpoint: `/${modelType}/savedfilter`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (modelType: string, savedFilterId: number, body: RequestUpdateSavedFilter): Promise<SavedFilter> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/${modelType}/savedfilter/${savedFilterId}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (modelType: string, savedFilterId: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/${modelType}/savedfilter/${savedFilterId}`
    }).then((response) => {
      return response
    })
  }
}
