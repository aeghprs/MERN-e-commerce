import React,{useState} from 'react';
import {GiHamburgerMenu} from 'react-icons/gi'
import {ImCross} from 'react-icons/im'
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../buynow.png'
import { useSelector } from 'react-redux';
import {FaUserAlt} from 'react-icons/fa'
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isAuthenticated, error, loading } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);
  return(
  <nav>
    <div className=" navbar">
      <Link to='/'>
      <div className='navbar_logo'>
      <img src={logo} alt='logo' />
      </div>
      </Link>
    <ul className='navbar_links'>
    <div>

       
      </div>    
    
  


    <div className="px-10 text-start sm:px-0">
              
                <div className="mb-3 xl:w-96 md:w-96 sm:w-96">
                  <input
                    type="text"
                    className="
        form-control
        block
        w-full
        h-10
        px-3
        py-1
        text-sm
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                    id="Text"
                    placeholder= "Search Products Here"
                    
                    onKeyPress={(e) => {
                       
                      e.key === "Enter" && e.preventDefault();
                    }}
                    
                  />
                </div>
            
            </div>
    </ul>
    <div className='navbar_login ml-60'>
      <Link to='/cart'>
    <a  className='p__opensans text-xl font-semibold'>Cart : {cartItems.length}</a>
    </Link>
    {isAuthenticated?
     <>
    <div className="dropdown relative">
                    <p className="ml-10 flex justify-center items-center text-2xl bg-orange-400 h-12 w-12 rounded-full shadow-lg hover:cursor-pointer">
                    <FaUserAlt/>
                    </p>

                    <div className="dropdownmenu absolute bg-white z-10 -left-12 w-40 px-auto pt-5 pb-8 shadow rounded">
                      <ul className="flex-col justify-center items-center tracking-wide font-jakarta">
                        <li className="mb-3">
                          <Link
                            to={`/profile/`}
                            className="font-base text-md font-jakarta tracking-wide hover:text-green-500"
                          >
                            Profile
                          </Link>
                        </li>
                        <li className="mb-6">
                          <Link
                            to={`/settings/`}
                            className="font-base text-md mt-4 font-jakarta tracking-wide hover:text-green-500"
                          >
                            Settings
                          </Link>
                        </li>
                        <li className=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl">
                          <Link
                            to="/"
                           
                            className="font-base text-md rounded text-white shadow-xl px-3 py-2 font-jakarta tracking-wide bg-red-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
    </>: (<button  className='p__opensans w-20 h-10 bg-amber-400 text-xl font-semibold'><Link to ='/login'>Login</Link></button>)}
    
   
   
    </div>

    <div className="navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="navbar-smallscreen_overlay flex__center slide-bottom">
            <ImCross fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="navbar-smallscreen_links">
              <li><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
            
            </ul>
          </div>
        )}
      </div>
    </div>
  </nav>
  );

          }  ;

export default Navbar;