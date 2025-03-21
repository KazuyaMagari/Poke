import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavComp() {
  return (
    <header style={{marginBottom: '3rem'}}>
      <Navbar data-bs-theme="light" className="d-flex justify-content-center align-items-center">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="#home" className="mx-3" style={{ fontSize: '3rem' }}>Navbar</Navbar.Brand>
          <Nav className='me-4' style={{ fontSize: '1.5rem' }}>
            <Nav.Link href="#features" className="mx-2">Quiz</Nav.Link>
            <Nav.Link href="#pricing" className="mx-2">List</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}


export default NavComp;
