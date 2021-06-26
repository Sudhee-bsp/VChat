import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import { signin, isLoggedInUser } from '../../actions';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import'bootstrap/dist/css/bootstrap.min.css';
import $ from'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // useEffect(() => {
  //   if(!auth.authenticated){
  //     dispatch(isLoggedInUser())
  //   }
  // }, []);

  const userLogin = (e) => {
    e.preventDefault();

    if(email == ""){
      alert("Email is required");
      return;
    }
    if(password == ""){
      alert("Password is required");
      return;
    }
    dispatch(signin({ email, password }));
  }

  if(auth.authenticated){
    return <Redirect to={`/`} />
  }


  return(
    <Layout>
      <div className="wrapper">
          <div class="fadeIn">
            <img src="https://www.pngitem.com/pimgs/m/539-5399089_free-png-download-live-chat-logo-png-images.png" id="icon" alt="User Icon" width="200" height="200" />
          </div>

          <form onSubmit={userLogin} id="formContent">

            <input 
              id="login" 
              class="fadeIn"
              name="email"
              type="text"
              value={email}
              autocomplete="off"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input 
              id="password" 
              class="fadeIn"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <input type="submit" class="fadeIn" value="Log In" />
            
          </form>
      </div>
    </Layout>
   )
}

export default LoginPage