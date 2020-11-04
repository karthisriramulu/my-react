import { ErrorMessage, Field, Form, Formik, useFormik, yupToFormErrors } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../config/firebase';
import * as Yup from 'yup';


export default function SignUp() {

    const history = useHistory();
    
    const formik = useFormik({
        
    });
    

    return (
        <Formik
            initialValues= {{email: '', password: '', fireerror: ''}}
            onSubmit= {(value, formikBag) => {
                firebase
                .auth()
                .createUserWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    history.replace("/");
                }).catch((e) => {
                    formikBag.setFieldError("fireerror", e.message);
                })
            }}
            validationSchema= { Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required().min(6),
            })}
        >

        
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700">
                <ErrorMessage name="fireerror" />
                <Form className="m-5 w-10/12" >
                    
                    <h1 className="w-full  text-4xl tracking-widest text-center my-6">Sign Up Here</h1>
                    <div className="w-full my-6">
                        <Field 
                            name="email"
                            type="text"
                            className="p-2 rounded shadow w-full text-black"
                            placeholder="Email or Username"
                        />
                            <ErrorMessage name="email" />
                            
                    </div>
                    <div className="w-full my-6">
                        <Field 
                            name="password"
                            type="password"
                            className="p-2 rounded shadow w-full text-black"
                            placeholder="Password"
                        />
                        <ErrorMessage name="password" />
                        
                    </div>
                    <div className="w-full my-6">
                        <button
                            type="submit"
                            className="p-2 rounded shadow w-full bg-gradient-to-tr from-yellow-600 to-yellow-400 text-black"
                        > 
                        {/* {
                            isLoading ? (
                            <i className="fas fa-circle-notch fa-spin"></i>
                            ) : ( */}
                                Sign Up
                            {/* )
                        } */}
                            </button>
                    </div>
                </Form>
            </div>
        </div>

        </Formik>
    )
}
