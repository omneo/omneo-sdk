export type PaymentCode = "CASH"

export type Payment = {
  id: string
  web_order_number: number | null
  payment_code: PaymentCode | string
  paymenttype_id: string
  payment_number: string | null
  eftpos_cardtype: string | null
  tender_value: number
  eftpos_stan: string | null
  eftpos_authcode: string | null
  eftpos_settlement: string | null
  eftpos_reference: string | null
  payment_ref1: string | null
  payment_ref2: string | null
  payment_ref3: string | null
  payment_gateway: string | null
}
