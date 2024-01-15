import { useState, useRef } from 'react';
import './login.css';

import PlaceIcon from '@mui/icons-material/Place'; // NOTE: react component library; includes pre-built components
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios'; // NOTE: JS library used to make HTTP requests from a browser; used here to fetch data (pins) from Atlas db


export default function Login({ setShowLogin, myStorage, setCurrentUser }) {
// Track if failed login
  const [failure, setFailure] = useState(false);

  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value
    }

    console.log('user logged in: ', user);

    try {
        const res = await axios.post('/users/login', user);
        myStorage.setItem('user', res.data.username);
        setCurrentUser(res.data.username);
        setShowLogin(false);
        setFailure(false);
    } catch(err) {
        setFailure(true);
    }
  }

  return (
    <div className='loginContainer'>
      <div className='logo'>
        <PlaceIcon />
        Yosemite
      </div>
      <form onSubmit={ handleSubmit }>
        <input type='text' placeholder='username' ref={ nameRef } />
        <input type='password' placeholder='password' ref={ passwordRef } />
        <button className='loginFormButton'>Login</button>
        { failure && <span className='failure'>Something went wrong ❌</span> }
      </form>
      <CancelIcon className='loginCancel' onClick={ () => setShowLogin(false) }/>
    </div>
  )
}