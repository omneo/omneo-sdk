import { describe, test, afterAll, expect } from 'vitest'
import { writeTransactionWithVariant } from '../../../mocks/transactions/transaction'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'

import { IdentityResponse, RequestParams } from '../../../../types'
import { Omneo } from '../../../../omneo'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Identities list', () => {
  test('SDK can get identities.', async () => {
    const sdkIdentityList = await omneo.identities.list()
    sdkIdentityList.forEach((identity) => {
      expect(identity).toHaveProperty('id')
      expect(identity).toHaveProperty('handle')
      expect(identity).toHaveProperty('identifier')
      expect(identity).toHaveProperty('profile_id')
      expect(identity).toHaveProperty('is_active')
    })
  })
  test('SDK can get identities.', async () => {
    const params: RequestParams = {
      'filter[handle]': 'apple_device_id',
      include: 'profile'
    }
    const sdkIdentityList = await omneo.identities.list(params)
    sdkIdentityList.forEach((identity) => {
      expect(identity).toHaveProperty('id')
      expect(identity).toHaveProperty('handle', 'apple_device_id')
      expect(identity).toHaveProperty('identifier')
      expect(identity).toHaveProperty('profile_id')
      expect(identity).toHaveProperty('is_active')
      expect(identity).toHaveProperty('profile')
    })
  })
  test('SDK can get identities.', async () => {
    const params: RequestParams = {
      'filter[handle]': 'apple_device_id',
      include: 'profile',
      withPagination: true
    }
    const sdkIdentityList: IdentityResponse = await omneo.identities.list(params)
    sdkIdentityList.data.forEach((identity) => {
      expect(identity).toHaveProperty('id')
      expect(identity).toHaveProperty('handle', 'apple_device_id')
      expect(identity).toHaveProperty('identifier')
      expect(identity).toHaveProperty('profile_id')
      expect(identity).toHaveProperty('is_active')
      expect(identity).toHaveProperty('profile')
    })

    // links
    expect(sdkIdentityList.links).toHaveProperty('first')
    expect(sdkIdentityList.links).toHaveProperty('last')
    expect(sdkIdentityList.links).toHaveProperty('prev')
    expect(sdkIdentityList.links).toHaveProperty('next')

    // meta
    expect(sdkIdentityList.meta).toHaveProperty('current_page')
    expect(sdkIdentityList.meta).toHaveProperty('from')
    expect(sdkIdentityList.meta).toHaveProperty('last_page')
    expect(sdkIdentityList.meta).toHaveProperty('links')
    expect(sdkIdentityList.meta).toHaveProperty('path')
    expect(sdkIdentityList.meta).toHaveProperty('per_page')
    expect(sdkIdentityList.meta).toHaveProperty('to')
    expect(sdkIdentityList.meta).toHaveProperty('total')
  })
})
