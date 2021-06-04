import React, {useState} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Redirect, useLocation } from "react-router-dom"
import {useForm} from 'react-hook-form'
import {GoTasklist} from 'react-icons/go'
import {FcGoogle} from 'react-icons/fc'
import {AiFillApple,AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import {ImFacebook2} from 'react-icons/im'
import { yupResolver } from '@hookform/resolvers/yup';
import {useAuth} from '../../context/AuthContext'
import {useHistory, Link} from 'react-router-dom'
import * as yup from "yup";

import './LoginForm.css'
import { toast, ToastContainer, Zoom, Bounce} from 'react-toastify'


export const LoginForm=()=>{
  const history= useHistory()
  const location=useLocation()
  const auth= useAuth()
  const [visiblePassword, setVisiblePassword]= useState(false)
  const loginSchema= yup.object().shape({
    email: yup.string().required("Email address is required"),
    password: yup.string().required("Password is required")
  })
  const {register, handleSubmit, formState:{errors}}= useForm({
    resolver:yupResolver(loginSchema)
  })
  const submitLoginForm=async (data)=>{
    try{
      await auth.login(data.email, data.password);
      history.push('/')      
    
    }catch(e){
      console.log(e)
    }
  }

  const handleGoogleLogin= async()=>{
    try{
      let result= await auth.signInWithGoogle()
      let user= result.user;
      const obj={
        username: user.displayName,
        email:user.email,
        uid: user.uid,
        img:user.photoURL
      };
      console.log('done')
        history.push('/app');
        toast.success('Signed in')
        console.log(obj)
    }catch(e){
      console.log(e)
    }
  }
  
  const handleAppleLogin=()=>{
    auth.signInWithApple()
      .then((result)=>{
        let user= result.user;
        const obj={
          username: user.displayName,
          email:user.email,
          uid: user.uid,
          img:user.photoURL
        };
        history.push('/profile');
        // <Redirect to={{ pathname: "/profile", state: { from: location } }}/>
        // <Redirect to={{ pathname: "/profile", state: { from: location } }} />
        toast.success('Signed in')
        console.log(obj)
      
      }).catch((error)=>{
        console.log(error)
        toast.error(error)

    })
  }

    
    return(
      
    <div className="login-page"> 
      <ToastContainer/>
      <div className="login-page-container">
        <span className="login-page-header">
          <GoTasklist className="login-logo"/>
          <p className="login-logo-text">todoist</p>
        </span>
        <p className="login-text">Login</p>
        <div className="login-services-container">
          <ul className="login-services-list">
            <li className="login-service-item">
              <button className="login-service" onClick={handleGoogleLogin}><FcGoogle/><p>Continue with Google</p></button>
            </li>
            <li className="login-service-item">
              <button className="login-service"><ImFacebook2 className="fb-icon"/> <p>Continue with Facebook</p></button>
            </li>
            <li className="login-service-item">
              <button className="login-service" onClick={handleAppleLogin}><AiFillApple/><p>Continue with Apple</p></button>
            </li>
          </ul>
        </div>
        
        
        
        <form className="login-form" onSubmit={handleSubmit(submitLoginForm)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" {...register("email")}/>
            <p>{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type={visiblePassword? "text":"password"} {...register("password")}/>
            <i className="login-form__show-hide-password" onClick={()=>setVisiblePassword(!visiblePassword)}>{visiblePassword?<AiOutlineEye/>:<AiOutlineEyeInvisible/>}</i>
            <p>{errors.password?.message}</p>
          </div>
          <button className="login-button" type="submit">Login</button>
          <div className="keep-logged-in">
            <input type="checkbox"/>
            <p>Keep me logged in</p>
          </div>
          <Link className="login-forgot-password" to="">
            Forgot your password?
          </Link>

        </form>
        <div className="login-footer">
          <span>
            <p>Don't have an account? </p><Link to='/signup' className="login-footer-signup">Signup</Link>
          </span>
        </div>
      </div>
    </div>
  )


}


export default LoginForm




