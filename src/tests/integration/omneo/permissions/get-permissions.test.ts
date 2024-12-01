/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Permissions get', () => {
  test('SDK can get permission.', async () => {
    const omneoPermission = await simpleOmneoRequest('GET', '/permissions').then(({ data }) => data[0])

    const sdkPermission = await omneo.permissions.get(omneoPermission.id)
    expect(sdkPermission).toEqual(omneoPermission)
  })
})
