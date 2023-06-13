import React, { useState } from 'react';

const Password = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch('http://localhost:8080/profile/password', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const jsonData = await response.json();
      setMessage(jsonData.message);

      if (response.ok) {
        console.log('Contraseña actualizada correctamente');
      } else {
        console.log('Error al actualizar la contraseña');
      }
    } catch (error) {
      console.log('Error al realizar la petición:', error);
    }

    // Limpiar los campos del formulario después de enviarlos
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    // Borrar el mensaje de error
    setError('');
  };

  return (
    <div>
      <p>
        <a href="/profile">Profile</a>
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Contraseña actual:
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Nueva contraseña:
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
            minLength={8}
          />
        </label>
        <br />
        <label>
          Confirmar nueva contraseña:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            minLength={8}
          />
        </label>
        {error && <p>{error}</p>}
        <br />
        <button type="submit">Cambiar contraseña</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Password;