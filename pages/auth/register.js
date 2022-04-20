import styles from '../../components/auth/Auth.module.css'
import Content from "../../components/auth/Content";
import SignGoogle from "../../components/auth/SignGoogle";
import SignFacebook from "../../components/auth/SignFacebook";
import FormRegister from "../../components/auth/FormRegister";
import Layout from '../../components/layouts/Layout'
import { Container, Col } from 'reactstrap';
import { useRouter } from "next/router";
import { useEffect } from 'react';


export default function Register() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, []);

  return (
    <Layout title="Register">
      <Container>
        <div className={styles.item_center}>
          <div className="d-flex justify-content-center">
            <Col lg="6" className={styles.content}>
              <Content />
            </Col>
            <div className={styles.form_card}>
              <div>
                <h3 className="text-center my-2">Register</h3>
                <hr />
                <div className="d-flex justify-content-center mb-3">
                  <SignGoogle />
                  <SignFacebook />
                </div>
                <FormRegister />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}