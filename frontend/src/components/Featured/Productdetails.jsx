import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getoneProduct } from '../../actions/ProductActions';
import { addItemToCart } from '../../actions/CartActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Productdetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {products} = useSelector(state =>state.productdetail)
    const { isAuthenticated } = useSelector(state => state.auth);
    useEffect(()=>{
      window.scrollTo(0,0)
      // axios.get(`http://localhost:5000/product/getoneproduct/${id}`).then((res) => {
      //   console.log(res.data.product)
      //   setData(res.data.product)
      // }) 
      dispatch(getoneProduct(id))
    },[dispatch])


const [quantity, setQuantity] = useState(1)

const increaseQty = () => {
  
  const count = document.querySelector('.count')

  if (count.valueAsNumber >= products.stock) return;

  const qty = count.valueAsNumber + 1;
  setQuantity(qty)
}

const decreaseQty = () => {

  const count = document.querySelector('.count')

  if (count.valueAsNumber <= 1) return;

  const qty = count.valueAsNumber - 1;
  setQuantity(qty)

}
const  addToCart = () =>{
  dispatch(addItemToCart(id, quantity))
}
  return (
    <div>
    <div className='header mt-28 ml-40'>
        <h1 className=' text-3xl font-bold uppercase'>
            product details
        </h1>
      </div>
<section className="text-gray-700 body-font overflow-hidden bg-white">
  <div className="container px-5 py-10 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
    {products.images && products.images.map(image => (
                                    <div key={image.public_id}>
                                      
                                        <img className="w-60 h-45" src={image.url} alt={products.name} />
                                    </div>
))}
      <div className="lg:w-1/2 lg:ml-60 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"> 
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{products.seller}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{products.name}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-2 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-2 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p className="leading-relaxed">{products.description}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
        
        <span className="text-gray-900 text-3xl title-font font-medium mb-1">Avaibility :</span>
        {products.stock> 0 ? <>
            <button className="flex ml-6 text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Instock</button>
        </>: <>
        <button className="flex ml-6 text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Out of stock</button>
        </>}
        <div className="stockCounter d-inline">
                                <button className=" text-center w-12 rounded-lg ml-6 minus bg-red-600" onClick={decreaseQty}>-</button>

                                <input type="number" className="count text-gray-900 text-center ml-6 w-10 border-2 d-inline" value={quantity} readOnly />

                                <button className=" text-center w-12 rounded-lg ml-6 bg-green-600" onClick={increaseQty}>+</button>
                            </div>
                            
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            
          
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">${products.price}</span>
          <button disabled={products.stock === 0 } className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded" onClick={()=>{
           
           if(isAuthenticated === true){
            addToCart()
           }else{  
            toast.warn('Login First to add products to cart')
            setTimeout(() => {
              navigate('/login')
            }, 3000);
            
            
           }
          
          }}>Add to Cart</button>
          <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
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

export default Productdetails
