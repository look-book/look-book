import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
//import SidebarMenu from 'react-bootstrap-sidebar-menu';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

//This is the navigation bar that will be at the top of each page.


function NavBarOne() {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to={'/Home'}>LookBook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={'/Home'}>Home</Nav.Link>
                        <Nav.Link as={Link} to={'/Register'}>Register</Nav.Link>
                        <Nav.Link as={Link} to={'/Login'}>Login</Nav.Link>
                        <NavDropdown title="Feed" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={'/Filters'}>Tags</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={'/People'}>People</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={'/Gallery'}>Gallery</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={'/Upload'}>Upload Photos</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="More About Us" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={'/Coaching'}>How To's</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={'/AboutUs'}>About Us</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={'/ContactUs'}>Contact Us</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to={'/Sidebar'}>Sidebar</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>

    )
}



export default NavBarOne;