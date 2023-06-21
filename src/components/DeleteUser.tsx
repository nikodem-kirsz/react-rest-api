import { useState, } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { fetchUsers, deleteUser } from '../redux/usersSlice';
import { DeleteUserRequest } from '../data/model';

const DeleteUser = (props: any) => {
    const dispatch = useDispatch();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteUsers = () => {
        const deleteRequest = mapUsersIdsToDeleteRequest(props.users)
        dispatch(deleteUser(deleteRequest));
        setShowDeleteModal(false);
        props.clearSelectedUsers();
        dispatch(fetchUsers());
    };

    const mapUsersIdsToDeleteRequest = (selectedUsers: string[]) => {
        let deleteUserRequest: DeleteUserRequest[] = []
        for (let selectedUser of selectedUsers) {
            deleteUserRequest.push({ userid: selectedUser })
        }
        return deleteUserRequest
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    return (
        <div>
            <button className="btn btn-danger" onClick={handleShowDeleteModal} disabled={props.users.length === 0}>
                Delete
            </button>
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete the selected users?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUsers}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default DeleteUser