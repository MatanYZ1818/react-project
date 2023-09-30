import { useContext, useState } from 'react';
import "./User.scss"
import Joi from 'joi';
import { BiRefresh } from 'react-icons/bi';
import { userContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
    const { setUser, isLogged, setIsLogged, snackbar, setIsLoading } = useContext(userContext);
    const [formData, setFormData] = useState({
        firstName:"",
        middleName:"",
        lastName:"",
        phone:"",
        email:"",
        password:"",
        imageUrl:"",
        imageAlt:"",
        state:"",
        coutry:"",
        city:"",
        street:"",
        houseNumber:"",
        zip:"",
        business:false,
    });

    const [loginError, setLoginError] = useState('');
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();


    const loginSchema = Joi.object({
        firstName: Joi.string().min(2).required(),
        middleName: Joi.string().min(0),
        lastName: Joi.string().min(2).required(),
        phone: Joi.string().min(5).required(),
        email: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
        imageUrl: Joi.string().min(0),
        imageAlt: Joi.string().min(0),
        state: Joi.string().min(0),
        coutry: Joi.string().min(0),
        city: Joi.string().min(0),
        street: Joi.string().min(0),
        houseNumber: Joi.string().min(0),
        zip: Joi.number(),
        business:Joi.boolean()
    });

    const inputStructure=[
        {name:"firstName",title:"First name*",type:"text"}
        ,{name:"middleName",title:"Middle name",type:"text"}
        ,{name:"lastName",title:"Last name*",type:"text"}
        ,{name:"phone",title:"Phone*",type:"text"}
        ,{name:"email",title:"Email*",type:"text"}
        ,{name:"password",title:"Password*",type:"password"}
        ,{name:"imageUrl",title:"Image",type:"text"}
        ,{name:"imageAlt",title:"Image alternative text",type:"text"}
        ,{name:"coutry",title:"Country*",type:"text"}
        ,{name:"state",title:"State",type:"text"}
        ,{name:"city",title:"City*",type:"text"}
        ,{name:"street",title:"Street*",type:"text"}
        ,{name:"houseNumber",title:"House number*",type:"number"}
        ,{name:"zip",title:"zip code*",type:"number"}    
    ]

    const handleInputChange = (ev) => {
        const { id, value } = ev.target;

        const obj = {
            ...formData,
            [id]: value,
        };

        const schema = loginSchema.validate(obj, { abortEarly: false });
        const err = { ...errors, [id]: undefined };

        console.log(schema.error)

        if (schema.error) {
            const error = schema.error.details.find(e => e.context.key === id);

            if (error) {
            err[id] = error.message;
            }

            console.log("invalid");
            setIsValid(false);
        } else {
            console.log("valid");
            setIsValid(true);
        }

        setFormData(obj);
        setErrors(err);
    };

    const checkBusiness=(ev)=>{
        console.log(formData);
        console.log(ev.target.checked);
        const obj = {
            ...formData,
            business: ev.target.checked,
        };
        console.log(obj);
        setFormData(obj);
        console.log(formData);
    }

    function signup(ev) {
        ev.preventDefault();

        fetch("https://api.shipap.co.il/signup?token=d2960fec-3431-11ee-b3e9-14dda9d4a5f0", {
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
        .then(data => {
            console.log(data);
            navigate("/login")
        })
        .catch(err => {
            setLoginError(err.message);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className='User'>
            <div className="Signup smallFrame">
                <h2>REGISTER</h2>
                
                <form>
                    {
                        inputStructure.map((s,i)=>
                            <div className={`inputContainer ${(i%2!=0)&& 'l'}`}>
                                <input type={s.type} id={s.name} className={errors[s.name] ? 'formInput fieldError' : 'formInput '} onChange={handleInputChange} placeholder=''/>
                                <label className='formLabel'>{s.name}</label>
                                {errors[s.name] ? <div className='fieldError'>{errors[s.name]}</div> : ''}
                            </div>
                        )
                    }
                    <div className='businessContainer'>
                        <label>
                            <input type='checkbox' onChange={checkBusiness}/>
                            Signup as business
                        </label>
                    </div>

                    <button className='cancelButton'>CANCEL</button>
                    <button className='refreshButton'><BiRefresh size={22} /></button>
                    <Link to="/login"><button className='submitButton' disabled={!isValid} onClick={signup}>SUBMIT</button></Link>

                    {loginError ? <div className='fieldError'>{loginError}</div> : ''}
                </form>
            </div>
        </div>
        
    )
}
