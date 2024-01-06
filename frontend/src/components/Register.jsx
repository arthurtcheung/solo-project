import { useState, useRef } from 'react';
import './register.css';
import PlaceIcon from '@mui/icons-material/Place'; // NOTE: react component library; includes pre-built components
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios'; // NOTE: JS library used to make HTTP requests from a browser; used here to fetch data (pins) from Atlas db


export default function Register({ setShowRegister }) {
  // Track if successful registration
  const [success, setSuccess] = useState(false);

  // Track if failed registration
  const [failure, setFailure] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    console.log('new user created: ', newUser);

    try {
        await axios.post('/users/register', newUser);
        setFailure(false);
        setSuccess(true);
    } catch(err) {
        console.log('ERROR REGISTERING USER: ', err);
        setFailure(true);
    }
  }

  return (
    <div className='registerContainer'>
      <div className='logo'>
        <PlaceIcon />
        Acadia
      </div>
      <form onSubmit={ handleSubmit }>
        <input type='text' placeholder='username' ref={ nameRef } />
        <input type='email' placeholder='email' ref={ emailRef } />
        <input type='password' placeholder='password' ref={ passwordRef } />
        <button className='registerFormButton'>Register</button>
        { success && <span className='success'>Registration successful ✅</span> }
        { failure && <span className='failure'>Something went wrong ❌</span> }
      </form>
      <CancelIcon className='registerCancel' onClick={ () => setShowRegister(false) }/>
    </div>
  )
}