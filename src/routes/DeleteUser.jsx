import React, { useState } from 'react';

const DeleteUserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch('http://localhost:8080/deleteUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        sessionStorage.removeItem('token')
        console.log('User deleted successfully');
        window.location.reload();
        // Handle success or redirect to another page
      } else {
        console.log('Error deleting user');
        // Handle error
      }
    } catch (error) {
      console.log('Error occurred:', error);
      // Handle error
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='divform'>
      <h1>Delete User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </label>
        <br />
        <button type="submit">Delete User</button>
      </form>
    </div>
  );
};

export default DeleteUserForm;