import {afterEach, expect, test} from "vitest";
import { writeTransaction } from "../../mocks/transactions/transaction";
import simpleOmneoRequest from "../../lib/simple-omneo-request";
import {Omneo} from "../../../omneo";
import randomString from "../../lib/string/random";

let NEW_TRANSACTION_ID : number | null = null
const EXTERNAL_ID = randomString(9)

const omneo = new Omneo({
    tenant: process.env.OMNEO_TENANT as string,
    token: process.env.OMNEO_TOKEN as string
})

test("SDK can write a transaction to Omneo.", async () => {
    writeTransaction.external_id = EXTERNAL_ID

    const sdkCreateTransaction = await omneo.transactions.updateCreate(writeTransaction)

    expect(sdkCreateTransaction.external_id).toBe(EXTERNAL_ID)
    expect(sdkCreateTransaction.tags).toStrictEqual(writeTransaction.tags)
    expect(sdkCreateTransaction.receipt_ref).toStrictEqual(writeTransaction.receipt_ref)
    NEW_TRANSACTION_ID = sdkCreateTransaction.id
})

afterEach(async () => {
    // Delete the test transaction.
    if(NEW_TRANSACTION_ID) {
        console.log('Cleaning up transaction', NEW_TRANSACTION_ID);
        const deleteResponse = await simpleOmneoRequest("DELETE", `/transactions/${NEW_TRANSACTION_ID}`);
        if(deleteResponse.status === 204) {
            console.log(`Transaction ${NEW_TRANSACTION_ID} deleted`);
        }
    }
})
