// EditUserModal.js

import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchUsers, updateUser, updateUserStart } from '../redux/usersSlice';

const EditUserModal = ({ user, showModal, setShowModal, clearSelectedUser }: any) => {
    console.log(user)
    debugger;
    
  const [formData, setFormData] = useState(user);

  const dispatch = useDispatch();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(updateUserStart(formData));
    dispatch(updateUser(formData))
    setShowModal(false);
    clearSelectedUser();
    dispatch(fetchUsers())
  };

  return (
    <Modal centered show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="namefirst"
              type="text"
              value={formData.namefirst}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="namelast"
              type="text"
              value={formData.namelast}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
