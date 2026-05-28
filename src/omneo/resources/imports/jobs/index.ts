import { ImportJob, RequestExportImportJob, RequestFinalizeImportJob, ImportJobResponse, RequestQueryImportJob, RequestCreateImportJob, ImportJobExportResponse } from '@types'
import Resource from '../../resource.js'

export default class ImportJobs extends Resource {
  list (importId: number, params?: RequestQueryImportJob): Promise<ImportJobResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/imports/${importId}/jobs`,
      params
    }).then((response) => {
      return response
    })
  }

  get (importId: number, jobId: number): Promise<ImportJob> {
    return this.client.call({
      method: 'GET',
      endpoint: `/imports/${importId}/jobs/${jobId}`
    }).then((response) => {
      return response.data
    })
  }

  create (importId: number, body: RequestCreateImportJob): Promise<ImportJob> {
    return this.client.call({
      method: 'POST',
      endpoint: `/imports/${importId}/jobs`,
      body
    }).then((response) => {
      return response.data
    })
  }

  export (importId: number, body: RequestExportImportJob): Promise<ImportJobExportResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: `/imports/${importId}/jobs/export`,
      body
    }).then((response) => {
      return response
    })
  }

  finalize (importId: number, jobId: number, body: RequestFinalizeImportJob): Promise<ImportJob> {
    return this.client.call({
      method: 'POST',
      endpoint: `/imports/${importId}/jobs/${jobId}/finalize`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
