import React, { useEffect, useState } from 'react';
import { Footer, Navbar } from '../common';
import './admin.scss';
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Fetch users from the API
    const url = 'https://game-store-6m01.onrender.com/api/users';
    fetch(url)
      .then((response) => response.json())
      .then((data) => setUsers(data));

    // Retrieve isAdmin status from local storage
    const isAdmin = JSON.parse(localStorage.getItem('Hello'));
    setAdmin(isAdmin);
    console.log(admin)
  }, []); // Adding an empty dependency array to run the effect only once

  const handleEdit = (userId) => {
    if (admin) {
      // Implement the edit functionality
      console.log(`Edit user with ID: ${userId}`);
    } else {
      alert('You do not have permission to edit users.');
    }
  };

  const handleDelete = (userId) => {
    if (admin) {
      const url = 'https://game-store-6m01.onrender.com/api/users';
      fetch(`${url}/${userId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Optionally, update the users state to remove the deleted user from the list
          setUsers(users.filter((user) => user._id !== userId));
        });
    } else {
      alert('You do not have permission to delete users.');
    }
  };

  return (
    <div className='admin'>
      <Navbar />
      <h1>Admin Page</h1>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                <td className='btns'>
                  {admin ? (
                    <Link to={`/admin/${user._id}`} className='edit'>
                      <button>
                        <MdEdit />
                        Edit
                      </button>
                    </Link>
                  ) : (
                    <button className='edit' onClick={() => alert('You do not have permission to edit users.')}>
                      <MdEdit />
                      Edit
                    </button>
                  )}
                  <div className="del">
                    <button className='delete' onClick={() => handleDelete(user._id)}>
                      <MdDelete />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
