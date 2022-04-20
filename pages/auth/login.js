import styles from "../../components/auth/Auth.module.css";
import FormLogin from "../../components/auth/FormLogin";
import SignFacebook from "../../components/auth/SignFacebook";
import SignGoogle from "../../components/auth/SignGoogle";
import Content from "../../components/auth/Content";
import Layout from '../../components/layouts/Layout'
import { Container, Col } from "reactstrap";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useEffect } from "react";

function Login(props) {
  const { authError, auth, token } = props;
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    //console.log(token);
    if (token) {
      //console.log("tes");
      router.push("/home");
    }
  }, []);

  return (
    <Layout title="Login">
      <Container>
        <div className={styles.item_center}>
          <div className="d-flex justify-content-center">
            <Col lg="6" className={styles.content}>
              <Content />
            </Col>
            <div className={styles.form_card}>
              <div>
                <h3 className="text-center my-2">Login</h3>
                <hr />
                <div className="d-flex justify-content-center mb-3">
                  <SignGoogle />
                  <SignFacebook />
                </div>
                <FormLogin />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
