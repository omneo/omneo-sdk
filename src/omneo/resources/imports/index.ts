import { RequestCreateManualImport, RequestUploadImport, RequestFileUploadImport, Import, ImportResponse, RequestQueryImport } from '@types'
import Resource from '../resource.js'
import ImportJobs from './jobs/index.js'

export default class Imports extends Resource {
  jobs = new ImportJobs(this.client)

  list (params?: RequestQueryImport): Promise<ImportResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/imports',
      params,
      flattenParams: true
    }).then((response) => {
      return response
    })
  }

  get (importId: number): Promise<Import> {
    return this.client.call({
      method: 'GET',
      endpoint: `/imports/${importId}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: RequestUploadImport): Promise<Import> {
    return this.client.call({
      method: 'POST',
      endpoint: '/imports',
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (importId: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/imports/${importId}`
    }).then((response) => {
      return response
    })
  }

  fileImport (body: RequestFileUploadImport): Promise<Import> {
    return this.client.call({
      method: 'POST',
      endpoint: '/imports/file',
      body
    }).then((response) => {
      return response.data
    })
  }

  createManual (body: RequestCreateManualImport): Promise<Import> {
    return this.client.call({
      method: 'POST',
      endpoint: '/imports/manual',
      body
    }).then((response) => {
      return response.data
    })
  }

  conditionImport (params: RequestQueryImport): Promise<ImportResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: '/imports/condition',
      params
    }).then((response) => {
      return response
    })
  }
}
