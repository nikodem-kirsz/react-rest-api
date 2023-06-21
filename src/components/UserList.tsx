import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/types';
import { fetchUsers } from '../redux/usersSlice';
import { User } from '../data/model'
import CreateUser from './CreateUser'
import DeleteUser from './DeleteUser'


const UserList = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state: RootState) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const clearSelectedUsers = () => {
    setSelectedUsers([])
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
          {currentUsers.map((user: User) => (
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

      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToFirstPage}>
              {'\u00AB'}
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                <button className="page-link">{pageNumber}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToLastPage}>
              {'\u00BB'}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="d-flex justify-content-between">
        <DeleteUser users={selectedUsers} clearSelectedUsers={clearSelectedUsers}/>
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