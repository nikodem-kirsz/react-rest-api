import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/usersSlice';
import { User } from '../data/model'

const CreateUser = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<User>({
    userid: '',
    namefirst: '',
    email: '',
    datecreated: '',
    datemodified: ''
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createUser(formData));
    setFormData({ userid: '', namefirst: '', email: '', datecreated: '', datemodified: '' });
    alert('User created successfully!');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <h3>Create User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="namefirst"
            value={formData.namefirst}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUser;