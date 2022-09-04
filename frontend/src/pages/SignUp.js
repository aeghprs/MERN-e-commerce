import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch,useSelector } from 'react-redux';
import { register } from "../actions/UserActions";
 function Signup() {
  const dispatch = useDispatch()
  const { isAuthenticated, error, loading } = useSelector(state => state.auth);
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-36 w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1"> 
        <div className="text-primary m-6">
      <div className="flex items-center mt-3 justify-center">
        <h1 className="text-2xl font-medium text-primary mb-10">
          Create new account
        </h1>
      </div>
      <Formik
        initialValues={{
          fullName: "",
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .required("Required")
            .min(3, "Too Short")
            .max(20, "Too Long")
            .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
          username: Yup.string().required("Required"),
          email : Yup.string().email('Invalid email format').required("Please enter valid Email"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
            ConfirmPassword: Yup
  .string()
  .required()
  .oneOf([Yup.ref("password"), null], "Passwords must match")   
        })}
        onSubmit={async (values) => {
          dispatch(register(values)).then( navigate('/'))
        }}
      >
        {({ errors, resetForm, isSubmitting, ...props }) => {
          return (
      <Form>
        <div>
        <label className="text-left">FullName</label>
        <Field
          name="fullName"
          type="text"
          placeholder="Enter your Fullname Here."
          className={
            "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          }
        />
         <ErrorMessage
                        className="text-red-500"
                        component="span"
                        name="fullName"
                      />
        </div>
      
        <div>
        <label className="text-left">Username</label>
        <Field
          name="username"
          type="text"
          placeholder="Enter your Username Here."
          className={
            "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          }
        />
        <ErrorMessage
                        className="text-red-500"
                        component="span"
                        name="username"
                      />
        </div>
          
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
          placeholder="Enter Password Here."
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
        <div>
        <label>Confirm Password</label>
        <Field
          name="ConfirmPassword"
          type="password"
          placeholder="Enter Password Here."
          className={
            "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          }

        />
          <ErrorMessage
                        className="text-red-500"
                        component="span"
                        name="ConfirmPassword"
                      />
        </div>
        <div className="flex items-center mt-3 justify-center">
          <button
          type="submit"
            className={
              "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
            }
          >
            Signup
          </button>
        </div>
      </Form>
          )}}
          </Formik>
      <div className="flex items-center mt-3 justify-center">
      <button className={"justify-center text-green-500 "}>
        <Link to='/login'>
        Already have an account? Login
        </Link>
      </button>
      </div>
      
    </div>      
      </div>
      </>
  );
}
export default Signup