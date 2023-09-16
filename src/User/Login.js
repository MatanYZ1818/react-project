import { Link, useNavigate } from 'react-router-dom';
import "./User.scss"
import Joi from 'joi';
import { BiRefresh } from 'react-icons/bi';
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../App';


export default function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState('');
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const loginSchema = Joi.object({
        email: Joi.string().min(3).required(),
        password: Joi.string().required(),
    });
    const { setUser, isLogged, setIsLogged, setLoading, snackbar } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            navigate('/');
        }
    }, [isLogged, navigate])

    const login = ev => {
        ev.preventDefault();
        setLoading(true);
        
        fetch("https://api.shipap.co.il/login?token=d2960fec-3431-11ee-b3e9-14dda9d4a5f0", {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text().then(x => {
                    throw new Error(x);
                });
            }
        })
        .then(data => {
            setUser(data);
            setIsLogged(true);
            snackbar(`${data.fullName} login successful!`);
        })
        .catch(err => {
            setLoginError(err.message);
            snackbar(err.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    const handleError = ev => {
        const { id, value } = ev.target;

        console.log(ev)

        const obj = {
            ...formData,
            [id]: value,
        };

        const schema = loginSchema.validate(obj, { abortEarly: false});
        const errors = {};
        console.log(schema.error)

        if (schema.error) {
            const error = schema.error.details.find(e => e.context.key === id);

            if (error) {
                errors[id] = error.message;
            }

            setIsValid(false);
        } else {
            setIsValid(true);
        }

        setFormData(obj);
        setErrors(errors);
    }

    const focus=ev=>{
        console.log(ev.parentElement)
    }

    return(
        <div className='User'>
            <div className="Login smallFrame">
                <h2>Login</h2>
                
                <form onSubmit={login}>
                    <div className='inputContainer'>
                        <input type="email" id='email' className={errors.email ? 'formInput fieldError' : 'formInput'} onChange={handleError} onFocus={focus} placeholder=''/>
                        <label className='formLabel'>Email*</label>
                    </div>

                    {errors.email ? <div className='fieldError'>{errors.email}</div> : ''}

                    <div className='inputContainer'>
                        <input type="password" id='password' className={errors.password ? 'formInput fieldError' : 'formInput'} onChange={handleError} onFocus={focus} placeholder=''/>
                        <label className='formLabel'>Password*</label>
                    </div>

                    { errors.password ? <div className='fieldError'>{errors.password}</div> : '' }

                    <button className='cancelButton'>CANCEL</button>
                    <button className='refreshButton'><BiRefresh size={22} /></button>
                    <button className='submitButton' disabled={!isValid} onClick={login}>LOGIN</button>

                    { loginError ? <div className='fieldError'>{loginError}</div> : '' }
                </form>
            </div>

            <p className="signup">
                <Link to="/signup">sign up instead</Link>
            </p>
        </div>
    )
}