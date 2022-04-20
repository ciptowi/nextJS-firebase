import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { signIn } from "../../redux/actions/authActions";
import { connect, useDispatch } from "react-redux";

function FormLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertLogin, setAlertLogin] = useState("");
  const { buttonLogin } = props;
  const validRegex = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";

  const changeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setAlertLogin("");
  };

  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setAlertLogin("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((email.length, password.length) <= 0) {
      setAlertLogin("Form tidak boleh kosong !!");
    } else if (!email.match(validRegex)) {
      setAlertLogin("Masukkan alamat email yang valid !!");
    } else if (password.length <= 5) {
      setAlertLogin("Password minimal 6 karakter !!");
    } else {
      await props.signIn({ email, password });
    }
  };

  return (
    <Form>
      <div className="py-0">
        {
          alertLogin ? (<Alert color="danger" className="text-center py-1 px-0">
            <span className="fas fa-exclamation-triangle mx-1" />
            {alertLogin}</Alert>)
            :
            (<Alert color="light" className="text-center py-1">or</Alert>)
        }
      </div>
      <div className="text-center pb-3">Sign in with credentials</div>
      <FormGroup className="d-flex align-items-center">
        <span className="far fa-envelope text-muted mx-1" />
        <Input
          type="email"
          placeholder="Email"
          pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          value={email}
          onChange={changeEmail}
          required
        />
      </FormGroup>
      <FormGroup className="d-flex align-items-center">
        <span className="fas fa-key text-muted mx-1" />
        <Input type="password" placeholder="Password" value={password} onChange={changePassword} required />
      </FormGroup>
      <div className="text-center mb-3">
        <Button onClick={handleSubmit} color="primary">{buttonLogin}</Button>
      </div>
      <div className="text-center mt-3">
        <Link href="/auth/forgot"><a className="text-decoration-none text-primary">Forget password? </a></Link>
        or
        <Link href="/auth/register"><a className="text-decoration-none text-primary"> Register</a></Link>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    buttonLogin: state.auth.buttonLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
