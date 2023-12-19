import React, { useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const Register = (props) => {
    const [formData, setFormData] = useState({
    name: '',
    age: '',
    batch: '',
    email:'',
    password:'',
    paymentPrice:0, 
    });
    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const updatedFormData = {
            ...formData,
            [e.target.name]: value,
            paymentPrice: e.target.name === 'payment' && e.target.checked ? 500 : 0,
        };

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://flexmoney-backend-a8yv.onrender.com/api/v1/signUp', formData);

            // backend returns a token upon successful registration
            const token = response.data.data;
            const decoded = jwtDecode(token);
            localStorage.setItem('authToken', token);
            console.log(decoded);
            alert("Registration Successfull");

        } catch (error) {
            console.error('Registration failed', error.response.data.message);
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Yoga Registration Form</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input value={formData.name} name="name" onChange={handleChange} id="name" placeholder="full Name" required />
            <label htmlFor="email">Email</label>
            <input value={formData.email} onChange={handleChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
            <label htmlFor="password">Password</label>
            <input value={formData.password} onChange={handleChange} type="password" placeholder="********" id="password" name="password" required />
            <label htmlFor="age">Age</label>
            <input value={formData.age} onChange={handleChange} type="number" placeholder="Enter your age" id="age" name="age" required />
            <label htmlFor="selectBatch">Select Batch</label>
            <select className="batch" name="batch" value={formData.batch} onChange={handleChange} required>
               <option value="">Select Batch</option>
               <option value="6-7AM">6-7AM</option>
               <option value="7-8AM">7-8AM</option>
               <option value="8-9AM">8-9AM</option>
               <option value="5-6PM">5-6PM</option>
            </select>
            <label htmlFor="payment">Payment Done 
            <input checked={formData.paymentPrice === 500} onChange={handleChange} type="checkbox"  id="payment" name="payment" />   </label>
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}
