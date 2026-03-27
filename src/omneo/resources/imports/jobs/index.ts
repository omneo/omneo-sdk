import { CreateImportJobInput, ExportImportJobInput, ImportJob, ImportJobResponse, RequestParams } from '@types'
import Resource from '../../resource.js'

export default class ImportJobs extends Resource {
  list (importId: number, params?: RequestParams): Promise<ImportJobResponse> {
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

  create (importId: number, body: CreateImportJobInput): Promise<ImportJob> {
    return this.client.call({
      method: 'POST',
      endpoint: `/imports/${importId}/jobs`,
      body
    }).then((response) => {
      return response.data
    })
  }

  export (importId: number, body: ExportImportJobInput): Promise<{data: any}> {
    return this.client.call({
      method: 'POST',
      endpoint: `/imports/${importId}/jobs/export`,
      body
    }).then((response) => {
      return response
    })
  }
}
