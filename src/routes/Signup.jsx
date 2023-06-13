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

  const [errors, setErrors] = useState({
    name: '',
    surname1: '',
    surname2: '',
    email: '',
    birthDate: '',
    password: '',
    passwordRep: '',
    dni: ''
  });

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los datos antes de enviar la solicitud
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const jsonData = await response.json();
        console.log(jsonData)
        setMessage(jsonData.message);
        // Manejar la respuesta del servidor
        if (response.ok) {
          console.log('Signup successful');
          window.location.href = '/login'
        } else {
          console.log('Signup failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validar el DNI
    if (!validateDNI(formData.dni)) {
      newErrors.dni = 'El DNI debe tener 8 números y una letra.';
      valid = false;
    } else {
      newErrors.dni = '';
    }

    // Validar el email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'El email no es válido.';
      valid = false;
    } else {
      newErrors.email = '';
    }



    // Validar la repetición de la contraseña
    if (formData.password !== formData.passwordRep) {
      newErrors.passwordRep = 'Las contraseñas no coinciden.';
      valid = false;
    } else {
      newErrors.passwordRep = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const validateDNI = (dni) => {
    const dniRegex = /^\d{8}[a-zA-Z]$/;
    return dniRegex.test(dni);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <br />
        <label>
          Birth Date:
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange}
            required
            minLength={8} />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        <br />
        <label>
          Repeat Password:
          <input type="password" name="passwordRep" value={formData.passwordRep} onChange={handleChange} required
            minLength={8} />
          {errors.passwordRep && <span className="error">{errors.passwordRep}</span>}
        </label>
        <br />
        <label>
          DNI:
          <input type="text" name="dni" value={formData.dni} onChange={handleChange} />
          {errors.dni && <span className="error">{errors.dni}</span>}
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>

  );
};

export default Signup;




