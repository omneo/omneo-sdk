/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Points get', () => {
  test('SDK can get points.', async () => {
    const omneoPoint = await simpleOmneoRequest('GET', '/points').then(({ data }) => data[0])

    const sdkPermission = await omneo.points.get(omneoPoint.id)
    expect(sdkPermission).toEqual(omneoPoint)
  })
})
