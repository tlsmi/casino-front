import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // Handle the response from the server
                const jsonData = await response.json();
                setMessage(jsonData.message);
                // Manejar la respuesta del servidor
                if (response.ok) {
                    console.log('Login successful');
                    sessionStorage.setItem("token", jsonData.token)
                    sessionStorage.setItem("user", JSON.stringify(jsonData.user))
                    window.location.href = '/'

                } else {
                    console.log('Login failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Validar el email
        if (!validateEmail(formData.email)) {
            newErrors.email = 'El email no es válido.';
            valid = false;
        } else {
            newErrors.email = '';
        }

        // Validar la contraseña
        if (!validatePassword(formData.password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
            valid = false;
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);
        return valid;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
