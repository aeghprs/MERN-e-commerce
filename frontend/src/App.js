
import Hero from './components/Hero/Hero';
import Navbar from './components/Nav/Navbar';
import Products from './components/Featured/Allproducts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Productdetails from './components/Featured/Productdetails';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import ConfirmOrder from './pages/ConfirmOrder';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Payment from './pages/Payment';
import OrderSuccess from './pages/Success';

function App() {
  const [stripekey, setStripeKey] = useState('')
  useEffect(()=>{
    async function getstripekey() {
      const {key} =  axios.get(`http://localhost:5000/payment/stripeapi`);
    setStripeKey(key.stripeApiKey)
    }
    getstripekey()
  },[])
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path='/' element= {<Home/>} exact />
          <Route path='/signup' element= {<Signup/>} exact/>
          <Route path='/login' element= {<Login/>} exact/>
          <Route path='/cart' element= {<Cart/>} exact/>
          <Route path='/shipping' element= {<Shipping/>} />
          <Route path='/allproducts' element= {<Products/>} exact/> 
          <Route path='/cart/product/:id' element= {<Productdetails/>} exact/>
          <Route path='/product/:id' element = {<Productdetails/>} exact/>
          <Route path='/confirmorder' element = {<ConfirmOrder/>} exact/>
          <Route path='/payment' element = {<Payment/>} exact/>
          <Route path='/success' element = {<OrderSuccess/>} exact/>
          <Route path='/allproducts/product/:id' element = {<Productdetails/>} exact/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
