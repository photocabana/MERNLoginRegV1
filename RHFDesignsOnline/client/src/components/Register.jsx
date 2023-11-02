import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = (props) => {
    const {mainUser, setMainUser} = props;
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const [errors, setErrors] = useState({})

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/registerUser', user, {withCredentials:true})
            .then((res) => {
                setMainUser(res.data)
                console.log(res.data);
                navigate('/homepage')
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            <form className='w-50 mx-auto' onSubmit={submitHandler}>
                <div>
                    <label className="form-label">First Name:</label>
                    <input type="text" className="form-control" value={user.firstName} name='firstName' onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Last Name:</label>
                    <input type="text" className="form-control" value={user.lastName} name='lastName' onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" value={user.email} name='email' onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" value={user.password} name='password' onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Confirm Password:</label>
                    <input type="password" className="form-control" value={user.confirmPassword} name='confirmPassword' onChange={changeHandler}/>
                </div>
                <button className='btn btn-primary d-block'>Register</button>
                <Link to={'/login'}>Already Have An Account?</Link>
            </form>
        </div>
    )
}

export default Register

