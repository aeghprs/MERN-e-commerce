import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from './MetaData'
import success from '../img/success.jpg'

const OrderSuccess = () => {
    return (
        <div>

            <MetaData title={'Order Success'} />

            <div className="flex flex-row justify-center">
                <div className="mt-5 text-center">
                    <img className="my-10 block mx-auto" src={success} alt="Order Success" width="400" height="400" />

                    <h2>Your Order has been placed successfully.</h2>
                </div>

            </div>
            </div>
      
    )
}

export default OrderSuccess