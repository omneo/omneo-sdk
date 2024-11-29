import { describe, test, afterAll, expect } from 'vitest'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { Omneo } from '../../../../omneo'
import { APIToken } from '../../../../types'

const FAILED_DELETE_API_TOKENS : string[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const tokenName = 'SDK Tokens Delete Test API Token'

describe('API Tokens delete', () => {
  test('SDK can delete an API Token', async () => {
    const testAPIToken = await simpleOmneoRequest('POST', '/auth/api-tokens', {
      name: tokenName,
      scopes: ['read-profiles']
    })

    const tokenID = testAPIToken?.token?.id
    expect(tokenID).toBeTypeOf('string') // Make sure we created a token

    await omneo.auth.deleteAPIToken(tokenID).catch(() => {
      FAILED_DELETE_API_TOKENS.push(tokenID)
      throw new Error('Failed to delete API Token')
    })

    // Cannot fetch API token by ID
    const tokens: APIToken[] = await simpleOmneoRequest('GET', '/auth/access-tokens?type=current')

    const matchedToken = tokens.find((tkn) => tkn.id === tokenID)

    if (matchedToken) FAILED_DELETE_API_TOKENS.push(tokenID)

    expect(matchedToken).toBeUndefined()
  })
})

afterAll(async () => {
  if (FAILED_DELETE_API_TOKENS.length > 0) {
    for (const tokenID of FAILED_DELETE_API_TOKENS) {
      console.log('Cleaning up API Token with ID', tokenID)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/auth/api-tokens/${tokenID}`)
      if (deleteResponse.status === 204) {
        console.log(`API Token ID ${tokenID} deleted`)
      }
    }
  }
})
