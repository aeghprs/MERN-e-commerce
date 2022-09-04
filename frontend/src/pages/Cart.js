import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../actions/CartActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cart = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [quantity, setQuantity] = useState(1)
  const { products} = useSelector(state =>state.productdetail)
  const navigate = useNavigate()
  const removeitem = (id) =>{
    dispatch(removeItemFromCart(id))
  }
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty))
}

const decreaseQty = (id, quantity) => {

    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty))

}
  return (
    <div> 
      <div className='header  ml-40 mt-40'>
        <h1 className=' text-3xl font-bold uppercase'>
           Your cart : {cartItems.length}
        </h1>
      </div>
<div className="flex justify-center my-10">
  <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
    <div className="flex-1">
      <table className="w-full text-sm lg:text-base" cellspacing="0">
        <thead>
          <tr className="h-12 uppercase">
            <th className="hidden md:table-cell"></th>
            <th className="text-left">Product Name</th>
            <th className="lg:text-right text-left pl-5 lg:pl-0">
              <span className="lg:hidden" title="Quantity">Qtd</span>
              <span className="hidden lg:inline mr-12">Quantity</span>
            </th>
            <th className="hidden text-right md:table-cell">Unit price</th>
            <th className="text-right">Delete</th>
          </tr>
        </thead>
        <tbody className='p-40'>
          { cartItems && cartItems.map((cartItems,index)=>{
            return(

              <tr key={index} >
              <td className="hidden pb-4 md:table-cell">
                <a href="#">
                  <img src={cartItems.image} className="w-20 h-16 rounded" alt="Thumbnail"/>
                </a>
              </td>
              <td>
                <a href="#">
                  <p className="mb-2 md:ml-4"><Link to={`product/${cartItems.product}`}>{cartItems.name}</Link></p>
                  <form action="" method="POST">
                   
                  </form>
                </a>
              </td>
              <td className="justify-center md:justify-end md:flex mt-6">
                <div className=" h-10">
                  <div className=" relative  w-full  ">
                  <div className="stockCounter flex flex-row">
                                <button className=" text-center w-12 rounded-lg ml-5 minus bg-red-600 text-lg lg:text-xl font-bold" onClick={() => decreaseQty(cartItems.product, cartItems.quantity)}>-</button>

                                <input type="number" className="m-2 count text-gray-900 text-center ml-6 w-10 border-2 d-inline" value={cartItems.quantity} readOnly />

                                <button className=" text-center w-12 rounded-lg ml-5 bg-green-600 text-lg lg:text-xl font-bold" onClick={() => increaseQty(cartItems.product, cartItems.quantity, cartItems.stock)}>+</button>
                            </div>

                  </div>
                </div>
              </td>
              <td className="hidden text-right md:table-cell">
                <span className="text-sm lg:text-base font-medium">
                 ${cartItems.price}
                </span>
              </td>
              <td className="text-right">
              <button type="submit" className="text-gray-700 md:ml-4" onClick={()=>{removeitem(cartItems.product)}}>
                      Remove item
                    </button>
              </td>
            </tr> 
            )
          })       
}
        </tbody>
      </table>
    
      <div class=" mt-6 -mx-2 lg:flex">
        
        <div class="lg:px-2 lg:w-1/2 my-10">
          <div class="p-4 bg-gray-100 rounded-full">
            <h1 class="ml-2 font-bold uppercase">Order Details</h1>
          </div>
          <div class="p-4">
            <p class="mb-6 italic">Shipping and additionnal costs are calculated based on values you have entered</p>
              <div class="flex justify-between border-b">
                <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                  Units
                </div>
                <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                  {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}  items
                </div>
              </div>
                
              
                <div class="flex justify-between pt-4 border-b">
                  <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    SubTotal
                  </div>
                  <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                 $ {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                  </div>
                </div>
                {/* <div class="flex justify-between pt-4 border-b">
                  <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Tax + Shipping Cost
                  </div>
                  <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                 $ {cartItems.reduce((acc, item) => acc + ((item.quantity * item.price)/10), 0).toFixed(2)}
                  </div>
                </div>
                <div class="flex justify-between pt-4 border-b">
                  <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Total
                  </div>
                  <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    $ {cartItems.reduce(((acc, item) => acc + ((item.quantity * item.price)/10)  + (item.quantity * item.price)), 0) .toFixed(2) }
                  </div>
                </div> */}
             <a >
                <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none" onClick={()=>{
           
           if(isAuthenticated === true){
            navigate('/shipping')
           }else{  
            toast.warn('Login First Checkout')
            setTimeout(() => {
              navigate('/login')
            }, 3000);
            
            
           }
          
          }}>
                  <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
                  <span class="ml-2 mt-5px">Procceed to checkout</span>
                </button>
              </a>
              
          </div>
        </div>
      </div>
    </div>
  </div>
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
  )
}

export default Cart
