import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dispatchCreateUser } from '../redux/usersSlice';

interface CreateUserForm {
  id: number;  
  name: string;
  email: string;
}

const CreateUser = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<CreateUserForm>({
    id: 0,
    name: '',
    email: ''
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(dispatchCreateUser(formData));
    setFormData({ id: 0, name: '', email: '' });
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
            name="name"
            value={formData.name}
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