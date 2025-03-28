import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
// @ts-ignore
import { auth } from "../.././../../database/schemas/firebase";
// @ts-ignore
import {SignIn, UserProfile} from "./auth/SignIn"
function NavComp() {
  const [user] = useAuthState(auth);
  return (
    <header style={{marginBottom: '3rem'}}>
      <Navbar data-bs-theme="light" className="d-flex justify-content-center align-items-center">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="/" className="mx-3" style={{ fontSize: '3rem' }}>Pokemon Quiz</Navbar.Brand>
          <Nav className='me-4' style={{ fontSize: '1.5rem' }}>
            <Nav.Link as={NavLink} to="/quiz" className="mx-2">Quiz</Nav.Link>
            <Nav.Link as={NavLink} to="/list" className="mx-2">List</Nav.Link>
            {user ? <UserProfile /> : <SignIn />}
          </Nav>
         
        </Container>
      </Navbar>
    </header>
  );
}


export default NavComp;
