import { useState } from "react"

export default function Signup(){
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
        password: Joi.string()
            .min(8)
            .regex(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,10}$/)
            .required()
            .label("Password")
            .messages({
            "string.min": "Must have at least 8 characters",
            "object.regex": "Must have at least 8 characters",
            "string.pattern.base": "enter your custom error here..."}),
        email: Joi.string().min(3).required(),
        fullName: Joi.string().min(3).required(),
    });

    const handleInputChange = (ev) => {
        const { id, value } = ev.target;

        const obj = {
            ...formData,
            [id]: value,
        };

        const schema = loginSchema.validate(obj, { abortEarly: false, messages: { he: JOI_HEBREW }, errors: { language: 'he' } });
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
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                onSignup(data.user);
            } else {
                setLoginError(data.message);
            }
        });
    }

    return(
        <>
            <div className="titleContainer">
                <h2>Register</h2>
            </div>
            <div className="formContainer">
                <form onSubmit={signup}> 
                    <input type="text" id='fullName' className={errors.fullName ? 'fieldError' : ''} onChange={handleInputChange} />
                    
                    {errors.fullName ? <div className='fieldError'>{errors.fullName}</div> : ''}

                    <input type="email" id='email' className={errors.email ? 'fieldError' : ''} onChange={handleInputChange} />
                    
                    {errors.email ? <div className='fieldError'>{errors.email}</div> : ''}

                    <input type="text" id='userName' className={errors.userName ? 'fieldError' : ''} onChange={handleInputChange} />
                    
                    {errors.userName ? <div className='fieldError'>{errors.userName}</div> : ''}

                    <input type="password" id='password' className={errors.password ? 'fieldError' : ''} onChange={handleInputChange} />
                    
                    {errors.password ? <div className='fieldError'>{errors.password}</div> : ''}

                    <button disabled={!isValid}>הרשם</button>

                </form>
            </div>
        </>
    )
}