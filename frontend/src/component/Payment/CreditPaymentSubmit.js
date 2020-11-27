function CreditPaymentSubmit(card) {
  Omise.createToken("card", card, function (statusCode, response) {
    console.log(statusCode, response)
  })

  return false
}
export default CreditPaymentSubmit
