import Layout from "../../components/layouts/Layout";
import styles from '../../components/auth/Auth.module.css'
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import swal from "sweetalert";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Forgot() {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [button, setButton] = useState("Send Email")
  const [email, setEmail] = useState("")
  const router = useRouter()

  const changeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setButton("Send Email")
  }

  const sendEmail = async () => {
    if (email.length <= 0) {
      swal({ icon: "error", text: "Masukkan email anda !!" });
    }
    else if (!email.match(validRegex)) {
      swal({ icon: "error", text: "Masukkan alamat email yang valid !!" });
    } else {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          swal({ icon: "success", text: "Password reset email terkirim!" })
          router.push("/auth/login")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          swal({ icon: "error", text: errorCode })
        });
    }
  }

  return (
    <Layout title="Reset Password">
      <Container>
        <div className={styles.item_center}>
          <div className={styles.form_forgot}>
            <h3 className="text-center my-2">Reset Password</h3>
            <hr />
            <div className="d-flex justify-content-center mb-3">
              <Form>
                <h6 className="text-center">Masukkan Email Anda</h6>
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
                <div className="text-center">
                  <Button onClick={sendEmail} color="primary">{button}</Button>
                </div>
                <div className="text-center mt-3">Remember account? <Link href="/auth/login"><a className="text-decoration-none text-primary">Login</a></Link></div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
