import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';


function Register() {

    const [values, setValues] = useState({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const handleSubmit = (event) =>{
      event.preventDefault();

      axios.post("http://localhost:3000/create", values)
      .then((res)=>{
        if(res.data.status === "Success"){
            navigate("/")
        }else{
            alert("Error adding data to database")
        }
      })
      .catch((err)=>{
      console.log(err)
      })
    }
    return (
        <div>
            <div className='container'>

                <div className='head'>
                    <div className='head-right'>
                        <ul>
                            <li>Home</li>
                            <li>Blog</li>
                            <li>Service</li>
                            <li className='high'>Registration</li>
                        </ul>

                    </div>

                </div>
                <div className='body-content'>
                    
                    <div className='body-content-left'>
                    <h1>Blogify</h1>
                    <p>Empowering Bloggers Worldwide</p>
                        <form className='form-container' onSubmit={handleSubmit} >
                            <input placeholder='Enter your Name' type='text' className='input-1' name='name' required
                            onChange={(e)=>setValues({...values, name: e.target.value})}
                            />
                            <input placeholder='Enter your Email' type='email' className='input-2' name='email' required 
                            onChange={(e)=>setValues({...values,email: e.target.value})}
                            />
                            <input placeholder='Enter password' type='password' className='input-1' name='password' required
                            onChange={(e)=>setValues({...values, password : e.target.value})}
                            />
                            
                            <button type='submit' className='form-button'>Register !</button>
                            
                        </form>
                    </div>
                    <div className='body-content-right' >
                        <img src="/assets/45.png" className='image-1' />
                        <p>Already have an account ?<Link to="/"><span>Login</span></Link> </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register