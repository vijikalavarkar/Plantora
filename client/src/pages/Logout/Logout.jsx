import { useEffect } from 'react';
import './Logout.css'
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    const { userLogout } = useAuth();
    
    useEffect(()=>{
        userLogout();
    }, [userLogout])

    navigate('/login')

}
export default Logout;