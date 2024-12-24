import React, { useState } from 'react';
import { updateUser } from '../../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserEdit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(state?.user || { first_name: '', last_name: '', email: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!user.first_name) {
      newErrors.first_name = 'First name is required';
    }
    if (!user.last_name) {
      newErrors.last_name = 'Last name is required';
    }
    if (!user.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateUser(user.id, user);
      toast.success('User updated successfully');
      navigate('/users');
    } catch (err) {
      toast.error('Failed to update user');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Edit User</h2>
        <div className="mt-6">
          <input
            type="text"
            placeholder="First Name"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.first_name ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
          )}
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Last Name"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.last_name ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
          )}
        </div>
        <div className="mt-4">
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.email ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
