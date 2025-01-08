import { describe, expect } from 'vitest'
import { ID } from '../../../../../id'
import jwt from 'jsonwebtoken'
import { testWithIDData } from '../../test-with-id-data'

describe('ID aggregations', () => {
  testWithIDData('ID SDK can get aggregations', async ({ IDData }) => {
    const { tokenData } = IDData
    const { pid: decodedProfileID } = jwt.decode(tokenData.token)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const aggregations = await IDClient.profile.aggregations.list()

    expect(aggregations.profile_id).toBe(decodedProfileID)
    expect(aggregations.shop_days).toBeDefined()
  })

  testWithIDData('ID SDK can calculate aggregations', async ({ IDData }) => {
    const { tokenData } = IDData
    const { pid: decodedProfileID } = jwt.decode(tokenData.token)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const aggregations = await IDClient.profile.aggregations.calculate()

    expect(aggregations.profile_id).toBe(decodedProfileID)
    expect(aggregations.shop_days).toBeDefined()
  })
})
