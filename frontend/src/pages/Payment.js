import React, { useEffect } from 'react'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// import { createOrder, clearErrors } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}


const Payment = () => {

   const navigate = useNavigate()
   const { user } = useSelector(state => state.auth)
   const { cartItems, shippingInfo } = useSelector(state => state.cart);
   const stripePromise = loadStripe(`pk_test_51LY8iqDnJts5Vi1vCsRqsuCJFMHqwHlo4CsrGCzRuKsQNQKQnsiFiMHacaD6Yv0Na8TW9HHK6CSJQnBtBEaEhqTZ002GxS8daQ`);
     const dispatch = useDispatch();
     <Elements stripe={stripePromise} >
     const stripe = useStripe();
    const elements = useElements(); 
     </Elements>
    const order = {
        orderItems: cartItems,
        shippingInfo
    }
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }


    useEffect(() => {

       

    }, [dispatch])

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }
    
    // const submitHandler = async (e) => {
    //     e.preventDefault();

    //     document.querySelector('#pay_btn').disabled = true;

    //     let res;
    //     try {

    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }

    //         res = await axios.post('http://localhost:5000/payment/payment/process', paymentData, config)

    //         const clientSecret = res.data.client_secret;

    //         console.log(clientSecret);

    //         if (!stripe || !elements) {
    //             return;
    //         }

    //         const result = await stripe.confirmCardPayment(clientSecret, {
    //             payment_method: {
    //                 card: elements.getElement(CardNumberElement),
    //                 billing_details: {
    //                     name: user.name,
    //                     email: user.email
    //                 }
    //             }
    //         });

    //         if (result.error) {
    //             alert.error(result.error.message);
    //             document.querySelector('#pay_btn').disabled = false;
    //         } else {

    //             // The payment is processed or not
    //             if (result.paymentIntent.status === 'succeeded') {

    //                 order.paymentInfo = {
    //                     id: result.paymentIntent.id,
    //                     status: result.paymentIntent.status
    //                 }

    //                 // dispatch(createOrder(order))

    //                 navigate('/success')
    //             } else {
    //                 console.log('There is some issue while payment processing')
    //             }
    //         }


    //     } catch (error) {
    //         document.querySelector('#pay_btn').disabled = false;
    //         console.log(error.response.data.message)
    //     }
    // }
  return (
    
      <div className="mt-40 flex justify-center">
                <div className="">
                    <form className="shadow-lg w-[500px] p-5" >
                        <h1 className="mb-4 font-bold text-xl text-center">Card Info</h1>
                        <div className="form">
                            <label htmlFor="card_num_field" className="mb-4 text-xl ">Card Number</label>
                            <Elements stripe={stripePromise}>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                options={options}
                        
                                />
                                  </Elements>
                        </div>

                        <div className="form">
                            <label htmlFor="card_exp_field" className="mb-4 text-xl ">Card Expiry</label>
                            <Elements stripe={stripePromise} >
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                options={options}
                            />
                            </Elements>
                        </div>

                        <div className="form">
                            <label htmlFor="card_cvc_field" className="mb-4 text-xl ">Card CVC</label>
                            <Elements stripe={stripePromise}>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                options={options}
                            />
                            </Elements>
                        </div>

                        <button
                            id="pay_btn"
                            type="submit"
                            className="my-5 p-2 bg-yellow-500 rounded-md font-bold"
                            onClick={()=>{
                                navigate('/success')
                            }}
                        >
                            Pay {`- $${orderInfo && orderInfo.totalPrice}`}
                           
                        </button>

                    </form>
                </div>
            </div>
    
  )
}

export default Payment

