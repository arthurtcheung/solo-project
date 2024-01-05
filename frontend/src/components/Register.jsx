import { useState } from 'react';
import './register.css';
import PlaceIcon from '@mui/icons-material/Place'; // NOTE: react component library; includes pre-built components

export default function Register() {
  // Track if successful registration
  const [success, setSuccess] = useState(false);

  // Track if failed registration
  const [failure, setFailure] = useState(false);

  return (
    <div className='registerContainer'>
      <div className='logo'>
        <PlaceIcon />
        Acadia
      </div>
      <form>
        <input type='text' placeholder='username'/>
        <input type='email' placeholder='email'/>
        <input type='password' placeholder='password'/>
        <button className='registerFormButton'>Register</button>
      </form>
      {
        success && <span className='success'>Registration successful ✅</span>
      }
      {
        failure && <span className='failure'>Something went wrong ❌</span>
      }
    </div>
  )
}