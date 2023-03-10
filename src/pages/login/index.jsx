import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { handleEmail, handlePassword, handleSubmit } from "./LoginService";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState({ valid: false, value: "" });
  const [password, setPassword] = useState({ valid: false });

  return (
    <section className="box90 boxAround flex-column spaceLarge">
      <header className="box80 boxBlack boxAround flex-column">
        <h1 className="boxYellow">Welcome to Bolivar's Recipes</h1>
      </header>
      <Form className="box70 boxCenter boxBlack flex-column spaceThin">
        <Form.Group className="box90 boxAround flex-column H15 spaceThin">
          <Form.Control
            className="box80 boxBlack"
            data-testid="email-input"
            isInvalid={!email.valid}
            isValid={email.valid}
            onChange={(e) => handleEmail(e, setEmail)}
            placeholder="Email"
            required="required"
            type="email"
          />
          <Form.Control.Feedback
            as="p"
            data-testid="email-invalid"
            style={{ display: email.valid ? "none" : "block" }}
            type="invalid"
          >
            Insert a valid email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="box90 boxAround boxBlack flex-column H15 spaceThin">
          <Form.Control
            className="box80 boxBlack"
            data-testid="password-input"
            isInvalid={!password.valid}
            isValid={password.valid}
            onChange={(e) => handlePassword(e, setPassword)}
            placeholder="Password"
            required="required"
            type="password"
          />
          <Form.Control.Feedback
            as="p"
            data-testid="password-invalid"
            style={{ display: password.valid ? "none" : "block" }}
            type="invalid"
          >
            Password length must be 6 or longer, contain at least 1 lowercase
            and 1 uppercase alphabetical character and contain at least 1
            number.
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className="box40 H5 boxYellow"
          data-testid="login-submit-btn"
          disabled={!email.valid || !password.valid}
          onClick={(e) => handleSubmit(e, email, history)}
          type="submit"
          variant="outline-danger"
        >
          Login
        </Button>
      </Form>
    </section>
  );
}

export default Login;
