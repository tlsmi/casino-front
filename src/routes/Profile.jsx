import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [formData, setFormData] = useState({
        dni: '',
        name: '',
        email: '',
        surname1: '',
        surname2: '',
        birthDate: '',
        password: '', // Nuevo campo de contraseña
    });

    const [errors, setErrors] = useState({
        dni: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        // Recuperar el objeto JSON desde sessionStorage
        const storedData = sessionStorage.getItem('user');

        if (storedData) {
            // Si hay datos almacenados en sessionStorage, actualizar el estado con esos valores
            setFormData(JSON.parse(storedData));
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const token = sessionStorage.getItem('token');

            const response = await fetch('http://localhost:8080/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Petición PUT exitosa');

                // Obtener los datos JSON devueltos por el servidor
                const responseData = await response.json();

                const token = responseData.token;

                sessionStorage.setItem('token', token);

                // Realizar la petición GET para obtener el perfil actualizado
                const getProfileResponse = await fetch('http://localhost:8080/getprofile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (getProfileResponse.ok) {
                    const user = await getProfileResponse.json();

                    // Guardar el objeto JSON en sessionStorage como "user"
                    sessionStorage.setItem('user', JSON.stringify(user));
                } else {
                    console.log('Error en la petición GET');
                }
            } else {
                console.log('Error en la petición PUT');
            }
        } catch (error) {
            console.log('Error al realizar la petición PUT:', error);
        }
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
            <p>
                <a href="/profile/password">Change password</a>
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    DNI:
                    <input type="text" name="dni" value={formData.dni} onChange={handleInputChange} />
                    {errors.dni && <span>{errors.dni}</span>}
                </label>
                <br />
                <label>
                    Nombre:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    {errors.email && <span>{errors.email}</span>}
                </label>
                <br />
                <label>
                    Primer Apellido:
                    <input type="text" name="surname1" value={formData.surname1} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Segundo Apellido:
                    <input type="text" name="surname2" value={formData.surname2} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Fecha de Nacimiento:
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required
                        minLength={8} />
                    {errors.password && <span>{errors.password}</span>}
                </label>
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};
export default Profile;