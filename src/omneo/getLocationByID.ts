import { Omneo } from '..'
import { Location, RequestParams } from '../types'

async function getLocationByID (this: Omneo, id: string, params?: RequestParams): Promise<Location> {
  return this.call({
    method: 'get',
    endpoint: `/locations/${id}`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getLocationByID
