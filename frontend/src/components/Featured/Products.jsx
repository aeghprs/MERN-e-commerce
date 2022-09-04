import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getProducts } from '../../actions/ProductActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../pages/Loader';
import { addItemToCart } from '../../actions/CartActions';
const Products = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading, products} = useSelector(state =>state.products)
  const { isAuthenticated } = useSelector(state => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getProducts())

  }, [dispatch,navigate])
  const  addToCart = (id) =>{
    dispatch(addItemToCart(id, 1))
  }
  return (
    <div>
      { loading ?
      <> <Loader/></>: <>
      <div className='flex justify-evenly'>
      <div className='header m-10 '>
        <h1 className=' text-3xl font-bold uppercase'>
            Featured products
        </h1>
      </div>
      <div className='header m-10 ml-60'>
        <button className='bg-yellow-300 p-3 text-xl font-bold uppercase' onClick={()=>{
          navigate('/allproducts')
        }}>
            view all
        </button>
      </div>
      </div>
      
      <div className='products ml-20'>
      <body class="px-40 py-20 grid lg:grid-cols-3 gap-4 gap-y-10 md:grid-cols-2 ">
   {products && products?
   <> {products
     .slice(0,3)
    .map((val,index)=>{
    return(
      <>
      <div class="w-72 bg-white drop-shadow-md rounded-lg" key={index}>
      <img class="object-cover rounded-tl-lg rounded-tr-lg"
          src={val.images[0].url} 
         
          />
     
      <div class="px-5 py-3 space-y-2">
         <h3 class="text-lg">{val.name}</h3>
          <div class="space-x-2">
            {val.price > 450 ? <>
              <span class="px-3 py-0.5 border border-blue-500 text-[11px] text-blue-500">Free Ship</span>
              <span class="px-3 py-0.5 border border-blue-500 text-[11px] text-blue-500">7 Day Return</span>
            </>: <>
            </>}
            
          </div>
          <p class="space-x-2">
              <span class="text-2xl font-semibold">${val.price}</span>
              <a href="#" title="Add to Favorites"
                  class="ml-32 text-2xl text-gray-300 hover:text-red-500 duration-300">&hearts;</a>
              {/* <span class3="text-sm line-through text-gray-500">$50</span>
              <span class="text-sm text-red-700">40% off</span> */}
          </p>
          
          <div class="flex justify-between items-center pt-3 pb-2">
              <a 
                  class="px-4 py-2 bg-red-600 hover:bg-amber-600 text-center text-sm text-white rounded duration-300 w-full" 
                  onClick={()=>{
                    if(isAuthenticated === true){
                      toast.success('Product added to cart')
                      setTimeout(() => {
                        addToCart(val._id)
                      }, 3000);
                     
                     }else{  
                      toast.warn('Login First to add products to cart')
                      setTimeout(() => {
                        navigate('/login')
                      }, 3000);
                  }
                }}
                  >
                  Add to Cart</a>
   
             
          </div>
          <div class="flex justify-between items-center ">
            <button  className='bg-yellow-300 pt-3 pb-2 w-full'><Link to={`product/${val._id}` }>View Details</Link> </button>
          </div>
      </div>
    </div>
    
    </>
    )
   })}</>: <><h1>hello</h1></>}
     
   
    </body>
   
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
  }
    </div>
  )
}

export default Products
