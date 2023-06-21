import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, fetchUsers } from '../redux/usersSlice';
import { CreateUserRequest } from '../data/model';
import { Button, Modal, Form } from 'react-bootstrap';

const CreateUser = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<CreateUserRequest>({
        email: '',
        namefirst: '',
        namelast: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = () => {
        debugger;
        dispatch(createUser(formData));
        setFormData({ namelast: '', namefirst: '', email: '' });
        alert('User created successfully!');
        setShowModal(false);
        dispatch(fetchUsers())
    };

    const handleChange = (event: React.ChangeEvent<any>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div>
            <Button variant="primary" onClick={() => setShowModal(true)}>Create User</Button>

            <Modal centered show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>First name</Form.Label>
                            <Form.Control name="namefirst" type="text" value={formData.namefirst} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="namelast" type="text" value={formData.namelast} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateUser;