import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../store/slices/signUpSlice/signUpSlice";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const { firstName } = useSelector((state) => state.signUp.userInfo);
  const logoutHanddler = () => {
    dispatch(logoutUser());
  };
  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Text>Hola {firstName}!</Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link to={"/login"}>
              <Button onClick={logoutHanddler} variant="secondary">
                Logout
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
