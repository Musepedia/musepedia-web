import {prepay} from '../api/payment'

export function requestPayment(){
  wx.login().then(data => {
    return prepay({code: data.code});
  }).then(paymentReq => {
    console.log('payment req: ', paymentReq);
    paymentReq.signType = 'RSA';
    wx.requestPayment(paymentReq).then(data => {
      console.log('payment success: ', data);
    }).catch(err => {
      console.error('payment fail: ', err);
    })
  })
}