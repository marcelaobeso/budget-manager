import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import {
  emailFieldsValidator,
  fristNameFieldsValidator,
  lastNameFieldsValidator,
  passwordFieldsValidator,
  signUpUser,
  usernameFieldsValidator,
} from "../../../../store/slices/signUpSlice/signUpSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SignUpForm.module.css";
import { useAuthStore } from "../../../hooks/useAuthStore.js";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { userInfo, validFields } = useSelector((state) => state.signUp);

  const firstNameHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      dispatch(fristNameFieldsValidator({ ...validFields, firstName: true }));
    }
    dispatch(signUpUser({ ...userInfo, firstName: event.target.value }));
  };
  const lastNameHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      dispatch(lastNameFieldsValidator({ ...validFields, lastName: true }));
    }
    dispatch(signUpUser({ ...userInfo, lastName: event.target.value }));
  };
  const usernameHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      dispatch(usernameFieldsValidator({ ...validFields, username: true }));
    }
    dispatch(signUpUser({ ...userInfo, username: event.target.value }));
  };
  const emailHandler = (event) => {
    if (event.target.value.length > 4) {
      dispatch(emailFieldsValidator({ ...validFields, email: true }));
    }
    dispatch(signUpUser({ ...userInfo, email: event.target.value }));
  };
  const passwordHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      dispatch(passwordFieldsValidator({ ...validFields, password: true }));
    }
    dispatch(signUpUser({ ...userInfo, password: event.target.value }));
  };
  const { signin } = useAuthStore();
  const formHandler = (event) => {
    event.preventDefault();
    if (
      userInfo.firstName.trim().length === 0 ||
      userInfo.lastName.trim().length === 0 ||
      userInfo.username.trim().length === 0 ||
      userInfo.email.trim().length === 0 ||
      userInfo.password.trim().length === 0
    ) {
      if (userInfo.firstName.trim().length === 0) {
        dispatch(
          fristNameFieldsValidator({ ...validFields, firstName: false })
        );
        dispatch(signUpUser({ ...userInfo, firstName: "" }));
      }
      if (userInfo.lastName.trim().length === 0) {
        dispatch(lastNameFieldsValidator({ ...validFields, lastName: false }));
        dispatch(signUpUser({ ...userInfo, lastName: "" }));
      }
      if (userInfo.username.trim().length === 0) {
        dispatch(usernameFieldsValidator({ ...validFields, username: false }));
        dispatch(signUpUser({ ...userInfo, username: "" }));
      }
      if (userInfo.email.length === 0) {
        dispatch(emailFieldsValidator({ ...validFields, email: false }));
        dispatch(signUpUser({ ...userInfo, email: "" }));
      }
      if (userInfo.password.trim().length === 0) {
        dispatch(passwordFieldsValidator({ ...validFields, password: false }));
        dispatch(signUpUser({ ...userInfo, password: "" }));
      }
      return;
    }

    signin({
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      password: userInfo.password,
      username: userInfo.username,
    });
  };
  return (
    <Form onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="name">
        <Row className="g-2">
          <Col
            md
            className={`${styles["form-control"]} ${
              !validFields.firstName && styles.invalid
            }`}
          >
            <FloatingLabel
              onChange={firstNameHandler}
              controlId="firstName"
              label="First Name"
            >
              <Form.Control type="text" placeholder="First Name" />
            </FloatingLabel>
          </Col>
          <Col
            md
            className={`${styles["form-control"]} ${
              !validFields.lastName && styles.invalid
            }`}
          >
            <FloatingLabel
              onChange={lastNameHandler}
              controlId="lastName"
              label="Last Name"
            >
              <Form.Control type="text" placeholder="Last Name" />
            </FloatingLabel>
          </Col>
        </Row>
      </Form.Group>
      <Row
        className={`${styles["form-control"]} ${
          !validFields.username && styles.invalid
        }`}
      >
        <Form.Group className="mb-3">
          <FloatingLabel
            onChange={usernameHandler}
            controlId="username"
            label="Username"
          >
            <Form.Control type="text" placeholder="Username" />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row
        className={`${styles["form-control"]} ${
          !validFields.email && styles.invalid
        }`}
      >
        <Form.Group className="mb-3">
          <FloatingLabel
            onChange={emailHandler}
            controlId="email"
            label="Email address "
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      </Row>
      <Row
        className={`${styles["form-control"]} ${
          !validFields.password && styles.invalid
        }`}
      >
        <Form.Group className="mb-3">
          <FloatingLabel
            onChange={passwordHandler}
            controlId="password"
            label="Password "
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Form.Group>
      </Row>
      {validFields.message && <p>{validFields.message}</p>}
      <Button variant="dark" type="submit">
        SignUp
      </Button>
    </Form>
  );
};

export default SignUpForm;
