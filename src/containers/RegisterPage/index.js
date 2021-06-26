import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import './style.css';
import { signup, signInWithGoogle } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);


  const registerUser = (e) => {
    
    e.preventDefault();

    const user = {
      firstName, lastName, email, password
    }
    
    dispatch(signup(user))
  }

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };


  if(auth.authenticated){
    return <Redirect to={`/`} />
  }

  return(
    <Layout>
      <div className="registerContainer">
        <Card>
          <form onSubmit={registerUser} id="formContent">

          <br />
          <h4>New? Signup</h4>
          <br />

          <input 
              class="fadeIn"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />

            <input 
             class="fadeIn"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />

            <input 
             class="fadeIn"
              name="email"
              type="text"
              value={email}
              autocomplete="off"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input 
             class="fadeIn"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <input type="submit" class="fadeIn" value="Signup" />
            <br/>
            <span>Or</span>
            <br/>
            <div style={{ marginBottom: '15px', marginTop: '10px' }}>
              <a class="hollow button primary" onClick={googleSignIn} style={{ border: '3px solid', padding: "5px", textDecoration: 'none'}}>
                <img width="15px" style={{ marginBottom:"3px", marginRight:"5px"}} alt="Google login" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                Sign up with Google
              </a>
            </div>
          </form>
          
        </Card>
      </div>
    </Layout>
  )
}

export default RegisterPage