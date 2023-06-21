import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/types';
import { dispatchFetchUsers } from '../redux/usersSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state: RootState) => state.users);

  debugger;

  useEffect(() => {
    dispatch(dispatchFetchUsers());
  }, [dispatch]);

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
            <th>Name</th>
            <th>Email</th>
            <th>Date Created</th>
            <th>Date Modified</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.userid}>
              <td>{user.namefirst}</td>
              <td>{user.email}</td>
              <td>{user.datecreated}</td>
              <td>{user.datemodified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;