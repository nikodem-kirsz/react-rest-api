import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/types';
import { fetchUsers, deleteUser } from '../redux/usersSlice';
import { DeleteUserRequest, User } from '../data/model'
import CreateUser from './CreateUser'


const UserList = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleUserSelect = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteUsers = () => {
    // Dispatch delete action for selected users
    const deleteRequest = mapUsersIdsToDeleteRequest(selectedUsers)
    dispatch(deleteUser(deleteRequest));
    // Clear the selected users array
    setSelectedUsers([]);
    dispatch(fetchUsers());
  };

  const mapUsersIdsToDeleteRequest = (selectedUsers: string[]) => {
    let deleteUserRequest: DeleteUserRequest[] = []
    for(let selectedUser of selectedUsers) {
      deleteUserRequest.push({userid: selectedUser})
    }
    return deleteUserRequest
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>User List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Date Created</th>
            <th>Date Modified</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.userid}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.userid)}
                  onChange={() => handleUserSelect(user.userid)}
                />
              </td>
              <td>{user.namefirst}</td>
              <td>{user.email}</td>
              <td>{timestampToDate(user.datecreated)}</td>
              <td>{timestampToDate(user.datemodified)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button className="btn btn-danger" onClick={handleDeleteUsers} disabled={selectedUsers.length === 0}>
          Delete
        </button>
        <CreateUser />
      </div>
    </div>
  );
};



const timestampToDate = (timestamp: string) => {
  const date = new Date(Number.parseInt(timestamp) * 1000); // Multiply by 1000 to convert from seconds to milliseconds

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1 and pad with leading zero if necessary
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate
}

export default UserList;