import { Button, Col, Container, Row } from "react-bootstrap";
import SignUpForm from "./SignUpForm/SignUpForm";
import EWallet from "../../../assets/images/eWallet.svg";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enableViewLogin } from "../../../store/slices/signUpSlice/signUpSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const loginHandler = () => {
    dispatch(enableViewLogin());
  };
  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <div>
              <img src={EWallet} alt="e wallet with cellphone" />
              <p>Log in istead if you already have an account</p>
              <Link to={"/login"}>
                <Button onClick={loginHandler} variant="secondary">
                  Login
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <SignUpForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
