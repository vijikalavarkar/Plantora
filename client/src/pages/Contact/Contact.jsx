import './Contact.css'
import React, { useState, useEffect } from'react'
import { useNavigate } from'react-router-dom'
import { useAuth } from '../../store/auth'


const Contact = () => {

    const navigate = useNavigate();

    const [ userContact, setUserContact ] = useState( {
        fullname: '',
        email: '',
        phone: '',
        message: ''
    })

    const { user } = useAuth();

    useEffect(() => {
        if(user){
            setUserContact( {
                ...userContact,
                fullname: user.firstname + " " + user.lastname,
                email: user.email,
                phone: user.phone
            })
        }
    }, [user])

    const handleContactInputs = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setUserContact( {
           ...userContact,
            [name]: value
        })


    }


    const handleContactSubmit = async (e) => {

        e.preventDefault();
        console.log(userContact);

        const response = await fetch('http://localhost:4001/api/v1/auth/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userContact)
        });

        if(response.ok){
            alert('Message sent successfully');
            setUserContact( {
                fullname: '',
                email: '',
                phone: '',
                message: ''
            })
            navigate('/')
        }

    }

    return (
        <>
            <div className='contact-main'>
                <div className='container'>
                    <div className='forms mt-5'>
                        <div className='form contact'>
                            <span className='title'>Contact Us</span>

                            <form onSubmit={handleContactSubmit}>
                                <div className='input-field'>
                                    <input type="text" name="fullname" value={userContact.fullname} onChange={handleContactInputs} placeholder='Enter your fullname' required />
                                    <i class="uil uil-user icon"></i>
                                </div>



                                <div className='input-field'>
                                    <input type="email" name="email" value={userContact.email} onChange={handleContactInputs} placeholder='Enter your email' required />
                                    <i className='uil uil-envelope icon'></i>
                                </div>

                                <div className='input-field'>
                                    <input type="number" name="phone" value={userContact.phone} onChange={handleContactInputs} placeholder='Enter your phone number' required />
                                    <i class="uil uil-phone icon"></i>
                                </div>

                                <div className='input-field'>
                                    <input type="text" name="message" value={userContact.message} onChange={handleContactInputs} placeholder='Enter your message' required />
                                    <i class="uil uil-comment-alt-message"></i>
                                </div>

                                <div className='button input-field'>
                                    <input type="submit" value="Send Message" />
                                </div>



                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact;