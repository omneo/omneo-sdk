
import * as dotenv from 'dotenv'
import { Omneo } from '../src'
// import { Omneo, ID } from '../src'
// import simpleOmneoRequest from '../src/test/lib/simple-omneo-request'

dotenv.config()

const { OMNEO_TOKEN: token, OMNEO_TENANT: tenant, OMNEO_TEST_PROFILE_ID: testProfileId } = process.env

const profileId = testProfileId as string

function main () {
  const omneoClient = new Omneo({ token: token as string, tenant: tenant as string })

  console.log('profileId: ', profileId)
  // const IDClient = new ID({ tenant: tenant as string, omneoAPIToken: token, config: {} })
  // IDClient.auth.requestAuthToken({ id: testProfileId as string }).then((res) => {
  //   console.log('response:', res)
  // })
}

main()
