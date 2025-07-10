import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const getLinkClass = (path: string) =>
    `nav-link px-3 ${isActive(path) ? 'border-bottom border-3 border-dark fw-semibold' : ''}`;

  const handleLogout = () => {
    localStorage.removeItem("authKey");
    navigate('/login');
  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand href="/dashboard" className="fw-bold">Nixassign</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/dashboard')} className={getLinkClass('/dashboard')}>
              Dashboard
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/invigilator')} className={getLinkClass('/invigilator')}>
              Invigilator
            </Nav.Link>
          </Nav>
          <div className="ms-auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
