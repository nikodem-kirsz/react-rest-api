import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <h2>User Management</h2>
          <Routes>
            <Route path="/" element={<UserList/>}></Route>
            <Route path="/create" element={<CreateUser/>}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;