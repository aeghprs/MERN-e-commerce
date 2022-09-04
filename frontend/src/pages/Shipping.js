import React, { useState } from 'react'
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../actions/CartActions'
import CheckoutSteps from './CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Shipping = ({ history }) => {
    const navigate = useNavigate()
    const countriesList = Object.values(countries)
    const { isAuthenticated } = useSelector(state => state.auth);
    const { shippingInfo } = useSelector(state => state.cart)
    console.log(shippingInfo)
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }))
        history.push('/confirm')
    }

    return (
        <>
                <CheckoutSteps shipping />
            <div className="mt-40 flex justify-center h-full">
                <div className="w-full h-full">
                    <form className="shadow-lg h-full" onSubmit={submitHandler}>
                        <h1 className="mb-4 text-xl font-bold capitalize text-center">Shipping Info</h1>
                        <div className=" text-center">
                            <label htmlFor="address_field">Address</label>
                            <br/>
                            <input
                                type="text"
                                id="address_field"
                                className="p-2   w-80 h-10 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className=" text-center">
                            <label htmlFor="city_field">City</label><br/>
                            <input
                                type="text"
                                id="city_field"
                                className="p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4  w-80 h-10"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className=" text-center">
                            <label htmlFor="phone_field">Phone No</label><br/>
                            <input
                                type="phone"
                                id="phone_field"
                                className="p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4  w-80 h-10"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className=" text-center">
                            <label htmlFor="postal_code_field">Postal Code</label><br/>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4  w-80 h-10"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className=" text-center">
                            <label htmlFor="country_field">Country</label><br/>
                            <select
                                id="country_field"
                                className="p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 w-80 h-10"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >

                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div className=" text-center">       
                        <button
                            id="shipping_btn"
                            type="submit"
                            className="mb-10  py-3 bg-yellow-500 hover:bg-blue-500  px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                       onClick={()=>{
                        if(isAuthenticated === true){
                            navigate('/confirmorder')
                           }else{  
                            toast.warn('Login First Checkout')
                            setTimeout(() => {
                              navigate('/login')
                            }, 3000);
                            
                            
                           }
                          
                          }}
                       
                       >
                            CONTINUE
                            </button>
                            </div>
                    </form>
                </div>
                <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
            </div>

        </>
    )
}

export default Shipping