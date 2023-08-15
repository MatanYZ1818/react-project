import { useContext, useState } from 'react';
import Joi from 'joi';
import { BiRefresh } from 'react-icons/bi';
import { GeneralContext } from '../../App';

export default function Signup() {
  const { setUser, isLogged, setIsLogged, snackbar, setIsLoading } = useContext(GeneralContext);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    fullName: '',
  });

  const [loginError, setLoginError] = useState('');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const loginSchema = Joi.object({
    userName: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    fullName: Joi.string().min(3).required(),
  });

  const handleInputChange = (ev) => {
    const { id, value } = ev.target;

    const obj = {
      ...formData,
      [id]: value,
    };

    const schema = loginSchema.validate(obj, { abortEarly: false });
    const err = { ...errors, [id]: undefined };

    if (schema.error) {
      const error = schema.error.details.find(e => e.context.key === id);

      if (error) {
        err[id] = error.message;
      }

      setIsValid(false);
    } else {
      setIsValid(true);
    }

    setFormData(obj);
    setErrors(err);
  };

  function signup(ev) {
    ev.preventDefault();

    fetch("https://api.shipap.co.il/signup", {
      credentials: 'include',
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then(res => {
        if(res.ok){
            return res.json()
        } else {
            return res.text()
            .then (x=>{
                throw new Error(x)
            })
        }
        })
    .catch(err => {
        setLoginError(err.message);
        })
    .finally(() => {
        setIsLoading(false);
        });
  }

  return (
    <div className="Login smallFrame">
      <h2>REGISTER</h2>

      <form>
        <label>
        First name*
          <input type="text" id='firstname' className={errors.firstname ? 'fieldError' : ''} onChange={handleInputChange} />
        </label>

        {errors.firstname ? <div className='fieldError'>{errors.firstname}</div> : ''}

        <label>
          <input type="text" id='middlename' placeholder='Middle name'/>
        </label>

        <label>
        Last name*
          <input type="text" id='lastname' className={errors.lastname ? 'fieldError' : ''} onChange={handleInputChange} />
        </label>

        {errors.lastname ? <div className='fieldError'>{errors.lastname}</div> : ''}

        <label>
        Phone*
          <input type="tel" id='phone' className={errors.phone ? 'fieldError' : ''} onChange={handleInputChange} />
        </label>

        {errors.phone ? <div className='fieldError'>{errors.phone}</div> : ''}

        <label>
        Email*
          <input type="email" id='email' className={errors.email ? 'fieldError' : ''} onChange={handleInputChange} />
        </label>

        {errors.email ? <div className='fieldError'>{errors.email}</div> : ''}

        <label>
        Password*
          <input type="password" id='password' className={errors.password ? 'fieldError' : ''} onChange={handleInputChange} />
        </label>

        {errors.password ? <div className='fieldError'>{errors.password}</div> : ''}

        <label>
          <input type="url" id='imageurl' placeholder='Image url'/>
        </label>
        <label>
          <input type="text" id='imagealt' placeholder='Image alt'/>
        </label>
        <label>
          <input type="text" id='state' placeholder='State'/>
        </label>
        <label>
          <input type="text" id='country' placeholder='Country*'/>
        </label>
        <label>
          <input type="text" id='city' placeholder='City*'/>
        </label>
        <label>
          <input type="text" id='street' placeholder='Street*'/>
        </label>
        <label>
          <input type="number" id='housenumber' placeholder='House number*'/>
        </label>
        <label>
          <input type="number" id='zip' placeholder='Zip'/>
        </label>
        <label>
        <input type='checkbox'/>
        Signup as business
        </label>

        <button>CANCEL</button>
        <button><BiRefresh size={22} /></button>
        <button disabled={!isValid} onClick={signup}>SUBMIT</button>

        {loginError ? <div className='fieldError'>{loginError}</div> : ''}
      </form>
    </div>
  )
}
