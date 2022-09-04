import React, { useState, useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { login, clearErrors} from "../actions/UserActions";
export default function Login() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isAuthenticated, error, loading,token } = useSelector(state => state.auth);
  console.log(token)
  useEffect(() => {

    if (isAuthenticated) {
        navigate('/')
        localStorage.setItem('token',token)
    }

    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }

}, [dispatch, isAuthenticated, error])
  return (
    
      <div className="mt-32 w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1 "> 
        <div className="text-primary m-6">
      <div className="flex items-center mt-3 justify-center">
        <h1 className="text-2xl font-medium text-primary mb-10">
          Login to your account
        </h1>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
            email : Yup.string().email('Invalid email format').required("Please enter valid Email"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
        })}
        onSubmit={async (values) => {
           
              dispatch(login(values))
          }
        }
      >
        {({ errors, resetForm, isSubmitting, ...props }) => {
          return (
      <Form>
        <div>
        <label className="text-left">Email</label>
        <Field
          name="email"
          type="text"
          placeholder="Enter your Email Here."
          className={
            "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          }
        />
        
        <ErrorMessage
                        className="text-red-500"
                        component="span"
                        name="email"
                      />
        </div>
        
        <div>
        <label>Password</label>
        <Field
          name="password"
          type="password"
          placeholder="Password"
          className={
            "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          }
        />  
           <ErrorMessage
                        className="text-red-500"
                        component="span"
                        name="password"
                      />
        </div>
        
        <div className="flex items-center mt-3 justify-center">
          <button
          type="submit"
            className={
              "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
            }
          >
            Login
          </button>
        </div>
      </Form>
          )}}
          </Formik>
      <div className="flex items-center mt-3 justify-center">
      <button className={"justify-center text-green-500 "}>
        <Link to='/signup'>
        Need to register? Sign up for free
        </Link>
      </button>
      </div>
    </div>      
      </div>
  );
}