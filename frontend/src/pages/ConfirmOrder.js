import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const ConfirmOrder = ({ history }) => {
    const navigate = useNavigate()
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    // Calculate Order Prices
    const itemsPrices = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const itemsPrice = Number((itemsPrices).toFixed(2))
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }

    return (
        <>

            <div className=" bg-white shadow-lg mt-40 ml-20 mr-20 flex-row flex justify-evenly">
                <div className=" m-5 order-confirm flex flex-col">
                    <div>
                    <h4 className="mb-3 font-bold text-2xl">Shipping Info</h4>
                    <p className='capitalize'><b>Name:</b> {user && user.username}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
                    </div>
                    <div className='ml-[-100px]'>
                    <h4 className="mt-4  font-bold text-2xl">Your Cart Items:</h4>

                    {cartItems.map(item => (
                        <>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            
                            
                        </>
                        
                    ))}
</div>


                </div>

                <>
                    <div id="order_summary" className=''>
                        <div className=' m-5 '>
                        <h4 className='font-bold text-2xl capitalize'>Order Summary</h4>
                        <hr />
                        <p className='text-xl'>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p className='text-xl'>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p className='text-xl'>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p className='text-2xl'>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button  className="bg-yellow-500 m-2 p-2 rounded" onClick={processToPayment}>Proceed to Payment</button>
                        </div>
                    </div>
                </>


            </div>

        </>
    )
}

export default ConfirmOrder