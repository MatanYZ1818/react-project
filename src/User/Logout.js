import { useContext } from 'react';
import { userContext } from '../App';
import './User.scss';
import { useNavigate } from 'react-router-dom';
import * as Icon from "react-bootstrap-icons"

export default function Logout() {
    const { user, setUser, setIsLogged, setLoading, snackbar } = useContext(userContext);
    const navigate = useNavigate();

    const logout = () => {
        setLoading(true);

        fetch("https://api.shipap.co.il/logout", {
            credentials: 'include',
        })
        .then(() => {
            setUser();
            setIsLogged(false);
            navigate('/');
            setLoading(false);
            snackbar('המשתמש התנתק בהצלחה');
        });
    }

    return (
        <p className='user'>
            <button className='headerButton profile'>
                {user.fullName} <Icon.PersonSquare />
            </button>
            <button className="logout" onClick={logout}>התנתק</button>
        </p>
    )
}