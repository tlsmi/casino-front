import React, { useState, useEffect } from 'react';
import '../static/css/profile_style.css';

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

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedData = sessionStorage.getItem('user');

        if (storedData) {
            setFormData(JSON.parse(storedData));
        }

        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem('token');

                const response = await fetch('https://casino.z101.alumnes-esliceu.tk/getprofile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const user = await response.json();

                    setFormData(user);
                } else {
                    console.log('Error en la petición GET');
                    const errorData = await response.json();
                    const errorMessage = errorData.message || 'Error en la petición GET';
                    setErrorMessage(errorMessage);
                }
            } catch (error) {
                console.log('Error al realizar la petición GET:', error);
                setErrorMessage('Error al realizar la petición GET');
            }
        };

        fetchProfile();
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

            const response = await fetch('https://casino.z101.alumnes-esliceu.tk/profile', {
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
                const getProfileResponse = await fetch('https://casino.z101.alumnes-esliceu.tk/getprofile', {
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
                    const errorData = await getProfileResponse.json();
                    const errorMessage = errorData.message || 'Error en la petición GET';
                    setErrorMessage(errorMessage);
                }
            } else {
                console.log('Error en la petición PUT');
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Error en la petición PUT';
                setErrorMessage(errorMessage);
            }
        } catch (error) {
            console.log('Error al realizar la petición PUT:', error);
            setErrorMessage('Error al realizar la petición PUT');
        }
    };

    const validateDNI = (dni) => {
        const dniRegex = /^\d{8}[a-zA-Z]$/;
        return dniRegex.test(dni);
    };

    const validateEmail = (email) => {
        // eslint-disable-next-line
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(email);
    };

    const logout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        window.location.href = '/login';
    };
    const deleteUser = () => {
        window.location.href = '/deleteUser';
    };

    return (
        <div className='divform' id='profile'>
            <div className='divHeader'>
                <button onClick={deleteUser} className='redirect'>Delete User</button>

                <h1 id='nombre-perfil'>{formData.name}'s profile</h1>
                <button onClick={logout} className='redirect'>Log out</button>
            </div>
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
                <p>{errorMessage}</p>
                <div >
                    <p>
                        <a href="/profile/password" className='redirect'>Change password</a>
                    </p>

                </div>
                <br />
                <button type="submit">Change Profile</button>

            </form>
        </div>
    );
};
export default Profile;