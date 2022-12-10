import { Button, Col, Container, Row } from "react-bootstrap";
import Income from "../../../assets/images/income.svg";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import { useDispatch } from "react-redux";
import { enableViewLogin } from "../../../store/slices/signUpSlice/signUpSlice";

const Login = () => {
  const dispatch = useDispatch();
  const siginHandler = () => {
    dispatch(enableViewLogin());
  };
  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <LoginForm />
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <div>
              <img src={Income} alt="Income, peggybank on top of a laptop" />
              <p>Sing up instead if you dont have an account yet</p>
              <Link to={"/sign"}>
                <Button onClick={siginHandler} variant="secondary">
                  Sign up
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
