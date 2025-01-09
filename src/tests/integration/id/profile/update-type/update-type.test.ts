import { describe, expect } from 'vitest'
import { ID } from '../../../../../id'
import { testWithIDData } from '../../test-with-id-data'

describe('ID Update Profile Type', () => {
  testWithIDData('ID SDK Update Profile Type', async ({ IDData }) => {
    const { tokenData } = IDData

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const updatedProfile = await IDClient.profile.updateType('active')
    expect(updatedProfile.profile_type).toEqual('active')
  })
})
