import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname1: '',
        surname2: '',
        email: '',
        birthDate: '',
        password: '',
        passwordRep: '',
        dni: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Handle the response from the server
            if (response.ok) {
                console.log('Signup successful');
            } else {
                console.log('Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    First Surname:
                    <input type="text" name="surname1" value={formData.surname1} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Second Surname:
                    <input type="text" name="surname2" value={formData.surname2} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Birth Date:
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Repeat Password:
                    <input type="password" name="passwordRep" value={formData.passwordRep} onChange={handleChange} />
                </label>
                <br />
                <label>
                    DNI:
                    <input type="text" name="dni" value={formData.dni} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
