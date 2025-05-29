import './Register.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import { Bounce, toast } from 'react-toastify'

const Register = () => {

    const navigate = useNavigate();
    const { storeTokeninLocalStorage } = useAuth();

    const [ userRegister, setUserRegister ] = useState( {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        cpassword: ''
    })


    const handleRegisterInputs = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setUserRegister( { 
            ...userRegister, 
            [name]: value 
        })

    }

    const handleRegisterSubmit = async (e) => {

        e.preventDefault();
        console.log(userRegister);

        const response = await fetch('http://localhost:4001/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRegister)
        })


        const data = await response.json();

        if(response.ok){
            toast.success('Registration successful', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });

            
            storeTokeninLocalStorage(data.token);

            setUserRegister( {
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                password: '',
                cpassword: ''
            })
            navigate('/');
        }else{
            toast.error(data.extraDetails ? data.extraDetails : data.message, {})
        }

    }

    return (
        <>
            <div className='main-register'>
                <div className='container'>
                    <div className='forms mt-5'>
                        <div className='form register'>
                            <span className='title'>Register</span>

                            <form onSubmit={handleRegisterSubmit}>
                                <div className='input-field'>
                                    <input type="text" name="firstname" value={userRegister.firstname} onChange={handleRegisterInputs}  placeholder='Enter your firstname' required />
                                    <i class="uil uil-user icon"></i>
                                </div>

                                <div className='input-field'>
                                    <input type="text" name="lastname" value={userRegister.lastname} onChange={handleRegisterInputs}  placeholder='Enter your lastname' required />
                                    <i className='uil uil-user icon'></i>
                                </div>

                                <div className='input-field'>
                                    <input type="email" name="email" value={userRegister.email} onChange={handleRegisterInputs}  placeholder='Enter your email' required />
                                    <i className='uil uil-envelope icon'></i>
                                </div>

                                <div className='input-field'>
                                    <input type="number" name="phone" value={userRegister.phone} onChange={handleRegisterInputs}  placeholder='Enter your phone number' required />
                                    <i class="uil uil-phone icon"></i>
                                </div>

                                <div className='input-field'>
                                    <input type="password" name="password" value={userRegister.password} onChange={handleRegisterInputs}  placeholder='Enter your password' required />
                                    <i className='uil uil-lock icon'></i>
                                </div>

                                <div className='input-field'>
                                    <input type="password" name="cpassword" value={userRegister.cpassword} onChange={handleRegisterInputs}  placeholder='Confirm your password' required />
                                    <i className='uil uil-lock icon'></i>
                                </div>

                                <div className='button input-field'>
                                    <input type="submit" value="Register" />
                                </div>

                                <div className='form-link'>
                                    <span className='text'>Already have an account ? <a href="#" className='link'>Login</a></span>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;