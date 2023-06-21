import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserList from './components/UserList';
import { Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <Navbar bg="light" expand="lg">

      <Container>
            <Navbar.Brand href="/">
              <img
                src="/sitoo.png"
                alt="Logo"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Users</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/manufacturers">Manufacturers</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className='mt-3'>
        <div className="container">
          <Routes>
            <Route path="/" element={<UserList/>}></Route>
            <Route path="/products" element={<UserList/>}></Route>
            <Route path="/manufacturers" element={<UserList/>}></Route>
          </Routes>
        </div>
        </Container>
        
      </Router>
    </Provider>
  );
}

export default App;