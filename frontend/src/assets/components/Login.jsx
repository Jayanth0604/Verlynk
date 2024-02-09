import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
      });
      const [error, setError] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
      const navigate = useNavigate()
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/login', credentials);
          if (response.data.status === 'Success') {
            const email  = credentials.email;
                    navigate('/dashboard/' + email)
          } else {
            setError('Incorrect email or password');
          }
        } catch (error) {
          console.error('Error logging in:', error);
          setError('An error occurred while logging in');
        }
      };

  return (
    <div>
      <div className='container'>
        <div className='head'>
          <div className='head-right'>
            <ul>
              <li>Home</li>
              <li>Blog</li>
              <li>Service</li>
              <li className='high'>Login</li>
            </ul>
          </div>
        </div>
        <div className='body-content'>
          <div className='body-content-left'>
            <img src="/assets/login02.jpg" className='image-1' />
            <p>New user ? <Link to="/register"><span>Register here !</span></Link></p>
          </div>
          <div className='body-content-right' >
            <h1>Blogify</h1>
            <p>Empowering Bloggers Worldwide</p>
            <form className='form-container' onSubmit={handleSubmit}>
              <input placeholder='Enter your Email' type='email' className='input-2' name='email' required
                value={credentials.email}
                onChange={handleChange}
              />
              <input placeholder='Enter password' type='password' className='input-1' name='password' required
                value={credentials.password}
                onChange={handleChange}
              />
              <button type='submit' className='form-button'>Login !</button>
            </form>
            <p>We have safe and secure process</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
