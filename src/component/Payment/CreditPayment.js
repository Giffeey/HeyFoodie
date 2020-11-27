import React from "react"
import omise from "omise"
function CreditPayment() {
const omise = require('omise')({
    'secretKey': 'skey_test_5laodzr3hoelafh576w',
    'omiseVersion': '2015-09-10'
  });
  //example
  omise.charges.create({
    'description': 'Charge for order ID: 888',
    'amount': '100000', // 1,000 Baht
    'currency': 'thb',
    'capture': false,
    'card': tokenId
  }, function(err, resp) {
    if (resp.paid) {
      //Success
    } else {
      //Handle failure
      throw resp.failure_code;
    }
  });

}
export default CreditPayment()