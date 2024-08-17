import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FormControl } from '@mui/base/FormControl'
import './editUser.scss'

const EditUser = () => {
  const { id } = useParams()

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = 'https://game-store-6m01.onrender.com/api/users';
        const response = await fetch(`${url}/find/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const url = 'https://game-store-6m01.onrender.com/api/users';
      const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);

      // Show success alert
      window.alert('User updated successfully!');

      // Reset user state after successful update
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: ''
      });

      Navigate('/admin')
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className='editUser'>
      Edit user with ID: {id}
      <div className="nameContainer">
        <FormControl>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            placeholder='first name'
            value={user.firstName}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            placeholder='last name'
            value={user.lastName}
            onChange={handleOnChange}
          />
        </FormControl>
      </div>
      <FormControl className='email'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          value={user.email}
          onChange={handleOnChange}
        />
      </FormControl>
      <FormControl className='admin'>
        <label htmlFor='admin'>Admin</label>
        <input
          type='text'
          id='isAdmin'
          name='isAdmin'
          placeholder='Yes/No'
          value={user.isAdmin ? 'Yes' : 'No'}
          onChange={handleOnChange}
        />
      </FormControl>
      <div className="buttons">
        <button onClick={handleUpdate}>Update</button>
        <Link to='/admin'>
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  )
}

export default EditUser
