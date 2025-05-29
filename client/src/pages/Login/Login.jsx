import './Login.css'
import React, { useState } from'react'
import { useNavigate } from'react-router-dom'
import { useAuth } from '../../store/auth'


const Login = () => {

    const navigate = useNavigate();
    const { storeTokeninLocalStorage } = useAuth();


    const [ userLogin, setUserLogin ] = useState( {
        email: '',
        password: ''
    }) 

    const handleLoginIputs = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setUserLogin( { 
            ...userLogin, 
            [name]: value 
        })

    }

    const handleLoginSubmit = async (e) => {

        e.preventDefault();
        console.log(userLogin);

        const response = await fetch('http://localhost:4001/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin)
        });

        if(response.ok){
            alert('Login successful');

            const data = await response.json();
            storeTokeninLocalStorage(data.token);


            setUserLogin( {
                email: '',
                password: ''
            })
            navigate('/')
        }

    } 

    return (
        <>
            <div className='main-login'>
                <div className='container'>
                    <div className='forms mt-5'>
                        <div className='form login'>
                            <span className='title'>Login</span>

                            <form onSubmit={handleLoginSubmit}>
                                <div className='input-field'>
                                    <input type="email" name="email" value={userLogin.email} onChange={handleLoginIputs} placeholder='Enter your email' required />
                                    <i className='uil uil-envelope icon'></i>
                                </div>

                                <div className='input-field'>
                                    <input type="password" name="password" value={userLogin.password} onChange={handleLoginIputs} placeholder='Enter your password' required />
                                    <i className='uil uil-lock icon'></i>
                                </div>

                                <div className='checkbox-text'>
                                    <div className='checkbox-content'>
                                        <input type="checkbox" id='logCheck' />
                                        <label htmlFor="logCheck" className='text'>&nbsp;Remember me</label>
                                    </div>
                                    <a href="#" className='text'>Forgot password?</a>
                                </div>

                                <div className='button input-field'>
                                    <input type="submit" value="Login" />
                                </div>

                                <div className='form-link'>
                                    <span className='text'>Don't have an account ? <a href="#" className='link'>Signup</a></span>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;