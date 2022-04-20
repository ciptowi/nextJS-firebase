import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import { useEffect, useState } from "react";
import Link from "next/link";
import { signUp } from "../../redux/actions/authActions";
import { connect, useDispatch } from "react-redux";

function FormRegister(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const { buttonRegister } = props;
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const changeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setAlert("");
  };

  const changeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setAlert("");
  };

  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setAlert("");
  };

  const register = async (e) => {
    e.preventDefault();
    if ((username.length, email.length, password.length) <= 0) {
      setAlert("Form tidak boleh kosong !!");
    } else if (!email.match(validRegex)) {
      setAlert("Masukkan alamat email yang valid !!");
    } else if (password.length <= 5) {
      setAlert("Password minimal 6 karakter !!");
    } else {
      await props.signUp({ username, email, password });
    }
  };

  return (
    <Form>
      <div className="py-0">
        {
          alert ? (<Alert color="danger" className="text-center py-1 px-0">
            <span className="fas fa-exclamation-triangle mx-1" />
            {alert}</Alert>)
            :
            (<Alert color="light" className="text-center py-1">or</Alert>)
        }
      </div>
      <div className="text-center pb-3">Sign up with credentials</div>
      <FormGroup className="d-flex align-items-center">
        <span className="fas fa-user text-muted mx-1" />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={changeUsername}
        />
      </FormGroup>
      <FormGroup className="d-flex align-items-center">
        <span className="far fa-envelope text-muted mx-1" />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={changeEmail}
        />
      </FormGroup>
      <FormGroup className="d-flex align-items-center">
        <span className="fas fa-key text-muted mx-1" />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={changePassword}
        />
      </FormGroup>
      <div className="text-center">
        <Button onClick={register} color="primary">{buttonRegister}</Button>
      </div>
      <div className="text-center mt-3">Have account? <Link href="/auth/login"><a className="text-decoration-none text-primary">Login</a></Link></div>
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    buttonRegister: state.auth.buttonRegister,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRegister);

